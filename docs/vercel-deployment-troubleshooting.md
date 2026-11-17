# Vercel deployment notes

## Runtime version

- `package.json` pins `engines.node` to `24.x`.
- `.nvmrc` pins local Node selection to major version 24.
- GitHub Actions uses Node.js 24 for install, lint, typecheck, and production build.
- Keep the Vercel project Node.js Version setting on `24.x` as well. The package engine range is the source-level override, but the dashboard setting should match.
- Vercel's newer Node.js major releases are not automatically selected by this project because the package no longer uses an open-ended engine range.

## npm cache-dir warning

If Vercel logs `npm warn Unknown env config "cache-dir"`, check the Vercel project's Environment Variables in all enabled deployment environments and remove either:

- `NPM_CONFIG_CACHE_DIR`
- `npm_config_cache_dir`

The supported npm setting is `cache`, not `cache-dir`. This warning usually comes from an externally supplied npm environment setting, not from Next.js application source. There is no project `.npmrc` file in this repository.

Do not replace it with a made-up cache variable. Vercel manages the build cache itself; removing the unsupported variable is the intended cleanup.

## Distinguish warnings from a build failure

The following messages are warnings, not by themselves proof that a build failed:

- An open-ended Node engine warning from a range such as `>=20.9.0`.
- An npm unknown environment-config warning for `cache-dir`.

After removing the environment variable and pinning Node 24, redeploy the latest `main` commit. If the build still fails, capture the complete output beginning at `Running "npm run build"` through the first `Error:`, `Failed to compile`, TypeScript error, or non-zero exit. Those lines identify the actual blocker.

## Vercel project settings

- Framework Preset: Next.js
- Root Directory: repository root (`./`)
- Install Command: default / npm install based on package-lock.json
- Build Command: `npm run build`
- Output Directory: leave default for Next.js
- Node.js Version: `24.x`

Do not set an additional custom cache path or a custom output directory for this Next.js project.
