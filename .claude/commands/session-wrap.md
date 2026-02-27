---
description: Commit with smart message, push to main (triggers deploy)
---

# Session Wrap-Up

1. Generate a smart commit message based on what changed

2. Commit and push to main:
   ```bash
   git add .
   git commit -m "[generated message]"
   git push origin main
   ```

3. Show summary of what was committed

**Note:** This pushes to `main`, which triggers auto-deploy to designpush.dev via Vercel.
