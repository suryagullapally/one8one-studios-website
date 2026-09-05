import { bejoApp } from "@/data/bejoContent";

export type ProjectType = "company-product" | "client-project";

export type ProjectCapability = {
    title: string;
    description: string;
};

export type TechnologyGroup = {
    label: string;
    items: string[];
};

export type ProjectVisual = {
    accentClass: string;
    backgroundClass: string;
    cardClass: string;
    logo?: string;
    heroImage?: string;
    heroAlt?: string;
};

export type ShowcaseAsset = {
    title: string;
    description: string;
    src: string;
    alt: string;
};

export type CaseStudyContent = {
    overview: string;
    challengeIntro: string;
    challengePoints: string[];
    solutionAreas: ProjectCapability[];
    outcomes: string[];
    showcase: ShowcaseAsset[];
};

export type StudioProject = {
    slug: string;
    name: string;
    shortName: string;
    tagline: string;
    projectType: ProjectType;
    typeLabel: string;
    eyebrow: string;
    client: string;
    clientLocation: string;
    market: string;
    industry: string;
    status: string;
    liveUrl: string;
    internalPath: string;
    homepageDescription: string;
    cardDescription: string;
    portfolioSummary: string;
    challenge: string;
    solution: string;
    outcome: string;
    cardChips: string[];
    categories: string[];
    technologyHighlights: string[];
    technologyGroups: TechnologyGroup[];
    capabilities: ProjectCapability[];
    visual: ProjectVisual;
    caseStudy?: CaseStudyContent;
};

export const bejoProject = {
    slug: "bejo",
    name: "BEJO",
    shortName: "BEJO",
    tagline: bejoApp.tagline,
    projectType: "company-product",
    typeLabel: "One8One Studios Product",
    eyebrow: "Company Product",
    client: "One8One Studios",
    clientLocation: "Hyderabad, India",
    market: "India",
    industry: "Productivity / File Sharing",
    status: "Live product platform",
    liveUrl: bejoApp.downloadUrl,
    internalPath: "/apps/bejo",
    homepageDescription:
        "A One8One-owned file-sharing and print-workflow product with QR receiver identification, sender permissions and expiry controls.",
    cardDescription:
        "A file-sharing and print-workflow application for sending, receiving, previewing, downloading, printing and managing files with sender controls.",
    portfolioSummary:
        "Company-owned file-sharing and print-workflow product with QR receiver identification, permissions and expiry controls.",
    challenge:
        "Give senders clearer control over file access, receiver identification, expiry timing and print/download permissions.",
    solution:
        "A cross-platform product experience with QR receiver flows, sender-configured controls, preview and print workflows, and cloud-backed file handling.",
    outcome:
        "Shipped as a One8One Studios product with mobile and web access, controlled sharing workflows and synced legal policy content.",
    cardChips: bejoApp.platforms,
    categories: ["Mobile", "Web"],
    technologyHighlights: ["Flutter", "Dart", "Firebase", "Google Cloud", "Cloudflare"],
    technologyGroups: [
        { label: "Product", items: ["Flutter", "Dart", "Web"] },
        { label: "Platform", items: ["Firebase", "Google Cloud", "Cloudflare"] },
    ],
    capabilities: [
        {
            title: "Controlled File Sharing",
            description: "Send and receive files with receiver identification and sender-controlled access settings.",
        },
        {
            title: "Expiry Controls",
            description: "Configure transfer availability so files are shared with intentional time limits.",
        },
        {
            title: "Print Workflow",
            description: "Support preview, download and print-related settings where product features allow them.",
        },
    ],
    visual: {
        accentClass: "text-[#bdb4ff]",
        backgroundClass: "bg-gradient-to-br from-[#302b63] via-[#2b1961] to-[#0c051a]",
        cardClass: "border-[#8d7cff]/25 bg-[#0c1020]/80",
    },
} satisfies StudioProject;

