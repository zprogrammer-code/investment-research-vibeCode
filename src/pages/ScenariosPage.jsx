import PageLayout from '../components/PageLayout.jsx';
import PageTitle from '../components/PageTitle.jsx';
import TechnologyPyramidModel from '../components/TechnologyPyramidModel.jsx';

export default function ScenariosPage() {
  return (
    <PageLayout>
      <PageTitle
        title="Scenarios"
        description="Model cases and assumptions over time — structural bottlenecks, layer dependencies, and policy responses across the technology value stack."
      />
      <TechnologyPyramidModel />
    </PageLayout>
  );
}
