import type { MetadataRoute } from "next";
import { asset } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zuggi: Play. Read. Watch.",
    short_name: "Zuggi",
    start_url: asset("/"),
    display: "standalone",
    background_color: "#0d0717",
    theme_color: "#1A0D2E",
    icons: [{ src: asset("/icon-512.png"), sizes: "512x512", type: "image/png" }],
  };
}
