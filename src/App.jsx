import { Navigate, Route, Routes } from 'react-router-dom';
import DocumentsPage from './pages/DocumentsPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ResearchProjectPage from './pages/ResearchProjectPage.jsx';
import ScenariosPage from './pages/ScenariosPage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/watchlist" element={<WatchlistPage />} />
      <Route path="/documents" element={<DocumentsPage />} />
      <Route path="/scenarios" element={<ScenariosPage />} />
      <Route path="/research/:projectId" element={<ResearchProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
