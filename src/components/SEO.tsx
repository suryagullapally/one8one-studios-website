import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { absoluteUrl, DEFAULT_OG_IMAGE, getSeoRoute, notFoundSeo, SITE_NAME } from "@/data/seo";

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
    }

    Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
};

const upsertLink = (rel: string, href: string) => {
    let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
    if (!element) {
        element = document.createElement("link");
        element.rel = rel;
        document.head.appendChild(element);
    }
    element.href = href;
};

const upsertStructuredData = (data: Record<string, unknown>[]) => {
    const id = "route-structured-data";
    let element = document.head.querySelector<HTMLScriptElement>(`script#${id}`);
    if (!element) {
        element = document.createElement("script");
        element.type = "application/ld+json";
        element.id = id;
        document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
};

const SEO = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        const route = getSeoRoute(pathname);
        const seo = route ?? notFoundSeo;
        const canonicalUrl = absoluteUrl(seo.canonicalPath ?? (route ? seo.path : pathname));
        const image = seo.image ?? DEFAULT_OG_IMAGE;
        const robots = route ? "index, follow" : "noindex, nofollow";
        const structuredData = seo.structuredData ?? [];

        document.title = seo.title;
        upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
        upsertMeta('meta[name="robots"]', { name: "robots", content: robots });
        upsertMeta('meta[name="author"]', { name: "author", content: SITE_NAME });

        upsertLink("canonical", canonicalUrl);

        upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
        upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
        upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
        upsertMeta('meta[property="og:type"]', { property: "og:type", content: seo.type ?? "website" });
        upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
        upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });

        upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
        upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
        upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
        upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

        upsertStructuredData(structuredData);
    }, [pathname]);

    return null;
};

export default SEO;
