export const PROVIDERS = [
  {
    id: 'gcp',
    name: 'Google Cloud',
    shortName: 'GCP',
    accent: 'border-sky-500/30 bg-sky-950/20',
    metricAccent: 'text-sky-300',
    revenueRunRate: 80.1,
    rpo: 460.0,
    customSilicon: 24,
    ownedInfra: 75,
    baselineRisk: 1.2,
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    shortName: 'Azure',
    accent: 'border-cyan-500/30 bg-cyan-950/20',
    metricAccent: 'text-cyan-300',
    revenueRunRate: 123.6,
    rpo: 392.0,
    customSilicon: 4,
    ownedInfra: 45,
    baselineRisk: 2.1,
  },
  {
    id: 'aws',
    name: 'Amazon Web Services',
    shortName: 'AWS',
    accent: 'border-amber-500/30 bg-amber-950/20',
    metricAccent: 'text-amber-300',
    revenueRunRate: 150.4,
    rpo: 364.0,
    customSilicon: 14,
    ownedInfra: 55,
    baselineRisk: 2.6,
  },
];

export function formatRunwayYears(rpo, revenueRunRate) {
  if (!revenueRunRate) return '—';
  return `${(rpo / revenueRunRate).toFixed(2)} yrs`;
}

export function formatRiskScore(score) {
  return score.toFixed(2);
}

export function riskBand(score) {
  if (score < 2) return { label: 'Moderate', className: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30' };
  if (score < 3) return { label: 'Elevated', className: 'bg-amber-500/15 text-amber-200 ring-amber-500/30' };
  return { label: 'High', className: 'bg-rose-500/15 text-rose-200 ring-rose-500/30' };
}

export function computeProviderMetrics(providers, nvidiaMultiplier, rentInflationPercent) {
  return providers.map((provider) => {
    const nvidiaStrainFactor = nvidiaMultiplier - 1;
    const rentInflationFactor = rentInflationPercent / 100;
    const thirdPartySiliconExposure = 100 - provider.customSilicon;
    const leasedInfraExposure = 100 - provider.ownedInfra;
    const strainDelta = (nvidiaStrainFactor * thirdPartySiliconExposure) / 100;
    const rentDelta = (rentInflationFactor * leasedInfraExposure) / 100;
    const dynamicRisk = provider.baselineRisk + strainDelta + rentDelta;

    return {
      id: provider.id,
      backlogRunway: formatRunwayYears(provider.rpo, provider.revenueRunRate),
      dynamicRisk,
      strainDelta,
      rentDelta,
    };
  });
}

export function findHighestRiskId(providerMetrics) {
  return providerMetrics.reduce((max, current) =>
    current.dynamicRisk > max.dynamicRisk ? current : max
  ).id;
}
