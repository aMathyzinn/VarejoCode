import Image from "next/image";
import { memo } from "react";

interface LogoProps {
  className?: string;
  size?: number;
  priority?: boolean;
}

const Logo = memo(function Logo({ className = "", size = 40, priority = false }: LogoProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }} suppressHydrationWarning>
      <Image
        src="/varejocode-logo.png"
        alt="VarejoCode Logo"
        width={size}
        height={size}
        className="object-contain"
        priority={priority}
      />
    </div>
  );
});

export default Logo;
