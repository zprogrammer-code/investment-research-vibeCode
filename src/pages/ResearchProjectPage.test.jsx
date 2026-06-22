import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ResearchProjectPage from './ResearchProjectPage.jsx';

function renderWithRoute(projectId) {
  return render(
    <MemoryRouter initialEntries={[`/research/${projectId}`]}>
      <Routes>
        <Route path="/research/:projectId" element={<ResearchProjectPage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ResearchProjectPage', () => {
  it('renders data-processing project with CloudRiskCalculator', () => {
    renderWithRoute('data-processing');
    expect(
      screen.getByRole('heading', { name: /AI, Data Processing and Cloud Computing/i })
    ).toBeInTheDocument();
    expect(screen.getByText('Big Three cloud risk calculator')).toBeInTheDocument();
  });

  it('renders crypto-currencies project title', () => {
    renderWithRoute('crypto-currencies');
    expect(
      screen.getByRole('heading', { name: /Crypto Currencies/i })
    ).toBeInTheDocument();
  });

  it('renders mag7 project title', () => {
    renderWithRoute('mag7-nasdaq-sp500');
    expect(
      screen.getByRole('heading', { name: /Magnificent 7/i })
    ).toBeInTheDocument();
  });

  it('renders FSD project title', () => {
    renderWithRoute('fsd-vehicles-robotics');
    expect(
      screen.getByRole('heading', { name: /FSD Vehicles and Robotics/i })
    ).toBeInTheDocument();
  });

  it('renders fallback title for unknown projectId', () => {
    renderWithRoute('nonexistent');
    expect(
      screen.getByRole('heading', { name: /Research project/i })
    ).toBeInTheDocument();
  });

  it('shows placeholder text for non-data-processing projects', () => {
    renderWithRoute('crypto-currencies');
    expect(
      screen.getByText(/This is a placeholder route/)
    ).toBeInTheDocument();
  });

  it('does NOT show placeholder text for data-processing project', () => {
    renderWithRoute('data-processing');
    expect(
      screen.queryByText(/This is a placeholder route/)
    ).not.toBeInTheDocument();
  });

  it('shows cloud description for data-processing project', () => {
    renderWithRoute('data-processing');
    expect(
      screen.getByText(/Cloud infrastructure, AI workloads/)
    ).toBeInTheDocument();
  });

  it('renders home link', () => {
    renderWithRoute('data-processing');
    expect(screen.getByText('← Home')).toBeInTheDocument();
  });
});
