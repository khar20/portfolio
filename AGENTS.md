# AGENTS.md

## Development

Run the dev server in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Verify builds with `pnpm build` (output in `dist/`).

## Project structure

- `src/i18n/ui.ts` — single source of truth for all user-facing strings (`en`/`es`). Add new text here, never hardcode in markup.
- `src/data/projects.ts` — shared project metadata (name, tags, link); descriptions live in `src/i18n/ui.ts`.
- `src/pages/` — `index.astro` (EN, `/`) and `es/index.astro` (ES, `/es`) via Astro i18n routing.
- `src/components/` — one component per page section.
- `src/styles/global.css` — global stylesheet (not scoped). Keep all global selectors here.
- `src/scripts/main.js` — bundled client script (browser behavior, theme, language switch, contact form).
- `src/layouts/` — `BaseLayout` (html/head) and `PortfolioLayout` (page shell).

## i18n

Locales are `en` (default) and `es`. Add a locale in `src/i18n/ui.ts`, `astro.config.mjs`, and `src/components/LangSwitcher.astro`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)