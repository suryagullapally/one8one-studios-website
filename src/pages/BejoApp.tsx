import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Clock3, ExternalLink, FileText, LockKeyhole, Printer, QrCode, ShieldCheck, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/AnimatedSection";
import BejoDownloadDropdown from "@/components/BejoDownloadDropdown";
import { bejoApp, termsSections } from "@/data/bejoContent";

const screenshots = [
    { title: "Dashboard", src: "/bejo-screenshots/dashboard.jpg" },
    { title: "Share With Control", src: "/bejo-screenshots/share-control.jpg" },
    { title: "Scan QR", src: "/bejo-screenshots/scan-qr.jpg" },
    { title: "Smarter Printing", src: "/bejo-screenshots/smarter-printing.jpg" },
    { title: "Everything Arrives Clearly", src: "/bejo-screenshots/everything-arrives-clearly.jpg" },
    { title: "Access Control", src: "/bejo-screenshots/access-control.jpg" },
    { title: "Know The Price", src: "/bejo-screenshots/know-the-price.jpg" },
    { title: "Business Sharing", src: "/bejo-screenshots/business-sharing.jpg" },
    { title: "Secure Storage", src: "/bejo-screenshots/secure-storage.jpg" },
];

const featureCards = [
    { title: "Send and receive", body: "Share files with sender-controlled access, receiver identification, and clear transfer settings.", icon: QrCode },
    { title: "Preview and manage", body: "Access, preview, download, print, and manage files based on product features and permissions.", icon: FileText },
    { title: "Print workflow", body: "Support print-related settings, copy counts, paper options, and print access where enabled.", icon: Printer },
    { title: "Expiry controls", body: "Use expiry timing and file availability controls to keep transfers intentional.", icon: Clock3 },
];

const trustItems = [
    "Sender permissions can control download, print, pause, expiry, and view behavior where supported.",
    "Files are not positioned as permanent archive, backup, legal-record, or guaranteed long-term storage.",
    "Bejo uses Firebase and Google Cloud infrastructure with reasonable technical and organizational safeguards.",
];

