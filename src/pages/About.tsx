import { Lightbulb, Shield, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection, { ParallaxLayer, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";

const values = [
    { icon: Lightbulb, title: "Innovation", description: "We push boundaries and embrace emerging technologies to deliver forward-thinking solutions." },
    { icon: Shield, title: "Quality", description: "Every line of code is crafted with care. We ship products we're proud of, every single time." },
    { icon: Heart, title: "Impact", description: "We build apps that make a real difference in people's lives and the communities we serve." },
    { icon: Users, title: "Collaboration", description: "Great products come from great partnerships. We work alongside our clients, not just for them." },
];

const team = [
    { name: "Surya Teja Gullapally", role: "CEO & Founder", bio: "Full stack Java developer with 10+ years in tech, Worked at various tech companies, IBM, CGI, Value Labs." },
    { name: "Sujatha Allabani", role: "Co-founder & CTO", bio: "Full-stack architect and system engineer worked in IBM and other companies." },
    { name: "Sudiksha Raipole", role: "Co-founder & Head of Design", bio: "Award-winning designer focused on human-centered experiences." },
   /* { name: "Jordan Lee", role: "Lead Developer", bio: "Mobile-first engineer who's shipped 20+ production apps." }, */
];

const milestones = [
    { year: "2025", event: "One8one Studios founded with a vision to democratize app development." },
    { year: "2026", event: "Launched BEJO as a company-owned product and shipped Basilico as a UK client platform." },
];

const About = () => {
    return (
        <div className="min-h-screen pt-24">
            {/* Mission */}
            <section className="pt-4 pb-14 md:pb-16 px-4 relative overflow-hidden">
                <ParallaxLayer speed={0.15} className="absolute top-10 right-0 pointer-events-none">
                    <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
                </ParallaxLayer>

                <div className="container mx-auto px-4 max-w-4xl relative z-10">
                    <AnimatedSection direction="scale">
                        <div className="text-center">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                About Us
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">We're on a Mission to Build<br /><span className="gradient-text">What Matters</span></h1>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                                One8one Studios was founded on the belief that great technology should be accessible to practical teams and real businesses. We build our own products and help clients bring useful digital platforms to life.
                            </p>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Values */}
            <section className="py-14 md:py-16 px-4 bg-card/30">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">Our Values</h2>
                    </AnimatedSection>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                        {values.map((v, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -8, boxShadow: "0 20px 40px -15px hsl(217 91% 60% / 0.15)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card p-6 rounded-xl text-center"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mx-auto mb-4"
                                    >
                                        <v.icon size={22} className="text-primary-foreground" />
                                    </motion.div>
                                    <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">{v.description}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Team */}
            <section className="py-14 md:py-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">Meet the Team</h2>
                    </AnimatedSection>
                    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
                        {team.map((member, i) => (
                            <StaggerItem key={i}>
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="glass-card p-6 rounded-xl text-center"
                                >
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mx-auto mb-4"
                                    >
                                        <span className="font-heading font-bold text-xl gradient-text">{member.name.split(" ").map(n => n[0]).join("")}</span>
                                    </motion.div>
                                    <h3 className="font-heading font-semibold">{member.name}</h3>
                                    <p className="text-primary text-sm font-medium mb-2">{member.role}</p>
                                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-14 md:py-16 px-4 bg-card/30">
                <div className="container mx-auto px-4 max-w-2xl">
                    <AnimatedSection>
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-10">Our Journey</h2>
                    </AnimatedSection>
                    <div className="space-y-6">
                        {milestones.map((m, i) => (
                            <AnimatedSection key={i} delay={i * 0.1} direction={i % 2 === 0 ? "left" : "right"}>
                                <div className="flex gap-6 items-start">
                                    <div className="shrink-0 w-16 text-right">
                                        <span className="font-heading font-bold text-lg gradient-text">{m.year}</span>
                                    </div>
                                    <div className="relative">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="w-3 h-3 rounded-full gradient-bg mt-1.5"
                                        />
                                        {i < milestones.length - 1 && <div className="absolute top-4 left-1.5 w-px h-full bg-border/50 -translate-x-px" />}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed pb-4">{m.event}</p>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
