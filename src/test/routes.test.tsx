import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "@/App";

const renderAt = (path: string) => {
    window.history.pushState({}, "", path);
    return render(<App />);
};

const openBejoDownloadDropdown = () => {
    fireEvent.keyDown(screen.getByRole("button", { name: /choose bejo download platform/i }), { key: "ArrowDown" });
};

const menuItemName = (item: HTMLElement) => item.getAttribute("aria-label") ?? item.textContent?.replace(/\s+/g, " ").trim();

afterEach(() => {
    cleanup();
});

describe("public routes", () => {
    it("renders the homepage", () => {
        renderAt("/");
        expect(screen.getByRole("heading", { name: /we build/i })).toBeInTheDocument();
    });

    it("renders the BEJO app detail page", () => {
        renderAt("/apps/bejo");
        expect(screen.getByRole("heading", { name: "BEJO" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /app screenshots/i })).toBeInTheDocument();
    });

    it("shows BEJO download platform choices on the apps page", async () => {
        renderAt("/apps");

        openBejoDownloadDropdown();

        const items = await screen.findAllByRole("menuitem");
        expect(items.map(menuItemName)).toEqual([
            "Web",
            "Android Releasing soon",
            "iOS Releasing soon",
        ]);
        expect(screen.getByRole("menuitem", { name: "Web" })).toHaveAttribute("href", "https://bejo.one8onestudios.com");
        expect(screen.getByRole("menuitem", { name: /android releasing soon/i })).toHaveAttribute("aria-disabled", "true");
        expect(screen.getByRole("menuitem", { name: /ios releasing soon/i })).toHaveAttribute("aria-disabled", "true");
    });

    it("shows BEJO download platform choices on the app detail page", async () => {
        renderAt("/apps/bejo");

        openBejoDownloadDropdown();

        const items = await screen.findAllByRole("menuitem");
        expect(items.map(menuItemName)).toEqual([
            "Web",
            "Android Releasing soon",
            "iOS Releasing soon",
        ]);
        expect(screen.getByRole("menuitem", { name: "Web" })).toHaveAttribute("href", "https://bejo.one8onestudios.com");
        expect(screen.getByRole("menuitem", { name: /android releasing soon/i })).toHaveAttribute("aria-disabled", "true");
        expect(screen.getByRole("menuitem", { name: /ios releasing soon/i })).toHaveAttribute("aria-disabled", "true");
    });

    it("renders the legal pages for store review links", () => {
        renderAt("/privacy-policy");
        expect(screen.getByRole("heading", { name: /privacy policy/i })).toBeInTheDocument();
        cleanup();

        renderAt("/terms-and-conditions");
        expect(screen.getByRole("heading", { name: /terms & conditions/i })).toBeInTheDocument();
    });
});
