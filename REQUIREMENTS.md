# Gralix Technologies Website — Requirements Document

**Project:** GralixTechWeb
**Company:** Gralix Technologies
**Tagline:** Transform. Innovate. Excel.
**Version:** 1.0
**Last Updated:** 2026-02-12

---

## 1. Project Overview

A marketing and product-showcase website for Gralix Technologies, a Zambian software company specializing in bespoke financial software solutions for insurance, finance, pension funds, and investment industries across Africa.

**Headquarters:** Ground Floor, LA Complex, Plot 4897, L.A. Boulevard, Longacres, Lusaka, Zambia
**Contact:** info@gralix.co | +260 770 007 775 | www.gralix.co
**Social:** Twitter @GralixTech | WhatsApp +260 770 007 775

---

## 2. Tech Stack

| Layer              | Technology                       | Version  |
| ------------------ | -------------------------------- | -------- |
| Framework          | React                            | 18.3.1   |
| Language           | TypeScript                       | 5.8.3    |
| Build Tool         | Vite (SWC plugin)                | 5.4.19   |
| Styling            | Tailwind CSS                     | 3.4.17   |
| Component Library  | shadcn/ui (Radix UI primitives)  | various  |
| Animation          | Framer Motion                    | 12.34.0  |
| Icons              | Lucide React                     | 0.462.0  |
| Routing            | React Router DOM                 | 6.30.1   |
| Server State       | TanStack React Query             | 5.83.0   |
| Email Service      | EmailJS Browser                  | 4.4.1    |
| Toast Notifications| Sonner                           | 1.7.4    |
| Form Handling      | React Hook Form + Zod            | 7.61.1 / 3.25.76 |
| Carousel           | Embla Carousel React             | 8.6.0    |
| Charts             | Recharts                         | 2.15.4   |
| Date Utilities     | date-fns                         | 3.6.0    |
| Testing            | Vitest + Testing Library + jsdom | 3.2.4    |
| Dev Server Port    | 8080                             | —        |

---

## 3. Functional Requirements

### 3.1 Routes / Pages

| Route             | Page              | Description                                    |
| ----------------- | ----------------- | ---------------------------------------------- |
| `/`               | Homepage          | Single-page layout with scrollable sections    |
| `/insights`       | Insights          | Blog/news article listing                      |
| `/products/:id`   | Product Detail    | Dynamic product detail page (by slug)          |
| `*`               | 404 Not Found     | Catch-all error page                           |

All pages are **lazy-loaded** via React `Suspense` with a spinner fallback.

---

### 3.2 Homepage Sections

#### 3.2.1 Navbar
- Fixed position, transparent initially, gains blur background + shadow on scroll (>50px)
- "Gralix" wordmark logo with accent-colored "li" letters
- Desktop nav links: About, Services, Products, Why Us, Insights, Contact
- "Get in Touch" CTA button (orange gradient)
- Dark / Light / System **theme toggle** dropdown (Sun/Moon icon)
- Mobile: hamburger menu with animated slide-in, navy gradient background

#### 3.2.2 Hero Section
- Full viewport height (`min-h-screen`)
- **Parallax background image** (`hero-bg.jpg`) scrolling at 0.4x speed via Framer Motion
- **TechGrid overlay** — decorative CSS grid pattern with animated horizontal scan line
- Animated badge: "Leading Zambian Software Company"
- **Typewriter animation** cycling through: "Transform.", "Innovate.", "Excel."
- Staggered entry animations on headings, paragraphs, and buttons
- Two CTA buttons: "Explore Our Solutions" (→ `#products`) and "Learn More" (→ `#about`)

#### 3.2.3 About Section (`#about`)
- Two-column layout: image (left) + descriptive text (right)
- Image with rounded container and gradient overlay, animated slide-in from left
- Company description text animated slide-in from right
- Framer Motion `whileInView` animations (trigger once)

