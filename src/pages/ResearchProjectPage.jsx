import { useParams } from 'react-router-dom';
import CloudRiskCalculator from '../components/CloudRiskCalculator.jsx';
import PageLayout from '../components/PageLayout.jsx';
import PageTitle from '../components/PageTitle.jsx';
import researchProjects from '../data/researchProjects.js';

const TITLES = Object.fromEntries(researchProjects.map((p) => [p.id, p.label]));

export default function ResearchProjectPage() {
  const { projectId } = useParams();
  const title = TITLES[projectId] ?? 'Research project';

  return (
    <PageLayout>
      <PageTitle title={title} />
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
    </PageLayout>
  );
}
