import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Our Apps", path: "/apps" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "About", path: "/about" },
    // { label: "Impact", path: "/impact" },
    { label: "Contact", path: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            {isOpen && (
                <button
                    type="button"
                    aria-label="Close menu"
                    className="fixed inset-0 z-40 md:hidden cursor-default"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl bg-background/80">
                <div className="container mx-auto flex items-center justify-between h-16 px-4 relative z-10">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">
                            o8o
                        </div>
                        <span className="font-heading font-bold text-lg text-foreground">ONE8ONE STUDIOS</span>
                    </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === link.path
                                ? "text-primary bg-primary/10"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:block">
                    <Link to="/contact">
                        <Button size="sm" className="gradient-bg text-primary-foreground font-medium hover:opacity-90">
                            Get a Quote
                        </Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass-card border-t border-border/30 animate-fade-in relative z-10">
                    <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path
                                    ? "text-primary bg-primary/10"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link to="/contact" onClick={() => setIsOpen(false)}>
                            <Button className="w-full mt-2 gradient-bg text-primary-foreground">Get a Quote</Button>
                        </Link>
                    </div>
                </div>
            )}
            </nav>
        </>
    );
};

export default Navbar;
