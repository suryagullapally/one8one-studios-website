import { Link } from "react-router-dom";
import { ArrowRight, Smartphone, Palette, Layers, Rocket, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection, { ParallaxLayer, FloatingElement, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const stats = [
    { icon: Rocket, value: "01", label: "Apps Launched" },
    /*{ icon: Users, value: "00", label: "Clients Served" },*/
    { icon: Calendar, value: "1", label: "Startup Year" },
];

const services = [
    { icon: Smartphone, title: "Custom App Development", description: "Native and cross-platform apps built with cutting-edge technology for iOS, Android, and Web." },
    { icon: Palette, title: "UI/UX Design", description: "Human-centered design that delights users and drives engagement with intuitive interfaces." },
    { icon: Layers, title: "End-to-End Solutions", description: "From concept to deployment and beyond — we handle the entire app lifecycle." },
];

const featuredApps = [
    { name: "Bejo", tagline: "Aaram Se", color: "from-primary to-accent" },
    // { name: "PulseHealth", tagline: "Your wellness companion", color: "from-green-500 to-emerald-600" },
    // { name: "SnapVault", tagline: "Secure media storage", color: "from-orange-500 to-red-500" },
];

const Index = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
    const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Parallax background blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <FloatingElement duration={8} distance={20} className="absolute top-1/4 left-1/4">
                        <div className="w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                    </FloatingElement>
                    <FloatingElement duration={10} distance={25} className="absolute bottom-1/4 right-1/4">
                        <div className="w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
                    </FloatingElement>
                    <FloatingElement duration={12} distance={15} className="absolute top-1/2 right-1/3">
                        <div className="w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                    </FloatingElement>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--background))_70%)]" />
                </div>

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container mx-auto px-4 relative z-10 text-center">
                    <AnimatedSection>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8"
                        >
                            Building the future, one app at a time
                        </motion.div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold leading-tight mb-6">
                            We Build. We Ship.
                            <br />
                            <span className="gradient-text">We Transform.</span>
                        </h1>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                            We craft exceptional apps that solve real problems — for our own portfolio and for visionary businesses ready to disrupt their industries.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/apps">
                                <Button size="lg" className="gradient-bg text-primary-foreground text-base px-8 hover:opacity-90">
                                    Explore Our Apps <ArrowRight size={18} />
                                </Button>
                            </Link>
                            <Link to="/contact">
                                <Button size="lg" variant="outline" className="text-base px-8 border-border/50 hover:bg-muted/50">
                                    Work With Us
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
                    >
                        <motion.div className="w-1 h-2 rounded-full bg-primary" />
                    </motion.div>
                </motion.div>
            </section>

            {/* Stats */}
            <section className="py-12 md:py-14 px-4 border-y border-border/20">
                <div className="container mx-auto px-4">
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
                        {stats.map((stat, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="text-center"
                                >
                                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                    <div className="font-heading text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Services */}
            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">End-to-end app development services that turn ideas into impactful digital products.</p>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
                        {services.map((service, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(217 91% 60% / 0.2)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card p-8 rounded-xl group"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-6"
                                    >
                                        <service.icon size={22} className="text-primary-foreground" />
                                    </motion.div>
                                    <h3 className="font-heading text-xl font-semibold mb-3">{service.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Featured Apps Preview */}
            <section className="py-14 md:py-16 px-4 bg-card/30 relative overflow-hidden">
                {/* Parallax decorative elements */}
                <ParallaxLayer speed={0.15} className="absolute top-0 right-0 pointer-events-none">
                    <div className="w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                </ParallaxLayer>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection>
                        <div className="text-center mb-10">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Our Apps</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">Products we've built in-house, used by thousands worldwide.</p>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.12}>
                        {featuredApps.map((app, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card p-6 rounded-xl group cursor-pointer"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: -3 }}
                                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-5`}
                                    >
                                        <span className="text-2xl font-heading font-bold text-white">{app.name[0]}</span>
                                    </motion.div>
                                    <h3 className="font-heading text-lg font-semibold mb-1">{app.name}</h3>
                                    <p className="text-muted-foreground text-sm">{app.tagline}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <AnimatedSection delay={0.3}>
                        <div className="text-center mt-10">
                            <Link to="/apps">
                                <Button variant="outline" className="border-border/50 hover:bg-muted/50">
                                    View All Apps <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA */}
            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection direction="scale">
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
                            <FloatingElement duration={8} distance={10} className="absolute -top-10 -right-10 pointer-events-none">
                                <div className="w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
                            </FloatingElement>
                            <div className="relative z-10">
                                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Build Something Amazing?</h2>
                                <p className="text-muted-foreground max-w-lg mx-auto mb-8">Let's turn your vision into a world-class app. Get in touch and let's start the conversation.</p>
                                <Link to="/contact">
                                    <Button size="lg" className="gradient-bg text-primary-foreground px-8 hover:opacity-90">
                                        Let's Talk <ArrowRight size={18} />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default Index;
