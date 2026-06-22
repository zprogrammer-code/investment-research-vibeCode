import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import CloudRiskCalculator from './CloudRiskCalculator.jsx';

describe('CloudRiskCalculator', () => {
  it('renders the section heading', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('Big Three cloud risk calculator')).toBeInTheDocument();
  });

  it('renders the scenario lab label', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('Scenario lab')).toBeInTheDocument();
  });

  it('renders all three provider cards', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('GCP')).toBeInTheDocument();
    expect(screen.getByText('Azure')).toBeInTheDocument();
    expect(screen.getByText('AWS')).toBeInTheDocument();
  });

  it('renders full provider names', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('Google Cloud')).toBeInTheDocument();
    expect(screen.getByText('Microsoft Azure')).toBeInTheDocument();
    expect(screen.getByText('Amazon Web Services')).toBeInTheDocument();
  });

  it('renders nvidia supply strain slider', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByLabelText('Nvidia supply strain')).toBeInTheDocument();
  });

  it('renders infrastructure rent inflation slider', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByLabelText('Infrastructure rent inflation')).toBeInTheDocument();
  });

  it('renders the formula description', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText(/Backlog runway = RPO/)).toBeInTheDocument();
  });

  it('displays backlog runway for each provider', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('5.74 yrs')).toBeInTheDocument(); // GCP
    expect(screen.getByText('3.17 yrs')).toBeInTheDocument(); // Azure
    expect(screen.getByText('2.42 yrs')).toBeInTheDocument(); // AWS
  });

  it('displays baseline risk scores at default slider values', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('1.20')).toBeInTheDocument(); // GCP
    expect(screen.getByText('2.10')).toBeInTheDocument(); // Azure
    expect(screen.getByText('2.60')).toBeInTheDocument(); // AWS
  });

  it('shows "Highest strain" badge on AWS (highest baseline risk)', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('Highest strain')).toBeInTheDocument();
  });

  it('renders Q1 2026 baseline labels', () => {
    render(<CloudRiskCalculator />);
    const labels = screen.getAllByText('Q1 2026 baseline');
    expect(labels).toHaveLength(3);
  });

  it('displays default slider display values', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('1.00\u00d7')).toBeInTheDocument(); // nvidia multiplier
    const zeroPercents = screen.getAllByText('0%');
    expect(zeroPercents.length).toBeGreaterThanOrEqual(1); // rent inflation display + slider min
  });

  it('renders run-rate values for all providers', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('$80.1B')).toBeInTheDocument();
    expect(screen.getByText('$123.6B')).toBeInTheDocument();
    expect(screen.getByText('$150.4B')).toBeInTheDocument();
  });

  it('renders RPO values for all providers', () => {
    render(<CloudRiskCalculator />);
    expect(screen.getByText('$460B')).toBeInTheDocument();
    expect(screen.getByText('$392B')).toBeInTheDocument();
    expect(screen.getByText('$364B')).toBeInTheDocument();
  });

  it('has accessible aria-labelledby on the section', () => {
    render(<CloudRiskCalculator />);
    const section = screen.getByRole('region', { name: /cloud risk calculator/i });
    expect(section).toBeInTheDocument();
  });
});
