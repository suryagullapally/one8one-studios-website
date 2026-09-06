import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Apple, ChevronDown, Download, Globe, Smartphone } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { bejoApp } from "@/data/bejoContent";

type BejoDownloadDropdownProps = Pick<ButtonProps, "className" | "size" | "variant">;

const platformOptions = [
    {
        label: "Web",
        icon: Globe,
        href: bejoApp.downloadUrl,
        ariaLabel: "Open BEJO web app",
    },
    {
        label: "Android",
        icon: Smartphone,
        href: bejoApp.googlePlayUrl,
        ariaLabel: "Download BEJO on Google Play",
    },
    {
        label: "iOS",
        icon: Apple,
        availabilityLabel: "Releasing soon",
    },
];

const BejoDownloadDropdown = ({ className, size, variant }: BejoDownloadDropdownProps) => {
    const [open, setOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0, width: 224 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const updateMenuPosition = () => {
        const trigger = triggerRef.current;

        if (!trigger) {
            return;
        }

        const rect = trigger.getBoundingClientRect();
        setMenuPosition({
            left: Math.max(16, Math.min(rect.left, window.innerWidth - 240)),
            top: rect.bottom + 8,
            width: Math.max(224, rect.width),
        });
    };

    useLayoutEffect(() => {
        if (open) {
            updateMenuPosition();
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
                return;
            }

            setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        };

        window.addEventListener("resize", updateMenuPosition);
        window.addEventListener("scroll", updateMenuPosition, true);
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("resize", updateMenuPosition);
            window.removeEventListener("scroll", updateMenuPosition, true);
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <>
            <Button
                ref={triggerRef}
                type="button"
                size={size}
                variant={variant}
                className={className}
                aria-label="Choose BEJO download platform"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((isOpen) => !isOpen)}
            >
                <span className="flex items-center gap-2 font-medium">
                    Download <Download size={16} />
                </span>
                <ChevronDown size={16} />
            </Button>

            {open &&
                createPortal(
                    <div
                        ref={menuRef}
                        role="menu"
                        aria-label="BEJO download platforms"
                        className="fixed z-[1000] rounded-xl border border-[#8d7cff]/30 bg-[#0f0926] p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(141,124,255,0.2)] backdrop-blur-xl"
                        style={{
                            left: menuPosition.left,
                            top: menuPosition.top,
                            minWidth: menuPosition.width,
                        }}
                    >
                        {platformOptions.map((platform) =>
                            platform.href ? (
                                <a
                                    key={platform.label}
                                    role="menuitem"
                                    href={platform.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={platform.ariaLabel}
                                    className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-200 transition-colors hover:bg-[#8d7cff]/20 hover:text-white focus:bg-[#8d7cff]/20 focus:text-white focus:outline-none"
                                >
                                    <platform.icon size={16} className="text-[#a395ff]" />
                                    <span className="font-medium">{platform.label}</span>
                                </a>
                            ) : (
                                <button
                                    key={platform.label}
                                    type="button"
                                    role="menuitem"
                                    aria-disabled="true"
                                    aria-label={`${platform.label} ${platform.availabilityLabel}`}
                                    tabIndex={-1}
                                    className="flex w-full cursor-not-allowed items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-300"
                                    onClick={(event) => event.preventDefault()}
                                >
                                    <platform.icon size={16} className="text-slate-500" />
                                    <span className="font-medium">{platform.label}</span>
                                    <span className="ml-auto text-xs text-slate-500">{platform.availabilityLabel}</span>
                                </button>
                            ),
                        )}
                    </div>,
                    document.body,
                )}
        </>
    );
};

export default BejoDownloadDropdown;
