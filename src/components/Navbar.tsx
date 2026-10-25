"use client";

import { useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/Logo";
import { useWaterTransition } from "@/components/WaterTransition";
import { URLS, NAV_LINKS } from "@/lib/constants";

export default memo(function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const pathname = usePathname();
  const navigationLinks = NAV_LINKS;
  const { triggerWhatsAppTransition } = useWaterTransition();
  const shouldWaitForRouteTransition = (href: string) => !(pathname === "/" && href.startsWith("/#"));

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const sectionIds = NAV_LINKS
      .filter((link) => link.href.startsWith("/#"))
      .map((link) => link.href.slice(2));
    let frame: number | null = null;
    const updateActiveSection = () => {
      frame = null;
      const boundary = (document.querySelector("nav")?.getBoundingClientRect().bottom ?? 80) + 24;
      // Route transitions can mount the home after this effect runs.
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      const current = sections.find((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= boundary + 1 && bounds.bottom > boundary;
      });
      setActiveSection(current?.id ?? null);
    };
    const scheduleUpdate = () => {
      if (frame === null) frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    const routeContainer = document.querySelector("main")?.parentElement;
    const observer = new MutationObserver(scheduleUpdate);
    if (routeContainer) observer.observe(routeContainer, { childList: true });
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [pathname]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isOpen ? "bg-[#070707] border-b border-white/10" : scrolled ? "bg-[#070707]/95 backdrop-blur-lg border-b border-white/10" : pathname.startsWith("/portfolio") ? "bg-transparent border-0" : "bg-[#070707]/80 border-b border-white/10"
      )}
    >
      <div className="container-max mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            scroll={pathname === "/"}
            className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
          >
            <Logo size={40} className="transition-transform group-hover:scale-110" />
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold tracking-[-0.02em] text-white leading-tight">
                VarejoCode
              </span>
              <span className="text-[11px] text-[#e4c28a] font-medium leading-snug [text-shadow:0_0_12px_rgba(228,194,138,0.18)]">
                Sites, sistemas e automações
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigationLinks.map((link) => {
              const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
              const isActive = sectionId ? activeSection === sectionId : pathname.replace(/\/$/, "") === link.href.replace(/\/$/, "");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  scroll={!shouldWaitForRouteTransition(link.href)}
                  aria-current={isActive ? (sectionId ? "location" : "page") : undefined}
                  className={cn(
                    "relative py-2 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-white after:transition-transform",
                    isActive ? "text-white after:scale-x-100" : "text-gray-300 hover:text-white after:scale-x-0 hover:after:scale-x-100",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={URLS.WHATSAPP}
              onClick={triggerWhatsAppTransition}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-black transition-colors hover:bg-white/80 cursor-pointer"
              aria-label="Falar no WhatsApp"
            >
              <Phone className="w-5 h-5" />
              Falar no WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="min-h-11 min-w-11 p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4">
                {navigationLinks.map((link) => {
                  const sectionId = link.href.startsWith("/#") ? link.href.slice(2) : null;
                  const isActive = sectionId ? activeSection === sectionId : pathname.replace(/\/$/, "") === link.href.replace(/\/$/, "");

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      scroll={!shouldWaitForRouteTransition(link.href)}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? (sectionId ? "location" : "page") : undefined}
                      className={cn("flex min-h-11 items-center py-2 font-medium transition-colors", isActive ? "text-white" : "text-gray-300 hover:text-white")}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <a
                  href={URLS.WHATSAPP}
                  onClick={(event) => {
                    setIsOpen(false);
                    triggerWhatsAppTransition(event);
                  }}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 mt-4"
                >
                  <Phone className="w-5 h-5" />
                  Falar no WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
})
