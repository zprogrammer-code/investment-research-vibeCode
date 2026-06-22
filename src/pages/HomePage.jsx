import { Link } from 'react-router-dom';
import researchProjects from '../data/researchProjects.js';

export default function HomePage() {
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
            { title: 'Watchlist', body: 'Track tickers and key notes in one view.', to: '/watchlist' },
            { title: 'Documents', body: 'Link 10-Ks, transcripts, and your highlights.', to: '/documents' },
            { title: 'Scenarios', body: 'Model cases and assumptions over time.', to: '/scenarios' },
          ].map((card) => (
            <Link
              key={card.title}
              to={card.to}
              className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-950/40 transition hover:border-emerald-500/40 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
            >
              <h2 className="text-lg font-semibold text-white group-hover:text-emerald-200">{card.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{card.body}</p>
            </Link>
          ))}
        </section>

        <section className="mt-12" aria-labelledby="research-projects-heading">
          <h2
            id="research-projects-heading"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
          >
            Research projects
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Each tile opens a dedicated workspace. Add your own cover image inside the frame.
          </p>
          <ul className="mt-6 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {researchProjects.map((project) => (
              <li key={project.id} className="min-w-0">
                <Link
                  to={`/research/${project.id}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-950/40 transition hover:border-emerald-500/40 hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
                    {/* Replace this block with <img className="h-full w-full object-cover" src="..." alt="" /> */}
                    <div
                      className="absolute inset-0 opacity-40 mix-blend-overlay"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 20% 20%, rgba(16, 185, 129, 0.25), transparent 45%), radial-gradient(circle at 80% 60%, rgba(59, 130, 246, 0.2), transparent 40%)',
                      }}
                      aria-hidden
                    />
                    <span className="absolute bottom-3 left-3 rounded-md bg-slate-950/70 px-2 py-1 text-xs font-medium text-emerald-300 backdrop-blur">
                      Open project
                    </span>
                  </div>
                  <div className="flex min-h-[6.5rem] flex-1 items-center justify-center border-t border-slate-800/80 px-3 py-4 text-center sm:min-h-[7rem]">
                    <span className="text-balance text-sm font-semibold leading-snug text-white group-hover:text-emerald-200 sm:text-base">
                      {project.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
