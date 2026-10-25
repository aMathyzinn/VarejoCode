import { existsSync } from "node:fs";
import path from "node:path";
import PortfolioExperience from "@/components/PortfolioExperience";

// Resolve optional artwork at render/build time without requesting missing files.
export default function PortfolioPage() {
  const names = ["hero", "hero-mobile", "amathyzin", "ticketx", "organiccord-banner", "organiccord-ui", "infoclass", "clinica", "pedidofacil", "contact"];
  const artwork = Object.fromEntries(names.map((name) => {
    const file = ["webp", "avif", "png", "jpg"].find((extension) =>
      existsSync(path.join(process.cwd(), "public", "portfolio", `${name}.${extension}`))
    );
    return [name, file ? `/portfolio/${name}.${file}` : null];
  }));
  return <PortfolioExperience artwork={artwork} />;
}