export const basilicoProject = {
    slug: "basilico",
    name: "Basilico – Simple Italian",
    shortName: "Basilico",
    tagline: "Restaurant commerce and operations platform",
    projectType: "client-project",
    typeLabel: "Client Project",
    eyebrow: "Client Project · United Kingdom",
    client: "Priya Madhuri",
    clientLocation: "Dorchester, Dorset, UK",
    market: "United Kingdom",
    industry: "Hospitality / Restaurant",
    status: "Live",
    liveUrl: "https://basilicodorchester.co.uk",
    internalPath: "/apps/basilico",
    homepageDescription:
        "A production restaurant platform for a UK hospitality client, spanning the public website, menu, bookings, ordering, Stripe payments and staff tools.",
    cardDescription:
        "A full-stack restaurant platform for Basilico in Dorchester, combining a premium customer website, interactive menu, table bookings, online ordering, Stripe payments and operational restaurant tools.",
    portfolioSummary:
        "Full-stack restaurant commerce and operations platform for a UK hospitality client.",
    challenge:
        "Bring menu discovery, bookings, ordering, payments and restaurant operations into one reliable digital experience.",
    solution:
        "A responsive customer platform backed by Spring Boot and PostgreSQL, with online ordering, Stripe payments, booking workflows, notifications and secure restaurant administration.",
    outcome:
        "Deployed to production with live table bookings, online payments, customer notifications, restaurant alerts and a staff administration interface.",
    cardChips: ["Hospitality", "United Kingdom", "Web Platform"],
    categories: ["Web", "Hospitality"],
    technologyHighlights: ["Next.js", "Spring Boot", "PostgreSQL", "Stripe", "Cloudflare"],
    technologyGroups: [
        { label: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
        { label: "Backend", items: ["Java 21", "Spring Boot", "PostgreSQL"] },
        { label: "Platform", items: ["Cloudflare Workers", "Google Cloud Run", "Neon"] },
        { label: "Integrations", items: ["Stripe", "Brevo"] },
    ],
    capabilities: [
        {
            title: "Interactive Menu",
            description: "Public menu browsing with product detail pages and mobile-first presentation.",
        },
        {
            title: "Table Booking",
            description: "Reservation flows with booking statuses and restaurant new-booking notifications.",
        },
        {
            title: "Collection & Delivery",
            description: "Collection and local delivery ordering with cart, checkout and delivery-radius validation.",
        },
        {
            title: "Stripe Payments",
            description: "Live online payment workflow with order confirmation and webhook-backed fulfilment state.",
        },
        {
            title: "Admin Dashboard",
            description: "Secure staff tools for orders, bookings, menu management, payments and fulfilment controls.",
        },
        {
            title: "Transactional Messaging",
            description: "Customer emails, restaurant alerts, notification retries and message history workflows.",
        },
    ],
    visual: {
        accentClass: "text-[#f6c56f]",
        backgroundClass: "bg-gradient-to-br from-[#17120d] via-[#123421] to-[#551b14]",
        cardClass: "border-[#f6c56f]/25 bg-[#110d0a]/85",
        logo: "/projects/basilico/basilico-logo.webp",
        heroImage: "/projects/basilico/basilico-hero.webp",
        heroAlt: "Wood-fired Basilico pizza with basil beside a restaurant oven",
    },
    caseStudy: {
        overview:
            "Basilico needed more than a brochure website. The restaurant required one connected system where customers could discover the menu, reserve a table, place collection or delivery orders and pay online, while staff could manage bookings, orders, payments and fulfilment from a secure operational interface.",
        challengeIntro:
            "A live restaurant operation depends on several workflows working together clearly, especially on mobile where customers decide quickly and staff need reliable order information.",
        challengePoints: [
            "Customer discovery, menu browsing and dish detail pages",
            "Table reservations, customer communication and restaurant alerts",
            "Collection and local delivery ordering with checkout and payment",
            "Delivery eligibility, opening-hours awareness and fulfilment state",
            "Staff operations for bookings, orders, refunds, menu updates and notifications",
        ],
        solutionAreas: [
            {
                title: "Customer Experience",
                description:
                    "A premium responsive restaurant website with menu, booking, ordering, checkout and confirmation journeys tuned for mobile customers.",
            },
            {
                title: "Restaurant Operations",
                description:
                    "A secure operational dashboard for order statuses, booking statuses, menu management, refunds, fulfilment controls and message history.",
            },
            {
                title: "Payments & Communication",
                description:
                    "Stripe payment flows, customer transactional emails, restaurant notifications, notification retries and clear order confirmation states.",
            },
            {
                title: "Backend & Infrastructure",
                description:
                    "Server-authoritative pricing, PostgreSQL persistence, Spring Boot services, Cloudflare Workers and managed production deployment.",
            },
        ],
        outcomes: [
            "Live production platform",
            "Live online payments",
            "Live table bookings",
            "Restaurant order notifications",
            "Restaurant booking notifications",
            "Customer transactional emails",
            "Staff administration interface",
            "Production deployment across managed cloud services",
        ],
        showcase: [
            {
                title: "Restaurant Website",
                description: "Public-facing Basilico brand and homepage imagery.",
                src: "/projects/basilico/basilico-hero.webp",
                alt: "Basilico pizza hero image from the public restaurant website",
            },
            {
                title: "Online Ordering",
                description: "Public customer imagery supporting the order and collection flow.",
                src: "/projects/basilico/order-basilico.webp",
                alt: "Basilico takeaway pizza and garlic bread prepared for online orders",
            },
            {
                title: "Restaurant Space",
                description: "Dining-room imagery used by the customer-facing restaurant platform.",
                src: "/projects/basilico/interior-01.webp",
                alt: "Basilico restaurant interior with dining tables and counter",
            },
            {
                title: "Menu Detail",
                description: "Menu visuals used for customer discovery and product pages.",
                src: "/projects/basilico/margherita.webp",
                alt: "Basilico margherita pizza menu image",
            },
        ],
    },
} satisfies StudioProject;

export const studioProjects = [bejoProject, basilicoProject] satisfies StudioProject[];

export const companyProjects = studioProjects.filter((project) => project.projectType === "company-product");

export const clientProjects = studioProjects.filter((project) => project.projectType === "client-project");

export const getStudioProject = (slug: string) => studioProjects.find((project) => project.slug === slug);
