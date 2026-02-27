# DesignPush Docs Site

Documentation site for DesignPush, built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

**Live:** [designpush.dev](https://designpush.dev)
**Repo:** [upVersion/designpush-docs](https://github.com/upVersion/designpush-docs) (public)
**Deploys from:** `main` branch → Vercel (auto-deploy on push)

## Project Structure

```
designpush-docs/
├── src/
│   ├── content/docs/       # Markdown/MDX documentation pages
│   │   ├── index.mdx       # Home page
│   │   ├── getting-started/
│   │   ├── fundamentals/
│   │   ├── features/
│   │   ├── editing-tokens/
│   │   ├── output/
│   │   ├── tailwind/
│   │   └── reference/
│   ├── components/          # Custom Astro components (ThemeToggle, Sidebar, Header)
│   ├── styles/              # Custom CSS (custom.css with design token overrides)
│   └── assets/              # Images, logos
├── public/                  # Static assets
├── astro.config.mjs         # Astro + Starlight config (sidebar, site metadata)
└── vercel.json              # Vercel deployment config
```

## Dev Server

```bash
npm run dev    # starts on port 5178
```

## Deployment

Push to `main` triggers auto-deploy on Vercel. No manual deploy step needed.

```bash
git push origin main
```

## Related Repos

- **design-system-app** — main DesignPush app (beta.designpush.app)
- **designpush-marketing** — marketing site (designpush.app)

All three live under `~/Desktop/Build_projects/DesignPush/`.

## Custom Skills

### /session-start
1. Pull latest from main
2. Start dev server on port 5178 if not running
3. Summarize recent changes and what's next

### /session-wrap
1. Generate a smart commit message based on changes
2. Commit and push to main (triggers Vercel deploy)
3. Show summary of what was committed and deployed

### /commit
Quick add, commit, and push to main.
