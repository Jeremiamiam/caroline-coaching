# 🚀 Guide de Déploiement - Site Caroline Coaching

## ✅ Préparation effectuée

**Problème résolu :** Les imports vers `@yam-daisy-components` ne fonctionnaient pas sur GitHub Pages.

**Solution appliquée :** Copie locale des 38 composants Yam-Daisy.

---

## 🛑 Erreur critique rencontrée : dépendance manquante `prop-types`

**Symptôme :**
```
[vite]: Rollup failed to resolve import "prop-types" from "/src/components/common/Breadcrumbs.jsx".
This is most likely unintended because it can break your application at runtime.
```

**Cause :**
- Les composants Yam-Daisy copiés utilisent `prop-types` pour la validation des props.
- Si tu ne l'ajoutes pas dans le `package.json`, le build Vite/Rollup PLANTE (en local si tu fais un clean, et systématiquement sur GitHub Actions).

**Solution :**
```bash
npm install prop-types
# Puis commit package.json et package-lock.json
```

**À faire systématiquement** si tu copies des composants React d'un autre repo :
- Checker les imports en haut de chaque fichier copié (genre `import PropTypes from 'prop-types'`)
- Installer les dépendances manquantes AVANT de builder

---

## 🛑 Erreur critique rencontrée : 404 sur les assets JS/CSS après déploiement GitHub Pages

**Symptôme :**
```
Failed to load resource: the server responded with a status of 404 ()
(index-xxxx.js, index-xxxx.css)
```

**Cause :**
- Par défaut, Vite build les assets pour `/` (racine du domaine).
- Sur GitHub Pages, le site est servi sous `/nom-du-repo/` (ex: `/caroline-coaching/`).
- Résultat : les assets sont introuvables, le site est cassé.

**Solution :**
1. Ouvre `vite.config.js`
2. Ajoute la ligne suivante :
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/caroline-coaching/', // <-- AJOUTER CETTE LIGNE
  plugins: [react()],
})
```
3. Rebuild et push :
```bash
npm run build
git add vite.config.js
git commit -m "fix: set Vite base to /caroline-coaching/ for GitHub Pages (404 fix)"
git push
```

**À faire systématiquement** pour tout projet Vite sur GitHub Pages :
- Toujours adapter le `base` dans Vite à `/nom-du-repo/` sinon assets introuvables.

---

## 🛑 Erreurs critiques de Layout & Assets (CSS qui ne s'applique pas, images cassées)

Si le layout est cassé (marges, grilles) ou que les images ne s'affichent pas, voici les pièges classiques à vérifier.

### 1. Piège des largeurs fixes dans une grille (`w-96` vs `w-full`)

**Symptôme :**
- Des `Card` dans une `grid` sont collées, se superposent, ou passent à la ligne de façon inattendue.
- Le `gap` de la grille ne semble pas s'appliquer.

**Cause :**
- Les `Card` ont une largeur fixe (ex: `w-96`). Or, dans un conteneur `grid`, c'est la grille qui doit contrôler la largeur de ses colonnes. Une largeur fixe sur l'enfant entre en conflit avec la logique de la grille.

**Solution :**
- **TOUJOURS** utiliser `w-full` sur un composant `Card` qui est un enfant direct d'un conteneur `grid`.
- **NE JAMAIS** utiliser de largeur fixe comme `w-80`, `w-96`, etc. sur un enfant de `grid`.

```jsx
// MAUVAIS ❌
<div className="grid md:grid-cols-3 gap-8">
  <Card className="w-96">...</Card>
  <Card className="w-96">...</Card>
</div>

// BON ✅
<div className="grid md:grid-cols-3 gap-8">
  <Card className="w-full">...</Card>
  <Card className="w-full">...</Card>
</div>
```

### 2. Piège du centrage d'un élément seul

**Symptôme :**
- Une `Card` seule dans un `div` n'est pas centrée horizontalement, elle reste collée à gauche.

**Cause :**
- Par défaut, un bloc dans un autre bloc s'aligne à gauche. `mx-auto` sur l'enfant ne marche pas toujours si le parent n'est pas un conteneur flexible.

**Solution :**
- Transformer le `div` parent en conteneur `flex` et le forcer à centrer son contenu.
- Donner une largeur `w-full` et une `max-w-` à l'enfant pour qu'il soit responsive.

```jsx
// MAUVAIS ❌
<div className="container mx-auto max-w-4xl">
  <Card className="w-96">...</Card>
</div>

// BON ✅
<div className="container mx-auto max-w-4xl flex justify-center">
  <Card className="w-full max-w-2xl">...</Card>
</div>
```

### 3. Piège des chemins d'images (chemins absolus vs imports)

**Symptôme :**
- Les images s'affichent en local mais sont cassées une fois déployées sur GitHub Pages (ou l'inverse).

**Cause :**
- Un chemin absolu comme `src="/images/mon-image.jpg"` dépend de la racine du site. En local, c'est `localhost:5173/`. En production, ça peut être `domaine.com/nom-du-repo/`. Vite a parfois du mal à réconcilier les deux.

**Solution :**
- **TOUJOURS** importer les images directement dans le composant JSX. C'est la méthode la plus robuste, gérée par Vite.

```jsx
// MAUVAIS ❌
<img src="/images/mon-image.jpg" />

