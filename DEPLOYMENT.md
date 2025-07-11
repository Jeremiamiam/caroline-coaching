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

### 3. Workflow automatique (optionnel)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: actions/deploy-pages@v1
        with:
          path: dist
```

### 4. Build manuel local
```bash
# Tester le build
npm run build

# Prévisualiser le build
npm run preview
```

## 📋 Checklist déploiement

- [x] Composants Yam-Daisy copiés localement
- [x] Imports mis à jour vers les composants locaux  
- [x] Build testé et fonctionnel
- [x] DaisyUI correctement configuré
- [x] Images optimisées (caroline-bonnin.jpg)
- [x] Navigation responsive
- [x] Toutes les pages créées (Home, About, Contact, etc.)
- [ ] Repository GitHub créé
- [ ] GitHub Pages configuré
- [ ] Domaine personnalisé (optionnel)

## ⚠️ Notes importantes

### Maintenance des composants
Les composants sont maintenant **copiés localement**. Pour les mises à jour :

```bash
# Si tu modifies @yam-daisy-components, re-copier :
cp -r ../@yam-daisy-components/src/components/common/* src/components/common/
```

### Structure finale
```
coaching coeur/
├── src/
│   ├── components/
│   │   ├── common/          # 38 composants Yam-Daisy (copiés)
│   │   └── index.js         # Imports locaux
│   ├── pages/               # 5 pages du site
│   ├── contexts/            # ThemeContext
│   └── ...
├── public/
│   └── images/
│       └── caroline-bonnin.jpg
├── dist/                    # Build pour déploiement
└── package.json
```

## 🎯 Résultat

✅ **Site 100% fonctionnel**
✅ **Compatible GitHub Pages**  
✅ **Build optimisé (470KB JS + 212KB CSS)**
✅ **DaisyUI thèmes multiples**
✅ **Images intégrées**
✅ **Navigation complète**

**URL finale :** `https://username.github.io/caroline-coaching/` 