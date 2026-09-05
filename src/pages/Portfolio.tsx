import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { studioProjects, type StudioProject } from "@/data/projects";

const filters = ["All", ...Array.from(new Set(studioProjects.flatMap((project) => project.categories)))];

const ProjectMark = ({ project }: { project: StudioProject }) => (
    <div className={`relative mb-5 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg ${project.visual.backgroundClass}`}>
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
                <div className="absolute inset-0 bg-black/45" />
                {project.visual.logo && (
                    <img
                        src={project.visual.logo}
                        alt={`${project.shortName} logo`}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="relative z-10 h-auto w-40 drop-shadow-xl"
                    />
                )}
            </>
        ) : (
            <motion.span whileHover={{ scale: 1.12 }} className="font-heading font-bold text-2xl text-white">
                {project.shortName}
            </motion.span>
        )}
    </div>
);

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

    const filtered = activeFilter === "All" ? studioProjects : studioProjects.filter((project) => project.categories.includes(activeFilter));
    const selectedProject = selectedSlug ? studioProjects.find((project) => project.slug === selectedSlug) : null;

    return (
        <div className="min-h-screen pt-24">
            <section className="pt-4 pb-14 md:pb-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                Our Work
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Portfolio & Case Studies</h1>
                            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Real products and client platforms we've designed, built and shipped.</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <div className="mb-10 flex flex-wrap justify-center gap-2">
                            {filters.map((filter) => (
                                <motion.button
                                    key={filter}
                                    type="button"
                                    onClick={() => {
                                        setActiveFilter(filter);
                                        setSelectedSlug(null);
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                                        activeFilter === filter ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {filter}
                                </motion.button>
                            ))}
                        </div>
                    </AnimatedSection>

                    <AnimatePresence mode="wait">
                        {!selectedProject ? (
                            <motion.div
                                key={`grid-${activeFilter}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filtered.length > 0 ? (
                                    <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2" staggerDelay={0.08}>
                                        {filtered.map((project) => (
                                            <StaggerItem key={project.slug}>
                                                <motion.button
                                                    type="button"
                                                    onClick={() => setSelectedSlug(project.slug)}
                                                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(217 91% 60% / 0.15)" }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className={`h-full w-full cursor-pointer rounded-xl border p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${project.visual.cardClass}`}
                                                >
                                                    <ProjectMark project={project} />
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.categories.map((category) => (
                                                            <span key={category} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                                {category}
                                                            </span>
                                                        ))}
                                                        <span className={`rounded-full bg-white/[0.05] px-2 py-1 text-xs font-semibold ${project.visual.accentClass}`}>
                                                            {project.typeLabel}
                                                        </span>
                                                    </div>
                                                    <h2 className="mt-3 font-heading text-xl font-semibold text-white">{project.name}</h2>
                                                    <p className="mb-3 mt-1 text-sm text-muted-foreground">
                                                        {project.projectType === "client-project" ? `Client: ${project.client}` : "Company-owned One8One Studios product"}
                                                    </p>
                                                    <p className="text-sm leading-relaxed text-muted-foreground">{project.portfolioSummary}</p>
                                                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary transition-all">
                                                        View Case Study <ArrowRight size={14} />
                                                    </div>
                                                </motion.button>
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>
                                ) : (
                                    <div className="glass-card max-w-xl mx-auto p-8 text-center">
                                        <h2 className="font-heading text-2xl font-semibold mb-3">No {activeFilter} projects yet</h2>
                                        <p className="text-muted-foreground">New case studies will appear here as soon as they are ready.</p>
                                    </div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <article className={`mx-auto max-w-4xl rounded-2xl border p-6 md:p-10 ${selectedProject.visual.cardClass}`}>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedSlug(null)}
                                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        <ArrowLeft size={14} />
                                        Back to Portfolio
                                    </button>

                                    <ProjectMark project={selectedProject} />

                                    <div className="flex flex-wrap items-center gap-2 mb-3">
                                        {selectedProject.categories.map((category) => (
                                            <span key={category} className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                                {category}
                                            </span>
                                        ))}
                                        <span className={`rounded-full bg-white/[0.05] px-2 py-1 text-xs font-semibold ${selectedProject.visual.accentClass}`}>
                                            {selectedProject.typeLabel}
                                        </span>
                                    </div>

                                    <h2 className="font-heading text-3xl font-bold text-white">{selectedProject.name}</h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {selectedProject.projectType === "client-project"
                                            ? `Client: ${selectedProject.client} · ${selectedProject.clientLocation}`
                                            : "Company-owned One8One Studios product"}
                                    </p>

                                    <StaggerContainer className="space-y-8 mt-8" staggerDelay={0.12}>
                                        {[
                                            { label: "The Challenge", content: selectedProject.challenge },
                                            { label: "Our Solution", content: selectedProject.solution },
                                            { label: "Results", content: selectedProject.outcome },
                                        ].map((section) => (
                                            <StaggerItem key={section.label}>
                                                <h3 className={`font-heading text-lg font-semibold mb-2 ${selectedProject.visual.accentClass}`}>
                                                    {section.label}
                                                </h3>
                                                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>

                                    <div className="mt-8">
                                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-3 text-white">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologyHighlights.map((tech) => (
                                                <motion.span
                                                    key={tech}
                                                    whileHover={{ scale: 1.08 }}
                                                    className="rounded-full bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Button asChild className={selectedProject.slug === "basilico" ? "bg-[#f6c56f] text-[#15100b] hover:bg-[#ffd887]" : "gradient-bg text-primary-foreground"}>
                                            <Link to={selectedProject.internalPath}>Open Detail Page</Link>
                                        </Button>
                                        <Button asChild variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07]">
                                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                                                Visit Live Site
                                                <ExternalLink size={14} className="ml-2" />
                                            </a>
                                        </Button>
                                    </div>
                                </article>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
