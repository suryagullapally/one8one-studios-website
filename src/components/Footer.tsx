import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
    const quickLinks = [
        { label: "Our Apps", path: "/apps" },
        { label: "Portfolio", path: "/portfolio" },
        { label: "About Us", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms & Conditions", path: "/terms-and-conditions" },
    ];

    return (
        <footer className="border-t border-border/30 bg-card/30">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">
    181
</div>
                            <span className="font-heading font-bold text-lg">ONE8ONE STUDIOS</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We build world-class apps that transform businesses and empower users across the globe.
                        </p>
                        <div className="flex gap-3">
                            {[Twitter, Github, Linkedin, Instagram].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">Quick Links</h4>
                        <div className="flex flex-col gap-2">
                            {quickLinks.map((link) => (
                                <Link key={link.path} to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">Services</h4>
                        <div className="flex flex-col gap-2">
                            {["Custom App Development", "UI/UX Design", "End-to-End Solutions", "App Maintenance", "Consulting"].map((s) => (
                                <span key={s} className="text-sm text-muted-foreground">{s}</span>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-foreground">Stay Updated</h4>
                        <p className="text-sm text-muted-foreground">Get the latest on our apps and services.</p>
                        <div className="flex gap-2">
                            <Input placeholder="Your email" className="bg-muted/50 border-border/50 text-sm" />
                            <Button size="sm" className="gradient-bg text-primary-foreground shrink-0">
                                <Mail size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border/30 mt-12 pt-8 text-center">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        © {new Date().getFullYear()} One8one Studios. All rights reserved.
                        <br />
                        One8one studios is a brand operated by Onaytone Software Studios Private Limited.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
