import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const siteUrl = "https://bejo.one8onestudios.com";
const siteName = "One8One Studios";
const defaultImage = `${siteUrl}/og-image.png`;

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

const bejoSoftwareStructuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BEJO",
    alternateName: "Bejo Aaram Se",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS, Android, Web",
    url: `${siteUrl}/apps/bejo`,
    description:
        "BEJO is a file-sharing and print-workflow application for sending, receiving, previewing, downloading, printing, and managing files with sender permissions.",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
    },
    publisher: organizationStructuredData,
};

const routes = [
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
        image: `${siteUrl}/bejo-screenshots/dashboard.jpg`,
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
