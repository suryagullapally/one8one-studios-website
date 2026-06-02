import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection, { StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const filters = ["All", "Mobile", "Web", "Enterprise"];

const projects = [
    { title: "Bejo", client: "Company owned", categories: ["Mobile", "Web"], description: "Bejo is a secure QR-based file sharing app that lets you decide what happens with your sent files. It allows you to set a timer for your sent files to expire.", tech: ["Flutter", "Dart", "React Native", "Node.js", "Firebase"], challenge: "Enabling controls and setting an expiry timer before sending a file. .", solution: "We built a sleek cross-platform app with secure data transfering and high end quality transfer with controls.", results: "4.8★ App Store rating, 50K+ downloads in first month" },
    /*  { title: "MediConnect", client: "HealthBridge Inc.", category: "Web", description: "Patient-doctor communication platform with secure video consultations and health record management.", tech: ["React", "WebRTC", "AWS"], challenge: "HealthBridge needed HIPAA-compliant telehealth infrastructure quickly.", solution: "End-to-end encrypted video platform with integrated EHR system and appointment scheduling.", results: "300% increase in patient engagement, HIPAA certified" },
      { title: "LogiFlow", client: "TransGlobal Logistics", category: "Enterprise", description: "Supply chain management system with real-time fleet tracking and predictive analytics.", tech: ["Flutter", "Python", "GCP"], challenge: "Manual logistics tracking causing delays and lost shipments.", solution: "IoT-integrated tracking with ML-powered route optimization and automated alerts.", results: "40% reduction in delivery times, $2M annual savings" },
      { title: "EduSpark", client: "BrightMinds Academy", category: "Mobile", description: "Gamified learning platform for K-12 students with adaptive content delivery.", tech: ["Swift", "Kotlin", "Firebase"], challenge: "Low student engagement with traditional e-learning tools.", solution: "Gamification engine with adaptive difficulty, progress badges, and parent dashboards.", results: "85% daily active rate, used by 200+ schools" },
      { title: "RetailHub", client: "ShopEase Corp", category: "Web", description: "Omnichannel retail platform with inventory management and customer analytics.", tech: ["Next.js", "Stripe", "MongoDB"], challenge: "Disconnected online and in-store experiences hurting sales.", solution: "Unified commerce platform with real-time inventory sync and personalized recommendations.", results: "28% revenue increase in 6 months" },
      { title: "GreenPulse", client: "EcoTech Solutions", category: "Enterprise", description: "Carbon footprint monitoring dashboard for enterprise sustainability reporting.", tech: ["React", "D3.js", "Python"], challenge: "No automated way to track and report ESG metrics.", solution: "Automated data collection from IoT sensors with beautiful compliance dashboards.", results: "Adopted by 50+ enterprises, ISO 14001 compliant" },*/
];

const Portfolio = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.categories.includes(activeFilter));

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
                            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Real results for real businesses. Explore the apps we've built.</p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <div className="flex justify-center gap-2 mb-10">
                            {filters.map((f) => (
                                <motion.button
                                    key={f}
                                    onClick={() => { setActiveFilter(f); setSelectedProject(null); }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeFilter === f ? "gradient-bg text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {f}
                                </motion.button>
                            ))}
                        </div>
                    </AnimatedSection>

                    <AnimatePresence mode="wait">
                        {selectedProject === null ? (
                            <motion.div
                                key={`grid-${activeFilter}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filtered.length > 0 ? (
                                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.08}>
                                        {filtered.map((project) => (
                                            <StaggerItem key={project.title}>
                                                <motion.div
                                                    onClick={() => setSelectedProject(projects.indexOf(project))}
                                                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(217 91% 60% / 0.15)" }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                    className="glass-card rounded-xl p-6 cursor-pointer group"
                                                >
                                                    <div className="w-full h-40 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 overflow-hidden">
                                                        <motion.span
                                                            whileHover={{ scale: 1.2 }}
                                                            className="font-heading font-bold text-2xl gradient-text"
                                                        >
                                                            {project.title[0]}{project.title.split(" ")[1]?.[0]}
                                                        </motion.span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.categories.map((category) => (
                                                            <span key={category} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{category}</span>
                                                        ))}
                                                    </div>
                                                    <h3 className="font-heading text-lg font-semibold mt-3 mb-1">{project.title}</h3>
                                                    <p className="text-muted-foreground text-sm mb-3">{project.client}</p>
                                                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                                                    <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                                                        View Case Study <ArrowRight size={14} />
                                                    </div>
                                                </motion.div>
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
                                <div className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
                                    <button onClick={() => setSelectedProject(null)} className="text-primary text-sm font-medium mb-6 inline-block hover:underline">
                                        ← Back to Portfolio
                                    </button>
                                    <div className="flex items-center gap-3 mb-2">
                                        {projects[selectedProject].categories.map((category) => (
                                            <span key={category} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">{category}</span>
                                        ))}
                                        <span className="text-muted-foreground text-sm">{projects[selectedProject].client}</span>
                                    </div>
                                    <h2 className="font-heading text-3xl font-bold mb-4">{projects[selectedProject].title}</h2>

                                    <StaggerContainer className="space-y-8 mt-8" staggerDelay={0.15}>
                                        {[
                                            { label: "The Challenge", content: projects[selectedProject].challenge },
                                            { label: "Our Solution", content: projects[selectedProject].solution },
                                            { label: "Results", content: projects[selectedProject].results },
                                        ].map((s) => (
                                            <StaggerItem key={s.label}>
                                                <h3 className="font-heading text-lg font-semibold gradient-text mb-2">{s.label}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{s.content}</p>
                                            </StaggerItem>
                                        ))}
                                    </StaggerContainer>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="mt-8"
                                    >
                                        <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-3">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {projects[selectedProject].tech.map((t) => (
                                                <motion.span
                                                    key={t}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="px-3 py-1 rounded-full bg-muted/50 text-muted-foreground text-xs font-medium"
                                                >
                                                    {t}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
