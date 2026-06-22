import { useMemo, useState } from 'react';

const PROVIDERS = [
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

const Q1_2026_LABEL = 'Q1 2026 baseline';

function formatRunwayYears(rpo, revenueRunRate) {
  if (!revenueRunRate) return '—';
  return `${(rpo / revenueRunRate).toFixed(2)} yrs`;
}

function formatRiskScore(score) {
  if (!Number.isFinite(score)) return '—';
  return score.toFixed(2);
}

function riskBand(score) {
  if (score < 2) return { label: 'Moderate', className: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30' };
  if (score < 3) return { label: 'Elevated', className: 'bg-amber-500/15 text-amber-200 ring-amber-500/30' };
  return { label: 'High', className: 'bg-rose-500/15 text-rose-200 ring-rose-500/30' };
}

function SliderControl({ id, label, hint, min, max, step, value, displayValue, onChange }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <label htmlFor={id} className="text-sm font-semibold text-white">
            {label}
          </label>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-slate-400">{hint}</p>
        </div>
        <span className="shrink-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 font-mono text-sm font-medium tabular-nums text-emerald-300">
          {displayValue}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const parsed = Number(e.target.value);
          if (Number.isFinite(parsed)) onChange(parsed);
        }}
        className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-500"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
      <div className="mt-1 flex justify-between font-mono text-[10px] uppercase tracking-wider text-slate-500">
        <span>{min === 1 ? '1.0×' : `${min}%`}</span>
        <span>{max === 2 ? '2.0×' : `${max}%`}</span>
      </div>
    </div>
  );
}

