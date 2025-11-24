# WebNexum — React + Vite Landing Page

A single‑page marketing/landing site for WebNexum built with React 19 and Vite 7, styled with Tailwind CSS. The app renders a localized landing page with sections (Hero, Services, Process, Portfolio, About, Contact, FAQ) and sends contact requests via Telegram Bot API.

> Updated on: 2025-11-24

## Stack
- Language: JavaScript (ES Modules, JSX)
- Framework/Library: React 19 (`react`, `react-dom`)
- Bundler/Dev server: Vite 7
- Styling: Tailwind CSS + PostCSS + Autoprefixer
- Linting: ESLint (Flat config) + `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`
- Package manager: npm (via `package-lock.json`)

## Project entry points
- HTML entry: `index.html` (mount point element: `<div id="root"></div>`) 
- JS entry: `src/main.jsx` → mounts `src/App.jsx` into `#root`
- App root: `src/App.jsx` → renders `src/landing.jsx`

## Features
- Localized content (RU/EN) via a custom `useLanguage` hook and `src/constants/translations.js`.
- Modular UI components in `src/components/*` (Header, Hero, Services, Process, Portfolio, About, Contact, Footer, etc.).
- Tailwind CSS utility classes and a small global stylesheet `src/styles/global.css`.
- Contact form submits to Telegram via Bot API.
- SEO: meta tags and JSON‑LD structured data in `index.html` and additional JSON‑LD in `landing.jsx`.

## Requirements
- Node.js 18+ (Vite 7 requires Node 18 or newer)
- npm 8+ (comes with Node 18+)

## Getting started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```
   Vite will print a local URL (default http://localhost:5173).
3. Lint the code:
   ```bash
   npm run lint
   ```

## Build & preview
- Production build (outputs to `dist/`):
  ```bash
  npm run build
  ```
- Preview the production build locally:
  ```bash
  npm run preview
  ```

## Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build for production
- `npm run preview` — preview built app
- `npm run lint` — run ESLint on the project

## Environment variables
This project uses Vite env variables. In code we access them as `import.meta.env.*`.

Currently used:
- `VITE_BOT_TOKEN` — Telegram Bot token used for sending messages from the Contact form (see `src/landing.jsx`).

How to configure:
1. Create a `.env` file in the project root (not committed):
   ```bash
   # .env
   VITE_BOT_TOKEN=123456:abcdef...
   ```
2. Restart the dev server after changes to env files.

Notes and TODOs:
- The Telegram chat ID is hardcoded in `src/landing.jsx` as `6430506427`. For flexibility, consider moving it to an env var like `VITE_TELEGRAM_CHAT_ID`.  
  TODO: Replace the hardcoded value with an env variable and document it here.

## Project structure (top‑level)
```
webnexum/
├─ index.html                 # HTML entry with SEO tags and JSON‑LD
├─ package.json               # Scripts and dependencies
├─ vite.config.js             # Vite configuration (React plugin)
├─ tailwind.config.js         # Tailwind content globs
├─ postcss.config.js          # PostCSS + Autoprefixer
├─ eslint.config.js           # ESLint flat config
├─ src/
│  ├─ main.jsx               # Mounts <App/> into #root
│  ├─ App.jsx                # Renders <WebNexumLanding/>
│  ├─ landing.jsx            # Page sections, logic, Telegram submission
│  ├─ index.css              # Global imports (Tailwind directives)
│  ├─ styles/global.css      # Additional global styles
│  ├─ constants/translations.js # Localized strings
│  ├─ components/            # UI components (Header, Hero, Services, ...)
│  └─ assets/                # Images (project1.png, etc.)
└─ README.md
```

## Development notes
- Tailwind: files under `./index.html` and `./src/**/*.{js,jsx,ts,tsx}` are scanned (see `tailwind.config.js`).
- React Strict Mode is enabled in `src/main.jsx`.
- The landing page animates counters and toggles sections visibility; see `src/landing.jsx` for behavior details.

## Tests
No test setup is present in this repository.  
TODO: Add a test framework (e.g., Vitest + React Testing Library) and basic component tests.

## Accessibility & SEO
- Semantic sections and headings are used throughout components.
- Meta tags and OpenGraph/Twitter cards are configured in `index.html`.
- JSON‑LD for `LocalBusiness` and `Organization` is embedded in `index.html`; additional `WebSite` JSON‑LD in `landing.jsx`.

## Deployment
Any static hosting that serves the `dist/` folder works:
- Build with `npm run build` → upload `dist/` to your hosting (e.g., Netlify, Vercel static, GitHub Pages, Nginx).
- Ensure correct base path if deploying under a subdirectory (configure `base` in `vite.config.js` if needed).

## License
No license file was found in the repository.  
TODO: Add a `LICENSE` file and update this section accordingly.
