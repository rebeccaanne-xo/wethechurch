# CHANGELOG — wethechurch

All notable changes to this repo are documented here.

---

## [Unreleased]

## [2026-05-29]
### Changed
- Moved all flat HTML files into named folders (each page is now `/[page-name]/index.html`)
- Moved truth series pages into `/truth/[topic]/index.html`
- Moved article into `/articles/wtc-introduction/index.html`
- Extracted inline CSS from every HTML file into `/styles/[name].css`
- Extracted inline JavaScript from every HTML file into `/js/[name].js`
- Moved `wtc-apps-script.js` → `/scripts/wtc-apps-script.js`
- Added header comments to all files
- Added `.gitignore`, CHANGELOG.md, TODO.md, GLOSSARY.md

### Deleted (via PowerShell)
- `join.html`, `wtc-build-map.html` from root (moved to named folders)
- `articles/wtc-introduction.html` (moved to `articles/wtc-introduction/index.html`)
- `truth/catholic-church.html`, `truth/progressive-christianity.html`,
  `truth/prosperity-gospel.html`, `truth/truth-index.html`,
  `truth/women-in-the-church.html`, `truth/zionism.html` (each moved to named subfolder)
- `wtc-apps-script.js` from root (moved to `/scripts/`)