function ProviderCard({ provider, metrics, isHighestRisk }) {
  const band = riskBand(metrics.dynamicRisk);

  return (
    <article
      className={`flex flex-col rounded-2xl border p-5 shadow-lg shadow-slate-950/30 transition-colors sm:p-6 ${
        provider.accent
      } ${isHighestRisk ? 'ring-2 ring-emerald-500/50' : 'border-slate-800/90'}`}
      aria-label={`${provider.shortName} risk metrics`}
    >
      <header className="flex items-start justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{Q1_2026_LABEL}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{provider.shortName}</h3>
          <p className="text-xs text-slate-400">{provider.name}</p>
        </div>
        {isHighestRisk && (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-300 ring-1 ring-emerald-500/40">
            Highest strain
          </span>
        )}
      </header>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2.5">
          <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Run-rate</dt>
          <dd className={`mt-0.5 font-mono font-semibold tabular-nums ${provider.metricAccent}`}>
            ${provider.revenueRunRate}B
          </dd>
        </div>
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2.5">
          <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-500">RPO</dt>
          <dd className={`mt-0.5 font-mono font-semibold tabular-nums ${provider.metricAccent}`}>
            ${provider.rpo}B
          </dd>
        </div>
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2.5">
          <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Custom silicon</dt>
          <dd className="mt-0.5 font-mono font-semibold tabular-nums text-white">{provider.customSilicon}%</dd>
        </div>
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/50 px-3 py-2.5">
          <dt className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Owned infra</dt>
          <dd className="mt-0.5 font-mono font-semibold tabular-nums text-white">{provider.ownedInfra}%</dd>
        </div>
      </dl>

      <div className="mt-5 grid gap-3">
        <div
          className={`rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 ${
            isHighestRisk ? 'border-emerald-500/30' : ''
          }`}
        >
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Backlog runway</p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums tracking-tight text-white">
            {metrics.backlogRunway}
          </p>
          <p className="mt-0.5 text-xs text-slate-500">RPO ÷ revenue run-rate</p>
        </div>

        <div
          className={`rounded-xl border px-4 py-3 ${
            isHighestRisk ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800 bg-slate-950/60'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Dynamic risk score</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${band.className}`}>
              {band.label}
            </span>
          </div>
          <p className="mt-1 font-mono text-3xl font-semibold tabular-nums tracking-tight text-white">
            {formatRiskScore(metrics.dynamicRisk)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Baseline {formatRiskScore(provider.baselineRisk)}
            {metrics.strainDelta > 0 || metrics.rentDelta > 0 ? (
              <>
                {' '}
                · +{formatRiskScore(metrics.strainDelta)} strain · +{formatRiskScore(metrics.rentDelta)} rent
              </>
            ) : (
              ' · scenario neutral'
            )}
          </p>
        </div>
      </div>

      <p className="mt-4 text-[11px] leading-relaxed text-slate-500">
        Leased infra exposure: {100 - provider.ownedInfra}% · Third-party silicon exposure:{' '}
        {100 - provider.customSilicon}%
      </p>
    </article>
  );
}

export default function CloudRiskCalculator() {
  const [nvidiaMultiplier, setNvidiaMultiplier] = useState(1);
  const [rentInflationPercent, setRentInflationPercent] = useState(0);

  const providerMetrics = useMemo(() => {
    return PROVIDERS.map((provider) => {
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
  }, [nvidiaMultiplier, rentInflationPercent]);

  const highestRiskId = useMemo(() => {
    if (providerMetrics.length === 0) return null;
    return providerMetrics.reduce((max, current) =>
      current.dynamicRisk > max.dynamicRisk ? current : max
    ).id;
  }, [providerMetrics]);

  return (
    <section
      className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/40 p-5 shadow-xl shadow-slate-950/50 sm:p-8"
      aria-labelledby="cloud-risk-calculator-heading"
    >
      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Scenario lab</p>
        <h2
          id="cloud-risk-calculator-heading"
          className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          Big Three cloud risk calculator
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Model backlog runway and dynamic risk for GCP, Azure, and AWS using Q1 2026 baseline inputs. Adjust supply
          and rent stressors to see disproportionate impact on providers with lower custom silicon share or higher
          leased infrastructure exposure.
        </p>
      </header>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <SliderControl
          id="nvidia-supply-strain"
          label="Nvidia supply strain"
          hint="Multiplier on third-party silicon dependency. Values above 1.0× weigh (100 − custom silicon %) more heavily—Azure and AWS move faster than GCP."
          min={1}
          max={2}
          step={0.05}
          value={nvidiaMultiplier}
          displayValue={`${nvidiaMultiplier.toFixed(2)}×`}
          onChange={setNvidiaMultiplier}
        />
        <SliderControl
          id="infra-rent-inflation"
          label="Infrastructure rent inflation"
          hint="Lease cost stress from 0% to 50%. Higher values add risk via (100 − owned infra %)—Azure (55% leased) and AWS (45% leased) are most sensitive."
          min={0}
          max={50}
          step={1}
          value={rentInflationPercent}
          displayValue={`${rentInflationPercent}%`}
          onChange={setRentInflationPercent}
        />
      </div>

      <div className="mt-6 rounded-xl border border-slate-800/80 bg-slate-950/50 px-4 py-3 font-mono text-[11px] leading-relaxed text-slate-500 sm:text-xs">
        <span className="text-slate-400">Formula · </span>
        Backlog runway = RPO ÷ run-rate · Dynamic risk = baseline + (strain factor × (100 − custom silicon %)) +
        (rent factor × (100 − owned infra %)), where strain factor = multiplier − 1 and rent factor = inflation % ÷
        100; contributions scaled ÷ 100 for readable scores.
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PROVIDERS.map((provider) => {
          const metrics = providerMetrics.find((m) => m.id === provider.id);
          if (!metrics) {
            console.error(`Missing metrics for provider: ${provider.id}`);
            return null;
          }
          return (
            <ProviderCard
              key={provider.id}
              provider={provider}
              metrics={metrics}
              isHighestRisk={provider.id === highestRiskId}
            />
          );
        })}
      </div>
    </section>
  );
}
