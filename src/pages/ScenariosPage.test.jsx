import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ScenariosPage from './ScenariosPage.jsx';

function renderPage() {
  return render(
    <MemoryRouter>
      <ScenariosPage />
    </MemoryRouter>
  );
}

describe('ScenariosPage', () => {
  it('renders the heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /scenarios/i })).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderPage();
    expect(screen.getByText(/Model cases and assumptions over time/)).toBeInTheDocument();
  });

  it('renders a home link', () => {
    renderPage();
    const link = screen.getByText('← Home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });

  it('embeds the TechnologyPyramidModel component', () => {
    renderPage();
    expect(
      screen.getByText('Structural Technology Value Stack (1950–Present)')
    ).toBeInTheDocument();
  });
});
