import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";

export function pageMeta({ title, description, path, image = "/og.jpg" }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | ${SITE.name}`, description, url, siteName: SITE.name, images: [{ url: img }], type: "website" },
    twitter: { card: "summary_large_image", title: `${title} | ${SITE.name}`, description, images: [img] },
  };
}
