export type SeoRoute = {
    path: string;
    title: string;
    description: string;
    canonicalPath?: string;
    image?: string;
    type?: "website" | "article";
    structuredData?: Record<string, unknown>[];
};

export const SITE_URL = "https://bejo.one8onestudios.com";
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

const bejoSoftwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BEJO",
    alternateName: "Bejo Aaram Se",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS, Android, Web",
    url: `${SITE_URL}/apps/bejo`,
    description:
        "BEJO is a file-sharing and print-workflow application for sending, receiving, previewing, downloading, printing, and managing files with sender permissions.",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
    },
    publisher: organizationStructuredData,
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

export const seoRoutes: SeoRoute[] = [
    {
        path: "/",
        title: "One8One Studios | Mobile App & Web App Development",
        description:
            "One8One Studios builds mobile apps, web apps, Firebase-backed products, and polished digital experiences for startups and ambitious businesses.",
        structuredData: [organizationStructuredData, websiteStructuredData],
    },
    {
        path: "/apps",
        title: "Apps by One8One Studios | BEJO and Product Portfolio",
        description:
            "Explore apps built by One8One Studios, including BEJO, a file-sharing and print-workflow application for iOS, Android, and web.",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }])],
    },
    {
        path: "/apps/bejo",
        title: "BEJO | File Sharing and Print Workflow App",
        description:
            "BEJO helps users send, receive, preview, download, print, and manage files with QR receiver identification, permissions, expiry controls, and print workflows.",
        image: `${SITE_URL}/bejo-screenshots/dashboard.jpg`,
        structuredData: [
            bejoSoftwareStructuredData,
            breadcrumb([{ name: "Home", path: "/" }, { name: "Apps", path: "/apps" }, { name: "BEJO", path: "/apps/bejo" }]),
        ],
    },
    {
        path: "/privacy-policy",
        title: "BEJO Privacy Policy | One8One Studios",
        description:
            "Read BEJO's Privacy Policy covering personal information, service data, retention, privacy rights, security, and contact details.",
        type: "article",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])],
    },
    {
        path: "/terms-and-conditions",
        title: "BEJO Terms & Conditions | One8One Studios",
        description:
            "Read BEJO's Terms & Conditions covering accounts, content, permissions, QR receivers, printing, expiry, prohibited conduct, and governing law.",
        type: "article",
        structuredData: [breadcrumb([{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms-and-conditions" }])],
    },
    {
        path: "/terms",
        canonicalPath: "/terms-and-conditions",
        title: "BEJO Terms & Conditions | One8One Studios",
        description:
            "Read BEJO's Terms & Conditions covering accounts, content, permissions, QR receivers, printing, expiry, prohibited conduct, and governing law.",
        type: "article",
    },
    {
        path: "/portfolio",
        title: "Portfolio & Case Studies | One8One Studios",
        description:
            "View One8One Studios portfolio and case studies across mobile app development, web app development, product design, and end-to-end software delivery.",
    },
    {
        path: "/about",
        title: "About One8One Studios | App Development Team in Hyderabad",
        description:
            "Learn about One8One Studios, a Hyderabad-based software studio building mobile apps, web apps, and practical digital products.",
    },
    {
        path: "/contact",
        title: "Contact One8One Studios | Start Your App or Web Project",
        description:
            "Contact One8One Studios to discuss mobile app development, web app development, SaaS MVPs, Firebase-backed products, and custom software projects.",
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
