import { Suspense, lazy, useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "@/hooks/useLenis";
import LoadingScreen from "@/components/LoadingScreen";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Insights = lazy(() => import("./pages/Insights"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
  </div>
);

/** Animated route wrapper with page transitions */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

/** Root wrapper that initializes Lenis smooth scrolling */
function AppShell({ children }: { children: React.ReactNode }) {
  useLenis();
  return <>{children}</>;
}

const App = () => {
  const [contentVisible, setContentVisible] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  const handleLoadStarted = useCallback(() => setContentVisible(true), []);
  const handleLoadComplete = useCallback(() => setLoaderMounted(false), []);

  // Ensure GSAP ScrollTrigger is updated when the site becomes visible
  // and when any lazy-loaded content might have shifted the layout.
  useEffect(() => {
    if (contentVisible) {
      // Refresh immediately and after a short delay for layout stability
      ScrollTrigger.refresh();
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [contentVisible]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <Sonner />

          {loaderMounted && (
            <LoadingScreen
              onStarted={handleLoadStarted}
              onComplete={handleLoadComplete}
            />
          )}

          <div
            style={{
              visibility: contentVisible ? "visible" : "hidden",
              opacity: contentVisible ? 1 : 0,
              transition: "opacity 1s ease-in-out",
            }}
          >
            <BrowserRouter>
              <AppShell>
                <AnimatedRoutes />
                {/* <FloatingWhatsApp /> */} {/* Disabled per CTO request */}
              </AppShell>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