#### 3.2.4 Core Values Section
- Navy gradient background
- 4-column responsive card grid (1 → 2 → 4 columns)
- Four values with Lucide icons:
  1. Innovation (Lightbulb)
  2. Integrity (Shield)
  3. Customer-Centric (Users)
  4. Local Expertise, Global Standards (Globe)
- Cards: orange gradient icon container, hover border accent + icon scale, staggered entry

#### 3.2.5 Services Section (`#services`)
- 2-column card grid
- Two service offerings:
  1. **Gap Analysis** — system assessment, compliance gaps, digital transformation roadmap
  2. **System Optimization as a Service** — modernization, cloud integration, security
- Cards with hover lift effect (`y: -10`), bullet benefit lists, staggered entry

#### 3.2.6 Products Section (`#products`)
- 3-column responsive card grid (1 → 2 → 3 columns)
- **8 products**, each linking to `/products/:id`:
  1. **GIMM** — Gralix Investment Management Platform
  2. **IBNR** — Insurance Reserving Application
  3. **IFRS 17** — IFRS 17 Compliance Application
  4. **IFRS 9 Tool** — ECL Calculation Engine
  5. **RaidMercury** — Insurance Fraud & Risk Assessment
  6. **RubicLend** — KYC & Loan Management
  7. **Kapitao** — Real-Time Asset Flow / Fixed Asset Management
  8. **G-Re** — Re-insurance Application
- Each card: icon (navy → orange on hover), product name, short description, 3 feature bullet points

#### 3.2.7 Team Section (`#team`)
- 4-column responsive grid (1 → 2 → 4 columns)
- Four team members (placeholder photos):
  1. Mukuka Mwila — Lead Software Engineer
  2. Chanda Bwalya — Product Manager
  3. Kondwani Banda — UI/UX Designer
  4. Thandiwe Phiri — Data Scientist
- Cards: square image, grayscale-to-color on hover, 1.05x scale zoom
- Social icons (LinkedIn, Twitter, GitHub) revealed on hover

#### 3.2.8 Why Choose Us Section (`#why-us`)
- Navy gradient background
- 3-column grid (5 items, last centered on large screens)
- Five reasons:
  1. Local Expertise with Global Standards (MapPin)
  2. Bespoke Solutions for Diverse Industries (Puzzle)
  3. Cutting-Edge Technology (Cpu)
  4. Seamless Integration & Scalability (Layers)
  5. Commitment to Compliance (FileCheck)

#### 3.2.9 Contact Section (`#contact`)
- Two-column layout: contact info (left) + form (right)
- **Contact info:** Address (LA Complex, Lusaka), Phone, Email, Website icons
- **Contact form** (navy gradient container):
  - Fields: Full Name (text, required), Email (email, required), Message (textarea, required)
  - Submit button with loading spinner state
  - Email delivery via **EmailJS** (service/template IDs to be configured)
  - Success/failure feedback via Sonner toast notifications

#### 3.2.10 Footer
- Navy gradient background
- Gralix wordmark + tagline, nav links (About, Services, Products, Contact)
- Dynamic copyright year

---

### 3.3 Insights Page (`/insights`)

- Hero header with page title and description
- 3-column article card grid
- Hardcoded sample articles (no CMS integration):
  1. "The Future of Fintech in Zambia" (Fintech, Oct 2025)
  2. "Why IFRS 17 Matters for Insurers" (Compliance, Sep 2025)
  3. "Leveraging AI for Credit Scoring" (AI & Data, Sep 2025)
- Each card: placeholder image, category badge, date, title, excerpt (line-clamped), "Read More" link

---

### 3.4 Product Detail Page (`/products/:id`)

- Dynamic routing by product slug
- Product-not-found fallback with return-home link
- Header with TechGrid overlay
- Back to Home navigation link
- Two-column content:
  - **Left:** "Key Features" list with check icons, staggered animations
  - **Right:** "Why Choose [Product]?" card with benefits + "Request a Demo" CTA (→ `/#contact`)
