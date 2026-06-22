import { describe, expect, it } from 'vitest';
import {
  PROVIDERS,
  computeProviderMetrics,
  findHighestRiskId,
  formatRiskScore,
  formatRunwayYears,
  riskBand,
} from './cloudRisk.js';

describe('PROVIDERS data', () => {
  it('contains exactly three providers', () => {
    expect(PROVIDERS).toHaveLength(3);
  });

  it('includes gcp, azure, and aws', () => {
    const ids = PROVIDERS.map((p) => p.id);
    expect(ids).toEqual(['gcp', 'azure', 'aws']);
  });

  it('each provider has all required numeric fields', () => {
    for (const p of PROVIDERS) {
      expect(p.revenueRunRate).toBeGreaterThan(0);
      expect(p.rpo).toBeGreaterThan(0);
      expect(p.customSilicon).toBeGreaterThanOrEqual(0);
      expect(p.customSilicon).toBeLessThanOrEqual(100);
      expect(p.ownedInfra).toBeGreaterThanOrEqual(0);
      expect(p.ownedInfra).toBeLessThanOrEqual(100);
      expect(p.baselineRisk).toBeGreaterThan(0);
    }
  });

  it('each provider has display fields', () => {
    for (const p of PROVIDERS) {
      expect(p.name).toBeTruthy();
      expect(p.shortName).toBeTruthy();
      expect(p.accent).toBeTruthy();
      expect(p.metricAccent).toBeTruthy();
    }
  });
});

describe('formatRunwayYears', () => {
  it('returns em-dash for zero revenue run rate', () => {
    expect(formatRunwayYears(100, 0)).toBe('—');
  });

  it('returns em-dash for falsy revenue run rate', () => {
    expect(formatRunwayYears(100, null)).toBe('—');
    expect(formatRunwayYears(100, undefined)).toBe('—');
  });

  it('formats GCP runway correctly (460 / 80.1)', () => {
    expect(formatRunwayYears(460, 80.1)).toBe('5.74 yrs');
  });

  it('formats Azure runway correctly (392 / 123.6)', () => {
    expect(formatRunwayYears(392, 123.6)).toBe('3.17 yrs');
  });

  it('formats AWS runway correctly (364 / 150.4)', () => {
    expect(formatRunwayYears(364, 150.4)).toBe('2.42 yrs');
  });

  it('handles exact division', () => {
    expect(formatRunwayYears(200, 100)).toBe('2.00 yrs');
  });

  it('handles zero RPO', () => {
    expect(formatRunwayYears(0, 100)).toBe('0.00 yrs');
  });
});

describe('formatRiskScore', () => {
  it('formats integer to two decimal places', () => {
    expect(formatRiskScore(2)).toBe('2.00');
  });

  it('formats float to two decimal places', () => {
    expect(formatRiskScore(1.234)).toBe('1.23');
  });

  it('rounds up correctly', () => {
    expect(formatRiskScore(2.999)).toBe('3.00');
  });

  it('formats zero', () => {
    expect(formatRiskScore(0)).toBe('0.00');
  });
});

describe('riskBand', () => {
  it('returns Moderate for score < 2', () => {
    const band = riskBand(1.5);
    expect(band.label).toBe('Moderate');
    expect(band.className).toContain('emerald');
  });

  it('returns Moderate at boundary score 0', () => {
    expect(riskBand(0).label).toBe('Moderate');
  });

  it('returns Moderate at score 1.99', () => {
    expect(riskBand(1.99).label).toBe('Moderate');
  });

  it('returns Elevated at exactly 2', () => {
    expect(riskBand(2).label).toBe('Elevated');
    expect(riskBand(2).className).toContain('amber');
  });

  it('returns Elevated for score 2.5', () => {
    expect(riskBand(2.5).label).toBe('Elevated');
  });

  it('returns Elevated at score 2.99', () => {
    expect(riskBand(2.99).label).toBe('Elevated');
  });

  it('returns High at exactly 3', () => {
    expect(riskBand(3).label).toBe('High');
    expect(riskBand(3).className).toContain('rose');
  });

  it('returns High for score > 3', () => {
    expect(riskBand(5).label).toBe('High');
  });
});

