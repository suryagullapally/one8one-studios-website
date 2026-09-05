import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Apple, ArrowRight, ExternalLink, Globe, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import BejoDownloadDropdown from "@/components/BejoDownloadDropdown";
import { clientProjects, companyProjects, type StudioProject } from "@/data/projects";

const platformIcons: Record<string, ReactNode> = {
    iOS: <Apple size={14} />,
    Android: <Smartphone size={14} />,
    Web: <Globe size={14} />,
};

const projectGroups = [
    {
        title: "One8One Products",
        description: "Company-owned products designed, engineered and operated by One8One Studios.",
        projects: companyProjects,
    },
    {
        title: "Client Projects",
        description: "Production platforms delivered for real businesses and their customers.",
        projects: clientProjects,
    },
];

const ProjectVisual = ({ project }: { project: StudioProject }) => (
    <div className={`relative min-h-[280px] overflow-hidden bg-[#302b63] p-8 md:p-10 flex items-center justify-center ${project.visual.backgroundClass}`}>
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
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,4,3,0.24)_0%,rgba(5,4,3,0.72)_100%)]" />
                {project.visual.logo && (
                    <img
                        src={project.visual.logo}
                        alt={`${project.shortName} logo`}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="relative z-10 h-auto w-56 max-w-[78%] drop-shadow-2xl"
                    />
                )}
            </>
        ) : (
            <>
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.02)_38%,rgba(8,10,26,0.38)_100%)]" />
                <div className="relative z-10 text-center">
                    <h3 className="font-heading text-5xl md:text-6xl font-bold tracking-normal text-white">{project.name}</h3>
                    <p className="mt-3 text-xl font-semibold text-white/80">{project.tagline}</p>
                </div>
            </>
        )}
    </div>
);

const WorkCard = ({ project, index }: { project: StudioProject; index: number }) => (
    <AnimatedSection delay={0.1} direction={index % 2 === 0 ? "left" : "right"}>
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`overflow-hidden rounded-[1.75rem] border shadow-2xl shadow-black/30 backdrop-blur-xl ${project.visual.cardClass}`}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <ProjectVisual project={project} />

                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-5 flex flex-wrap gap-2">
                        <span className={`rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${project.visual.accentClass}`}>
                            {project.typeLabel}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300/90">
                            {project.status}
                        </span>
                    </div>

                    <div className="mb-6">
                        <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.28em] ${project.visual.accentClass}`}>
                            {project.eyebrow}
                        </p>
                        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">{project.name}</h2>
                        <p className={`mt-2 text-base font-medium ${project.visual.accentClass}`}>{project.tagline}</p>
                        <p className="mt-5 text-base leading-relaxed text-slate-300/85">{project.cardDescription}</p>
                    </div>

                    <div className="mb-7 flex flex-wrap gap-2">
                        {project.cardChips.map((chip) => (
                            <span key={chip} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300/80">
                                {platformIcons[chip]} {chip}
                            </span>
                        ))}
                    </div>

                    <div className="mb-8 flex flex-wrap gap-2">
                        {project.technologyHighlights.map((tech) => (
                            <span key={tech} className="rounded-full bg-white/[0.05] px-3 py-1 text-xs font-medium text-slate-300">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {project.slug === "bejo" ? (
                            <>
                                <BejoDownloadDropdown className="bg-white text-[#302b63] hover:bg-white/90" />

                                <Button asChild variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07] transition-all">
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                        Open
                                        <ExternalLink size={16} />
                                    </a>
                                </Button>

                                <Button asChild variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07] transition-all">
                                    <Link to={project.internalPath}>Learn More</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button asChild className="bg-[#f6c56f] text-[#15100b] hover:bg-[#ffd887]">
                                    <Link to={project.internalPath}>
                                        View Case Study
                                        <ArrowRight size={16} className="ml-2" />
                                    </Link>
                                </Button>

                                <Button asChild variant="outline" className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.07] transition-all">
                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                        Visit Live Site
                                        <ExternalLink size={16} />
                                    </a>
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    </AnimatedSection>
);

const Apps = () => {
    return (
        <div className="min-h-screen pt-24 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(247_42%_8%)_48%,hsl(var(--background))_100%)]">
            <section className="pt-4 pb-14 md:pb-16 px-4 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10 md:mb-12">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-[#8d7cff]/30 bg-[#8d7cff]/10 text-[#bdb4ff] text-sm font-medium mb-6">
                                Our Work
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white">Products & Platforms We've Built</h1>
                            <p className="text-slate-300/85 max-w-2xl mx-auto text-lg">
                                From our own software products to production client platforms.
                            </p>
                        </div>
                    </AnimatedSection>

                    <div className="space-y-14 md:space-y-16">
                        {projectGroups.map((group) => (
                            <section key={group.title}>
                                <AnimatedSection>
                                    <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                                        <div>
                                            <h2 className="font-heading text-2xl font-semibold text-white">{group.title}</h2>
                                            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300/75">{group.description}</p>
                                        </div>
                                    </div>
                                </AnimatedSection>

                                <StaggerContainer className="space-y-8" staggerDelay={0.1}>
                                    {group.projects.map((project, index) => (
                                        <StaggerItem key={project.slug}>
                                            <WorkCard project={project} index={index} />
                                        </StaggerItem>
                                    ))}
                                </StaggerContainer>
                            </section>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Apps;
