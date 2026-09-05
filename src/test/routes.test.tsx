import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import App from "@/App";
import { privacySections, termsSections } from "@/data/bejoContent";
import { getSeoRoute, SITE_URL } from "@/data/seo";

const renderAt = (path: string) => {
    window.history.pushState({}, "", path);
    return render(<App />);
};

const openBejoDownloadDropdown = () => {
    const trigger = screen.getByRole("button", { name: /choose bejo download platform/i });
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false });
    fireEvent.click(trigger);
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

    it("renders the Basilico client project detail page", () => {
        renderAt("/apps/basilico");
        expect(screen.getByRole("heading", { level: 1, name: "Basilico – Simple Italian" })).toBeInTheDocument();
        expect(screen.getByText("Priya Madhuri")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /visit basilico live website/i })).toHaveAttribute("href", "https://basilicodorchester.co.uk");
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

    it("renders the privacy policy page with synced BEJO content", () => {
        renderAt("/privacy-policy");
        expect(screen.getByRole("heading", { name: /privacy policy/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /reports and blocking/i })).toBeInTheDocument();
        expect(screen.getAllByText(/cloudflare r2/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/privacy\.bejo@one8onestudios\.com/i).length).toBeGreaterThan(0);

        const pageText = document.body.textContent ?? "";
        expect(pageText).not.toContain("https://one8onestudios.com/privacy-policy");
        expect(pageText).not.toContain("https://one8onestudios.com/terms-and-conditions");
    });

    it("renders the terms page with synced BEJO content", () => {
        renderAt("/terms-and-conditions");
        expect(screen.getByRole("heading", { name: /terms & conditions/i })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: /reporting abuse/i })).toBeInTheDocument();
        expect(screen.getByText(/receivers can report offensive/i)).toBeInTheDocument();
        expect(screen.getByText(/cloudflare r2 object storage for active transfer files/i)).toBeInTheDocument();
        expect(screen.getAllByText(/https:\/\/bejo\.one8onestudios\.com\/terms-and-conditions/i).length).toBeGreaterThan(0);

        const pageText = document.body.textContent ?? "";
        expect(pageText).not.toContain("https://one8onestudios.com/privacy-policy");
        expect(pageText).not.toContain("https://one8onestudios.com/terms-and-conditions");
    });

    it("keeps website legal content on the BEJO subdomain", () => {
        const legalContent = [...privacySections, ...termsSections]
            .flatMap((section) => [section.title, ...section.items])
            .join("\n");

        expect(legalContent).toContain("https://bejo.one8onestudios.com/privacy-policy");
        expect(legalContent).toContain("https://bejo.one8onestudios.com/terms-and-conditions");
        expect(legalContent).not.toContain("https://one8onestudios.com/privacy-policy");
        expect(legalContent).not.toContain("https://one8onestudios.com/terms-and-conditions");
    });

    it("uses the One8One root domain for public SEO routes", () => {
        expect(SITE_URL).toBe("https://one8onestudios.com");
        expect(getSeoRoute("/apps")?.description).toMatch(/BEJO and the Basilico/i);
        expect(getSeoRoute("/apps/basilico")?.title).toBe("Basilico Restaurant Platform | One8One Studios Client Project");
    });
});
