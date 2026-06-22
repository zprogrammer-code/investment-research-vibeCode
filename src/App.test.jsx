import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App from './App.jsx';

function renderWithRouter(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe('App routing', () => {
  it('renders HomePage at /', () => {
    renderWithRouter(['/']);
    expect(screen.getByText('Investment research')).toBeInTheDocument();
  });

  it('renders WatchlistPage at /watchlist', () => {
    renderWithRouter(['/watchlist']);
    expect(screen.getByRole('heading', { name: /watchlist/i })).toBeInTheDocument();
  });

  it('renders DocumentsPage at /documents', () => {
    renderWithRouter(['/documents']);
    expect(screen.getByRole('heading', { name: /documents/i })).toBeInTheDocument();
  });

  it('renders ScenariosPage at /scenarios', () => {
    renderWithRouter(['/scenarios']);
    expect(screen.getByRole('heading', { name: /scenarios/i })).toBeInTheDocument();
  });

  it('renders ResearchProjectPage at /research/:projectId', () => {
    renderWithRouter(['/research/data-processing']);
    expect(
      screen.getByRole('heading', { name: /AI, Data Processing and Cloud Computing/i })
    ).toBeInTheDocument();
  });

  it('redirects unknown routes to /', () => {
    renderWithRouter(['/unknown-route']);
    expect(screen.getByText('Investment research')).toBeInTheDocument();
  });

  it('renders fallback title for unknown project IDs', () => {
    renderWithRouter(['/research/unknown-project']);
    expect(screen.getByRole('heading', { name: /research project/i })).toBeInTheDocument();
  });
});
