---
description: Quick add/commit/push for mid-session saves
---

# Quick Commit

Arguments: commit message (optional)

1. Run `git add .`
2. If message provided, use it. Otherwise generate a smart message based on changes.
3. Run `git commit -m "[message]"`
4. Run `git push origin main`
5. Show what was committed

**Note:** Pushes to `main` — triggers auto-deploy to designpush.dev.
