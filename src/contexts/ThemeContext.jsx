import { createContext, useContext, useState, useEffect } from 'react';

// Tous les thèmes officiels DaisyUI
const AVAILABLE_THEMES = [
  'light',
  'dark', 
  'cupcake',
  'bumblebee', 
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
  'dim',
  'nord',
  'sunset'
];

// Thème par défaut : light pour le template
const DEFAULT_THEME = 'light';

// Création du contexte
const ThemeContext = createContext({
  currentTheme: DEFAULT_THEME,
  availableThemes: AVAILABLE_THEMES,
  setTheme: () => {},
  toggleTheme: () => {},
  isDarkMode: false,
});

// Provider du contexte de thème
export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Récupérer le thème depuis localStorage ou utiliser light par défaut
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('daisyui-theme');
      return savedTheme && AVAILABLE_THEMES.includes(savedTheme) 
        ? savedTheme 
        : DEFAULT_THEME;
    }
    return DEFAULT_THEME;
  });

  // Appliquer le thème au DOM
  useEffect(() => {
    const htmlElement = document.documentElement;
    
    // Nettoyer les anciens thèmes
    htmlElement.removeAttribute('data-theme');
    
    // Appliquer le nouveau thème
    htmlElement.setAttribute('data-theme', currentTheme);
    
    // Forcer le recalcul des styles
    htmlElement.style.colorScheme = currentTheme === 'dark' ? 'dark' : 'light';
    
    // Sauvegarder dans localStorage
    localStorage.setItem('daisyui-theme', currentTheme);
    
    // Forcer un re-render
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
  }, [currentTheme]);

  // Fonction pour changer de thème
  const setTheme = (theme) => {
    if (AVAILABLE_THEMES.includes(theme)) {
      setCurrentTheme(theme);
    }
  };

  // Fonction pour basculer entre light et dark
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Vérifier si le thème actuel est sombre
  const isDarkMode = ['dark', 'synthwave', 'halloween', 'forest', 'black', 'luxury', 'dracula', 'night', 'coffee', 'dim', 'cyberpunk'].includes(currentTheme);

  const contextValue = {
    currentTheme,
    availableThemes: AVAILABLE_THEMES,
    setTheme,
    toggleTheme,
    isDarkMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte de thème
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme doit être utilisé à l\'intérieur d\'un ThemeProvider');
  }
  
  return context;
};

export default ThemeContext; 