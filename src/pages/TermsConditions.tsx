import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, FileText, Mail } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { termsSections } from "@/data/bejoContent";

const TermsConditions = () => {
    return (
        <div className="min-h-screen pt-24 bg-[linear-gradient(180deg,hsl(var(--background))_0%,hsl(247_42%_8%)_45%,hsl(var(--background))_100%)]">
            <section className="pt-4 pb-14 md:pb-16 px-4">
                <div className="container mx-auto max-w-5xl px-4">
                    <AnimatedSection>
                        <Link to="/apps/bejo" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-300/80 transition-colors hover:text-white">
                            <ArrowLeft size={16} />
                            Back to BEJO
                        </Link>
                    </AnimatedSection>

                    <AnimatedSection direction="scale">
                        <div className="mb-10 rounded-[2rem] border border-white/10 bg-[#0c1020]/85 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-xl md:p-12">
                            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#8d7cff]/15 text-[#bdb4ff]">
                                <FileText size={28} />
                            </div>
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#bdb4ff]">BEJO</p>
                            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Terms & Conditions</h1>
                            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-300/85">
                                These Terms govern your access to and use of Bejo. By accessing or using Bejo, you agree to these Terms. If you do not agree, you must not use Bejo.
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300/80">
                                <CalendarDays size={16} />
                                Effective Date: 27 June 2026
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <article className="rounded-[1.75rem] border border-white/10 bg-[#0c1020]/85 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-10">
                            <div className="space-y-10">
                                {termsSections.map((section) => (
                                    <section key={section.title} className="border-b border-white/10 pb-8 last:border-b-0 last:pb-0">
                                        <h2 className="font-heading text-2xl font-semibold text-white">{section.title}</h2>
                                        <div className="mt-5 space-y-3">
                                            {section.items.map((item) => (
                                                <div key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300/85 md:text-base">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#bdb4ff]" />
                                                    <span className="whitespace-pre-line">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                ))}

                                <section className="rounded-2xl border border-[#8d7cff]/20 bg-[#8d7cff]/10 p-6">
                                    <div className="mb-4 flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-[#bdb4ff]" />
                                        <h2 className="font-heading text-2xl font-semibold text-white">Contact</h2>
                                    </div>
                                    <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300/85 md:text-base">
                                        Support: support.bejo@one8onestudios.com{"\n"}
                                        Privacy and grievance contact: privacy.bejo@one8onestudios.com{"\n"}
                                        Website: https://bejo.one8onestudios.com{"\n"}
                                        Privacy Policy: https://bejo.one8onestudios.com/privacy-policy{"\n"}
                                        Terms: https://bejo.one8onestudios.com/terms-and-conditions
                                    </p>
                                </section>
                            </div>
                        </article>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default TermsConditions;
