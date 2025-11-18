# Deployment Guide for jimmyenietan.site

## Current Issue
If the site is not showing on jimmyenietan.site, it likely needs to be deployed or rebuilt.

## Quick Fix Options

### Option 1: Static Export (Recommended for Cloudflare Pages)

The `next.config.js` has been updated to use static export mode which works better with Cloudflare Pages.

1. **Build the site:**
   ```bash
   npm run build
   ```

2. **Deploy the `out` folder to Cloudflare Pages:**
   - Go to Cloudflare Dashboard → Pages
   - Select your project
   - Go to Settings → Builds & deployments
   - Update build output directory to: `out`
   - Update build command to: `npm run build`
   - Redeploy

### Option 2: Using Cloudflare Pages with next-on-pages

1. **Install the adapter:**
   ```bash
   npm install -D @cloudflare/next-on-pages
   ```

2. **Update package.json script:**
   ```json
   "pages:build": "next build && npx @cloudflare/next-on-pages"
   ```

3. **Build:**
   ```bash
   npm run pages:build
   ```

4. **Deploy:**
   - Build output directory: `.vercel/output/static`
   - Build command: `npm run pages:build`

### Option 3: Manual Upload

1. Build the site:
   ```bash
   npm run build
   ```

2. Upload the `out` folder contents to your Cloudflare Pages project

## Verify Deployment

1. Check Cloudflare Pages dashboard for build status
2. Ensure custom domain is properly configured
3. Check DNS settings for jimmyenietan.site
4. Clear Cloudflare cache if needed

## Troubleshooting

- **Blank page**: Check browser console for errors
- **404 errors**: Ensure `trailingSlash: true` in next.config.js
- **Images not loading**: Verify image paths are correct
- **Build failures**: Check build logs in Cloudflare dashboard

