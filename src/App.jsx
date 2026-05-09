export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:py-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-400">
              Portfolio workspace
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
              Investment research
            </h1>
            <p className="mt-2 max-w-xl text-sm text-slate-400 sm:text-base">
              React + Tailwind + Vite. Replace this shell with dashboards, filings, positions, or
              whatever you want to analyze.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              Vite 5
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              Tailwind v3
            </span>
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
              React 18
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="grid gap-6 md:grid-cols-3">
          {[
            { title: 'Watchlist', body: 'Track tickers and key notes in one view.' },
            { title: 'Documents', body: 'Link 10-Ks, transcripts, and your highlights.' },
            { title: 'Scenarios', body: 'Model cases and assumptions over time.' },
          ].map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/40"
            >
              <h2 className="text-lg font-semibold text-white">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{card.body}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
