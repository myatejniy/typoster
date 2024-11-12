import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import PosterCard from './components/PosterCard';
import PosterPage from './components/PosterPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { PosterProvider, usePosters } from './context/PosterContext';

function Gallery() {
  const { posters, handleLike } = usePosters();

  const handleBuy = (posterId: number) => {
    const poster = posters.find(p => p.id === posterId);
    if (poster) {
      window.open(poster.buyLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Daily Posters</h1>
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">A curated collection of beautiful artwork</p>
              <span className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
                {posters.length} Posters
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="mailto:contact@dailyposters.com"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <Mail size={20} />
              Contact Artist
            </a>
            <Link
              to="/admin/login"
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Admin Login
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posters.map(poster => (
            <Link key={poster.id} to={`/poster/${poster.id}`}>
              <PosterCard
                {...poster}
                onLike={(e) => {
                  e.preventDefault();
                  handleLike(poster.id);
                }}
                onBuy={(e) => {
                  e.preventDefault();
                  handleBuy(poster.id);
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PosterProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Gallery />} />
            <Route path="/poster/:id" element={<PosterPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </PosterProvider>
    </AuthProvider>
  );
}

export default App;