const BejoApp = () => {
    const aboutTerms = termsSections.find((section) => section.title === "About Bejo");
    
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollImages = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = window.innerWidth > 768 ? 600 : 300;
            scrollContainerRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen pt-24 bg-[#030108] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d1245] via-[#05030f] to-[#010003]">
            <section className="pt-4 pb-14 md:pb-16 px-4">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <Link to="/apps" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#a395ff] transition-all hover:text-white hover:drop-shadow-[0_0_8px_rgba(163,149,255,0.8)]">
                            <ArrowLeft size={16} />
                            Back to apps
                        </Link>
                    </AnimatedSection>

                    <AnimatedSection delay={0.05}>
                        <div className="grid gap-6 md:gap-8 rounded-[2rem] border border-[#8d7cff]/15 bg-[#0a0616]/60 p-4 md:p-6 shadow-[0_0_50px_rgba(141,124,255,0.05)] backdrop-blur-2xl lg:grid-cols-[0.85fr_1.15fr]">
                            
                            {/* Left Graphic Panel */}
                            <div className="relative flex flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#2b1961] to-[#150a33] p-12 text-center border border-[#8d7cff]/10 shadow-[inset_0_0_40px_rgba(141,124,255,0.1)] overflow-hidden min-h-[340px]">
                                {/* App Icon Square */}
                                <div className="relative flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-[#8d7cff]/30 bg-[#0c051a] shadow-[0_0_30px_rgba(141,124,255,0.3),inset_0_0_15px_rgba(141,124,255,0.15)] mb-5">
                                    <span className="font-heading text-3xl font-extrabold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">BEJO</span>
                                </div>
                                
                                {/* Tagline */}
                                <p className="relative z-10 text-xl font-semibold text-white tracking-wide">{bejoApp.tagline}</p>
                            </div>

                            {/* Right Info Panel */}
                            <div className="flex flex-col justify-center py-4 px-2 md:px-4">
                                <div className="mb-6 flex flex-wrap gap-3">
                                    {bejoApp.platforms.map((platform) => (
                                        <span key={platform} className="inline-flex items-center gap-2 rounded-full border border-[#8d7cff]/30 bg-transparent px-3.5 py-1.5 text-xs font-medium text-slate-300">
                                            <Smartphone size={14} className="text-slate-400" />
                                            {platform}
                                        </span>
                                    ))}
                                </div>
                                
                                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#8d7cff]">Bejo App</p>
                                
                                <h1 className="font-heading text-4xl font-extrabold leading-tight text-white md:text-5xl">{bejoApp.name}</h1>
                                
                                <p className="mt-2 text-xl font-medium text-[#a395ff]">{bejoApp.tagline}</p>
                                
                                <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">{bejoApp.description}</p>
                                
                                {/* Download & Open Buttons */}
                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                                    <BejoDownloadDropdown size="lg" className="bg-[#6145ff] hover:bg-[#523be0] text-white border-none shadow-[0_4px_20px_rgba(97,69,255,0.4)] transition-all duration-300 rounded-lg px-6 h-12" />
                                    <Button
                                        asChild
                                        size="lg"
                                        className="border border-[#8d7cff]/40 bg-[#8d7cff]/10 text-white hover:bg-[#8d7cff]/20 hover:border-[#8d7cff]/70 shadow-[0_0_15px_rgba(141,124,255,0.15)] transition-all duration-300 rounded-lg px-6 h-12 font-medium"
                                    >
                                        <a href="https://bejo.one8onestudios.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                                            Open
                                            <ExternalLink size={16} className="text-[#a395ff]" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <section className="mt-12 w-full overflow-hidden">
                            <div className="mb-6 flex items-end justify-between gap-4">
                                <div>
                                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#8d7cff] drop-shadow-[0_0_8px_rgba(141,124,255,0.6)]">Preview</p>
                                    <h2 className="font-heading text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a395ff] md:text-3xl">App screenshots</h2>
                                </div>
                            </div>

                            <div className="relative group">
                                <button 
                                    onClick={() => scrollImages("left")}
                                    className="absolute left-2 md:-left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#8d7cff]/30 bg-[#0a0616]/90 text-[#a395ff] shadow-[0_0_20px_rgba(141,124,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#8d7cff]/20 hover:text-white sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-0"
                                    aria-label="Scroll left"
                                >
                                    <ChevronLeft size={28} className="pr-1" />
                                </button>

                                <div
                                    ref={scrollContainerRef}
                                    className="flex gap-5 overflow-hidden rounded-[1.5rem] border border-[#8d7cff]/20 bg-[#0a0616]/50 p-5 w-full shadow-[inset_0_0_30px_rgba(141,124,255,0.05)] backdrop-blur-xl"
                                >
                                    {screenshots.map((screen) => (
                                        <figure 
                                            key={screen.src} 
                                            className="shrink-0 w-[85%] sm:w-[calc(50%-0.625rem)] lg:w-[calc(25%-0.9375rem)] overflow-hidden rounded-[1.5rem] border border-[#8d7cff]/30 bg-black/40 p-2 shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(141,124,255,0.15)] transform-gpu hover:border-[#8d7cff]/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_30px_rgba(141,124,255,0.3)] transition-all duration-300"
                                        >
                                            <img
                                                src={screen.src}
                                                alt={`${screen.title} Bejo app screenshot`}
                                                width={941}
                                                height={1672}
                                                loading="lazy"
                                                className="aspect-[9/16] w-full rounded-[1.1rem] object-cover pointer-events-none"
                                            />
                                        </figure>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => scrollImages("right")}
                                    className="absolute right-2 md:-right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#8d7cff]/30 bg-[#0a0616]/90 text-[#a395ff] shadow-[0_0_20px_rgba(141,124,255,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#8d7cff]/20 hover:text-white sm:opacity-0 sm:group-hover:opacity-100 disabled:opacity-0"
                                    aria-label="Scroll right"
                                >
                                    <ChevronRight size={28} className="pl-1" />
                                </button>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.15}>
                        <section className="mt-12 grid gap-6 lg:grid-cols-4">
                            {featureCards.map((feature) => (
                                <div key={feature.title} className="group rounded-[1.5rem] border border-[#8d7cff]/15 bg-gradient-to-b from-white/[0.03] to-transparent p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8d7cff]/40 hover:bg-[#8d7cff]/5 hover:shadow-[0_10px_30px_-10px_rgba(141,124,255,0.3)]">
                                    <div className="mb-5 inline-flex rounded-xl bg-[#8d7cff]/10 p-3 shadow-[0_0_15px_rgba(141,124,255,0.1)] group-hover:bg-[#8d7cff]/20 transition-colors">
                                        <feature.icon className="h-6 w-6 text-[#a395ff] drop-shadow-[0_0_8px_rgba(163,149,255,0.8)]" />
                                    </div>
                                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#d1cbff] transition-colors">{feature.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{feature.body}</p>
                                </div>
                            ))}
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.18}>
                        <section className="mt-12 rounded-[1.5rem] border border-[#8d7cff]/20 bg-[#0a0616]/70 p-6 md:p-8 shadow-[0_0_30px_rgba(141,124,255,0.05)] backdrop-blur-xl">
                            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#8d7cff] drop-shadow-[0_0_8px_rgba(141,124,255,0.6)]">Workflow</p>
                            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                                {[
                                    "File sharing for documents, images, videos, audio, text files, and Office files.",
                                    "QR receiver identification and Bejo IDs help senders choose the intended recipient.",
                                    "Print workflow controls support download access, print access, page settings, and print-related metadata where enabled.",
                                    "Expiry controls and sender permissions help manage when files can be accessed, previewed, downloaded, or printed.",
                                ].map((item) => (
                                    <p key={item} className="text-sm leading-relaxed text-slate-300">{item}</p>
                                ))}
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.2}>
                        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                            <div className="rounded-[1.5rem] border border-[#8d7cff]/20 bg-[#0a0616]/70 p-6 md:p-8 shadow-[0_0_30px_rgba(141,124,255,0.05)] backdrop-blur-xl">
                                <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#8d7cff] drop-shadow-[0_0_8px_rgba(141,124,255,0.6)]">About BEJO</p>
                                <div className="space-y-4 text-slate-300 text-sm md:text-base">
                                    {(aboutTerms?.items ?? [bejoApp.description, bejoApp.supportedFeatures, bejoApp.storageNote]).map((item) => (
                                        <p key={item} className="leading-relaxed">{item}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-[#8d7cff]/20 bg-gradient-to-br from-[#160d33]/80 to-[#0a0616]/80 p-6 md:p-8 shadow-[inset_0_0_20px_rgba(141,124,255,0.05)] backdrop-blur-xl">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8d7cff]/20 border border-[#8d7cff]/30 shadow-[0_0_15px_rgba(141,124,255,0.2)]">
                                        <ShieldCheck size={24} className="text-[#a395ff] drop-shadow-[0_0_8px_rgba(163,149,255,0.8)]" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#8d7cff]">Trust</p>
                                        <h2 className="font-heading text-xl font-bold text-white">Built for controlled sharing</h2>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {trustItems.map((item) => (
                                        <div key={item} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                                            <div className="mt-0.5 rounded-full bg-[#8d7cff]/10 p-1 border border-[#8d7cff]/30">
                                                <Check className="h-3 w-3 shrink-0 text-[#a395ff]" />
                                            </div>
                                            <span>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </AnimatedSection>

                    <AnimatedSection delay={0.25}>
                        <section className="mt-12 rounded-[1.5rem] border border-[#8d7cff]/20 bg-[#0a0616]/80 p-6 md:p-8 shadow-[0_0_40px_rgba(141,124,255,0.06)] backdrop-blur-xl relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 h-40 w-60 rounded-full bg-[#6b4cff] opacity-10 blur-[80px] pointer-events-none"></div>
                            
                            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#8d7cff]">Legal</p>
                                    <h2 className="font-heading text-2xl font-bold text-white">Privacy and terms</h2>
                                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
                                        Review how Bejo handles personal information, service access, user responsibilities, and product usage.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Button asChild variant="outline" className="border-[#8d7cff]/30 bg-white/[0.02] text-[#d1cbff] hover:bg-[#8d7cff]/10 hover:text-white hover:border-[#8d7cff]/60 hover:shadow-[0_0_15px_rgba(141,124,255,0.2)] transition-all">
                                        <Link to="/privacy-policy">
                                            <LockKeyhole size={16} className="mr-2 text-[#a395ff]" />
                                            Privacy Policy
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="border-[#8d7cff]/30 bg-white/[0.02] text-[#d1cbff] hover:bg-[#8d7cff]/10 hover:text-white hover:border-[#8d7cff]/60 hover:shadow-[0_0_15px_rgba(141,124,255,0.2)] transition-all">
                                        <Link to="/terms-and-conditions">
                                            <FileText size={16} className="mr-2 text-[#a395ff]" />
                                            Terms & Conditions
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </section>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default BejoApp;