- Available slugs: `gimm`, `ibnr`, `ifrs-17`, `ifrs-9-tool`, `raidmercury`, `rubiclend`, `kapitao`, `g-re`

---

### 3.5 404 Page

- Centered 404 message
- Console error logging on mount
- Return to Home link

---

## 4. Global UI Features

### 4.1 Floating WhatsApp Button
- Fixed bottom-right position
- Links to `https://wa.me/260770007775`
- Green circular button with chat icon
- Hover tooltip: "Chat with Us"
- Scale animation on hover/active

### 4.2 Scroll Progress Bar
- Fixed top-of-page orange progress bar (1px height)
- Tracks scroll position with smoothed spring physics (Framer Motion)
- Visible on all pages

### 4.3 Theme System
- Custom React Context-based ThemeProvider
- Modes: `dark`, `light`, `system`
- Persists to `localStorage` key: `vite-ui-theme`
- Default theme: `dark`

---

## 5. Third-Party Integrations

| Integration     | Status                | Notes                                              |
| --------------- | --------------------- | -------------------------------------------------- |
| EmailJS         | Configured, not wired | Service/template IDs are TODO; simulates with delay|
| WhatsApp        | Active                | Direct `wa.me` link, hardcoded number              |
| Google Fonts    | Active                | Inter + Plus Jakarta Sans via CDN                  |
| Unsplash        | Dev only              | Team member placeholder photos                     |
| Sonner          | Active                | Contact form toast notifications                   |
| TanStack Query  | Initialized           | Provider set up, no active queries yet             |

---

## 6. Design System

### 6.1 Brand Colors

| Token           | Light Mode           | Dark Mode                 | Usage              |
| --------------- | -------------------- | ------------------------- | ------------------ |
| `background`    | White                | Near-black navy           | Page background    |
| `foreground`    | Dark navy            | White                     | Body text          |
| `primary`       | Dark navy            | Orange                    | Primary interactive|
| `accent`        | Orange               | Orange                    | Highlights, CTAs   |
| `gralix-navy`   | HSL 233 41% 23%      | —                         | Brand navy         |
| `gralix-orange`  | HSL 17 81% 54%       | —                         | Brand orange       |

### 6.2 Gradients (Tailwind Utilities)
- `.gradient-navy` — Navy diagonal gradient (brand background)
- `.gradient-orange` — Orange diagonal gradient (CTA buttons)
- `.gradient-hero` — Semi-transparent navy overlay for hero
- `.text-gradient-orange` — Orange text gradient

### 6.3 Typography

| Font              | CSS Class       | Weights         | Usage       |
| ----------------- | --------------- | --------------- | ----------- |
| Plus Jakarta Sans | `font-heading`  | 500–800         | Headings    |
| Inter             | `font-body`     | 400–600         | Body text   |

### 6.4 Animations (Tailwind Keyframes)
- `accordion-down` / `accordion-up` — Accordion expand/collapse
- `fade-up` — Fade in + translate Y (0.6s ease-out)
- `animate-scan` — Horizontal scan line in TechGrid

---

## 7. SEO & Meta Tags

Defined in `index.html`:
- **Title:** "Gralix Technologies | Transform. Innovate. Excel."
- **Description:** "Leading Zambian software company specializing in bespoke solutions for insurance, finance, pension funds, and investment."
- Open Graph tags: title, description, type (`website`), image (`/og-image.png`)
- Twitter Card: `summary_large_image`, site `@GralixTech`, image
- `robots.txt`: Allows all major crawlers (Googlebot, Bingbot, Twitterbot, etc.)

---

## 8. Non-Functional Requirements

### 8.1 Performance
- Lazy-loaded routes with React Suspense
- Parallax and animations powered by Framer Motion (GPU-accelerated transforms)
- SWC-based Vite build for fast compilation
- Image optimization via Vite asset pipeline

### 8.2 Responsiveness
- Mobile-first responsive design via Tailwind CSS breakpoints
- Mobile hamburger menu with animated transitions
- All card grids adapt from 1 column (mobile) to full grid (desktop)
- Mobile breakpoint detection hook (`use-mobile.tsx`)

