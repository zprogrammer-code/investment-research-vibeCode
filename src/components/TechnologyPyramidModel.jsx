const LAYERS = [
  {
    level: 5,
    widthClass: 'w-[42%] sm:w-[38%]',
    companies: ['Tesla (USA)', 'Alphabet (USA)', 'Palantir (USA)'],
    label: 'LAYER 5: Sovereign Automation',
    labelDetail: 'Full-stack autonomy, defense AI, and sovereign intelligence platforms.',
    bottleneck: 'Autonomy Stack Integration',
    bottleneckDetail:
      'Vertically integrated self-driving, geospatial AI, and classified analytics require rare cross-domain engineering — replacement cycles exceed a decade.',
    accent: 'border-emerald-500/40 bg-emerald-950/30',
    textAccent: 'text-emerald-300',
  },
  {
    level: 4,
    widthClass: 'w-[54%] sm:w-[50%]',
    companies: ['Microsoft (USA)', 'Apple (USA)', 'Alphabet (USA)'],
    label: 'LAYER 4: Intelligent Platforms',
    labelDetail: 'Operating systems, cloud suites, and consumer hardware ecosystems.',
    bottleneck: 'Ecosystem Lock-In',
    bottleneckDetail:
      'OS, app-store, and productivity moats create multi-year switching costs — hardware refreshes cannot displace installed software gravity.',
    accent: 'border-teal-500/35 bg-teal-950/25',
    textAccent: 'text-teal-300',
  },
  {
    level: 3,
    widthClass: 'w-[66%] sm:w-[62%]',
    companies: ['Amazon (USA)', 'Lockheed Martin (USA)', 'SpaceX (USA)'],
    label: 'LAYER 3: Strategic Infrastructure',
    labelDetail: 'Hyperscale cloud, defense primes, and orbital launch capacity.',
    bottleneck: 'Orbital & Cloud Capacity',
    bottleneckDetail:
      'Launch cadence, regional datacenter scarcity, and classified contract backlogs constrain how fast strategic workloads can scale.',
    accent: 'border-cyan-500/35 bg-cyan-950/25',
    textAccent: 'text-cyan-300',
  },
  {
    level: 2,
    widthClass: 'w-[78%] sm:w-[74%]',
    companies: ['Nvidia (USA)', 'ARM (UK)', 'Samsung (SK) / AMD (USA)'],
    label: 'LAYER 2: Advanced Compute Silicon',
    labelDetail: 'GPU accelerators, IP licensing, and advanced logic design.',
    bottleneck: 'High-Bandwidth Memory (HBM)',
    bottleneckDetail:
      'HBM stacking, CoWoS packaging, and interposer yield cap accelerator throughput — memory bandwidth is the binding constraint on AI training clusters.',
    accent: 'border-sky-500/35 bg-sky-950/25',
    textAccent: 'text-sky-300',
  },
  {
    level: 1,
    widthClass: 'w-[90%] sm:w-[86%]',
    companies: ['TSMC (Taiwan)', 'ASML (Netherlands)', 'Tokyo Electron (JP) / Intel (USA)'],
    label: 'LAYER 1: Manufacturing & Lithography',
    labelDetail: 'Leading-edge fabs, EUV tools, and process equipment.',
    bottleneck: 'EUV Lithography Exposure',
    bottleneckDetail:
      "ASML's EUV monopoly and sub-5 nm fab concentration in Taiwan create a single-point failure surface for the entire stack above.",
    accent: 'border-amber-500/40 bg-amber-950/25',
    textAccent: 'text-amber-300',
  },
];

