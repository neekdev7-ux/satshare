# SatShare Network — Landing Page

Standalone static landing page for **SatShare Network**, a decentralized bandwidth-sharing platform that pays Bitcoin Lightning (satoshi) rewards for authorized, opt-in bandwidth contributions.

This is the marketing/landing page only. The full platform (Next.js frontend, Express + Prisma backend, Lightning integration, Android app) lives in a separate repository.

## Files

| File | Purpose |
|---|---|
| `index.html` | Single-page landing site: hero, How It Works, Features, Earnings Calculator, Supported Wallets, FAQ, footer |
| `styles.css` | Dark navy + Bitcoin orange theme, mobile-first responsive |
| `script.js` | Mobile nav, scroll-reveal animations, FAQ accordion, earnings calculator |
| `assets/` | Local WebP copies of all 3D icons (hotlinked from GitHub in the HTML, with local fallback) |
| `ATTRIBUTION.md` | Icon licensing and sources |
| `.nojekyll` | Disables Jekyll processing on GitHub Pages |

## Run locally

```bash
# any static server works, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Push to any static host (GitHub Pages, Vercel, Netlify). No build step, no backend, no environment variables.

## Honesty rules baked into this page

- **No guaranteed earnings** — the calculator labels every output as an *estimate* and states rewards may be zero.
- **No fake numbers** — no user counts, no fake earnings, no fake testimonials, no fake "live" stats.
- **No fake mining** — the page states plainly this is not mining.
- **No automatic sharing** — the page states that opening the website does not share internet; sharing happens only through the official Android app with explicit opt-in.
- Wallet names (Phoenix, Wallet of Satoshi, Breez, Muun) are listed as *examples only* of BOLT11 / LNURL-pay compatible wallets, with a no-affiliation note.

## Placeholders

- **Legal links** (Terms & Conditions, Privacy Policy, Risk Disclosure, Contact) are marked "coming soon" — they ship with the full platform.
- **Start Earning / CTA** currently scrolls to How It Works — it will link to the live app once the platform launches.
- No email capture or signup form yet — add one only when the backend exists to handle it.