### 8.3 Accessibility
- Semantic HTML structure
- Radix UI primitives (shadcn/ui) provide built-in ARIA attributes
- Theme toggle respects system preference

### 8.4 Browser Support
- Target: ES2020-compatible browsers
- Module resolution: bundler mode

---

## 9. Testing

| Item          | Detail                                    |
| ------------- | ----------------------------------------- |
| Runner        | Vitest 3.2.4                              |
| Environment   | jsdom                                     |
| Assertions    | @testing-library/jest-dom + react         |
| Setup         | `src/test/setup.ts` (matchMedia mock)     |
| Globals       | Enabled                                   |
| Coverage      | Minimal (1 placeholder test)              |
| Scripts       | `npm run test` (once), `npm run test:watch` |

---

## 10. Build & Deployment

### Scripts

| Script       | Command                        | Purpose                       |
| ------------ | ------------------------------ | ----------------------------- |
| `dev`        | `vite`                         | Dev server on port 8080       |
| `build`      | `vite build`                   | Production build to `/dist`   |
| `build:dev`  | `vite build --mode development`| Development build             |
| `preview`    | `vite preview`                 | Preview production build      |
| `lint`       | `eslint .`                     | Run ESLint                    |
| `test`       | `vitest run`                   | Run tests once                |
| `test:watch` | `vitest`                       | Watch mode tests              |

### Deployment Targets
- **Netlify** (recommended): Build command `npm run build`, publish dir `dist`
- **Vercel**: Auto-detected Vite settings
- Environment variables needed for EmailJS keys in production

---

## 11. Known Gaps / TODOs

| #  | Issue                             | Detail                                                                 |
| -- | --------------------------------- | ---------------------------------------------------------------------- |
| 1  | EmailJS not wired                 | `Contact.tsx` simulates a 1500ms delay; service/template IDs are TODO  |
| 2  | Team photos are placeholders      | Using Unsplash URLs; replace with real staff photography               |
| 3  | Insights articles are hardcoded   | No CMS or API integration; "Read More" links are dead (`#`)           |
| 4  | `og-image.png` missing            | Referenced in `index.html` meta tags but not in `Public/`             |
| 5  | `gralix-logo.jpg` unused          | Logo asset exists but Navbar uses text wordmark instead                |
| 6  | Test coverage is minimal          | Only one trivial placeholder test; no component/integration tests     |
| 7  | `NavLink.tsx` unused              | Utility component exists but Navbar uses inline `<a>` tags           |
| 8  | Product data duplication          | Data duplicated between `Products.tsx` and `ProductDetail.tsx`        |
| 9  | TypeScript strict mode disabled   | `strict: false` and `noImplicitAny: false` in tsconfig               |

---

## 12. File Structure

```
GralixTechWeb/
├── index.html
├── package.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── components.json
├── postcss.config.js
├── eslint.config.js
├── Public/
│   ├── robots.txt
│   └── placeholder.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── assets/
    │   ├── gralix-logo.jpg
    │   ├── hero-bg.jpg
    │   └── hero-tech.jpg
    ├── pages/
    │   ├── Index.tsx
    │   ├── Insights.tsx
    │   ├── ProductDetail.tsx
    │   └── NotFound.tsx
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── CoreValues.tsx
    │   ├── Services.tsx
    │   ├── Products.tsx
    │   ├── Team.tsx
    │   ├── WhyChooseUs.tsx
    │   ├── Contact.tsx
    │   ├── Footer.tsx
    │   ├── ThemeToggle.tsx
    │   ├── theme-provider.tsx
    │   ├── NavLink.tsx
    │   └── ui/ (40+ shadcn/ui components + custom)
    ├── hooks/
    │   ├── use-mobile.tsx
    │   └── use-toast.ts
    ├── lib/
    │   └── utils.ts
    └── test/
        ├── setup.ts
        └── example.test.ts
```
