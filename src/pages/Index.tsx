import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import { Loader2 } from "lucide-react";

// Lazy load heavy/below-fold components
const Services = lazy(() => import("@/components/Services"));
const Products = lazy(() => import("@/components/Products"));
const WhyChooseUs = lazy(() => import("@/components/WhyChooseUs"));
const Team = lazy(() => import("@/components/Team"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

const LoadingFallback = () => (
  <div className="py-24 flex items-center justify-center">
    <Loader2 className="animate-spin text-accent w-8 h-8" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <CoreValues />

      <Suspense fallback={<LoadingFallback />}>
        <Services />
        <Products />
        <Team />
        <WhyChooseUs />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
