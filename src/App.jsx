import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Button, Badge, Navbar, Footer } from './components';
import { useTheme } from './contexts/ThemeContext';

// Import des pages
import HomePage from './pages/HomePage';
import AccompagnementsPage from './pages/AccompagnementsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PodcastPage from './pages/PodcastPage';
import ThemePage from './pages/ThemePage';

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const { currentTheme } = useTheme();
  
  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-base-300 sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Accueil</Link></li>
            <li><Link to="/qui-suis-je" className={location.pathname === '/qui-suis-je' ? 'active' : ''}>Qui suis-je ?</Link></li>
            <li><Link to="/accompagnements" className={location.pathname === '/accompagnements' ? 'active' : ''}>Accompagnements</Link></li>
            <li><Link to="/podcast" className={location.pathname === '/podcast' ? 'active' : ''}>Podcast</Link></li>
            <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
          </ul>
        </div>
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Caroline Bonnin
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link 
              to="/" 
              className={`${location.pathname === '/' ? 'active bg-primary text-primary-content' : ''} font-medium`}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link 
              to="/qui-suis-je" 
              className={`${location.pathname === '/qui-suis-je' ? 'active bg-primary text-primary-content' : ''} font-medium`}
            >
              Qui suis-je ?
            </Link>
          </li>
          <li>
            <Link 
              to="/accompagnements" 
              className={`${location.pathname === '/accompagnements' ? 'active bg-primary text-primary-content' : ''} font-medium`}
            >
              Accompagnements
            </Link>
          </li>
          <li>
            <Link 
              to="/podcast" 
              className={`${location.pathname === '/podcast' ? 'active bg-primary text-primary-content' : ''} font-medium`}
            >
              Podcast
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`${location.pathname === '/contact' ? 'active bg-primary text-primary-content' : ''} font-medium`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Actions */}
      <div className="navbar-end">
        <div className="hidden sm:flex items-center gap-2 mr-4">
          <Badge variant="ghost" className="text-xs">
            {currentTheme}
          </Badge>
          <Link to="/theme">
            <Button variant="ghost" size="sm">
              Thème
            </Button>
          </Link>
        </div>
        <Link to="/contact">
          <Button variant="primary" size="sm" className="hidden sm:flex">
            Premier entretien gratuit
          </Button>
          <Button variant="primary" size="sm" className="sm:hidden">
            Gratuit
          </Button>
        </Link>
      </div>
    </div>
  );
};

// Footer Component
const SiteFooter = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <div className="grid grid-flow-col gap-4">
        <Link to="/qui-suis-je" className="link link-hover">Qui suis-je ?</Link>
        <Link to="/accompagnements" className="link link-hover">Accompagnements</Link>
        <Link to="/podcast" className="link link-hover">Podcast</Link>
        <Link to="/contact" className="link link-hover">Contact</Link>
      </div>
      
      <div className="grid grid-flow-col gap-4">
        <a href="https://plancoeur.com" target="_blank" rel="noopener noreferrer" className="link link-hover">
          Agence PlanCœur
        </a>
        <span className="text-base-content/60">|</span>
        <span className="text-base-content/80">
          <strong>Coach en Intelligence Amoureuse</strong>
        </span>
        <span className="text-base-content/60">|</span>
        <span className="text-base-content/60">
          Formée par Florence Escaravage
        </span>
      </div>
      
      <div>
        <div className="grid grid-flow-col gap-4 mb-4">
          <a href="mailto:contact@caroline-coaching.fr" className="link link-hover">
            contact@caroline-coaching.fr
          </a>
          <span className="text-base-content/60">|</span>
          <span className="text-base-content/80">
            06 XX XX XX XX
          </span>
        </div>
        <p className="text-base-content/60">
          © 2024 Caroline Bonnin - Coaching en Intelligence Amoureuse | 
          <Link to="/mentions-legales" className="link link-hover ml-1">Mentions légales</Link>
        </p>
      </div>
    </footer>
  );
};

// App Component SANS Router
function App() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/qui-suis-je" element={<AboutPage />} />
          <Route path="/accompagnements" element={<AccompagnementsPage />} />
          <Route path="/podcast" element={<PodcastPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/theme" element={<ThemePage />} />
          {/* Redirections pour compatibilité */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<AccompagnementsPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
