import AnimatedSection from "@/components/AnimatedSection";

type PolicyGroup = {
    label: string;
    body?: string;
    items?: string[];
};

type PolicySection = {
    title: string;
    body?: string;
    intro?: string;
    items?: string[];
    groups?: PolicyGroup[];
    note?: string;
};

const policySections: PolicySection[] = [
    {
        title: "1. Information We Collect",
        intro: "We may collect the following categories of information:",
        groups: [
            {
                label: "Personal Information",
                items: ["Full name", "Email address", "Phone number", "Billing details", "Company information"],
            },
            {
                label: "Account Information",
                items: ["Username", "Password (encrypted)", "Profile information"],
            },
            {
                label: "Files and Content",
                items: ["Documents, images, videos, and other files uploaded to our applications"],
            },
            {
                label: "Technical Information",
                items: ["IP address", "Device information", "Browser type", "Operating system", "Crash logs", "Usage analytics"],
            },
            {
                label: "Payment Information",
                body: "Payments are processed by third-party providers. We do not store full credit/debit card details.",
            },
        ],
    },
    {
        title: "2. How We Use Your Information",
        intro: "We use information to:",
        items: [
            "Provide and maintain services",
            "Process transactions",
            "Authenticate users",
            "Enable secure file sharing",
            "Send notifications",
            "Respond to support requests",
            "Improve products and services",
            "Prevent fraud and abuse",
            "Comply with legal obligations",
        ],
    },
    {
        title: "3. Data Sharing",
        intro: "We may share information with:",
        items: [
            "Cloud providers such as Google Firebase",
            "Payment processors such as Razorpay or Stripe",
            "Analytics providers",
            "Legal authorities when required by law",
        ],
        note: "We do not sell personal data.",
    },
    {
        title: "4. Data Security",
        body: "We use reasonable administrative, technical, and organizational safeguards to protect data. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
    },
    {
        title: "5. Data Retention",
        intro: "We retain information only as long as necessary for:",
        items: ["Service delivery", "Legal compliance", "Dispute resolution", "Business operations"],
        note: "Temporary files may be deleted automatically.",
    },
    {
        title: "6. International Data Transfers",
        body: "Your data may be processed and stored in countries outside your own jurisdiction.",
    },
    {
        title: "7. Your Rights",
        intro: "Subject to applicable law, you may request:",
        items: [
            "Access to your data",
            "Correction of inaccurate data",
            "Deletion of your data",
            "Restriction of processing",
            "Withdrawal of consent",
        ],
        note: "To exercise these rights, contact us using the details below.",
    },
    {
        title: "8. Children's Privacy",
        body: "Our services are not intended for children under 13, or the minimum age required by applicable law.",
    },
    {
        title: "9. Third-Party Services",
        body: "Our website and apps may contain links to third-party services. We are not responsible for their privacy practices.",
    },
    {
        title: "10. Cookies",
        body: "We may use cookies and similar technologies to improve functionality and analytics.",
    },
    {
        title: "11. Changes to This Privacy Policy",
        body: "We may update this Privacy Policy at any time. Continued use of our services constitutes acceptance of the updated policy.",
    },
];

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen pt-24">
            <section className="pt-4 pb-14 md:pb-16 px-4">
                <div className="container mx-auto px-4 max-w-4xl">
                    <AnimatedSection direction="scale">
                        <div className="text-center mb-10">
                            <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6">
                                Privacy Policy
                            </div>
                            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                                Effective Date: 15 May 2026
                            </p>
                        </div>
                    </AnimatedSection>

                    <AnimatedSection delay={0.1}>
                        <article className="glass-card rounded-2xl p-6 md:p-10">
                            <div className="border-b border-border/30 pb-8 mb-8">
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    One8One Studios ("we," "our," "us") is a brand operated by Onaytone Software Studios Private Limited, Hyderabad, Telangana, India.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    We develop websites, mobile applications, and software solutions, including our proprietary products such as Bejo.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, applications, and services.
                                </p>
                            </div>

                            <div className="space-y-10">
                                {policySections.map((section) => (
                                    <section key={section.title} className="border-b border-border/20 pb-8 last:border-b-0 last:pb-0">
                                        <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">{section.title}</h2>

                                        {section.body && <p className="text-muted-foreground leading-relaxed">{section.body}</p>}
                                        {section.intro && <p className="text-muted-foreground leading-relaxed mb-4">{section.intro}</p>}

                                        {section.groups && (
                                            <div className="grid gap-5 md:grid-cols-2">
                                                {section.groups.map((group) => (
                                                    <div key={group.label} className="rounded-xl border border-border/30 bg-background/30 p-5">
                                                        <h3 className="font-heading font-semibold text-foreground mb-3">{group.label}</h3>
                                                        {group.body ? (
                                                            <p className="text-muted-foreground text-sm leading-relaxed">{group.body}</p>
                                                        ) : (
                                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                                {group.items?.map((item) => (
                                                                    <li key={item} className="flex gap-2">
                                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-bg shrink-0" />
                                                                        <span>{item}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {section.items && (
                                            <ul className="grid gap-2 md:grid-cols-2 text-muted-foreground">
                                                {section.items.map((item) => (
                                                    <li key={item} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 rounded-full gradient-bg shrink-0" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.note && (
                                            <p className="mt-4 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary">
                                                {section.note}
                                            </p>
                                        )}
                                    </section>
                                ))}

                                <section className="rounded-2xl border border-primary/20 bg-primary/10 p-6">
                                    <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
                                    <div className="space-y-2 text-muted-foreground leading-relaxed">
                                        <p className="font-medium text-foreground">One8One Studios</p>
                                        <p>A brand operated by Onaytone Software Studios Private Limited</p>
                                        <p>1-31-821, Krishna Nagar Colony, Kanajiguda, Hyderabad, Telangana, India</p>
                                        <p>
                                            Email:{" "}
                                            <a href="mailto:one8onestudios@gmail.com" className="text-primary hover:underline">
                                                one8one.studios@gmail.com
                                            </a>
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </article>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
