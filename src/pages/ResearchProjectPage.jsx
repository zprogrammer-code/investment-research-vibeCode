import { Link, useParams } from 'react-router-dom';
import CloudRiskCalculator from '../components/CloudRiskCalculator.jsx';

const TITLES = {
  'data-processing': 'AI, Data Processing and Cloud Computing',
  'crypto-currencies': 'Crypto Currencies',
  'mag7-nasdaq-sp500': 'The Magnificent 7, and the nasdaq 100 and S&P 500',
  'fsd-vehicles-robotics': 'FSD Vehicles and Robotics',
};

export default function ResearchProjectPage() {
  const { projectId } = useParams();
  const title = TITLES[projectId] ?? 'Research project';

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
          {title}
        </h1>
        {projectId === 'data-processing' ? (
          <>
            <p className="mt-4 max-w-2xl text-slate-400">
              Cloud infrastructure, AI workloads, and hyperscaler economics — model backlog runway and
              supply-chain risk across the Big Three.
            </p>
            <CloudRiskCalculator />
          </>
        ) : (
          <p className="mt-4 max-w-2xl text-slate-400">
            This is a placeholder route for your research content. Add charts, notes, or embeds here.
          </p>
        )}
      </main>
    </div>
  );
}
