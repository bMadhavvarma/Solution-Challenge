import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { BookOpen, Download, Home, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from './stores/authStore';
import { useCareerStore } from './stores/careerStore';

// Pages
import HomePage from './pages/HomePage';
import ContentPage from './pages/ContentPage';
import DownloadPage from './pages/DownloadPage';
import ChatPage from './pages/ChatPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loadUser } = useAuthStore();
  const { loadCareers } = useCareerStore();

  useEffect(() => {
    loadUser();
  }, []); // Only run once on mount

  useEffect(() => {
    if (user) {
      loadCareers();
    }
  }, [user, loadCareers]); // Only run when user changes

  // Protected Route wrapper component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/" className="font-bold text-xl">CareerAI</Link>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <NavLinks isAuthenticated={!!user} />
                {user ? (
                  <button
                    onClick={() => useAuthStore.getState().signOut()}
                    className="text-white hover:text-blue-200"
                  >
                    Sign Out
                  </button>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link to="/signin" className="text-white hover:text-blue-200">Sign In</Link>
                    <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50">
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
              <NavLinks mobile isAuthenticated={!!user} />
              {user ? (
                <button
                  onClick={() => useAuthStore.getState().signOut()}
                  className="block w-full text-left px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-3 py-2 text-white hover:bg-blue-700 rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 bg-white text-blue-600 hover:bg-blue-50 rounded-md"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignInPage onSignIn={() => {}} />} />
            <Route path="/signup" element={<SignUpPage onSignIn={() => {}} />} />
            <Route
              path="/content"
              element={
                <ProtectedRoute>
                  <ContentPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download"
              element={
                <ProtectedRoute>
                  <DownloadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">CareerAI</h3>
                <p>Empowering your career journey with AI-driven insights and guidance.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
                  {user && (
                    <>
                      <li><Link to="/content" className="hover:text-blue-200">Content</Link></li>
                      <li><Link to="/download" className="hover:text-blue-200">Download</Link></li>
                      <li><Link to="/chat" className="hover:text-blue-200">Chat</Link></li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <p>support@careerai.com</p>
                <p>1-800-CAREER-AI</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-500 text-center">
              <p>&copy; 2024 CareerAI. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function NavLinks({ mobile = false, isAuthenticated = false }) {
  const links = [
    { to: "/", icon: <Home size={20} />, text: "Home", protected: false },
    { to: "/content", icon: <BookOpen size={20} />, text: "Content", protected: true },
    { to: "/download", icon: <Download size={20} />, text: "Download", protected: true },
    { to: "/chat", icon: <MessageSquare size={20} />, text: "Chat", protected: true },
  ];

  const filteredLinks = links.filter(link => !link.protected || isAuthenticated);

  return filteredLinks.map((link) => (
    <Link
      key={link.to}
      to={link.to}
      className={`flex items-center space-x-2 ${
        mobile
          ? 'block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700'
          : 'hover:text-blue-200'
      }`}
    >
      {link.icon}
      <span>{link.text}</span>
    </Link>
  ));
}

export default App;