describe('computeProviderMetrics', () => {
  const testProviders = [
    {
      id: 'test-a',
      revenueRunRate: 100,
      rpo: 500,
      customSilicon: 20,
      ownedInfra: 60,
      baselineRisk: 1.0,
    },
    {
      id: 'test-b',
      revenueRunRate: 200,
      rpo: 400,
      customSilicon: 50,
      ownedInfra: 80,
      baselineRisk: 2.0,
    },
  ];

  it('returns one metric object per provider', () => {
    const metrics = computeProviderMetrics(testProviders, 1, 0);
    expect(metrics).toHaveLength(2);
    expect(metrics[0].id).toBe('test-a');
    expect(metrics[1].id).toBe('test-b');
  });

  it('computes correct backlog runway', () => {
    const metrics = computeProviderMetrics(testProviders, 1, 0);
    expect(metrics[0].backlogRunway).toBe('5.00 yrs');
    expect(metrics[1].backlogRunway).toBe('2.00 yrs');
  });

  it('returns baseline risk when multiplier=1 and inflation=0', () => {
    const metrics = computeProviderMetrics(testProviders, 1, 0);
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.0);
    expect(metrics[1].dynamicRisk).toBeCloseTo(2.0);
    expect(metrics[0].strainDelta).toBeCloseTo(0);
    expect(metrics[0].rentDelta).toBeCloseTo(0);
  });

  it('increases risk with nvidia multiplier > 1', () => {
    const metrics = computeProviderMetrics(testProviders, 1.5, 0);
    // test-a: strainDelta = (0.5 * 80) / 100 = 0.4
    expect(metrics[0].strainDelta).toBeCloseTo(0.4);
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.4);
    // test-b: strainDelta = (0.5 * 50) / 100 = 0.25
    expect(metrics[1].strainDelta).toBeCloseTo(0.25);
    expect(metrics[1].dynamicRisk).toBeCloseTo(2.25);
  });

  it('increases risk with rent inflation > 0', () => {
    const metrics = computeProviderMetrics(testProviders, 1, 25);
    // test-a: rentDelta = (0.25 * 40) / 100 = 0.1
    expect(metrics[0].rentDelta).toBeCloseTo(0.1);
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.1);
    // test-b: rentDelta = (0.25 * 20) / 100 = 0.05
    expect(metrics[1].rentDelta).toBeCloseTo(0.05);
    expect(metrics[1].dynamicRisk).toBeCloseTo(2.05);
  });

  it('combines both strain and rent correctly', () => {
    const metrics = computeProviderMetrics(testProviders, 1.5, 25);
    // test-a: 1.0 + 0.4 + 0.1 = 1.5
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.5);
    // test-b: 2.0 + 0.25 + 0.05 = 2.3
    expect(metrics[1].dynamicRisk).toBeCloseTo(2.3);
  });

  it('handles maximum strain (multiplier=2)', () => {
    const metrics = computeProviderMetrics(testProviders, 2, 0);
    // test-a: strainDelta = (1 * 80) / 100 = 0.8
    expect(metrics[0].strainDelta).toBeCloseTo(0.8);
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.8);
  });

  it('handles maximum rent inflation (50%)', () => {
    const metrics = computeProviderMetrics(testProviders, 1, 50);
    // test-a: rentDelta = (0.5 * 40) / 100 = 0.2
    expect(metrics[0].rentDelta).toBeCloseTo(0.2);
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.2);
  });

  it('works with actual PROVIDERS data at baseline', () => {
    const metrics = computeProviderMetrics(PROVIDERS, 1, 0);
    expect(metrics).toHaveLength(3);
    expect(metrics[0].dynamicRisk).toBeCloseTo(1.2); // GCP baseline
    expect(metrics[1].dynamicRisk).toBeCloseTo(2.1); // Azure baseline
    expect(metrics[2].dynamicRisk).toBeCloseTo(2.6); // AWS baseline
  });
});

describe('findHighestRiskId', () => {
  it('returns the id of the provider with the highest dynamic risk', () => {
    const metrics = [
      { id: 'a', dynamicRisk: 1.5 },
      { id: 'b', dynamicRisk: 3.0 },
      { id: 'c', dynamicRisk: 2.0 },
    ];
    expect(findHighestRiskId(metrics)).toBe('b');
  });

  it('returns first provider when all risks are equal', () => {
    const metrics = [
      { id: 'x', dynamicRisk: 2.0 },
      { id: 'y', dynamicRisk: 2.0 },
    ];
    expect(findHighestRiskId(metrics)).toBe('x');
  });

  it('works with single provider', () => {
    expect(findHighestRiskId([{ id: 'solo', dynamicRisk: 5 }])).toBe('solo');
  });

  it('identifies AWS as highest risk at baseline with real PROVIDERS', () => {
    const metrics = computeProviderMetrics(PROVIDERS, 1, 0);
    expect(findHighestRiskId(metrics)).toBe('aws');
  });
});
