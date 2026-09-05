import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteUrl = "https://one8onestudios.com";
const siteName = "One8One Studios";
const defaultImage = `${siteUrl}/og-image.png`;

const bejoProject = {
    name: "BEJO",
    liveUrl: "https://bejo.one8onestudios.com",
    internalPath: "/apps/bejo",
    description:
        "A file-sharing and print-workflow application for sending, receiving, previewing, downloading, printing and managing files with sender controls.",
};

const basilicoProject = {
    name: "Basilico – Simple Italian",
    liveUrl: "https://basilicodorchester.co.uk",
    internalPath: "/apps/basilico",
    clientLocation: "Dorchester, Dorset, UK",
    heroImage: "/projects/basilico/basilico-hero.webp",
};

const studioProjects = [
    { name: bejoProject.name, internalPath: bejoProject.internalPath },
    { name: basilicoProject.name, internalPath: basilicoProject.internalPath },
];

const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "One8One Studios",
    legalName: "Onaytone Software Studios Private Limited",
    url: siteUrl,
    logo: `${siteUrl}/apple-touch-icon.png`,
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
    name: siteName,
    url: siteUrl,
};

const breadcrumb = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${siteUrl}${item.path}`,
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
        url: `${siteUrl}${project.internalPath}`,
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
    mainEntityOfPage: `${siteUrl}${bejoProject.internalPath}`,
    description: bejoProject.description,
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
    url: `${siteUrl}${basilicoProject.internalPath}`,
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

const routes = [
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
        image: `${siteUrl}/bejo-screenshots/dashboard.jpg`,
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
        image: `${siteUrl}${basilicoProject.heroImage}`,
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

const escapeHtml = (value) =>
    String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const absoluteUrl = (pathOrUrl) => {
    if (pathOrUrl.startsWith("http")) return pathOrUrl;
    return `${siteUrl}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
};

const extractAssetHeadTags = (template) => {
    const head = template.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
    return head
        .split("\n")
        .filter((line) => {
            const trimmed = line.trim();
            return (
                trimmed.includes('type="module"') ||
                trimmed.includes('rel="stylesheet"') ||
                trimmed.includes('rel="modulepreload"')
            );
        })
        .join("\n");
};

const buildHead = (route, assetHeadTags) => {
    const canonical = absoluteUrl(route.canonicalPath ?? route.path);
    const image = route.image ?? defaultImage;
    const structuredData = route.structuredData ?? [];

    return `    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="robots" content="index, follow" />
    <meta name="author" content="${escapeHtml(siteName)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta name="theme-color" content="#302b63" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:type" content="${route.type ?? "website"}" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
    <script id="route-structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>
${assetHeadTags}`;
};

const renderRouteHtml = (template, route, assetHeadTags) =>
    template.replace(/<head>[\s\S]*?<\/head>/, `<head>\n${buildHead(route, assetHeadTags)}\n</head>`);

const writeRoute = async (template, route, assetHeadTags) => {
    const html = renderRouteHtml(template, route, assetHeadTags);
    if (route.path === "/") {
        await writeFile(path.join(distDir, "index.html"), html);
        return;
    }

    const routeDir = path.join(distDir, route.path.replace(/^\//, ""));
    await mkdir(routeDir, { recursive: true });
    await writeFile(path.join(routeDir, "index.html"), html);
};

const main = async () => {
    const template = await readFile(path.join(distDir, "index.html"), "utf8");
    const assetHeadTags = extractAssetHeadTags(template);
    await Promise.all(routes.map((route) => writeRoute(template, route, assetHeadTags)));
    console.log(`Prerendered SEO HTML for ${routes.length} public routes.`);
};

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
