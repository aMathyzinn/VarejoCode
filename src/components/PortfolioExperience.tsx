"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bot, BriefcaseBusiness, CheckCircle2, ChevronRight, Code2, ExternalLink, Globe, Home, Layers3, Phone, Smartphone, X } from "lucide-react";
import Footer from "@/components/Footer";
import { useWaterTransition } from "@/components/WaterTransition";
import { portfolioFilters, portfolioProjects, type PortfolioFilter, type PortfolioProject } from "@/lib/portfolio";
import styles from "./PortfolioExperience.module.css";

type Artwork = Record<string, string | null>;
const moreScopes: { title: string; subtitle: string; filter: PortfolioFilter; icon: typeof Globe; color: string }[] = [
  { title: "Landing Page", subtitle: "Produto digital", filter: "Landing Pages", icon: Layers3, color: "#9175de" },
  { title: "Site Institucional", subtitle: "Empresa e serviços", filter: "Websites", icon: Globe, color: "#477ccc" },
  { title: "App Mobile", subtitle: "Aplicativos sob medida", filter: "Apps", icon: Smartphone, color: "#b8588b" },
  { title: "Sistema Interno", subtitle: "Gestão de processos", filter: "Sistemas", icon: Code2, color: "#439a75" },
  { title: "Bots / Automações", subtitle: "Comunidade e operação", filter: "Bots / Automações", icon: Bot, color: "#657180" },
];

