import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Apps from "./pages/Apps";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Impact from "./pages/Impact";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => (
    <QueryClientProvider client={queryClient}>
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <ScrollToTop />
                <div className="min-h-screen flex flex-col">
                    <Navbar />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/apps" element={<Apps />} />
                            <Route path="/portfolio" element={<Portfolio />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/impact" element={<Impact />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