// BON ✅
import monImage from '/images/mon-image.jpg';

const MonComposant = () => {
  return <img src={monImage} />;
}
```
Vite remplacera `monImage` par le chemin final correct au moment du build.

---

## 🛑 Piège ultime : Routing des Single-Page-Apps (SPA) sur GitHub Pages

**Symptôme :**
- Le site marche bien, mais si on rafraîchit une page autre que l'accueil (ex: `/contact`), on a une erreur 404 de GitHub.
- L'URL change bizarrement ou on est redirigé vers la racine `github.io`.

**Cause :**
- GitHub Pages ne connaît que les fichiers physiques (`index.html`). Il ne sait pas que `react-router` gère des routes virtuelles comme `/contact`. Quand on lui demande ce fichier, il ne le trouve pas.

**Solution (en 3 temps) :**

### 1. Configurer le `basename` du Routeur
Il faut dire à `react-router` que le site ne vit pas à la racine, mais dans un sous-dossier.

Dans `src/main.jsx`, on ajoute `basename` au `<BrowserRouter>` :
```jsx
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter basename="/nom-du-repo/">
  <App />
</BrowserRouter>
```

### 2. Créer un `404.html` de redirection
On crée un fichier `public/404.html` qui va intercepter toutes les requêtes 404 et les rediriger intelligemment vers notre `index.html`.

Contenu de `public/404.html` :
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>SPA Redirect</title>
    <script type="text/javascript">
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### 3. Mettre à jour `index.html` pour gérer la redirection
On ajoute un script dans `index.html` (dans le `<head>`) pour lire les paramètres de l'URL de redirection et restaurer la bonne URL dans l'historique du navigateur.

Contenu à ajouter dans `<head>` de `index.html` :
```html
<script type="text/javascript">
  (function(l) {
    if (l.search) {
      var q = {};
      l.search.slice(1).split('&').forEach(function(v) {
        var a = v.split('=');
        q[a[0]] = a.slice(1).join('=').replace(/~and~/g, '&');
      });
      if (q.p !== undefined) {
        window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + (q.p || '') +
          (q.q ? ('?' + q.q) : '') +
          l.hash
        );
      }
    }
  }(window.location))
</script>
```

Avec ces 3 étapes, le routing des SPA sur GitHub Pages devient indestructible.

---

### Fichiers modifiés :
- ✅ Composants copiés dans `src/components/common/` (38 fichiers)
- ✅ Imports mis à jour dans `src/components/index.js`
- ✅ Build testé et fonctionnel
- ✅ **prop-types** ajouté dans le `package.json` (sinon build KO)
- ✅ **base: '/caroline-coaching/'** ajouté dans `vite.config.js` (sinon assets 404)

---

## 🌐 Déploiement sur GitHub Pages

### 1. Préparation du repository
```bash
# Initialiser git si pas fait
git init
git add .
git commit -m "🎉 Site Caroline Coaching - Prêt pour déploiement"

# Ajouter le remote GitHub
git remote add origin https://github.com/username/caroline-coaching.git
git push -u origin main
```

### 2. Configuration GitHub Pages
1. Aller dans **Settings** > **Pages**
2. Source : **GitHub Actions**
3. Utiliser le workflow par défaut ou créer `.github/workflows/deploy.yml`

### 3. Workflow automatique ⚠️ **VERSIONS IMPORTANTES** ⚠️
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4          # ✅ v4 (pas v3!)
        
      - name: Setup Node.js
        uses: actions/setup-node@v4        # ✅ v4 (pas v3!)
        with:
          node-version: '20'               # ✅ Node 20+ requis pour React 19
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Setup Pages
        uses: actions/configure-pages@v4   # ✅ v4 (pas v3!)
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3  # ✅ v3 (pas v2!)
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4      # ✅ v4 (pas v2!)
```

### 4. Build manuel local
```bash
# Tester le build
npm run build

# Prévisualiser le build
npm run preview
```

## ⚠️ **ERREURS À ÉVITER** (Leçons apprises)

### 🚨 **GitHub Actions - Versions dépréciées**
**PROBLÈME :** Actions obsolètes qui font planter le déploiement

❌ **À NE PAS UTILISER :**
```yaml
uses: actions/checkout@v3           # OBSOLÈTE
uses: actions/setup-node@v3         # OBSOLÈTE
uses: actions/configure-pages@v3    # OBSOLÈTE
uses: actions/upload-pages-artifact@v2  # OBSOLÈTE
uses: actions/deploy-pages@v2       # OBSOLÈTE
```

