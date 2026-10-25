"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Bot,
  BarChart3,
  Check,
  CircleHelp,
  Cloud,
  Code,
  Code2,
  FileText,
  Eye,
  Globe,
  Layers3,
  Mail,
  MessageCircle,
  Monitor,
  MinusCircle,
  Palette,
  Phone,
  Send,
  Settings,
  Smartphone,
  UserRound,
  UsersRound,
  Workflow,
  Zap,
} from "lucide-react";
import { useWaterTransition } from "@/components/WaterTransition";
import HeroConversationStage from "@/components/HeroConversationStage";
import OperationalDiagram from "@/components/OperationalDiagram";
import FeaturedProjectStage from "@/components/FeaturedProjectStage";
import { URLS } from "@/lib/constants";

const capabilities = [
  {
    icon: Globe,
    title: "Sua venda precisa sair do direct",
    scenario: "Para lojas e serviços que recebem pedidos pelo Instagram, WhatsApp ou Discord e precisam centralizar a operação.",
    delivery: "Catálogo, página de produto, checkout e fluxo de pedido.",
    detail: "PIX · Formulário · Catálogo · Atendimento",
  },
  {
    icon: Bot,
    title: "Sua comunidade precisa operar sozinha",
    scenario: "Para servidores que já têm movimento, mas ainda dependem de tarefas manuais, moderação repetitiva ou atendimento disperso.",
    delivery: "Bots, tickets, cargos, comandos e automações de comunidade.",
    detail: "Moderação · Tickets · Economia · RPG",
  },
  {
    icon: Code,
    title: "Sua operação está espalhada",
    scenario: "Para pedidos, clientes, estoque ou dados que hoje vivem entre planilhas, mensagens e ferramentas que não conversam.",
    delivery: "Painéis, APIs e integrações que deixam o fluxo visível.",
    detail: "Painéis · APIs · Webhooks · Dados",
  },
  {
    icon: Smartphone,
    title: "Uma tarefa precisa caber no celular",
    scenario: "Para quando cliente ou equipe precisam resolver uma ação recorrente sem abrir planilhas ou depender do computador.",
    delivery: "Aplicativos mobile focados na tarefa que precisa acontecer.",
    detail: "Android · iOS · React Native · Flutter",
  },
  {
    icon: Monitor,
    title: "Sua equipe precisa de uma ferramenta própria",
    scenario: "Para rotinas internas que pedem uma tela de trabalho mais confiável do que um conjunto de arquivos e mensagens.",
    delivery: "Aplicativos desktop e sistemas sob medida para a operação.",
    detail: "Windows · macOS · Linux · Electron",
  },
  {
    icon: Zap,
    title: "Você repete a mesma tarefa toda semana",
    scenario: "Para processos previsíveis que consomem tempo copiando dados, conferindo status ou avisando pessoas.",
    delivery: "Automações entre formulários, planilhas, APIs e notificações.",
    detail: "Python · Scraping · APIs · Bots",
  },
  {
    icon: Palette,
    title: "Seu produto precisa ficar claro para quem chega",
    scenario: "Para negócios que já têm algo valioso, mas não conseguem explicar, apresentar ou converter isso em uma página ou interface.",
    delivery: "Interface, página e identidade que orientam o próximo passo.",
    detail: "Landing page · UI/UX · Branding · Conteúdo",
  },
  {
    icon: Settings,
    title: "Sua necessidade não cabe em uma categoria",
    scenario: "Você pode chegar com uma ideia, referência, link ou processo travado. O ponto de partida é o que precisa funcionar.",
    delivery: "Escopo sob medida, definido antes de qualquer compromisso.",
    detail: "Projeto sob medida",
  },
];

const journey = [
  {
    number: "01",
    title: "Você entra no contexto certo.",
    description: "Você conta o objetivo, mostra uma referência ou explica o que está travado. A conversa acontece direto com quem vai construir, para alinhar o que realmente importa.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "A proposta deixa o custo visível.",
    description: "Escopo, entregas, prazos, valor e etapas de pagamento são apresentados antes da aprovação. Você decide com o combinado registrado e responsabilidades claras.",
    icon: FileText,
  },
  {
    number: "03",
    title: "A execução acontece com acompanhamento.",
    description: "O canal do projeto reúne atualizações, links de teste, validações e decisões até a entrega combinada.",
    icon: BarChart3,
  },
];

