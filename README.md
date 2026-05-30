# We The Church

A Bible study community site for women who are done with church hurt, bad theology, and watered-down truth. Real scripture. Real conversation. No performance required.

**Status:** Active — content being built out
**Live:** [wethechurch.pages.dev](https://wethechurch.pages.dev)
**GitHub:** [rebeccaanne-xo/wethechurch](https://github.com/rebeccaanne-xo/wethechurch)

---

## What's here

| Page | Path | What it is |
|------|------|-----------|
| Home | `/` | Main landing page |
| Join | `/join/` | Community signup and info |
| Build map | `/wtc-build-map/` | Internal site planning (not public) |
| Introduction | `/articles/wtc-introduction/` | Article: Introduction to WTC |
| Truth index | `/truth/truth-index/` | Full Truth series index |
| Catholic Church | `/truth/catholic-church/` | Truth page |
| Progressive Christianity | `/truth/progressive-christianity/` | Truth page |
| Prosperity Gospel | `/truth/prosperity-gospel/` | Truth page |
| Women in the Church | `/truth/women-in-the-church/` | Truth page |
| Zionism | `/truth/zionism/` | Truth page |

---

## Structure

```
/styles/        ← CSS — one file per page
/js/            ← JS — one file per page
/scripts/       ← Apps Script and utilities
/icons/         ← SVG icon and icon generator
/articles/      ← article pages (each in named subfolder)
/truth/         ← truth series pages (each in named subfolder)
/[page-name]/   ← top-level pages in named folders
index.html      ← home page
```

---

## Adding a new Truth page

1. Create `/truth/[topic-slug]/index.html`
2. Create `/styles/truth-[topic-slug].css`
3. Create `/js/truth-[topic-slug].js` if JS needed
4. Add the page to `/truth/truth-index/index.html`

---

## Deploy

Static HTML/CSS/JS — no build step. Push to `main` to deploy via Cloudflare Pages.

---

## Brand

Navy `#1B2A4A` · Peony `#C2738A` · Sage `#4A7C6F` · Linen `#F2E8D6`
Fonts: Playfair Display · Lato

---

See [TODO.md](./TODO.md) for open items · [CHANGELOG.md](./CHANGELOG.md) for history · [GLOSSARY.md](./GLOSSARY.md) for terms.
