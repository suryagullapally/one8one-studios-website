import { basilicoProject, bejoProject, studioProjects } from "@/data/projects";

export type SeoRoute = {
    path: string;
    title: string;
    description: string;
    canonicalPath?: string;
    image?: string;
    type?: "website" | "article";
    structuredData?: Record<string, unknown>[];
};

export const SITE_URL = "https://one8onestudios.com";
export const SITE_NAME = "One8One Studios";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "One8One Studios",
    legalName: "Onaytone Software Studios Private Limited",
    url: SITE_URL,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    email: "one8one.studios@gmail.com",
    address: {
        "@type": "PostalAddress",
        streetAddress: "1-31-821, Krishna Nagar, Old Bowenpally, Trimulgherry",
        addressLocality: "Hyderabad",
        addressRegion: "Telangana",
        postalCode: "500015",
        addressCountry: "IN",
    },
};

const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
};

const breadcrumb = (items: Array<{ name: string; path: string }>) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.path}`,
    })),
});

const projectsItemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Products and client projects by One8One Studios",
    itemListElement: studioProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: project.name,
        url: `${SITE_URL}${project.internalPath}`,
    })),
};

const bejoSoftwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: bejoProject.name,
    alternateName: "Bejo Aaram Se",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS, Android, Web",
    url: bejoProject.liveUrl,
    mainEntityOfPage: `${SITE_URL}${bejoProject.internalPath}`,
    description: bejoProject.cardDescription,
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
    },
    publisher: organizationStructuredData,
};

const basilicoCaseStudyStructuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "Basilico Restaurant Platform",
    headline: basilicoProject.name,
    description:
        "A production restaurant platform designed and engineered by One8One Studios for a UK hospitality client, including bookings, online ordering, Stripe payments and restaurant operations.",
    url: `${SITE_URL}${basilicoProject.internalPath}`,
    creator: organizationStructuredData,
    about: {
        "@type": "SoftwareApplication",
        name: `${basilicoProject.name} restaurant platform`,
        applicationCategory: "RestaurantApplication",
        operatingSystem: "Web",
        url: basilicoProject.liveUrl,
        creator: organizationStructuredData,
    },
    contentLocation: {
        "@type": "Place",
        name: basilicoProject.clientLocation,
        address: {
            "@type": "PostalAddress",
            addressLocality: "Dorchester",
            addressRegion: "Dorset",
            addressCountry: "GB",
        },
    },
};

export const seoRoutes: SeoRoute[] = [
    {
        path: "/",
        title: "One8One Studios | Mobile App & Web Platform Development",
        description:
            "One8One Studios designs, engineers and launches mobile apps, web platforms and production digital products for its own products and client work in India and the UK.",
        structuredData: [organizationStructuredData, websiteStructuredData, projectsItemListStructuredData],
    },
    {
        path: "/apps",
        title: "Apps & Client Projects | One8One Studios",
        description:
            "Explore products and client platforms built by One8One Studios, including BEJO and the Basilico restaurant platform.",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }]), projectsItemListStructuredData],
    },
    {
        path: "/apps/bejo",
        title: "BEJO | File Sharing and Print Workflow App",
        description:
            "BEJO helps users send, receive, preview, download, print and manage files with QR receiver identification, permissions, expiry controls and print workflows.",
        image: `${SITE_URL}/bejo-screenshots/dashboard.jpg`,
        structuredData: [
            bejoSoftwareStructuredData,
            breadcrumb([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }, { name: "BEJO", path: "/apps/bejo" }]),
        ],
    },
    {
        path: "/apps/basilico",
        title: "Basilico Restaurant Platform | One8One Studios Client Project",
        description:
            "See how One8One Studios designed and engineered Basilico's restaurant platform for a UK hospitality client, including bookings, online ordering, Stripe payments and restaurant operations.",
        image: `${SITE_URL}${basilicoProject.visual.heroImage}`,
        type: "article",
        structuredData: [
            basilicoCaseStudyStructuredData,
            breadcrumb([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }, { name: "Basilico", path: "/apps/basilico" }]),
        ],
    },
    {
        path: "/privacy-policy",
        title: "BEJO Privacy Policy | One8One Studios",
        description:
            "Read BEJO's Privacy Policy covering personal information, service data, retention, privacy rights, security and contact details.",
        type: "article",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])],
    },
    {
        path: "/terms-and-conditions",
        title: "BEJO Terms & Conditions | One8One Studios",
        description:
            "Read BEJO's Terms & Conditions covering accounts, content, permissions, QR receivers, printing, expiry, prohibited conduct and governing law.",
        type: "article",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms-and-conditions" }])],
    },
    {
        path: "/terms",
        canonicalPath: "/terms-and-conditions",
        title: "BEJO Terms & Conditions | One8One Studios",
        description:
            "Read BEJO's Terms & Conditions covering accounts, content, permissions, QR receivers, printing, expiry, prohibited conduct and governing law.",
        type: "article",
    },
    {
        path: "/portfolio",
        title: "Portfolio & Case Studies | One8One Studios",
        description:
            "View One8One Studios portfolio and case studies across mobile app development, web platform development, product design and end-to-end software delivery.",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }]), projectsItemListStructuredData],
    },
    {
        path: "/about",
        title: "About One8One Studios | App Development Team in Hyderabad",
        description:
            "Learn about One8One Studios, a Hyderabad-based software studio building mobile apps, web platforms and practical digital products.",
    },
    {
        path: "/contact",
        title: "Contact One8One Studios | Start Your App or Web Project",
        description:
            "Contact One8One Studios to discuss mobile app development, web platform development, SaaS MVPs, Firebase-backed products and custom software projects.",
    },
];

export const notFoundSeo: SeoRoute = {
    path: "/404",
    title: "Page Not Found | One8One Studios",
    description: "The page you are looking for could not be found.",
};

export const getSeoRoute = (pathname: string) => {
    const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : "/";
    return seoRoutes.find((route) => route.path === normalizedPath);
};

export const absoluteUrl = (pathOrUrl: string) => {
    if (pathOrUrl.startsWith("http")) return pathOrUrl;
    return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};
