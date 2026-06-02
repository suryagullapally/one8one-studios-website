import { useState } from "react";
import { Mail, Phone, MapPin, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import AnimatedSection, { ParallaxLayer, StaggerContainer, StaggerItem } from "@/components/AnimatedSection";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

const termsSections = [
    {
        title: "1. Services",
        intro: "We provide:",
        items: ["Custom software development", "Mobile app development", "Website development", "SaaS products", "Consulting services"],
    },
    {
        title: "2. Eligibility",
        body: "You must be legally capable of entering into binding contracts under applicable law.",
    },
    {
        title: "3. Account Responsibility",
        intro: "You are responsible for:",
        items: ["Maintaining account confidentiality", "All activities under your account", "Providing accurate information"],
    },
    {
        title: "4. User Content",
        body: "You retain ownership of your content. By uploading content, you grant us a limited license to host, process, and transmit it solely to provide the services.",
        intro: "You represent that:",
        items: ["You own or have permission to use the content.", "The content does not violate any law or third-party rights."],
    },
    {
        title: "5. Prohibited Uses",
        intro: "You may not:",
        items: [
            "Upload illegal or infringing content",
            "Attempt to reverse engineer the services",
            "Circumvent security controls",
            "Interfere with service operation",
            "Use the services for unlawful activities",
        ],
    },
    {
        title: "6. Intellectual Property",
        body: "All software, branding, designs, and content created by One8One Studios remain our intellectual property unless otherwise agreed in writing.",
    },
    {
        title: "7. Client Projects",
        intro: "For custom development projects:",
        items: [
            "Scope, timelines, and deliverables are defined in separate agreements.",
            "Ownership transfers only after full payment unless otherwise agreed.",
            "Third-party licenses and app store fees are the client's responsibility unless expressly included.",
        ],
    },
    {
        title: "8. Payments",
        body: "All fees are non-refundable unless stated otherwise in a written agreement or applicable law. Late payments may result in suspension of services.",
    },
    {
        title: "9. No Guarantee of App Store Approval",
        intro: "We do not guarantee approval by:",
        items: ["Apple App Store", "Google Play"],
        note: "Approval decisions are made solely by the respective platforms.",
    },
    {
        title: "10. Service Availability",
        body: "We strive for reliable service but do not guarantee uninterrupted or error-free operation.",
    },
    {
        title: "11. Temporary Storage and Data Loss",
        body: "Files may be automatically deleted according to service logic.",
        intro: "We are not liable for:",
        items: ["Data loss", "Corruption", "Accidental deletion", "Failure to recover deleted content"],
        note: "Users must maintain their own backups.",
    },
    {
        title: "12. Security Limitations",
        intro: "Although we implement security measures, we do not guarantee prevention of:",
        items: ["Screenshots", "Screen recordings", "Unauthorized copying", "Circumvention of restrictions"],
    },
    {
        title: "13. Disclaimer of Warranties",
        body: 'Services are provided "as is" and "as available," without warranties of any kind, express or implied.',
    },
    {
        title: "14. Limitation of Liability",
        body: "To the maximum extent permitted by law, our total liability shall not exceed the amount paid by you to us during the 12 months preceding the claim.",
        intro: "We are not liable for:",
        items: ["Indirect damages", "Loss of profits", "Business interruption", "Loss of data", "Consequential damages"],
    },
    {
        title: "15. Indemnification",
        intro: "You agree to indemnify and hold harmless Onaytone Software Studios Private Limited from claims arising from:",
        items: ["Your use of the services", "Your content", "Your breach of these Terms", "Violation of third-party rights"],
    },
    {
        title: "16. Suspension and Termination",
        intro: "We may suspend or terminate accounts at our sole discretion for:",
        items: ["Violation of these Terms", "Suspected fraud or abuse", "Legal compliance requirements"],
    },
    {
        title: "17. Confidentiality",
        body: "We will treat client materials as confidential except where disclosure is required by law or necessary to provide services.",
    },
    {
        title: "18. Force Majeure",
        body: "We are not liable for delays or failures caused by events beyond our reasonable control.",
    },
    {
        title: "19. Governing Law and Jurisdiction",
        body: "These Terms are governed by the laws of India. Courts located in Hyderabad, Telangana shall have exclusive jurisdiction.",
    },
    {
        title: "20. Changes to Terms",
        body: "We may modify these Terms at any time. Continued use constitutes acceptance of the revised Terms.",
    },
];

const Contact = () => {
    const [termsOpen, setTermsOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        projectType: "",
        message: "",
        agreed: false,
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
const isValidEmail = (email: string) => {
    const cleanedEmail = email.trim().toLowerCase();

    const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(cleanedEmail)) {
        return false;
    }

    const [localPart, domain] = cleanedEmail.split("@");

    if (!localPart || !domain) {
        return false;
    }

    if (localPart.length > 64) {
        return false;
    }

    if (domain.length > 253) {
        return false;
    }

    if (domain.includes("..")) {
        return false;
    }

    const blockedTypoDomains = [
        "gml.com",
        "gmil.com",
        "gmial.com",
        "gmai.com",
        "gmail.co",
        "gmail.con",
        "gmail.cm",
        "yaho.com",
        "yahooo.com",
        "hotmial.com",
        "hotmai.com",
        "outlok.com",
        "outlook.co",
    ];

    if (blockedTypoDomains.includes(domain)) {
        return false;
    }

    return true;
};

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.name.trim()) {
            setError("Please enter your name.");
            return;
        }

       const cleanedEmail = formData.email.trim().toLowerCase();

if (!cleanedEmail) {
    setError("Please enter your email.");
    return;
}

if (!isValidEmail(cleanedEmail)) {
    setError("Please enter a valid email address.");
    return;
}

        if (!formData.projectType) {
            setError("Please select a project type.");
            return;
        }

        if (!formData.message.trim()) {
            setError("Please enter your message.");
            return;
        }

        if (!formData.agreed) {
            setError("Please agree to the Terms & Conditions.");
            return;
        }

        try {
            setLoading(true);

            await addDoc(collection(db, "contactMessages"), {
                name: formData.name.trim(),
                email: cleanedEmail,
                company: formData.company.trim(),
                projectType: formData.projectType,
                message: formData.message.trim(),
                agreedToTerms: formData.agreed,
                status: "new",
                source: "one8one-studios-website",
                createdAt: serverTimestamp(),
            });

            setSuccess("Message sent successfully. We will contact you soon.");

            setFormData({
                name: "",
                email: "",
                company: "",
                projectType: "",
                message: "",
                agreed: false,
            });
        } catch (err) {
            console.error("Contact form error:", err);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24">
            <section className="pt-4 pb-14 md:pb-16 px-4 relative overflow-hidden">
                { <ParallaxLayer speed={0.12} className="absolute top-20 left-0 pointer-events-none">
                    <div className="w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-x-1/2" />
                </ParallaxLayer> }

                <div className="container mx-auto px-4 relative z-10">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10 md:mb-12">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                Get in Touch
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Let's Build Something<br /><span className="gradient-text">Amazing Together</span></h1>
                            <p className="text-muted-foreground max-w-xl mx-auto text-lg">Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within 24 hours.</p>
                        </div>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Contact Info */}
                        <StaggerContainer className="space-y-6" staggerDelay={0.12}>
                            {[
                                { icon: Mail, label: "Email", value: "one8one.studios@gmail.com" },
                                { icon: Phone, label: "Phone", value: "+91 9959888459" },
                                { icon: MapPin, label: "Office", value: "One8one Studios, 1-31-821, krishna nagar colony, kanajiguda, Hyderabad, India" },
                            ].map((item, i) => (
                                <StaggerItem key={i}>
                                    <motion.div
                                        whileHover={{ y: -4, x: 4, boxShadow: "0 15px 30px -10px hsl(217 91% 60% / 0.15)" }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                        className="glass-card p-5 rounded-xl flex items-start gap-4"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0"
                                        >
                                            <item.icon size={18} className="text-primary-foreground" />
                                        </motion.div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">{item.label}</p>
                                            <p className="font-medium text-sm">{item.value}</p>
                                        </div>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>

                        {/* Contact Form */}
                        <AnimatedSection delay={0.2} direction="right" className="lg:col-span-2">
                            <motion.div
                                whileHover={{ boxShadow: "0 25px 50px -15px hsl(217 91% 60% / 0.1)" }}
                                transition={{ duration: 0.3 }}
                                className="glass-card p-8 rounded-xl"
                            >
                                <form className="space-y-5" onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Name</label>
                                            <Input
                                                name="name"
                                                placeholder="Your name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="bg-muted/30 border-border/50"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Email</label>
                                            <Input
    type="email"
    name="email"
    placeholder="you@company.com"
    value={formData.email}
    onChange={handleInputChange}
    className="bg-muted/30 border-border/50"
    autoComplete="email"
    inputMode="email"
/>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium mb-1.5 block">Company</label>
                                            <Input
                                                name="company"
                                                placeholder="Your company"
                                                value={formData.company}
                                                onChange={handleInputChange}
                                                className="bg-muted/30 border-border/50"
                                            />
                                        </div>
                                        <div>
    <label className="text-sm font-medium mb-1.5 block">Project Type</label>
    <Input
        name="projectType"
        placeholder="e.g., Website, web/ios/android App, SaaS product, etc."
        value={formData.projectType}
        onChange={handleInputChange}
        className="bg-muted/30 border-border/50"
    />
</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium mb-1.5 block">Message</label>
                                        <Textarea
                                            name="message"
                                            placeholder="Tell us about your project..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            className="bg-muted/30 border-border/50"
                                        />
                                    </div>
                                    <div className="flex items-start gap-3 rounded-lg border border-border/40 bg-muted/20 p-4">
                                        <Checkbox
    id="terms"
    checked={formData.agreed}
    onCheckedChange={(checked) =>
        setFormData((prev) => ({
            ...prev,
            agreed: checked === true,
        }))
    }
    className="mt-0.5"
/>
                                        <div className="text-sm leading-relaxed text-muted-foreground">
                                            <label htmlFor="terms">I agree to the </label>
                                            <button
                                                type="button"
                                                className="font-medium text-primary underline-offset-4 hover:underline"
                                                onClick={() => setTermsOpen(true)}
                                            >
                                                Terms & Conditions
                                            </button>
                                            .
                                        </div>
                                    </div>
                                    {error && (
    <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
        {error}
    </p>
)}

{success && (
    <p className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
        {success}
    </p>
)}

<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full gradient-bg text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
    >
        {loading ? "Sending..." : "Send Message"} <Send size={16} />
    </Button>
</motion.div>
                                </form>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {termsOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 px-4 py-6" onClick={() => setTermsOpen(false)}>
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="terms-title"
                        className="glass-card relative max-h-[85vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-border/50 p-6 shadow-2xl md:p-8"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            aria-label="Close terms and conditions"
                            className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                            onClick={() => setTermsOpen(false)}
                        >
                            <X size={18} />
                        </button>

                        <div className="mb-6 pr-8">
                            <h2 id="terms-title" className="font-heading text-2xl font-semibold text-foreground">Terms & Conditions</h2>
                            <p className="mt-2 text-sm text-muted-foreground">Effective Date: 15 May 2026</p>
                        </div>

                        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
                            <div className="rounded-xl border border-border/30 bg-background/30 p-5">
                                <p className="mb-3">
                                    These Terms and Conditions govern your use of the website, applications, and services provided by One8One Studios, a brand operated by Onaytone Software Studios Private Limited.
                                </p>
                                <p>By accessing or using our services, you agree to these Terms.</p>
                            </div>

                            {termsSections.map((section) => (
                                <section key={section.title} className="border-b border-border/20 pb-5 last:border-b-0 last:pb-0">
                                    <h3 className="font-heading text-lg font-semibold text-foreground mb-2">{section.title}</h3>
                                    {section.body && <p className="mb-3">{section.body}</p>}
                                    {section.intro && <p className="mb-3">{section.intro}</p>}
                                    {section.items && (
                                        <ul className="grid gap-2 sm:grid-cols-2">
                                            {section.items.map((item) => (
                                                <li key={item} className="flex gap-2">
                                                    <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-bg shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    {section.note && (
                                        <p className="mt-3 rounded-lg border border-primary/20 bg-primary/10 px-3 py-2 text-primary">
                                            {section.note}
                                        </p>
                                    )}
                                </section>
                            ))}

                            <section className="rounded-xl border border-primary/20 bg-primary/10 p-5">
                                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">21. Contact Information</h3>
                                <p className="font-medium text-foreground">One8One Studios</p>
                                <p>A brand operated by Onaytone Software Studios Private Limited</p>
                                <p>Hyderabad, Telangana, India</p>
                                <p>
                                    Email:{" "}
                                    <a href="mailto:legal@one8onestudios.com" className="text-primary hover:underline">
                                        legal@one8onestudios.com
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Contact;
