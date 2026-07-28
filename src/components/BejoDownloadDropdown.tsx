import { Download, ChevronDown, Smartphone, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BejoDownloadDropdownProps {
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

const downloadOptions = [
    {
        label: "Android (Google Play)",
        icon: Smartphone,
        href: "#", // Add Play Store link here when available
    },
    {
        label: "iOS (App Store)",
        icon: Apple,
        href: "#", // Add App Store link here when available
    },
    {
        label: "Android APK",
        icon: Download,
        href: "#", // Add direct APK link here
    },
];

const BejoDownloadDropdown = ({ size = "default", className = "" }: BejoDownloadDropdownProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size={size} className={`inline-flex items-center gap-2 font-medium ${className}`}>
                    <Download size={18} />
                    Download
                    <ChevronDown size={16} className="ml-1 opacity-70" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
                align="start" 
                className="z-50 min-w-[200px] rounded-xl border border-[#8d7cff]/30 bg-[#0f0926] p-2 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5),0_0_20px_rgba(141,124,255,0.2)] backdrop-blur-xl"
            >
                {downloadOptions.map((option) => (
                    <DropdownMenuItem 
                        key={option.label} 
                        asChild
                        className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-200 hover:bg-[#8d7cff]/20 hover:text-white focus:bg-[#8d7cff]/20 focus:text-white transition-colors"
                    >
                        <a href={option.href} target="_blank" rel="noopener noreferrer">
                            <option.icon size={16} className="text-[#a395ff]" />
                            {option.label}
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default BejoDownloadDropdown;