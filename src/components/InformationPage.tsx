import Link from "next/link";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import { URLS } from "@/lib/constants";
import styles from "./InformationPage.module.css";

export interface InformationSection { id: string; title: string; content: ReactNode }
export default function InformationPage({ title, introduction, sections, updated = false }: { title: string; introduction: string; sections: InformationSection[]; updated?: boolean }) {
  return <><article className={styles.page}>
    <header className={styles.header}>
      <nav aria-label="Caminho da página"><Link href="/">Início</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav>
      <h1>{title}</h1><p>{introduction}</p>
      {updated && <p className={styles.updated}>Atualizado em <time dateTime="2026-10-25">25 de outubro de 2026</time>.</p>}
    </header>
    <div className={styles.layout}>
      <nav className={styles.index} aria-label="Nesta página"><h2>Nesta página</h2>{sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
      <div className={styles.content}>{sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.content}</section>)}
        <section><h2>Fale com a VarejoCode</h2><p>Envie sua dúvida ou explique o projeto para combinar o próximo passo.</p><div className={styles.actions}><a href={URLS.WHATSAPP} target="_blank" rel="noopener noreferrer">Conversar no WhatsApp</a><a href={`mailto:${URLS.EMAIL}`}>Enviar e-mail</a></div></section>
      </div>
    </div>
  </article><Footer /></>;
}
