# Vercel Deployment Fix TODO

## Steps:
- [ ] Step 1: Update vercel.json - Remove invalid \"root\", add API rewrites for serverless.
- [ ] Step 2: Create server/api/index.js - Serverless API handler for Express app.
- [ ] Step 3: Update server/package.json - Add build/start scripts for monorepo.
- [ ] Step 4: Local test with \`vercel dev\`.
- [ ] Step 5: Set MONGO_DB env var on Vercel dashboard.
- [ ] Step 6: Deploy \`git push\` + \`vercel --prod\`, verify no schema error.
