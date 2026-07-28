import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Apple, Globe, Smartphone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import BejoDownloadDropdown from "@/components/BejoDownloadDropdown";
import { bejoApp } from "@/data/bejoContent";

const apps = [
    {
        ...bejoApp,
        path: "/apps/bejo",
    },
];

const platformIcons: Record<string, ReactNode> = {
    iOS: <Apple size={14} />,
    Android: <Smartphone size={14} />,
    Web: <Globe size={14} />,
};

const Apps = () => {
    return (
        <div className="min-h-screen pt-24 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(247_42%_8%)_48%,hsl(var(--background))_100%)]">
            <section className="pt-4 pb-14 md:pb-16 px-4 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10 md:mb-12">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-[#8d7cff]/30 bg-[#8d7cff]/10 text-[#bdb4ff] text-sm font-medium mb-6">
                                Our Products
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">Apps We've Built</h1>
                            <p className="text-slate-300/85 max-w-2xl mx-auto text-lg">
                                Purpose-built products with considered workflows, refined interfaces, and practical controls.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-10 md:space-y-12">
                        {apps.map((app, i) => (
                            <AnimatedSection key={i} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0c1020]/80 shadow-2xl shadow-black/30 backdrop-blur-xl"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2">
                                        <motion.div
                                            whileHover={{ scale: 1.01 }}
                                            transition={{ duration: 0.4 }}
                                            className="relative min-h-[300px] overflow-hidden bg-[#302b63] p-10 md:p-14 flex items-center justify-center"
                                        >
                                            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.02)_38%,rgba(8,10,26,0.38)_100%)]" />
                                            <div className="relative z-10 text-center">
                                                <h3 className="font-heading text-5xl md:text-6xl font-bold tracking-normal text-white">{app.name}</h3>
                                                <p className="mt-3 text-xl font-semibold text-white/80">{app.tagline}</p>
                                            </div>
                                        </motion.div>

                                        <div className="p-8 md:p-12 flex flex-col justify-center">
                                            <div className="flex flex-wrap gap-2 mb-5">
                                                {app.platforms.map((p) => (
                                                    <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-slate-300/80 text-xs font-medium">
                                                        {platformIcons[p]} {p}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="mb-7">
                                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#bdb4ff]">About BEJO</p>
                                                <p className="mt-5 text-base leading-relaxed text-slate-300/85">{app.description}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-3">
                                                <BejoDownloadDropdown className="bg-white text-[#302b63] hover:bg-white/90" />
                                                
                                                <Button asChild variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07] transition-all">
                                                    <a href="https://bejo.one8onestudios.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                                        Open
                                                        <ExternalLink size={16} />
                                                    </a>
                                                </Button>

                                                <Button asChild variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07] transition-all">
                                                    <Link to={app.path}>Learn More</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Apps;