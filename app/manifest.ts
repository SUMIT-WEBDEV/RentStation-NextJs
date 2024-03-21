import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RentStation",
    short_name: "RentStation",
    description: "A user to user rental platform",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/rs1.svg",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/rs1.svg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
