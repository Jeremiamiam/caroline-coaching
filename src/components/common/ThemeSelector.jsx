import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Composant ThemeSelector avec dropdown pour changer de thème en temps réel
 */
const ThemeSelector = ({ className = '' }) => {
  const { currentTheme, availableThemes, setTheme } = useTheme();
  const [isChanging, setIsChanging] = useState(false);

  // Fonction pour capitaliser le nom du thème
  const capitalizeTheme = (theme) => {
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  // Fonction pour obtenir l'emoji du thème
  const getThemeEmoji = (theme) => {
    const themeEmojis = {
      light: '☀️',
      dark: '🌙',
      cupcake: '🧁',
      bumblebee: '🐝',
      emerald: '💚',
      corporate: '🏢',
      synthwave: '🌃',
      retro: '📼',
      cyberpunk: '🤖',
      valentine: '💝',
      halloween: '🎃',
      garden: '🌸',
      forest: '🌲',
      aqua: '🌊',
      lofi: '🎧',
      pastel: '🎨',
      fantasy: '🦄',
      wireframe: '📐',
      black: '⚫',
      luxury: '✨',
      dracula: '🧛',
      cmyk: '🖨️',
      autumn: '🍂',
      business: '💼',
      acid: '🟢',
      lemonade: '🍋',
      night: '🌌',
      coffee: '☕',
      winter: '❄️',
      dim: '🔅',
      nord: '🏔️',
      sunset: '🌅'
    };
    return themeEmojis[theme] || '🎨';
  };

  // Fonction pour changer de thème avec animation
  const handleThemeChange = (theme) => {
    if (theme === currentTheme) return;
    
    setIsChanging(true);
    
    // Ajouter une classe d'animation au body
    document.body.classList.add('theme-selector-animation');
    
    // Changer le thème
    setTheme(theme);
    
    // Nettoyer l'animation après 300ms
    setTimeout(() => {
      setIsChanging(false);
      document.body.classList.remove('theme-selector-animation');
    }, 300);
  };

  return (
    <div className={`dropdown dropdown-bottom dropdown-left ${className}`}>
      {/* Bouton trigger */}
      <div 
        tabIndex={0} 
        role="button" 
        className={`btn btn-ghost btn-sm gap-2 ${isChanging ? 'loading' : ''}`}
      >
        <span className="text-base animate-pulse">{getThemeEmoji(currentTheme)}</span>
        <span className="hidden sm:inline text-sm">{capitalizeTheme(currentTheme)}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      
      {/* Dropdown content qui s'ouvre vers la GAUCHE */}
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-200 rounded-box z-[999] w-52 p-2 shadow-xl max-h-72 overflow-y-auto border border-base-300"
      >
        {/* En-tête */}
        <li className="menu-title">
          <span>🎨 Thèmes ({availableThemes.length})</span>
        </li>
        
        <div className="divider my-1"></div>
        
        {/* Liste des thèmes */}
        {availableThemes.map((theme) => (
          <li key={theme}>
            <a
              onClick={() => handleThemeChange(theme)}
              className={`${
                currentTheme === theme ? 'active bg-primary text-primary-content' : 'hover:bg-base-300'
              } flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all duration-200`}
            >
              <span className="text-lg">{getThemeEmoji(theme)}</span>
              <span className="flex-1 text-sm font-medium">{capitalizeTheme(theme)}</span>
              {currentTheme === theme && (
                <div className="flex items-center gap-1">
                  <span className="badge badge-xs badge-success">✓</span>
                  <div className="loading loading-spinner loading-xs opacity-50"></div>
                </div>
              )}
            </a>
          </li>
        ))}
        
        <div className="divider my-1"></div>
        
        {/* Footer informatif */}
        <li className="menu-title">
          <span className="text-xs opacity-70">
            💡 Thème actuel: {capitalizeTheme(currentTheme)}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ThemeSelector; 