const CHIPS_GOALS = [
  {
    intro: 'Onshore leading-edge fabrication to reduce foreign dependency on critical logic and memory nodes.',
    quote:
      'The Act allocates $52.7B in CHIPS incentives to expand domestic fab construction, aiming to raise U.S. share of advanced semiconductor manufacturing from near-single digits toward a resilient baseline.',
  },
  {
    intro: 'Accelerate R&D and workforce pipelines so the U.S. can design and produce the next process nodes domestically.',
    quote:
      'A $11B R&D and workforce fund supports the National Semiconductor Technology Center, advanced packaging programs, and university partnerships to close the talent and innovation gap.',
  },
  {
    intro: 'Secure allied supply chains and guard against adversarial technology transfer or disruption.',
    quote:
      'Guardrails on recipients of federal funds restrict expansion of leading-edge capacity in countries of concern, while friend-shoring initiatives deepen cooperation with partners such as Japan, Netherlands, and South Korea.',
  },
  {
    intro: 'Align semiconductor policy with national security, economic competitiveness, and long-horizon strategic autonomy.',
    quote:
      'By linking CHIPS funding to defense-adjacent applications, export controls, and science-agency authorizations, the Act treats semiconductors as foundational infrastructure for both military readiness and civilian economic growth.',
  },
];

