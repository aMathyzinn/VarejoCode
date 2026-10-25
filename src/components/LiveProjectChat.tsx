"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Check, Clock3, MessageCircle } from "lucide-react";

type ChatStage = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

const transition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] } as const;

function DiscordMessage({
  author,
  avatar,
  bot = false,
  children,
}: {
  author: string;
  avatar: "/chat-client-avatar.png" | "/icon.webp";
  bot?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.article
      className="vc-discord-message"
      initial={{ opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={transition}
    >
      <Image className="vc-discord-avatar" src={avatar} alt="" width={38} height={38} />
      <div>
        <div className="vc-discord-message-meta">
          <b>{author}</b>
          {bot ? <span className="vc-discord-bot-tag"><Bot size={8} /> BOT</span> : null}
          <time>agora</time>
        </div>
        <p>{children}</p>
      </div>
    </motion.article>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      className="vc-typing"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={transition}
      aria-label="VarejoCode Bot está digitando"
    >
      VarejoCode Bot está digitando <i /> <i /> <i />
    </motion.div>
  );
}

export default function LiveProjectChat() {
  const [stage, setStage] = useState<ChatStage>(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduceMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setStage(9);
      return;
    }

    const schedule: Array<[ChatStage, number]> = [
      [1, 950],
      [2, 2200],
      [3, 4200],
      [4, 5500],
      [5, 6900],
      [6, 9100],
      [7, 10400],
      [8, 12100],
      [9, 13800],
    ];
    const timers = schedule.map(([nextStage, delay]) => window.setTimeout(() => setStage(nextStage), delay));
    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      messagesRef.current?.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [reduceMotion, stage]);

  return (
    <div className="vc-live-chat">
      <div className="vc-live-chat-context"><MessageCircle size={11} /> Exemplo de acompanhamento no Discord</div>
      <div className="vc-console-main" ref={messagesRef} data-lenis-prevent>
        <div className="vc-channel-line"><span>#</span><b>novo-projeto</b><em>Canal privado</em></div>
        <AnimatePresence initial={!reduceMotion} mode="popLayout">
          <DiscordMessage author="Rafael" avatar="/chat-client-avatar.png" key="client-start">
            Oi! Nunca fiz um site. Eu vendo acessórios pelo Instagram e queria mostrar os produtos num link. Dá para pedir pelo WhatsApp?
          </DiscordMessage>

          {stage === 1 ? <TypingIndicator key="typing-first" /> : null}

          {stage >= 2 ? (
            <DiscordMessage author="VarejoCode" avatar="/icon.webp" bot key="bot-welcome">
              Oi, Rafael! Dá sim. Posso registrar o briefing e pedir os detalhes para montar a proposta com você.
            </DiscordMessage>
          ) : null}

          {stage >= 3 ? (
            <DiscordMessage author="Rafael" avatar="/chat-client-avatar.png" key="client-details">
              Eu tenho fotos e uma logo, mas não sei o que precisa ter. Também queria PIX, só não sei como funciona a hospedagem.
            </DiscordMessage>
          ) : null}

          {stage === 4 ? <TypingIndicator key="typing-hosting" /> : null}

          {stage >= 5 ? (
            <DiscordMessage author="VarejoCode" avatar="/icon.webp" bot key="bot-hosting">
              Sem problema. No formato Hospedado, a VarejoCode cuida de colocar no ar, atualizações e suporte. Para PIX e pedidos, confirmamos o fluxo antes de começar.
            </DiscordMessage>
          ) : null}

          {stage >= 6 ? (
            <DiscordMessage author="Rafael" avatar="/chat-client-avatar.png" key="client-deadline">
              Entendi. Queria algo simples primeiro e colocar no ar até semana que vem. Vocês conseguem me dizer prazo e valor?
            </DiscordMessage>
          ) : null}

          {stage === 7 ? <TypingIndicator key="typing-estimate" /> : null}

          {stage >= 8 ? (
            <DiscordMessage author="VarejoCode" avatar="/icon.webp" bot key="bot-estimate">
              Para uma página com catálogo, pedido e PIX, a previsão inicial é de 5 a 7 dias. Um responsável confere as páginas e envia valor, cronograma e etapas antes de começar.
            </DiscordMessage>
          ) : null}

          {stage >= 9 ? (
            <motion.div
              className="vc-discord-summary"
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              key="summary"
            >
              <Check size={12} /> <span><b>Briefing encaminhado</b><br />Próximo passo: análise do projeto</span>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="vc-live-chat-footer"><i /> Briefing registrado <span><Clock3 size={10} /> Atendimento pelos canais de contato</span></div>
    </div>
  );
}
