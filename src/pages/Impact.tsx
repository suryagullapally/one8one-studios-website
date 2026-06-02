import { Heart, Globe, GraduationCap, Leaf, Users } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection, { FloatingElement, ParallaxLayer, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const impactStats = [
    { icon: Users, value: "5,000+", label: "Lives Impacted" },
    { icon: GraduationCap, value: "12", label: "Scholarships Funded" },
    { icon: Leaf, value: "100%", label: "Carbon Neutral Operations" },
    { icon: Heart, value: "8", label: "Pro-bono Projects" },
];

const initiatives = [
    { icon: GraduationCap, title: "Tech Education", description: "We fund coding bootcamp scholarships for underrepresented communities, giving aspiring developers the skills to launch careers in tech.", gradient: "from-primary to-accent" },
    { icon: Leaf, title: "Sustainability", description: "Our operations are 100% carbon neutral. We offset all emissions and build energy-efficient apps that minimize digital carbon footprints.", gradient: "from-green-500 to-emerald-600" },
    { icon: Heart, title: "Pro-bono Development", description: "We donate our time and expertise to build apps for non-profits and social enterprises, helping them amplify their missions.", gradient: "from-orange-500 to-red-500" },
    { icon: Globe, title: "Open Source", description: "We contribute to and maintain open-source projects, believing that shared knowledge accelerates innovation for everyone.", gradient: "from-violet-500 to-purple-600" },
];

const Impact = () => {
    return (
        <div className="min-h-screen pt-24">
            <section className="section-padding relative overflow-hidden">
                <ParallaxLayer speed={0.1} className="absolute bottom-0 right-0 pointer-events-none">
                    <div className="w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3" />
                </ParallaxLayer>

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-16">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                Social Impact
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Technology for <span className="gradient-text">Good</span></h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We believe in using our skills and resources to create positive change. Here's how we give back.</p>
                        </div>
                    </AnimatedSection>

                    {/* Impact Stats */}
                    <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20" staggerDelay={0.1}>
                        {impactStats.map((stat, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -6, scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card p-6 rounded-xl text-center"
                                >
                                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                    <div className="font-heading text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* Initiatives */}
                    <AnimatedSection>
                        <h2 className="font-heading text-3xl font-bold text-center mb-12">Our Initiatives</h2>
                    </AnimatedSection>
                    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.12}>
                        {initiatives.map((item, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(217 91% 60% / 0.15)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card p-8 rounded-xl"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-5`}
                                    >
                                        <item.icon size={22} className="text-white" />
                                    </motion.div>
                                    <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>

                    {/* Testimonial */}
                    <AnimatedSection delay={0.2} direction="scale">
                        <div className="mt-20 glass-card rounded-2xl p-10 md:p-16 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5" />
                            <FloatingElement duration={10} distance={8} className="absolute -top-10 -left-10 pointer-events-none">
                                <div className="w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
                            </FloatingElement>
                            <div className="relative z-10">
                                <p className="text-lg md:text-xl italic text-foreground/90 leading-relaxed max-w-2xl mx-auto mb-6">
                                    "One8one Studios didn't just build us an app — they believed in our mission. Their pro-bono work helped us reach 2,000 more families in need."
                                </p>
                                <div>
                                    <p className="font-heading font-semibold">Maria Gonzalez</p>
                                    <p className="text-muted-foreground text-sm">Director, HopeConnect Foundation</p>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default Impact;
