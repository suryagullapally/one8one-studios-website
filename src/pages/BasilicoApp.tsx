import { Link } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Calendar,
    Check,
    CreditCard,
    Database,
    ExternalLink,
    Globe,
    LayoutDashboard,
    Mail,
    MapPin,
    Server,
    ShieldCheck,
    ShoppingCart,
    Smartphone,
    Truck,
    Utensils,
    User,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { basilicoProject } from "@/data/projects";

const heroMeta = [
    { label: "Client", value: basilicoProject.client, icon: User },
    { label: "Industry", value: basilicoProject.industry, icon: Utensils },
    { label: "Market", value: basilicoProject.market, icon: Globe },
    { label: "Status", value: basilicoProject.status, icon: ShieldCheck },
];

const challengeIcons = [Globe, Calendar, ShoppingCart, Truck, LayoutDashboard];
const solutionIcons = [Smartphone, LayoutDashboard, CreditCard, Server];
const capabilityIcons = [Utensils, Calendar, Truck, CreditCard, LayoutDashboard, Mail];

const BasilicoApp = () => {
    const caseStudy = basilicoProject.caseStudy;

    return (
        <div className="min-h-screen pt-24 bg-[#050403] text-[#fff8ea] bg-[radial-gradient(circle_at_top_left,rgba(35,103,65,0.22),transparent_34%),linear-gradient(180deg,#050403_0%,#11100c_46%,#050403_100%)]">
            <section className="pt-4 pb-14 md:pb-16 px-4 overflow-hidden">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <Link
                            to="/apps"
                            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#f6c56f] transition-colors hover:text-[#fff8ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6c56f] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050403]"
                        >
                            <ArrowLeft size={16} />
                            Back to work
                        </Link>
                    </AnimatedSection>

                    <AnimatedSection delay={0.05}>
                        <div className="grid gap-6 rounded-[2rem] border border-[#f6c56f]/20 bg-[#0f0b08]/85 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:p-6 lg:grid-cols-[1.02fr_0.98fr]">
                            <div className="flex flex-col justify-center p-3 md:p-6 lg:p-8">
                                <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#f6c56f]/30 bg-[#f6c56f]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#f6c56f]">
                                    {basilicoProject.eyebrow}
                                </div>

                                <h1 className="font-heading text-4xl font-bold leading-tight text-[#fff8ea] md:text-6xl">
                                    {basilicoProject.name}
                                </h1>
                                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#f2dfba]/85 md:text-xl">
                                    A complete restaurant platform built for a live hospitality business in Dorchester, UK.
                                </p>

                                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                    {heroMeta.map((item) => (
                                        <div key={item.label} className="rounded-xl border border-[#f6c56f]/15 bg-[#fff8ea]/[0.035] p-4">
                                            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#d7aa55]">
                                                <item.icon size={14} />
                                                {item.label}
                                            </div>
                                            <p className="text-sm font-medium text-[#fff8ea]">{item.value}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                    <Button asChild size="lg" className="bg-[#f6c56f] text-[#15100b] hover:bg-[#ffd887]">
                                        <a href={basilicoProject.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Basilico live website">
                                            Visit Live Website
                                            <ExternalLink size={16} className="ml-2" />
                                        </a>
                                    </Button>
                                    <Button
                                        asChild
                                        size="lg"
                                        variant="outline"
                                        className="border-[#f6c56f]/30 bg-transparent text-[#fff8ea] hover:bg-[#f6c56f]/10 hover:text-[#fff8ea]"
                                    >
                                        <a href="#build">
                                            Explore the Build
                                            <ArrowRight size={16} className="ml-2" />
                                        </a>
                                    </Button>
                                </div>
                            </div>

                            <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-[#f6c56f]/15 bg-[#17120d]">
                                <img
                                    src={basilicoProject.visual.heroImage}
                                    alt={basilicoProject.visual.heroAlt}
                                    width={1600}
                                    height={893}
                                    loading="eager"
                                    className="absolute inset-0 h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,4,3,0.1)_0%,rgba(5,4,3,0.72)_100%)]" />
                                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                                    <div className="max-w-sm rounded-2xl border border-[#f6c56f]/25 bg-[#050403]/80 p-5 backdrop-blur-md">
                                        <img
                                            src={basilicoProject.visual.logo}
                                            alt="Basilico Simple Italian logo"
                                            width={1024}
                                            height={768}
                                            className="h-auto w-44"
                                        />
                                        <p className="mt-4 text-sm leading-relaxed text-[#f2dfba]/85">
                                            Designed and engineered by One8One Studios for a UK hospitality client.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4 border-y border-[#f6c56f]/10 bg-[#0b0806]/65">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                        <AnimatedSection>
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Project Overview</p>
                                <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">A connected restaurant platform</h2>
                            </div>
                        </AnimatedSection>
                        <AnimatedSection delay={0.1}>
                            <p className="text-base leading-relaxed text-[#f2dfba]/85 md:text-lg">{caseStudy.overview}</p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <div className="mb-10 max-w-3xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Challenge</p>
                            <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">Restaurant workflows have to move together</h2>
                            <p className="mt-4 text-[#f2dfba]/80">{caseStudy.challengeIntro}</p>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid gap-4 md:grid-cols-2 lg:grid-cols-5" staggerDelay={0.08}>
                        {caseStudy.challengePoints.map((point, index) => {
                            const Icon = challengeIcons[index] ?? Check;
                            return (
                                <StaggerItem key={point}>
                                    <div className="h-full rounded-xl border border-[#f6c56f]/15 bg-[#fff8ea]/[0.035] p-5">
                                        <Icon className="mb-4 h-6 w-6 text-[#f6c56f]" />
                                        <p className="text-sm leading-relaxed text-[#f2dfba]/85">{point}</p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            <section id="build" className="py-14 md:py-16 px-4 bg-[#0f0b08]/70">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <div className="mb-10 text-center">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Solution</p>
                            <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">One platform, four connected layers</h2>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid gap-5 md:grid-cols-2" staggerDelay={0.1}>
                        {caseStudy.solutionAreas.map((area, index) => {
                            const Icon = solutionIcons[index] ?? Server;
                            return (
                                <StaggerItem key={area.title}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        transition={{ type: "spring", stiffness: 260 }}
                                        className="h-full rounded-2xl border border-[#f6c56f]/15 bg-[#050403]/55 p-6"
                                    >
                                        <div className="mb-5 inline-flex rounded-xl border border-[#f6c56f]/20 bg-[#f6c56f]/10 p-3">
                                            <Icon className="h-6 w-6 text-[#f6c56f]" />
                                        </div>
                                        <h3 className="font-heading text-xl font-semibold text-[#fff8ea]">{area.title}</h3>
                                        <p className="mt-3 text-sm leading-relaxed text-[#f2dfba]/78">{area.description}</p>
                                    </motion.div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <div className="mb-10 max-w-3xl">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Product Capabilities</p>
                            <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">Built around customer and staff workflows</h2>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.08}>
                        {basilicoProject.capabilities.map((capability, index) => {
                            const Icon = capabilityIcons[index] ?? Check;
                            return (
                                <StaggerItem key={capability.title}>
                                    <div className="h-full rounded-xl border border-[#f6c56f]/15 bg-[#fff8ea]/[0.035] p-5">
                                        <Icon className="mb-4 h-6 w-6 text-[#f6c56f]" />
                                        <h3 className="font-heading text-lg font-semibold text-[#fff8ea]">{capability.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-[#f2dfba]/78">{capability.description}</p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4 border-y border-[#f6c56f]/10 bg-[#0b0806]/65">
                <div className="container mx-auto px-4">
                    <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
                        <AnimatedSection>
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Technology</p>
                                <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">Modern stack, practical deployment</h2>
                                <p className="mt-4 text-sm leading-relaxed text-[#f2dfba]/75">
                                    The public stack is presented at a high level: enough to show engineering depth without exposing private operational details.
                                </p>
                            </div>
                        </AnimatedSection>

                        <StaggerContainer className="grid gap-5 sm:grid-cols-2" staggerDelay={0.1}>
                            {basilicoProject.technologyGroups.map((group) => (
                                <StaggerItem key={group.label}>
                                    <div className="h-full rounded-xl border border-[#f6c56f]/15 bg-[#050403]/55 p-5">
                                        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#f6c56f]">
                                            <Database size={16} />
                                            {group.label}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map((item) => (
                                                <span key={item} className="rounded-full border border-[#f6c56f]/15 bg-[#f6c56f]/10 px-3 py-1 text-xs font-medium text-[#fff8ea]">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
                        <AnimatedSection>
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Delivery</p>
                                <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">Factual production outcomes</h2>
                                <p className="mt-4 text-sm leading-relaxed text-[#f2dfba]/75">
                                    No vanity metrics, no invented lifts. The proof here is a live business platform with real customer and restaurant workflows.
                                </p>
                            </div>
                        </AnimatedSection>

                        <StaggerContainer className="grid gap-3 sm:grid-cols-2" staggerDelay={0.06}>
                            {caseStudy.outcomes.map((outcome) => (
                                <StaggerItem key={outcome}>
                                    <div className="flex h-full gap-3 rounded-xl border border-[#f6c56f]/15 bg-[#fff8ea]/[0.035] p-4 text-sm text-[#f2dfba]/85">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#f6c56f]" />
                                        <span>{outcome}</span>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4 bg-[#0f0b08]/70">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#f6c56f]">Visual Showcase</p>
                                <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">Public-facing Basilico assets</h2>
                            </div>
                            <p className="max-w-md text-sm leading-relaxed text-[#f2dfba]/70">
                                These visuals come from the public customer website assets and do not include private admin data.
                            </p>
                        </div>
                    </AnimatedSection>

                    <StaggerContainer className="grid gap-5 md:grid-cols-2" staggerDelay={0.1}>
                        {caseStudy.showcase.map((asset) => (
                            <StaggerItem key={asset.src}>
                                <figure className="overflow-hidden rounded-2xl border border-[#f6c56f]/15 bg-[#050403]/65">
                                    <div className="aspect-[16/10] overflow-hidden bg-[#17120d]">
                                        <img
                                            src={asset.src}
                                            alt={asset.alt}
                                            width={1600}
                                            height={1000}
                                            loading="lazy"
                                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                                        />
                                    </div>
                                    <figcaption className="p-5">
                                        <h3 className="font-heading text-lg font-semibold text-[#fff8ea]">{asset.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-[#f2dfba]/75">{asset.description}</p>
                                    </figcaption>
                                </figure>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection direction="scale">
                        <div className="rounded-[2rem] border border-[#f6c56f]/20 bg-[linear-gradient(135deg,rgba(246,197,111,0.16),rgba(35,103,65,0.14),rgba(85,27,20,0.18))] p-8 text-center md:p-12">
                            <MapPin className="mx-auto mb-5 h-8 w-8 text-[#f6c56f]" />
                            <h2 className="font-heading text-3xl font-bold text-[#fff8ea] md:text-4xl">Need a platform built around your business?</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-[#f2dfba]/80">
                                One8One Studios designs, engineers and ships production systems for teams that need the product and the operations to work together.
                            </p>
                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                                <Button asChild size="lg" className="bg-[#f6c56f] text-[#15100b] hover:bg-[#ffd887]">
                                    <Link to="/contact">
                                        Start a Project
                                        <ArrowRight size={16} className="ml-2" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="outline"
                                    className="border-[#f6c56f]/30 bg-transparent text-[#fff8ea] hover:bg-[#f6c56f]/10 hover:text-[#fff8ea]"
                                >
                                    <a href={basilicoProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                        Visit Basilico
                                        <ExternalLink size={16} className="ml-2" />
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default BasilicoApp;