function PyramidLayer({ layer, isBase }) {
  return (
    <div className={`mx-auto ${layer.widthClass}`}>
      <div
        className={`border-l border-r border-slate-600/80 px-3 py-4 text-center sm:px-5 sm:py-5 ${layer.accent} ${
          isBase ? 'rounded-b-lg border-b' : 'border-b border-slate-600/80'
        }`}
      >
        <ul className="space-y-1">
          {layer.companies.map((company) => (
            <li key={company} className="text-xs font-semibold leading-snug text-white sm:text-sm">
              {company}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SideLabel({ layer }) {
  return (
    <div className="flex min-h-[5.5rem] flex-col justify-center py-2 sm:min-h-[6.25rem]">
      <p className={`text-xs font-bold uppercase tracking-wide ${layer.textAccent} sm:text-sm`}>
        {layer.label}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">{layer.labelDetail}</p>
    </div>
  );
}

function BottleneckBlock({ layer }) {
  return (
    <div className="flex min-h-[5.5rem] flex-col justify-center py-2 sm:min-h-[6.25rem]">
      <p className="text-xs font-bold text-white sm:text-sm">
        <span className="text-slate-500">Layer {layer.level}: </span>
        {layer.bottleneck}
      </p>
      <p className="mt-1 text-xs leading-relaxed text-neutral-400 sm:text-sm">{layer.bottleneckDetail}</p>
    </div>
  );
}

export default function TechnologyPyramidModel() {
  return (
    <section
      className="mt-12 w-full rounded-2xl border border-slate-800 bg-slate-900/40 p-4 shadow-xl shadow-slate-950/50 sm:p-6 lg:p-8"
      aria-labelledby="tech-pyramid-heading"
    >
      <header className="max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-widest text-emerald-400">Value stack model</p>
        <h2
          id="tech-pyramid-heading"
          className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          Structural Technology Value Stack (1950–Present)
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400">
          Five structural layers from manufacturing foundations to sovereign automation — with hardware bottlenecks
          and structural risk increasing toward the base.
        </p>
      </header>

      {/* Desktop / tablet: synced grid layout */}
      <div className="mt-8 hidden lg:grid lg:grid-cols-[4.5rem_minmax(0,1fr)_minmax(0,1.15fr)_minmax(0,1fr)] lg:grid-rows-[auto_repeat(5,minmax(5.5rem,1fr))] lg:gap-x-4">
        {/* Header row — bottleneck column title */}
        <div aria-hidden />
        <p className="pb-3 text-sm font-bold uppercase tracking-wide text-white">Bottlenecks</p>
        <div aria-hidden />
        <div aria-hidden />

        {/* Risk arrow — spans all layer rows */}
        <div className="col-start-1 row-start-2 row-span-5 flex flex-col items-center py-2">
          <p className="mb-2 max-w-[4rem] text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-emerald-400">
            Lowest Structural Risk
          </p>
          <div className="relative flex flex-1 flex-col items-center">
            <div className="absolute inset-y-3 w-1 rounded-full bg-gradient-to-b from-emerald-500/80 via-slate-500/60 to-rose-500/80" />
            <div className="absolute top-0 h-0 w-0 border-x-[7px] border-b-[10px] border-x-transparent border-b-emerald-400" />
            <div className="absolute bottom-0 h-0 w-0 border-x-[7px] border-t-[10px] border-x-transparent border-t-rose-400" />
          </div>
          <p className="mt-2 max-w-[4rem] text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-rose-400">
            Highest Structural Risk
          </p>
        </div>

        {/* Per-layer synced rows */}
        {LAYERS.map((layer, index) => (
          <div key={layer.level} className="contents">
            <div className="col-start-2" style={{ gridRow: index + 2 }}>
              <BottleneckBlock layer={layer} />
            </div>
            <div className="col-start-3 self-center" style={{ gridRow: index + 2 }}>
              <PyramidLayer layer={layer} isBase={index === LAYERS.length - 1} />
            </div>
            <div className="col-start-4" style={{ gridRow: index + 2 }}>
              <SideLabel layer={layer} />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile / small tablet: stacked layout */}
      <div className="mt-8 space-y-6 lg:hidden">
        <div className="flex items-stretch gap-3 rounded-xl border border-slate-800 bg-slate-950/50 p-4">
          <div className="flex w-10 shrink-0 flex-col items-center">
            <p className="text-center text-[9px] font-bold uppercase leading-tight text-emerald-400">Low risk</p>
            <div className="relative my-2 flex flex-1 flex-col items-center">
              <div className="absolute inset-y-1 w-1 rounded-full bg-gradient-to-b from-emerald-500/80 to-rose-500/80" />
              <div className="absolute top-0 h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-emerald-400" />
              <div className="absolute bottom-0 h-0 w-0 border-x-[5px] border-t-[8px] border-x-transparent border-t-rose-400" />
            </div>
            <p className="text-center text-[9px] font-bold uppercase leading-tight text-rose-400">High risk</p>
          </div>
          <p className="text-xs leading-relaxed text-neutral-400">
            Structural risk increases toward the manufacturing base — apex layers iterate faster; foundation layers
            require capital-intensive, multi-year replacement cycles.
          </p>
        </div>

        <p className="text-sm font-bold uppercase tracking-wide text-white">Bottlenecks</p>

        {LAYERS.map((layer, index) => (
          <article
            key={layer.level}
            className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40"
          >
            <div className={`border-b border-slate-800 px-4 py-3 ${layer.accent}`}>
              <p className={`text-xs font-bold uppercase tracking-wide ${layer.textAccent}`}>{layer.label}</p>
            </div>
            <div className="space-y-4 px-4 py-4">
              <ul className="space-y-1 text-center">
                {layer.companies.map((company) => (
                  <li key={company} className="text-sm font-semibold text-white">
                    {company}
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-800/80 pt-3">
                <p className="text-xs font-bold text-white">
                  <span className="text-slate-500">Bottleneck · </span>
                  {layer.bottleneck}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-neutral-400">{layer.bottleneckDetail}</p>
              </div>
              {index < LAYERS.length - 1 && (
                <div className="mx-auto h-0 w-0 border-x-[12px] border-t-[8px] border-x-transparent border-t-slate-700" />
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Footer — CHIPS and Science Act */}
      <footer className="mt-10 rounded-2xl border border-slate-800 bg-slate-950/60 p-5 sm:p-6">
        <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
          Foundations of Security: Main Goals of the CHIPS and Science Act
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Enacted in August 2022, the CHIPS and Science Act treats semiconductors as strategic infrastructure —
          coupling manufacturing incentives with R&D authorizations to rebuild U.S. resilience across the value stack
          illustrated above. Its core objectives:
        </p>
        <ul className="mt-5 space-y-5">
          {CHIPS_GOALS.map((goal, index) => (
            <li key={index} className="text-sm text-slate-300">
              <p className="font-medium text-slate-200">{goal.intro}</p>
              <blockquote className="mt-2 border-l-2 border-emerald-500/50 pl-4 text-sm italic leading-relaxed text-neutral-400">
                {goal.quote}
              </blockquote>
            </li>
          ))}
        </ul>
      </footer>
    </section>
  );
}