const plans = [
  {
    name: "Plano Hospedado",
    icon: Cloud,
    format: "Continuidade com a VarejoCode",
    description: "A VarejoCode cuida da hospedagem, manutenção e suporte contínuo depois que o projeto entra no ar, conforme o escopo contratado. Você foca no negócio e acompanha a operação com a gente.",
    items: ["Hospedagem incluída", "Suporte técnico contínuo", "Manutenções e correções", "Monitoramento e atualizações"],
  },
  {
    name: "Plano Source",
    icon: Code,
    format: "Continuidade por sua equipe",
    description: "Você recebe o código-fonte e a documentação técnica, escolhe a hospedagem e conduz a operação com sua equipe ou fornecedor. A entrega inclui 30 dias de suporte para essa transição.",
    items: ["Código-fonte 100% seu", "Hospedagem onde preferir", "Documentação técnica", "30 dias de suporte pós-entrega"],
  },
];

const essentialFaqs = [
  ["Quanto tempo leva?", "Landing pages, bots simples e automações menores costumam levar de 3 a 7 dias. Para sistemas maiores, a previsão vai no orçamento antes da aprovação."],
  ["O orçamento tem custo?", "Não. Mandar a ideia e receber uma direção inicial não gera compromisso. Escopo, prazo e valor são alinhados antes de qualquer aprovação."],
  ["Preciso saber tecnologia?", "Não. Diga o que precisa mudar, envie uma referência se tiver e informe quem vai usar. A ferramenta é definida depois."],
  ["Como funciona o pagamento?", "Depois de alinhar escopo, prazo e valor, o pagamento é combinado diretamente por PIX. Em projetos maiores, as etapas também são definidas antes de começar."],
  ["Como acompanho o andamento?", "Usamos um canal privado no Discord para reunir atualizações, links de teste, aprovações e decisões. Se você não usa a plataforma, avise no primeiro contato para alinhar uma alternativa."],
];

const additionalFaqs = [
  ["Qual é a diferença entre os planos?", "No Plano Hospedado, a VarejoCode cuida de hospedagem, manutenção e suporte contínuo. No Plano Source, você recebe o código-fonte e hospeda onde quiser."],
  ["Posso cancelar o plano hospedado?", "Sim. Não há fidelidade mínima. Ao encerrar, a hospedagem é retirada do ar e você pode voltar depois ou migrar para o Plano Source, conforme o escopo."],
  ["O que acontece se eu quiser mudar algo?", "As revisões e os ajustes incluídos são definidos no orçamento. Mudanças que ampliam o escopo são explicadas e orçadas antes de serem feitas."],
  ["O que devo levar para o primeiro contato?", "Conte o objetivo, mande referências se tiver e diga o prazo desejado. Uma faixa de investimento ajuda, mas não é obrigatória para iniciar a conversa."],
];

