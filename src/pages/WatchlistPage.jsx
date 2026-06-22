import { Link } from 'react-router-dom';

export default function WatchlistPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/80 px-4 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-4">
          <Link
            to="/"
            className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm font-medium text-slate-200 transition hover:border-emerald-500/50 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            ← Home
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Watchlist
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Track tickers and key notes in one view. Add positions, price alerts, and thesis summaries here.
        </p>
      </main>
    </div>
  );
}
