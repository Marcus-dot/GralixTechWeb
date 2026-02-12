# Gralix Technologies Web Development Setup Guide

## Project Overview
This project is a modern, responsive website for **Gralix Technologies**, built using the **Vite + React + TypeScript** stack. It uses **Tailwind CSS** for styling and **shadcn/ui** components for a premium look and feel.

## Tech Stack
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui, Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Hosting**: Netlify / Vercel (Recommended)

## Development Setup

### Prerequisites
- Node.js (v18+)
- npm or yarn or bun

### Installation
1.  Clone the repository:
    ```bash
    git clone https://github.com/your-repo/gralix-tech-web.git
    cd gralix-tech-web
    ```

2.  Install dependencies:
    ```bash
    npm install
    # or
    bun install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    # or
    bun dev
    ```

4.  Open [http://localhost:8080](http://localhost:8080) in your browser.

## Deployment

### Deploying to Netlify (Recommended)
1.  Connect your GitHub repository to Netlify.
2.  Configure build settings:
    -   **Build Command**: `npm run build`
    -   **Publish Directory**: `dist`
3.  Add Environment Variables (if any, e.g., EmailJS keys).
4.  Deploy!

### Deploying to Vercel
1.  Import your GitHub repository into Vercel.
2.  Vercel automatically detects Vite settings.
3.  Deploy!

## Configuration Code
-   **EmailJS**: Set your Service ID, Template ID, and Public Key in `src/pages/Contact.tsx` or use `.env` variables.
-   **WhatsApp**: Configure your phone number in `src/components/ui/FloatingWhatsApp.tsx`.

## Key Features
-   **Dynamic Routing**: Product pages are generated dynamically.
-   **Dark/Light Mode**: Toggleable theme using `next-themes` logic.
-   **Contact Form**: Functional form powered by EmailJS.
-   **SEO**: Meta tags optimized for search engines.

## License
Proprietary software of Gralix Technologies.