✅ **VERSIONS CORRECTES (2025) :**
```yaml
uses: actions/checkout@v4           # ✅ DERNIÈRE VERSION
uses: actions/setup-node@v4         # ✅ DERNIÈRE VERSION
uses: actions/configure-pages@v4    # ✅ DERNIÈRE VERSION
uses: actions/upload-pages-artifact@v3  # ✅ VERSION STABLE
uses: actions/deploy-pages@v4       # ✅ DERNIÈRE VERSION
```

### 🔗 **Imports relatifs - Dépendances externes**
**PROBLÈME :** Imports vers des dossiers parents qui n'existent pas sur GitHub Pages

❌ **À NE PAS FAIRE :**
```javascript
// Ces imports plantent sur GitHub Pages
export { default as Button } from '../../../@yam-daisy-components/src/components/common/Button.jsx';
```

✅ **SOLUTION :**
```bash
# Copier les composants localement AVANT déploiement
cp -r ../@yam-daisy-components/src/components/common/* src/components/common/
```

### 🏗️ **Build Vite - Configuration**
**IMPORTANT :** S'assurer que Vite build vers `dist/` (pas `build/`)
```javascript
// vite.config.js
export default {
  build: {
    outDir: 'dist'  // ✅ GitHub Pages attend dist/
  }
}
```

### 🟢 **Versions Node.js - Compatibilité React/Vite**
**PROBLÈME :** React 19 + Vite 7 incompatibles avec Node 18

❌ **COMBINAISONS QUI PLANTENT :**
```yaml
node-version: '18'     # ❌ TROP VIEUX pour React 19
# + React 19.1.0       # ❌ Requiert Node 20+
# + Vite 7.0.4          # ❌ Optimisé pour Node 20+
# = EXIT CODE 1 ! 💥
```

✅ **VERSIONS COMPATIBLES :**
```yaml
node-version: '20'     # ✅ LTS compatible React 19
node-version: '22'     # ✅ Latest, parfait aussi
# + React 19.x         # ✅ Fonctionne parfaitement  
# + Vite 7.x           # ✅ Performance optimale
```

**RÈGLE :** Toujours aligner la version Node GitHub Actions avec ta version locale !

## 📋 Checklist déploiement

- [ ] Composants Yam-Daisy copiés localement
- [ ] Imports mis à jour vers les composants locaux  
- [ ] Build testé et fonctionnel
- [ ] DaisyUI correctement configuré
- [ ] Images optimisées (caroline-bonnin.jpg)
- [] Navigation responsive
- [ ] Toutes les pages créées (Home, About, Contact, etc.)
- [ ] **GitHub Actions - Versions récentes utilisées**
- [ ] Repository GitHub créé
- [ ] GitHub Pages configuré (Source: GitHub Actions)
- [ ] Domaine personnalisé (optionnel)

## 🔧 **Maintenance des composants**
Les composants sont maintenant **copiés localement**. Pour les mises à jour :

```bash
# Si tu modifies @yam-daisy-components, re-copier :
cp -r ../@yam-daisy-components/src/components/common/* src/components/common/

# Puis commit + push
git add .
git commit -m "🔄 Update Yam-Daisy components"
git push
```

## 📊 **Surveillance du déploiement**

### Actions à surveiller :
1. **Onglet Actions** sur GitHub → Voir le workflow en cours
2. **Build time** : ~2-3 minutes normal
3. **Erreurs courantes** :
   - Versions dépréciées → Utiliser les versions ci-dessus
   - Import errors → Vérifier que tous les composants sont locaux
   - Build errors → Tester `npm run build` en local d'abord

### Structure finale
```
projet/
├── .github/
│   └── workflows/
│       └── deploy.yml           # Workflow avec BONNES versions
├── src/
│   ├── components/
│   │   ├── common/              # 38 composants Yam-Daisy (copiés)
│   │   └── index.js             # Imports locaux
│   ├── pages/                   # Pages du site
│   ├── contexts/                # ThemeContext
│   └── ...
├── public/
│   └── images/                  # Assets du site
├── dist/                        # Build pour déploiement (généré)
└── package.json
```

## 🎯 Résultat

✅ **Site 100% fonctionnel**
✅ **Compatible GitHub Pages**  
✅ **Build optimisé (470KB JS + 212KB CSS)**
✅ **DaisyUI thèmes multiples**
✅ **Images intégrées**
✅ **Navigation complète**
✅ **GitHub Actions - Versions récentes**
✅ **Workflow reproductible**

**URL finale :** `https://username.github.io/repository-name/`

## 📝 **Template de workflow pour futurs projets**

**Copie ce workflow pour tes prochains projets Vite + DaisyUI :**

```bash
# Créer le workflow
mkdir -p .github/workflows
# Copier le contenu du deploy.yml ci-dessus
# Vérifier que build: outDir: 'dist'
# Tester npm run build en local
# Commit + push
# Activer GitHub Pages (Source: GitHub Actions)
```

**Plus jamais d'erreurs de versions dépréciées ! 🎯** 