function FaqGroup({ title, items }: { title?: string; items: string[][] }) {
  return (
    <div className="vc-faq-group">
      {title && <h3>{title}</h3>}
      <div className="vc-faq-list">
        {items.map(([question, answer]) => (
          <details key={question}>
            <summary>
              {question}
              <span aria-hidden="true" />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function HomeExperience() {
  const { triggerWhatsAppTransition, openContactOptions } = useWaterTransition();
  const [showAllCapabilities, setShowAllCapabilities] = useState(false);

  return (
    <div className="vc-home">
      <section className="vc-stage" aria-labelledby="hero-title">
        <div className="vc-stage-grid" aria-hidden="true" />
        <div className="vc-container vc-hero-layout">
          <div className="vc-hero-copy">
            <p className="vc-kicker" data-scroll-reveal="left"><span /> Desenvolvimento direto para quem já opera online</p>
            <h1 id="hero-title" data-scroll-reveal="left"><span className="vc-hero-heading-lead">Você toca a<br className="vc-hero-title-break" /> operação. A gente</span> <span>constrói a parte que falta.</span></h1>
            <p className="vc-lede" data-scroll-reveal="left">Para lojas, comunidades e serviços que precisam vender, atender ou parar de repetir trabalho. Construímos sites, bots, APIs, apps e automações com escopo, prazo e valor combinados antes de começar.</p>
            <div className="vc-hero-actions" data-scroll-reveal="up">
              <a href={URLS.WHATSAPP} onClick={triggerWhatsAppTransition} target="_blank" rel="noreferrer" className="vc-button vc-button-primary">
                <Phone className="h-5 w-5" /> Pedir orçamento no WhatsApp <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#projeto-real" className="vc-button vc-button-quiet">Ver projeto em operação <ArrowRight className="h-4 w-4" /></a>
            </div>
            <p className="vc-reassurance" data-scroll-reveal="up"><Check className="h-4 w-4" /> Envie a ideia, o link ou o servidor. Sem formulário longo.</p>
            <a className="vc-email-link" data-scroll-reveal="up" href={`mailto:${URLS.EMAIL}`}><Mail className="h-4 w-4" /> Prefere e-mail? {URLS.EMAIL}</a>
          </div>

          <HeroConversationStage />
        </div>
      </section>

      <section className="vc-proof-band" aria-label="Resultados e compromissos">
        <div className="vc-container vc-proof-list">
          <div data-scroll-reveal="up"><UsersRound aria-hidden="true" /><p><strong>Projeto próprio em operação</strong><span>no aMathyzin, projeto do nosso portfólio</span></p></div>
          <div data-scroll-reveal="up"><FileText aria-hidden="true" /><p><strong>Escopo, prazo e valor</strong><span>combinados por escrito antes de começar</span></p></div>
          <div data-scroll-reveal="up"><Workflow aria-hidden="true" /><p><strong>Entregas por etapas</strong><span>acompanhe o progresso e teste as entregas</span></p></div>
          <div data-scroll-reveal="up"><MessageCircle aria-hidden="true" /><p><strong>Contato direto</strong><span>fale com quem vai construir seu projeto</span></p></div>
        </div>
      </section>

      <section id="servicos" className="vc-section vc-container vc-services-section" aria-labelledby="services-title">
        <div className="vc-services-intro">
        <div className="vc-services-copy" data-scroll-reveal="left">
          <p className="vc-kicker"><span /> Cenários que resolvemos</p>
          <h2 id="services-title"><span>A conversa</span> <span>começa pelo</span> <span>gargalo da sua</span> <span>operação, não pelo</span> <span>nome da tecnologia.</span></h2>
          <p className="vc-services-context">Entendemos o seu contexto, identificamos o que realmente trava o resultado e só então indicamos a solução ideal, com a tecnologia certa para o seu cenário.</p>
        </div>
        <OperationalDiagram />
        </div>
        <div className="vc-diagnostics" aria-labelledby="diagnostics-title">
          <div className="vc-diagnostics-heading" data-scroll-reveal="up">
            <div>
              <p className="vc-kicker"><span /> Diagnóstico operacional</p>
              <h3 id="diagnostics-title">Os gargalos que mais travam sua operação.</h3>
              <p className="vc-diagnostics-intro">Da venda ao atendimento, encontre o cenário que mais parece com a sua realidade.</p>
            </div>
            <div className="vc-diagnostics-summary">
              <div className="vc-diagnostics-count"><strong>08</strong><span>cenários para encontrar<br />o próximo passo</span></div>
              <p>Necessidades diferentes.<br />Escopo sob medida.<br />Um caminho claro.</p>
            </div>
          </div>
          <div id="vc-scenario-grid" className="vc-scenario-grid">
          {capabilities.map(({ icon: Icon, title, scenario, delivery, detail }, index) => (
            <article key={title} className="vc-scenario-card" data-scroll-reveal="up" hidden={index >= 3 && !showAllCapabilities}>
              <span className="vc-scenario-number">{String(index + 1).padStart(2, "0")}</span>
              <div className="vc-scenario-heading">
                <span className="vc-scenario-icon"><Icon aria-hidden="true" /></span>
                <h4>{title}</h4>
              </div>
              <p className="vc-scenario-description">{scenario}</p>
              <p className="vc-scenario-delivery"><b>Construímos:</b> {delivery}</p>
              <div className="vc-scenario-footer">
                <ul aria-label="Possibilidades para este cenário">
                  {detail.split(" · ").map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <button type="button" onClick={(event) => openContactOptions(event, title)} aria-label={`Conversar sobre: ${title}`}><ArrowRight aria-hidden="true" /></button>
              </div>
            </article>
          ))}
          </div>
          <button type="button" className="vc-diagnostics-toggle" aria-expanded={showAllCapabilities} aria-controls="vc-scenario-grid" onClick={() => setShowAllCapabilities((current) => !current)}>
            {showAllCapabilities ? "Ver menos gargalos" : "Ver todos os gargalos"}<ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>

      <section id="projeto-real" className="vc-work-section" aria-labelledby="work-title">
        <div className="vc-container vc-work-layout">
          <div className="vc-work-copy" data-scroll-reveal="left">
            <p className="vc-kicker"><span /> Destaque do portfólio</p>
            <h2 id="work-title">aMathyzin: uma plataforma própria, <span>do conteúdo à venda.</span></h2>
            <p>Conteúdo, distribuição de software, contas e produtos digitais conectados a uma operação desenvolvida sob medida.</p>
            <dl className="vc-case-facts">
              <div><dt><Layers3 aria-hidden="true" /><span><small>01</small> Ecossistema conectado</span></dt><dd>Blog, downloads, contas e acesso Premium reunidos na mesma plataforma.</dd></div>
              <div><dt><Code2 aria-hidden="true" /><span><small>02</small> Infraestrutura própria</span></dt><dd>APIs, autenticação para aplicativos e controle de acesso aos produtos por conta e dispositivo.</dd></div>
              <div><dt><Settings aria-hidden="true" /><span><small>03</small> Gestão centralizada</span></dt><dd>Painel próprio para administrar publicações, usuários, produtos, vendas, cupons e anúncios.</dd></div>
            </dl>
            <div className="vc-case-scale"><BarChart3 aria-hidden="true" /><p><strong>Projeto próprio em operação</strong><span>No aMathyzin.</span></p></div>
            <Link href="/portfolio/" scroll={false} className="vc-text-link">Explorar todos os projetos <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <FeaturedProjectStage />
        </div>
      </section>

      <section id="processo" className="vc-process-flow" aria-labelledby="process-title">
        <span className="vc-process-orbit vc-process-orbit-top" aria-hidden="true" />
        <span className="vc-process-orbit vc-process-orbit-bottom" aria-hidden="true" />
        <div className="vc-container vc-process-flow-layout">
        <div className="vc-process-flow-heading" data-scroll-reveal="left">
          <p className="vc-kicker"><span /> Contato direto, sem intermediários</p>
          <h2 id="process-title">Você fala direto com quem vai construir, <span>sem abrir vaga, disputar proposta ou preencher briefing infinito.</span></h2>
          <p className="vc-process-flow-summary">Cada etapa começa com contexto e um próximo passo claro. Você sabe o que acontece antes de investir e acompanha a construção até a entrega.</p>
        </div>
        <ol className="vc-process-flow-steps">
          {journey.map(({ number, title, description, icon: Icon }) => (
            <li key={number} data-scroll-reveal="up">
              <span className="vc-process-step-number">{number}</span>
              <span className="vc-process-step-icon"><Icon aria-hidden="true" /></span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
        </div>
      </section>

      <section id="planos" className="vc-formats" aria-labelledby="pricing-title">
        <div className="vc-container">
        <div className="vc-formats-heading">
          <div data-scroll-reveal="left">
          <p className="vc-kicker"><span /> Pós-projeto, sua escolha é clara</p>
          <h2 id="pricing-title">Escolha quem cuida da operação <span>técnica depois que o projeto entra no ar.</span></h2>
          </div>
          <p className="vc-formats-intro">O escopo do projeto é definido antes de começar, com funcionalidades, entregas e responsabilidades combinadas. A diferença está na continuidade: a operação técnica pode ficar com a VarejoCode ou com sua equipe.</p>
        </div>
        <div className="vc-format-grid">
          <span className="vc-format-or" aria-hidden="true">OU</span>
          {plans.map(({ icon: Icon, ...plan }, index) => (
            <article key={plan.name} className="vc-format-card" data-scroll-reveal="up">
              <span className="vc-format-icon"><Icon aria-hidden="true" /></span>
              <span className="vc-format-number">0{index + 1}<i aria-hidden="true" /></span>
              <div className="vc-format-card-heading">
                <h3>{plan.name}</h3>
                <p>{plan.format}</p>
              </div>
              <p className="vc-format-description">{plan.description}</p>
              <ul>{plan.items.map((item) => <li key={item}><span><Check aria-hidden="true" /></span>{item}</li>)}</ul>
              <button type="button" onClick={(event) => openContactOptions(event, plan.name)} className="vc-format-action" aria-label={`Conversar sobre ${plan.name}`}>Conversar sobre essa opção <ArrowRight aria-hidden="true" /></button>
            </article>
          ))}
        </div>
        <p className="vc-format-continuity"><span aria-hidden="true" />Mesmo projeto inicial.<br />Continuidade diferente.<span aria-hidden="true" /></p>
        <div className="vc-format-guide" data-scroll-reveal="up">
          <span className="vc-format-guide-icon"><Layers3 aria-hidden="true" /></span>
          <div>
            <h3>Compare custo inicial, continuidade e responsabilidade antes de escolher.</h3>
            <p>O escopo define o investimento. O formato escolhido define quem assume a operação técnica após o lançamento.</p>
            <small>Antes de aprovar, a proposta registra funcionalidades, prazo, forma de pagamento e custos recorrentes aplicáveis.</small>
          </div>
        </div>
        </div>
      </section>

      <div className="vc-clarity-area">
      <section className="vc-container vc-clarity" aria-labelledby="commitment-title">
        <div className="vc-clarity-heading" data-scroll-reveal="left">
          <span className="vc-clarity-mark" aria-hidden="true"><FileText /></span>
          <p className="vc-kicker"><span /> Mais clareza sempre</p>
          <h2 id="commitment-title">Antes de pagar, você sabe o que está comprando e o que fica para depois.</h2>
        </div>
        <div className="vc-clarity-cards">
          <svg className="vc-clarity-connector" viewBox="0 0 100 360" preserveAspectRatio="none" aria-hidden="true"><path d="M5 0V360 M5 180H18Q40 180 40 155V70Q40 50 60 50H100 M5 180H100 M5 180H18Q40 180 40 205V290Q40 310 60 310H100" /><circle cx="5" cy="180" r="3" /></svg>
          <article data-scroll-reveal="up"><span className="vc-clarity-icon"><FileText aria-hidden="true" /></span><div><h3>Escopo definido</h3><p>Funcionalidades, revisões e responsabilidades ficam registradas na proposta. Você entende o que está incluído antes de aprovar.</p></div></article>
          <article data-scroll-reveal="up"><span className="vc-clarity-icon"><Eye aria-hidden="true" /></span><div><h3>Visibilidade do que será entregue</h3><p>Etapas, prazos e validações são combinados antes de começar. Você acompanha atualizações e testa as entregas no caminho.</p></div></article>
          <article data-scroll-reveal="up"><span className="vc-clarity-icon"><MinusCircle aria-hidden="true" /></span><div><h3>O que fica para depois</h3><p>Também alinhamos o que fica fora da primeira fase. Novas funcionalidades são explicadas e orçadas antes de ampliar o projeto.</p></div></article>
        </div>
      </section>

      <section id="faq" className="vc-container vc-faq vc-clarity-faq" aria-labelledby="faq-title">
        <div className="vc-clarity-faq-heading" data-scroll-reveal="left">
          <div>
          <p className="vc-kicker"><span /> Antes de fechar</p>
          <h2 id="faq-title">O essencial para decidir se vale iniciar a conversa.</h2>
          </div>
          <div className="vc-clarity-faq-note"><span><CircleHelp aria-hidden="true" /></span><p>As respostas para as dúvidas mais comuns. Se ainda ficar algo em aberto, mande uma mensagem para conversar.</p></div>
        </div>
        <FaqGroup items={[...essentialFaqs, ...additionalFaqs]} />
      </section>
      </div>

      <section className="vc-final" aria-labelledby="final-title">
        <Send className="vc-final-watermark" aria-hidden="true" />
        <div className="vc-container vc-final-content">
          <MessageCircle className="vc-final-icon" aria-hidden="true" data-scroll-reveal="up" />
          <p className="vc-kicker" data-scroll-reveal="up"><span /> Precisa colocar algo no ar?</p>
          <h2 id="final-title" data-scroll-reveal="up">Mande a ideia, o link da loja ou o servidor. A gente responde com o caminho mais direto para construir.</h2>
          <p data-scroll-reveal="up">Conte o objetivo, quem vai usar e o prazo desejado. Com contexto suficiente, analisamos a necessidade e combinamos escopo, prazo, valor e próximo passo antes da aprovação.</p>
          <ul className="vc-contact-checklist" aria-label="O que enviar no primeiro contato" data-scroll-reveal="up">
            <li><Check className="h-4 w-4" /> O que precisa acontecer</li>
            <li><Check className="h-4 w-4" /> Link ou referência, se tiver</li>
            <li><Check className="h-4 w-4" /> Prazo desejado</li>
          </ul>
          <div className="vc-final-actions" data-scroll-reveal="up">
            <a href={URLS.WHATSAPP} onClick={triggerWhatsAppTransition} target="_blank" rel="noreferrer" className="vc-button vc-button-primary"><Phone className="h-5 w-5" /> Pedir orçamento no WhatsApp <Send className="h-4 w-4" /></a>
            <a href={`mailto:${URLS.EMAIL}`} className="vc-button vc-button-quiet"><Mail className="h-5 w-5" /> Enviar e-mail</a>
          </div>
        </div>
      </section>
    </div>
  );
}
