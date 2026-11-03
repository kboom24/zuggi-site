/** PLACEHOLDER: Zuggi Shop. All items are "Coming soon"; no prices or checkout yet. */
export type MerchItem = { slug: string; name: string; blurb: string; image: string };

export const merch: MerchItem[] = [
  { slug: "squad-hoodie", name: "Zuggi Squad Hoodie", blurb: "Neon lavender hoodie with the Zuggi wordmark.", image: "/img/m-hoodie.webp" },
  { slug: "zuggi-plush", name: "Zuggi Plush", blurb: "The mascot, in huggable form. Headphones included.", image: "/img/m-plush.webp" },
  { slug: "sticker-pack", name: "Squad Sticker Pack", blurb: "Die-cut vinyl stickers of the whole squad.", image: "/img/m-stickers.webp" },
  { slug: "phone-case", name: "Zuggi Phone Case", blurb: "Deep purple case with magenta wordmark.", image: "/img/m-phone.webp" },
];
