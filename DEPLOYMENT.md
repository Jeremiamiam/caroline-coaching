# 🚀 Guide de Déploiement - Site Caroline Coaching

## ✅ Préparation effectuée

**Problème résolu :** Les imports vers `@yam-daisy-components` ne fonctionnaient pas sur GitHub Pages.

**Solution appliquée :** Copie locale des 38 composants Yam-Daisy.

### Fichiers modifiés :
- ✅ Composants copiés dans `src/components/common/` (38 fichiers)
- ✅ Imports mis à jour dans `src/components/index.js`
- ✅ Build testé et fonctionnel

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

- [x] Composants Yam-Daisy copiés localement
- [x] Imports mis à jour vers les composants locaux  
- [x] Build testé et fonctionnel
- [x] DaisyUI correctement configuré
- [x] Images optimisées (caroline-bonnin.jpg)
- [x] Navigation responsive
- [x] Toutes les pages créées (Home, About, Contact, etc.)
- [x] **GitHub Actions - Versions récentes utilisées**
- [x] Repository GitHub créé
- [x] GitHub Pages configuré (Source: GitHub Actions)
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