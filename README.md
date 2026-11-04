# Welcome to your 181studios project

Install dependencies with `npm ci` and create the production build with `npm run build`.

Cloudflare Pages deploys the `main` branch using `npm run build` and the `dist`
output directory. Keep `package-lock.json` as the sole root package lockfile so
Cloudflare installs dependencies with npm.
