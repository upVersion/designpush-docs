---
description: Pull latest, start dev server, summarize what we're working on
---

# Session Start

1. Fix iCloud git index corruption (if present):
   - Check if `.git/index` is missing AND `.git/index 2` exists
   - If so, rename `.git/index 2` → `.git/index` (iCloud sync creates conflict copies)
   - If `.git/index` exists normally, skip this step

2. Pull latest from main:
   ```bash
   git pull origin main
   ```

3. Start dev server if not running:
   - Check if port 5178 is in use. If NOT, run `npm run dev` in background

4. Summarize recent commits and what's next

5. Ask if I want to continue with recent work or do something else

**Note:** This repo deploys from `main`. Push to main triggers Vercel auto-deploy to designpush.dev.