function ProjectVisual({ project, artwork }: { project: PortfolioProject; artwork: Artwork }) {
  const projectArtwork = artwork[project.id];
  if (project.id === "infoclass" && projectArtwork) return (
    <div className={styles.infoClassStage}>
      <div className={styles.infoClassPanel}>
        <Image src={projectArtwork} alt="Apresentação completa do InfoClass com quatro telas do aplicativo" width={1672} height={941} sizes="(max-width: 800px) 94vw, 700px" className={styles.infoClassScene} />
      </div>
    </div>
  );
  if (project.id === "organiccord" && artwork["organiccord-banner"] && artwork["organiccord-ui"]) return (
    <div className={styles.organicCordStage}>
      <div className={styles.organicCordBackdrop}>
        <Image src={artwork["organiccord-banner"]} alt="Banner OrganicCord com o logotipo e os principais recursos do cliente desktop" width={1672} height={941} sizes="(max-width: 800px) 94vw, 650px" />
      </div>
      <div className={styles.organicCordWindow}>
        <Image src={artwork["organiccord-ui"]} alt="Prévia anonimizada da área Amigos e mensagens diretas do OrganicCord" width={1569} height={1002} sizes="(max-width: 800px) 62vw, 430px" />
      </div>
    </div>
  );
  if (project.id === "ticketx" && projectArtwork) return (
    <div className={styles.ticketxStage}>
      <div className={styles.ticketxPanel}>
        <Image src={projectArtwork} alt="Prévia do painel de tickets do Ticketx Bot no Discord" width={1672} height={941} sizes="(max-width: 800px) 160vw, 1100px" className={styles.ticketxPanelImage} />
      </div>
      <div className={styles.ticketxEmblem} aria-hidden="true">
        <Image src={projectArtwork} alt="" width={1672} height={941} sizes="700px" className={styles.ticketxEmblemImage} />
      </div>
    </div>
  );
  if (projectArtwork) return <Image src={projectArtwork} alt={`Apresentação visual de ${project.name}`} fill sizes="(max-width: 800px) 100vw, 650px" className={styles.projectArtwork} />;
  if (project.id === "amathyzin") return (
    <div className={styles.captureGroup}>
      <div className={styles.desktopCapture}>
        <div className={styles.browserChrome}><i /><i /><i /><span>amathyzin.com.br</span></div>
        <Image src="/amathyzin.com.br.webp" alt="Captura real da versão desktop do aMathyzin" width={1920} height={1080} sizes="(max-width: 800px) 85vw, 600px" />
      </div>
      <div className={styles.phoneCapture}>
        <span className={`${styles.phoneSideButton} ${styles.phoneVolumeUp}`} aria-hidden="true" />
        <span className={`${styles.phoneSideButton} ${styles.phoneVolumeDown}`} aria-hidden="true" />
        <span className={`${styles.phoneSideButton} ${styles.phonePower}`} aria-hidden="true" />
        <div className={styles.phoneScreen}>
          <Image src="/portfolio/amathyzin-mobile.webp" alt="Captura real da versão mobile do aMathyzin" width={389} height={869} sizes="160px" className={styles.phoneScreenImage} />
          <span className={styles.phoneDynamicIsland} aria-hidden="true"><i /></span>
          <span className={styles.phoneReflection} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
  const Icon = project.id === "ticketx" ? Bot : project.id === "infoclass" ? Smartphone : Code2;
  return <div className={styles.pendingVisual}><Icon aria-hidden="true" /><span>{project.name}</span><p>Apresentação visual em preparação</p></div>;
}

export default function PortfolioExperience({ artwork }: { artwork: Artwork }) {
  const [filter, setFilter] = useState<PortfolioFilter>("Todos");
  const [selected, setSelected] = useState<PortfolioProject | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { triggerWhatsAppTransition } = useWaterTransition();
  const matches = portfolioProjects.filter((project) => filter === "Todos" || project.filters.includes(filter));
  const publicCount = portfolioProjects.filter((project) => project.published).length;
  const pendingCount = portfolioProjects.length - publicCount;

  useEffect(() => {
    if (selected && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [selected]);

  return (
    <div className={`${styles.page} vc-portfolio`}>
      <section className={styles.hero} aria-labelledby="portfolio-title">
        {artwork.hero && <picture className={styles.heroPicture}><source media="(max-width: 800px)" srcSet={artwork["hero-mobile"] ?? artwork.hero} /><Image src={artwork.hero} alt="" fill priority sizes="100vw" className={styles.heroArtwork} /></picture>}
        <div className={styles.container}>
          <nav className={styles.breadcrumb} aria-label="Caminho da página"><Link href="/"><Home aria-hidden="true" /> Início</Link><ChevronRight aria-hidden="true" /><span aria-current="page">Projetos</span></nav>
          <div className={styles.heroLayout}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Nosso portfólio</p>
              <h1 id="portfolio-title">Projetos em operação,<br /> sistemas e experiências que <br /><span>resolvem problemas reais.</span></h1>
              <p className={styles.intro}>Cada projeto aqui mostra o contexto, a solução desenvolvida e os resultados disponíveis. Diferentes necessidades, um mesmo objetivo: transformar ideias em soluções que geram valor.</p>
              <div className={styles.actions}><button type="button" className={styles.primaryButton} onClick={triggerWhatsAppTransition}><Phone aria-hidden="true" /> Falar no WhatsApp <ArrowRight aria-hidden="true" /></button><Link href="/#processo" className={styles.outlineButton}>Ver nosso processo</Link></div>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-projects" className={`${styles.container} ${styles.projects}`} aria-label="Projetos selecionados">
        <div className={styles.filterBar}>
          <div className={styles.filters} role="group" aria-label="Filtrar projetos por categoria">{portfolioFilters.map((item) => <button type="button" key={item} aria-pressed={filter === item} className={filter === item ? styles.activeFilter : undefined} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <p className={styles.publicationStatus}><span /> {publicCount} {publicCount === 1 ? "case público" : "cases públicos"}{pendingCount > 0 && <> · {pendingCount} em preparação</>}<small>Contexto, soluções e resultados disponíveis.</small></p>
        </div>
        <p className={styles.srOnly} role="status" aria-live="polite">{matches.length} {matches.length === 1 ? "projeto encontrado" : "projetos encontrados"}.</p>
        <div className={styles.projectList}>
          {portfolioProjects.map((project) => <article key={project.id} hidden={filter !== "Todos" && !project.filters.includes(filter)} data-scroll-reveal="up" className={`${styles.projectCard} ${project.id === "organiccord" || project.id === "infoclass" ? styles.reversedCard : ""} ${project.published ? styles.featuredCard : ""}`}>
            <div className={styles.projectCopy}>
              <p className={styles.projectCategory}><BriefcaseBusiness aria-hidden="true" />{project.category}<span>{project.status ?? (project.published ? "Case público" : "Case em preparação")}</span></p>
              <h2>{project.name}</h2><p className={styles.tagline}>{project.tagline}</p><p className={styles.description}>{project.description}</p>
              <ul className={styles.features}>{project.features.map((feature) => <li key={feature}><CheckCircle2 aria-hidden="true" />{feature}</li>)}</ul>
              <div className={styles.stack}><h3>{project.published ? "Tecnologias" : "Tecnologias previstas"}</h3><ul>{project.stack.map((tech) => <li key={tech}>{tech}</li>)}</ul></div>
              {project.metrics.length > 0 ? <div className={styles.results}><h3>Resultados e operação</h3><dl>{project.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl></div> : <p className={styles.pendingResults}>{project.caseNote ?? (project.published ? "Código e documentação disponíveis no repositório." : "Imagens e resultados serão publicados com o case completo.")}</p>}
              <button type="button" className={styles.caseButton} onClick={() => setSelected(project)}>{project.caseButtonLabel ?? (project.published ? "Ver case completo" : "Conhecer o escopo")}<ArrowRight aria-hidden="true" /></button>
            </div>
            <div className={`${styles.projectVisual} ${styles[project.id]}`}><ProjectVisual project={project} artwork={artwork} /></div>
          </article>)}
          {matches.length === 0 && <div className={styles.emptyState}><Smartphone aria-hidden="true" /><h2>Novos cases em preparação</h2><p>Ainda não há um case público nesta categoria. Podemos conversar sobre o projeto que você precisa construir.</p><button className={styles.primaryButton} onClick={triggerWhatsAppTransition}>Conversar sobre um projeto <ArrowRight aria-hidden="true" /></button></div>}
        </div>
        <aside className={styles.moreProjects} aria-labelledby="more-projects-title"><div className={styles.moreHeading}><div><h2 id="more-projects-title">Outros formatos de projeto</h2><p>Soluções para diferentes segmentos e desafios.</p></div><button type="button" className={styles.outlineButton} onClick={() => setFilter("Todos")}>Ver todos os projetos <ArrowRight aria-hidden="true" /></button></div><div className={styles.scopeLinks}>{moreScopes.map(({ title, subtitle, filter: category, icon: Icon, color }) => <a key={title} href="#portfolio-projects" onClick={() => setFilter(category)}><span style={{ backgroundColor: color }}><Icon aria-hidden="true" /></span><p><strong>{title}</strong><small>{subtitle}</small></p></a>)}</div></aside>
      </section>

      <section className={styles.contact} aria-labelledby="portfolio-contact-title">
        {artwork.contact && <Image src={artwork.contact} alt="" fill sizes="100vw" className={styles.contactArtwork} />}
        <div className={styles.container}><BriefcaseBusiness aria-hidden="true" /><h2 id="portfolio-contact-title">O próximo pode ser o seu</h2><p>Vamos conversar sobre o seu projeto e entender como a tecnologia pode resolver os seus desafios.<br />Do planejamento à entrega, cuidamos de cada etapa.</p><div className={styles.actions}><button type="button" className={styles.primaryButton} onClick={triggerWhatsAppTransition}><Phone aria-hidden="true" /> Falar no WhatsApp <ArrowRight aria-hidden="true" /></button><Link href="/#planos" className={styles.outlineButton}>Ver formatos de entrega</Link></div></div>
      </section>
      <div className={styles.footer}><Footer /></div>
      <dialog ref={dialogRef} className={styles.caseDialog} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }} aria-labelledby="case-dialog-title" data-lenis-prevent>
        {selected && <>
          <button type="button" className={styles.closeDialog} aria-label="Fechar detalhes do projeto" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button>
          <p className={styles.eyebrow}>{selected.status ?? (selected.published ? "Projeto em operação" : "Case em preparação")}</p>
          <h2 id="case-dialog-title">{selected.name}</h2>
          <h3>O contexto</h3>
          <p>{selected.problem}</p>
          <h3>{selected.published ? "O que foi construído" : "Sobre o escopo"}</h3>
          <p>{selected.delivery}</p>
          {selected.id === "infoclass" && artwork.infoclass && <Image src={artwork.infoclass} alt="Apresentação completa do InfoClass com quatro telas do aplicativo" width={1672} height={941} sizes="(max-width: 680px) 90vw, 600px" className={styles.caseArtwork} />}
          {selected.id === "organiccord" && <div className={styles.caseArtworkGroup}>
            {artwork["organiccord-banner"] && <Image src={artwork["organiccord-banner"]} alt="Banner completo do OrganicCord" width={1672} height={941} sizes="(max-width: 680px) 90vw, 600px" className={styles.caseArtwork} />}
            {artwork["organiccord-ui"] && <Image src={artwork["organiccord-ui"]} alt="Captura anonimizada da tela Amigos e mensagens diretas do OrganicCord" width={1569} height={1002} sizes="(max-width: 680px) 90vw, 600px" className={styles.caseArtwork} />}
          </div>}
          {selected.metrics.length > 0 && <div className={styles.results}><h3>Resultados e operação</h3><dl>{selected.metrics.map((metric) => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl></div>}
          <div className={styles.actions}>
            {selected.url && <a className={styles.primaryButton} href={selected.url} target="_blank" rel="noopener noreferrer">{selected.urlLabel ?? "Visitar a plataforma"} <ExternalLink aria-hidden="true" /></a>}
            <button className={styles.outlineButton} type="button" onClick={(event) => { dialogRef.current?.close(); triggerWhatsAppTransition(event); }}>Conversar sobre um projeto <ArrowRight aria-hidden="true" /></button>
          </div>
        </>}
      </dialog>
    </div>
  );
}
