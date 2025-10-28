# MyMentor — MVP

This is a minimal Next.js + TypeScript scaffold for the MyMentor student learning platform MVP.

Features included in this scaffold:
- Home page with hero and CTAs
- Pages for Deep Search, Visual Learning, Audio Learning, AI Chat, Profile (stubs)
- Tailwind CSS setup with the MyMentor color tokens

Getting started
1. View the site locally

Open `index.html` with Live Server (or any static server). In VS Code, right-click `index.html` -> "Open with Live Server".

2. Security & API keys

- The AI chat stub uses OpenRouter (https://openrouter.ai). Do NOT commit your API keys into client-side code in public repositories. The sample `js/ai-chat.js` now contains a placeholder `REPLACE_WITH_OPENROUTER_KEY`.
- Recommended approach: create a small server-side proxy that stores your API key in environment variables and forwards requests to OpenRouter. This keeps keys secret and allows rate-limiting and quotas.

3. Next steps

- Replace `REPLACE_WITH_OPENROUTER_KEY` locally or set up a secure proxy.
- Replace placeholder images with curated assets for your product.
- Hook up a backend to persist user profiles and progress.

