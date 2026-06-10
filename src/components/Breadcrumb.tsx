import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 flex-wrap">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Início</span>
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-600 flex-shrink-0" />
          {item.href && index < items.length - 1 ? (
            <Link
              href={item.href}
              className="hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
