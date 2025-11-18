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
├── data/                 # Data files (projects, skills)
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 🎨 Customization

### Update Personal Information

1. **Projects**: Edit `data/projects.ts`
2. **Skills**: Edit `data/skills.ts`
3. **Metadata**: Update `app/layout.tsx`
4. **Social Links**: Update `components/layout/Footer.tsx` and `app/contact/page.tsx`

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

