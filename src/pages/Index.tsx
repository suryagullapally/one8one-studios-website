import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Globe, Layers, Palette, Rocket, Smartphone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedSection, { ParallaxLayer, FloatingElement, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { studioProjects } from "@/data/projects";

const stats = [
    { icon: Rocket, value: "02", label: "Projects Shipped" },
    { icon: Users, value: "01", label: "Client Project" },
    { icon: Globe, value: "India + UK", label: "Delivery Reach" },
];

const services = [
    { icon: Smartphone, title: "Product & App Development", description: "Mobile apps, web platforms and product workflows designed around real users and launch constraints." },
    { icon: Palette, title: "UI/UX & Product Design", description: "Interface systems, user journeys and polished product surfaces shaped before the build gets expensive." },
    { icon: Layers, title: "End-to-End Engineering", description: "Frontend, backend, payments, integrations, deployment and support handled as one connected delivery." },
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
                            Product studio for apps and client platforms
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
                            We design, engineer and launch mobile apps, web platforms and digital products, from our own software to production systems for clients in India and the UK.
                        </p>
                    </AnimatedSection>

                    <AnimatedSection delay={0.3}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/apps">
                                <Button size="lg" className="gradient-bg text-primary-foreground text-base px-8 hover:opacity-90">
                                    Explore Our Work <ArrowRight size={18} />
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
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                End-to-end mobile app development, web app development, product design, and backend software delivery for teams that need reliable, launch-ready products.
                            </p>
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

            {/* Featured Work Preview */}
            <section className="py-14 md:py-16 px-4 bg-card/30 relative overflow-hidden">
                {/* Parallax decorative elements */}
                <ParallaxLayer speed={0.15} className="absolute top-0 right-0 pointer-events-none">
                    <div className="w-72 h-72 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                </ParallaxLayer>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection>
                        <div className="text-center mb-10">
                            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Selected Work</h2>
                            <p className="text-muted-foreground max-w-xl mx-auto">Products and client platforms we've designed, built and shipped.</p>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2" staggerDelay={0.12}>
                        {studioProjects.map((project) => (
                            <StaggerItem key={project.slug}>
                                <motion.div
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className={`h-full overflow-hidden rounded-xl border p-4 shadow-xl shadow-black/10 ${project.visual.cardClass}`}
                                >
                                    <div className={`relative mb-5 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg ${project.visual.backgroundClass}`}>
                                        {project.visual.heroImage ? (
                                            <>
                                                <img
                                                    src={project.visual.heroImage}
                                                    alt={project.visual.heroAlt}
                                                    width={1600}
                                                    height={893}
                                                    loading="lazy"
                                                    className="absolute inset-0 h-full w-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
                                                {project.visual.logo && (
                                                    <img
                                                        src={project.visual.logo}
                                                        alt={`${project.shortName} logo`}
                                                        width={1024}
                                                        height={768}
                                                        loading="lazy"
                                                        className="relative z-10 h-auto w-44 drop-shadow-2xl"
                                                    />
                                                )}
                                            </>
                                        ) : (
                                            <motion.div
                                                whileHover={{ scale: 1.08, rotate: -2 }}
                                                className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-black/20"
                                            >
                                                <span className="font-heading text-2xl font-bold text-white">{project.shortName}</span>
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <div className="mb-3 flex flex-wrap gap-2">
                                            <span className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${project.visual.accentClass}`}>
                                                {project.typeLabel}
                                            </span>
                                            {project.projectType === "client-project" && (
                                                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300">
                                                    United Kingdom
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="font-heading text-xl font-semibold text-white">{project.name}</h3>
                                        <p className={`mt-1 text-sm font-medium ${project.visual.accentClass}`}>{project.tagline}</p>
                                        <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-300/85">{project.homepageDescription}</p>

                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {project.cardChips.map((chip) => (
                                                <span key={chip} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300">
                                                    {chip}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <Button asChild size="sm" className={project.slug === "basilico" ? "bg-[#f6c56f] text-[#15100b] hover:bg-[#ffd887]" : "gradient-bg text-primary-foreground"}>
                                                <Link to={project.internalPath}>{project.slug === "basilico" ? "View Project" : "Learn More"}</Link>
                                            </Button>
                                            <Button asChild size="sm" variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07]">
                                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    {project.slug === "basilico" ? "Visit Live Site" : "Open BEJO"}
                                                    <ExternalLink size={14} className="ml-2" />
                                                </a>
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    <AnimatedSection delay={0.3}>
                        <div className="text-center mt-10">
                            <Link to="/apps">
                                <Button variant="outline" className="border-border/50 hover:bg-muted/50">
                                    View All Work <ArrowRight size={16} />
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
                                <p className="text-muted-foreground max-w-lg mx-auto mb-8">Let's turn your idea into a reliable product or platform. Get in touch and let's start the conversation.</p>
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
