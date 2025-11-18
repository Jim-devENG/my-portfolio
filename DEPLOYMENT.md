# Deployment Guide for jimmyenietan.site

## Vercel Deployment (Recommended)

Vercel is the recommended platform for Next.js applications as it provides optimal performance and seamless integration.

### Quick Deploy

#### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to [Vercel](https://vercel.com)** and sign in with your GitHub account
2. **Click "Add New Project"**
3. **Import your repository**: Select `Jim-devENG/my-portfolio` from your GitHub repositories
4. **Configure Project**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
5. **Add Environment Variables** (if needed): None required for this project
6. **Click "Deploy"**

Your site will be live in minutes at a URL like: `https://my-portfolio-xxx.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Custom Domain Setup

1. **In Vercel Dashboard**:
   - Go to your project → Settings → Domains
   - Add your domain: `jimmyenietan.site`
   - Follow the DNS configuration instructions

2. **Update DNS Records**:
   - Add the CNAME or A records as instructed by Vercel
   - Wait for DNS propagation (usually 5-30 minutes)

3. **SSL Certificate**:
   - Vercel automatically provisions SSL certificates via Let's Encrypt
   - HTTPS will be enabled automatically

### Environment Variables

If you need to add environment variables later:
- Go to Project Settings → Environment Variables
- Add variables for Production, Preview, and Development environments

### Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches or pull requests

### Performance Features

Vercel provides:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Edge Network
- ✅ Image Optimization
- ✅ Analytics (optional)
- ✅ Automatic deployments from GitHub

### Troubleshooting

- **Build fails**: Check build logs in Vercel dashboard
- **Domain not working**: Verify DNS settings and wait for propagation
- **404 errors**: Ensure all routes are properly configured in Next.js

## Alternative: Manual Build & Deploy

If you prefer to build locally first:

```bash
npm run build
```

Then deploy the `.next` folder to any static hosting service.
