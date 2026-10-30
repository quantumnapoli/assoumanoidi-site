import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: "/Users/massimo/Documents/thebest/gsap/Assoumanoidi/assoumanoidi-site",
  async redirects() {
    return [
      // /autori era l'area riservata (con password): ora le norme sono pubbliche in
      // /rivista/norme-per-autori. Il redirect serve a chi ha ancora il vecchio link.
      { source: "/autori", destination: "/rivista/norme-per-autori", permanent: false },
    ];
  },
};

export default nextConfig;
