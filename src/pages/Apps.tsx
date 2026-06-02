import { ExternalLink, Apple, Smartphone, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import AnimatedSection, { ParallaxLayer, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
const apps = [
    {
        name: "BEJO",
        tagline: "Aaram Se",
        description: "Bejo is a secure QR-based file sharing app that lets you decide what happens with your sent files. It allows you to set a timer for your sent files to expire.",
        gradient: "from-primary to-accent",
        platforms: ["iOS", "Android", "Web"],
        features: ["Scan & Send", "Auto-Expiry", "One-time View", "Download & Print options", "Print copies & Print style"],
    },
    /*{
       name: "PulseHealth",
       tagline: "Your wellness companion",
       description: "Track your health holistically with PulseHealth. From fitness metrics to mental wellness check-ins, this app gives you a 360° view of your well-being with personalized insights.",
       gradient: "from-green-500 to-emerald-600",
       platforms: ["iOS", "Android"],
       features: ["Health Metrics Tracking", "Mood & Wellness Logs", "Personalized Insights", "Wearable Integration"],
   },
   {
       name: "SnapVault",
       tagline: "Secure media storage",
       description: "End-to-end encrypted media storage that puts privacy first. SnapVault lets you store, organize, and share your photos and videos with military-grade security.",
       gradient: "from-orange-500 to-red-500",
       platforms: ["iOS", "Android", "Web"],
       features: ["E2E Encryption", "Smart Albums", "Secure Sharing", "Cloud Backup"],
    }, */
];

const platformIcons: Record<string, React.ReactNode> = {
    iOS: <Apple size={14} />,
    Android: <Smartphone size={14} />,
    Web: <Globe size={14} />,
};

const Apps = () => {
    return (
        <div className="min-h-screen pt-24">
            <section className="pt-4 pb-14 md:pb-16 px-4 relative overflow-hidden">
                <ParallaxLayer speed={0.1} className="absolute top-20 left-0 pointer-events-none">
                    <div className="w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/2" />
                </ParallaxLayer>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10 md:mb-12">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                Our Products
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Apps We've Built</h1>
                            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Products born from our passion for solving real-world problems with elegant technology.</p>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-10 md:space-y-12">
                        {apps.map((app, i) => (
                            <AnimatedSection key={i} delay={0.1} direction={i % 2 === 0 ? "left" : "right"}>
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="glass-card rounded-2xl overflow-hidden"
                                >
                                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.4 }}
                                            className={`bg-gradient-to-br ${app.gradient} p-10 md:p-16 flex items-center justify-center min-h-[300px] ${i % 2 === 1 ? "lg:order-2" : ""}`}
                                        >
                                            <div className="text-center">
                                                <motion.div
                                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                                    className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-4"
                                                >
                                                    <span className="text-5xl font-heading font-bold text-white">{app.name[0]}</span>
                                                </motion.div>
                                                <h3 className="text-2xl font-heading font-bold text-white">{app.name}</h3>
                                                <p className="text-white/80 mt-1">{app.tagline}</p>
                                            </div>
                                        </motion.div>

                                        <div className={`p-8 md:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                                            <div className="flex gap-2 mb-4">
                                                {app.platforms.map((p) => (
                                                    <span key={p} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium">
                                                        {platformIcons[p]} {p}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-muted-foreground leading-relaxed mb-6">{app.description}</p>
                                            <StaggerContainer className="grid grid-cols-2 gap-2 mb-8" staggerDelay={0.08}>
                                                {app.features.map((f) => (
                                                    <StaggerItem key={f}>
                                                        <div className="flex items-center gap-2 text-sm text-foreground">
                                                            <div className="w-1.5 h-1.5 rounded-full gradient-bg shrink-0" />
                                                            {f}
                                                        </div>
                                                    </StaggerItem>
                                                ))}
                                            </StaggerContainer>
                                            <div className="flex gap-3">
                                                <Button className="gradient-bg text-primary-foreground hover:opacity-90">
                                                    Download <ExternalLink size={14} />
                                                </Button>
                                                <Button variant="outline" className="border-border/50">Learn More</Button>
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
