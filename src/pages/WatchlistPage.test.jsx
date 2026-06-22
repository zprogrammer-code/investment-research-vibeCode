import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import WatchlistPage from './WatchlistPage.jsx';

function renderPage() {
  return render(
    <MemoryRouter>
      <WatchlistPage />
    </MemoryRouter>
  );
}

describe('WatchlistPage', () => {
  it('renders the heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: /watchlist/i })).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderPage();
    expect(screen.getByText(/Track tickers and key notes/)).toBeInTheDocument();
  });

  it('renders a home link', () => {
    renderPage();
    const link = screen.getByText('← Home');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', '/');
  });
});
