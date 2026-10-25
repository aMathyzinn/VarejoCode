"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
import { Mail, X } from "lucide-react";
import { DiscordIcon, WhatsappIcon } from "@/components/icons";
import { URLS } from "@/lib/constants";

type ContactEvent = ReactMouseEvent;
interface ContactContext {
  triggerTransition: (event: ContactEvent) => void;
  triggerDiscordTransition: (event: ContactEvent) => void;
  triggerWhatsAppTransition: (event: ContactEvent) => void;
  openContactOptions: (event: ContactEvent, topic?: string) => void;
}
const WaterTransitionContext = createContext<ContactContext | null>(null);

export function useWaterTransition() {
  const context = useContext(WaterTransitionContext);
  if (!context) throw new Error("useWaterTransition must be used within WaterTransitionProvider");
  return context;
}

function navigateToContact(event: ContactEvent, destination: string) {
  // Anchors keep native new-tab, modifier-key and no-JavaScript behavior.
  if (event.currentTarget instanceof HTMLAnchorElement) return;
  event.preventDefault();
  window.location.assign(destination);
}

function ContactChannelMenu({ topic, onClose }: { topic: string; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const message = `Olá, quero conversar sobre ${topic} na VarejoCode. Meu projeto é: `;
  const whatsappUrl = `${URLS.WHATSAPP}?text=${encodeURIComponent(message)}`;
  const emailUrl = `mailto:${URLS.EMAIL}?subject=${encodeURIComponent(`VarejoCode: ${topic}`)}&body=${encodeURIComponent(message)}`;

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, []);

  return <dialog ref={dialogRef} className="vc-contact-menu" aria-labelledby="contact-menu-title"
    onCancel={(event) => { event.preventDefault(); onClose(); }} onClose={onClose}
    onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]'));
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}
    onClick={(event) => {
      const bounds = event.currentTarget.getBoundingClientRect();
      if (event.target === event.currentTarget && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) onClose();
    }}>
    <button className="vc-contact-close" type="button" onClick={onClose} aria-label="Fechar opções de contato"><X className="h-4 w-4" aria-hidden="true" /></button>
    <p className="vc-contact-overline">Sobre: {topic}</p>
    <h2 id="contact-menu-title">Por onde prefere falar?</h2>
    <p>Escolha o canal para conversar sobre este projeto.</p>
    <div className="vc-contact-options">
      <a className="vc-contact-option vc-contact-option-whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onClose}>
        <WhatsappIcon className="h-5 w-5" aria-hidden="true" /><span><b>WhatsApp</b><small>Mensagem pronta para enviar</small></span>
      </a>
      <a className="vc-contact-option" href={emailUrl} onClick={onClose}><Mail className="h-5 w-5" aria-hidden="true" /><span><b>E-mail</b><small>Assunto e mensagem preenchidos</small></span></a>
      <a className="vc-contact-option" href={URLS.DISCORD_INVITE} target="_blank" rel="noopener noreferrer" onClick={onClose}><DiscordIcon className="h-5 w-5" aria-hidden="true" /><span><b>Discord</b><small>Entrar pelo canal de atendimento</small></span></a>
    </div>
  </dialog>;
}

export function WaterTransitionProvider({ children }: { children: ReactNode }) {
  const [contactTopic, setContactTopic] = useState<string | null>(null);
  const closeContact = useCallback(() => setContactTopic(null), []);
  const openContactOptions = useCallback((event: ContactEvent, topic = "seu projeto") => {
    event.preventDefault();
    setContactTopic(topic);
  }, []);
  const triggerDiscordTransition = useCallback((event: ContactEvent) => navigateToContact(event, URLS.DISCORD_INVITE), []);
  const triggerWhatsAppTransition = useCallback((event: ContactEvent) => navigateToContact(event, URLS.WHATSAPP), []);
  return <WaterTransitionContext.Provider value={{ triggerTransition: openContactOptions, openContactOptions, triggerDiscordTransition, triggerWhatsAppTransition }}>
    {children}
    {contactTopic && <ContactChannelMenu topic={contactTopic} onClose={closeContact} />}
  </WaterTransitionContext.Provider>;
}
