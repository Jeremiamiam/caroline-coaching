import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Card, Alert, Badge } from '../components';

const ThemePage = () => {
  const { currentTheme, availableThemes, setTheme } = useTheme();

  // Grouper les thèmes par catégorie pour une meilleure UX
  const themeCategories = {
    'Classiques': ['light', 'dark', 'corporate', 'business'],
    'Colorés': ['cupcake', 'bumblebee', 'emerald', 'valentine', 'garden', 'aqua', 'pastel'],
    'Futuristes': ['cyberpunk', 'synthwave', 'dracula', 'luxury', 'black'],
    'Naturels': ['forest', 'autumn', 'coffee', 'winter', 'nord'],
    'Créatifs': ['retro', 'halloween', 'fantasy', 'wireframe', 'acid', 'lemonade', 'sunset'],
    'Spéciaux': ['lofi', 'night', 'dim', 'cmyk']
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            🎨 Sélecteur de Thèmes
          </h1>
          <p className="text-xl text-base-content mb-6">
            Teste tous les thèmes DaisyUI en live ! Parfait pour le prototypage client.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="primary">Thème actuel: {currentTheme}</Badge>
            <Badge variant="secondary">{availableThemes.length} thèmes disponibles</Badge>
          </div>
        </div>

        {/* Preview Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-secondary mb-6 text-center">
            🎭 Aperçu du thème "{currentTheme}"
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card exemple */}
            <Card className="bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">Exemple de Card</h3>
                <p className="text-base-content">
                  Voici comment une card s'affiche avec le thème actuel.
                </p>
                <div className="card-actions justify-end">
                  <Button variant="primary" size="sm">Action</Button>
                </div>
              </div>
            </Card>

            {/* Boutons exemples */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">Boutons</h3>
                <div className="space-y-2">
                  <Button variant="primary" className="w-full">Primary</Button>
                  <Button variant="secondary" className="w-full">Secondary</Button>
                  <Button variant="accent" className="w-full">Accent</Button>
                </div>
              </div>
            </div>

            {/* Alerts exemples */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-primary">Alerts & Badges</h3>
                <div className="space-y-2">
                  <Alert variant="success" className="p-2">
                    <span>✅ Succès !</span>
                  </Alert>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="accent">Accent</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="space-y-8">
          {Object.entries(themeCategories).map(([category, themes]) => (
            <div key={category}>
              <h3 className="text-2xl font-bold text-neutral mb-4">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setTheme(theme)}
                    className={`
                      btn btn-outline h-auto p-4 flex flex-col gap-2 transition-all
                      ${currentTheme === theme 
                        ? 'btn-primary scale-105 shadow-lg' 
                        : 'hover:scale-105'
                      }
                    `}
                  >
                    <span className="text-2xl">
                      {getThemeEmoji(theme)}
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {theme}
                    </span>
                    {currentTheme === theme && (
                      <Badge variant="primary" className="absolute -top-2 -right-2">
                        ✓
                      </Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center mt-12">
          <div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
            <div className="card-body text-center">
              <h3 className="card-title justify-center text-primary">
                🚀 Workflow de Prototypage
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <div>
                  <div className="text-3xl mb-2">🎯</div>
                  <p className="text-sm">1. Choisis un thème</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🏗️</div>
                  <p className="text-sm">2. Développe ton prototype</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">🎉</div>
                  <p className="text-sm">3. Présente au client</p>
                </div>
              </div>
              <div className="card-actions justify-center">
                <Link to="/">
                  <Button variant="accent" size="lg">
                    ← Retour au prototype
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper pour les emojis de thèmes
const getThemeEmoji = (theme) => {
  const emojiMap = {
    light: '☀️',
    dark: '🌙',
    cupcake: '🧁',
    bumblebee: '🐝',
    emerald: '💚',
    corporate: '💼',
    synthwave: '🌆',
    retro: '📻',
    cyberpunk: '🤖',
    valentine: '💖',
    halloween: '🎃',
    garden: '🌻',
    forest: '🌲',
    aqua: '🌊',
    lofi: '🎧',
    pastel: '🌈',
    fantasy: '🦄',
    wireframe: '📝',
    black: '⚫',
    luxury: '💎',
    dracula: '🧛',
    cmyk: '🖨️',
    autumn: '🍂',
    business: '👔',
    acid: '🟢',
    lemonade: '🍋',
    night: '🌃',
    coffee: '☕',
    winter: '❄️',
    dim: '🔅',
    nord: '🏔️',
    sunset: '🌅'
  };
  return emojiMap[theme] || '🎨';
};

export default ThemePage; 