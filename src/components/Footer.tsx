"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { Github, Instagram, Youtube, Heart } from "lucide-react";
import { URLS, FOOTER_LINKS } from "@/lib/constants";

const socialLinks = [
  { icon: Github, href: URLS.GITHUB, label: "GitHub" },
  { icon: Instagram, href: URLS.INSTAGRAM, label: "Instagram" },
  { icon: Youtube, href: URLS.YOUTUBE, label: "YouTube" },
];

export default memo(function Footer() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-white dark:bg-discord-darkest border-t border-gray-200 dark:border-gray-800">
      <div className="container-max px-4 md:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <motion.a
                href="#"
                className="flex items-center gap-2 mb-6"
                whileHover={{ scale: 1.02 }}
              >
                <Logo size={40} />
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  Varejo<span className="text-black dark:text-white">Code</span>
                </span>
              </motion.a>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
                Desenvolvimento de software sob demanda via Discord. 
                Sem burocracia, sem taxas abusivas, direto ao ponto.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Serviços
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.servicos.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Empresa
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.empresa.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                Suporte
              </h4>
              <ul className="space-y-3">
                {FOOTER_LINKS.suporte.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
                © {currentYear} VarejoCode. Todos os direitos reservados.
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-600 text-center md:text-left">
                VarejoCode Desenvolvimento de Software · CNPJ em processo de abertura · contato@varejocode.com.br
              </p>
              <a 
                href="https://amathyzin.com.br/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors group"
              >
                Powered by 
                <span className="font-semibold group-hover:underline">aMathyzin Group</span>
              </a>
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center gap-4">
              {FOOTER_LINKS.legal.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              Feito com <Heart className="w-4 h-4 text-discord-red fill-discord-red" /> via Discord
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
