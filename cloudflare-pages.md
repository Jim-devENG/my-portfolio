# Cloudflare Pages Deployment Guide

## Prerequisites

1. Install `@cloudflare/next-on-pages`:
```bash
npm install -D @cloudflare/next-on-pages
```

2. Add build script to `package.json`:
```json
{
  "scripts": {
    "pages:build": "next build && npx @cloudflare/next-on-pages"
  }
}
```

## Deployment Steps

### Option 1: Using Cloudflare Dashboard

1. Go to Cloudflare Dashboard → Pages
2. Create a new project
3. Connect your Git repository
4. Set build command: `npm run pages:build`
5. Set build output directory: `.vercel/output/static`
6. Deploy!

### Option 2: Using Wrangler CLI

1. Install Wrangler:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Build and deploy:
```bash
npm run pages:build
wrangler pages deploy .vercel/output/static
```

## Environment Variables

If you need environment variables, add them in the Cloudflare Pages dashboard under Settings → Environment Variables.

## Custom Domain

1. Go to your Pages project settings
2. Navigate to Custom domains
3. Add your domain (jimmyenietan.site)
4. Follow the DNS configuration instructions

