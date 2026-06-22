import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage.jsx';

function renderHomePage() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe('HomePage', () => {
  it('renders the main heading', () => {
    renderHomePage();
    expect(screen.getByRole('heading', { name: /investment research/i })).toBeInTheDocument();
  });

  it('renders the portfolio workspace label', () => {
    renderHomePage();
    expect(screen.getByText('Portfolio workspace')).toBeInTheDocument();
  });

  it('renders navigation cards for Watchlist, Documents, Scenarios', () => {
    renderHomePage();
    expect(screen.getByText('Watchlist')).toBeInTheDocument();
    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('Scenarios')).toBeInTheDocument();
  });

  it('renders card descriptions', () => {
    renderHomePage();
    expect(screen.getByText('Track tickers and key notes in one view.')).toBeInTheDocument();
    expect(screen.getByText('Link 10-Ks, transcripts, and your highlights.')).toBeInTheDocument();
    expect(screen.getByText('Model cases and assumptions over time.')).toBeInTheDocument();
  });

  it('renders navigation links with correct hrefs', () => {
    renderHomePage();
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/watchlist');
    expect(hrefs).toContain('/documents');
    expect(hrefs).toContain('/scenarios');
  });

  it('renders research projects heading', () => {
    renderHomePage();
    expect(screen.getByText('Research projects')).toBeInTheDocument();
  });

  it('renders all four research project tiles', () => {
    renderHomePage();
    expect(screen.getByText('AI, Data Processing and Cloud Computing')).toBeInTheDocument();
    expect(screen.getByText('Crypto Currencies')).toBeInTheDocument();
    expect(screen.getByText(/Magnificent 7/)).toBeInTheDocument();
    expect(screen.getByText('FSD Vehicles and Robotics')).toBeInTheDocument();
  });

  it('renders research project links to correct paths', () => {
    renderHomePage();
    const links = screen.getAllByRole('link');
    const hrefs = links.map((l) => l.getAttribute('href'));
    expect(hrefs).toContain('/research/data-processing');
    expect(hrefs).toContain('/research/crypto-currencies');
    expect(hrefs).toContain('/research/mag7-nasdaq-sp500');
    expect(hrefs).toContain('/research/fsd-vehicles-robotics');
  });

  it('renders tech badges', () => {
    renderHomePage();
    expect(screen.getByText('Vite 5')).toBeInTheDocument();
    expect(screen.getByText('Tailwind v3')).toBeInTheDocument();
    expect(screen.getByText('React 18')).toBeInTheDocument();
  });
});
