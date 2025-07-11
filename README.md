# 🎯 Template Client Yam

**Système de prototypage rapide avec DaisyUI + Composants Yam**

## 🚀 Workflow de Prototypage Client

### 1. 📁 Dupliquer le Template
```bash
# Dupliquer le dossier client-template
cp -r client-template nom-du-client
cd nom-du-client
```

### 2. 🤖 Prompter l'IA pour Créer des Pages
Utilise ton IA de coding pour générer rapidement des pages :

**Exemple de prompts :**
- *"Crée une homepage e-commerce avec hero, grille produits, footer en utilisant les composants Yam"*
- *"Génère une page contact avec formulaire et map en utilisant Card, Button, Alert"*
- *"Fais une page portfolio avec galerie et modal en utilisant les composants du package"*

L'IA utilisera automatiquement les composants de `@yam-daisy-components` !

### 3. 🎨 Choisir le Thème Client
```bash
npm run dev
# Aller sur http://localhost:5173/theme
```

Page dédiée avec :
- **33+ thèmes DaisyUI** disponibles
- **Preview en temps réel** sur tous les composants
- **Sauvegarde automatique** du choix
- **Catégories** : Classiques, Colorés, Futuristes, etc.

### 4. 🎉 Prototype Prêt !
- Thème adapté au branding client
- Composants cohérents et professionnels
- Maquette interactive fonctionnelle

---

## 🛠️ Installation & Lancement

```bash
# Démarrer le serveur de dev
npm run dev

# Routes disponibles :
# http://localhost:5173/        -> Page d'accueil template
# http://localhost:5173/theme   -> Sélecteur de thèmes
```

---

## 📦 Architecture

```
src/
├── components/           # Imports directs depuis @yam-daisy-components
├── contexts/            # ThemeContext pour gestion des thèmes DaisyUI
├── pages/              # ThemePage + autres pages que tu créeras
├── App.jsx             # Router avec navigation
└── index.css           # CSS optimisé DaisyUI
```

### 🎨 Système de Thèmes
- **33 thèmes officiels DaisyUI** : light, dark, cyberpunk, synthwave, etc.
- **Changement en temps réel** via `/theme`
- **Aucun CSS custom** nécessaire, tout est géré par DaisyUI
- **Variables automatiques** : `bg-primary`, `text-accent`, etc.

### 🧩 Composants Yam Disponibles
Tous les composants de `@yam-daisy-components` :
- **Button, Card, Alert, Badge** (de base)
- **Modal, Dropdown, Tabs, Progress**
- **Form, Input, Select, Textarea**
- **Navigation, Hero, Footer**
- *Et 30+ autres...*

---

## 💡 Exemples d'Utilisation

### Créer une Page E-commerce
```jsx
// Prompter l'IA : "Crée une page e-commerce Nike avec ces composants"
import { Button, Card, Badge, Alert } from '../components';

const ShopPage = () => (
  <div>
    <Hero title="Nike Store" />
    <div className="grid grid-cols-3 gap-6">
      <Card title="Air Max" price="$150">
        <Button variant="primary">Acheter</Button>
      </Card>
      {/* etc... */}
    </div>
  </div>
);
```

### Adapter le Thème
1. Va sur `/theme`
2. Clique sur "cyberpunk" pour Nike futuriste
3. Ou "corporate" pour un client B2B
4. Tous les composants s'adaptent instantanément !

---

## 🎯 Avantages

✅ **Prototypage ultra-rapide** avec l'IA  
✅ **33 thèmes prêts** sans CSS custom  
✅ **Composants cohérents** et testés  
✅ **Routing configuré** (ajoute tes pages)  
✅ **Import direct** des composants Yam  
✅ **Responsive** et accessible par défaut  

---

## 🔧 Stack Technique

- **React 18** + **Vite** (dev rapide)
- **TailwindCSS + DaisyUI** (thèmes + variables)
- **React Router** (navigation)
- **@yam-daisy-components** (composants centralisés)

---

## 📋 Checklist Projet Client

- [ ] Dupliquer le template avec nom client
- [ ] Prompter l'IA pour créer les pages nécessaires
- [ ] Choisir le thème via `/theme` selon branding client
- [ ] Tester la navigation et responsivité
- [ ] Livrer le prototype interactif

**Temps estimé : 30 minutes à 2h selon complexité !**
