# Jimmy Enietan Portfolio

A premium, modern portfolio website built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, minimal, and professional aesthetic
- **Smooth Animations**: Framer Motion powered transitions and reveals
- **Responsive**: Fully responsive design for all devices
- **Dark Theme**: Beautiful dark-first theme with electric blue accents
- **SEO Optimized**: Built-in metadata and SEO best practices
- **Type Safe**: Full TypeScript support

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Font**: Inter

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for deployment on Vercel, which provides the best experience for Next.js applications.

#### Quick Deploy

1. **Via Vercel Dashboard**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "Add New Project"
   - Import your repository: `Jim-devENG/my-portfolio`
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

2. **Via Vercel CLI**:
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

#### Custom Domain

1. In Vercel Dashboard → Project Settings → Domains
2. Add your domain: `jimmyenietan.site`
3. Follow DNS configuration instructions
4. SSL certificate is automatically provisioned

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Other Platforms

This Next.js app can also be deployed to:
- **Netlify**: Use the Next.js build preset
- **Any Node.js hosting**: Use `npm run build` and `npm start`

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Content admin (/admin)
│   ├── api/admin/         # Admin login and save endpoints
│   ├── page.tsx           # Home page
│   ├── projects/          # Projects page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── navigation/       # Navbar component
│   ├── layout/           # Footer component
│   ├── sections/         # Page sections
│   └── cards/            # Card components
├── content/              # Site content as JSON (edited via /admin)
├── lib/                  # Content schemas, admin helpers, utilities
└── public/               # Static assets
```

## 🎨 Customization

### Update Content (Admin)

All text, projects, skills, experience, Express posts, social links and SEO
settings live in `content/*.json` and are edited at **`/admin`**.

- **Saving** commits the changed JSON (and any uploaded images) to GitHub in a
  single commit. Vercel then redeploys, so changes are live in about 1–2 minutes.
- **Images** are resized to at most 1600px and converted to WebP in the browser
  before upload (the server rejects anything over 1 MB).
- **Locally** (`npm run dev`), saves are written straight to `content/` and
  `public/` instead of GitHub.

Set these environment variables in Vercel (see `.env.example`):

| Variable | Purpose |
| --- | --- |
| `ADMIN_PASSWORD` | Admin login password (at least 10 characters) |
| `ADMIN_SESSION_SECRET` | Random string of 32+ characters used to sign the login cookie |
| `GITHUB_TOKEN` | Fine-grained token with **Contents: read and write** on this repo only |
| `GITHUB_REPO` | `owner/repo`, e.g. `Jim-devENG/my-portfolio` (optional on Vercel: defaults to the connected repo) |
| `GITHUB_BRANCH` | Branch Vercel deploys from (default `main`) |

Vercel only applies changed variables to new deployments, so redeploy after editing them.
Changing `ADMIN_PASSWORD` or `ADMIN_SESSION_SECRET` signs out every session.

### Styling

The color scheme is defined in:
- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind theme configuration

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Jimmy Enietan**
- Website: [jimmyenietan.site](https://jimmyenietan.site)
- Email: jimmy@example.com

---

Built with ❤️ using Next.js 15

