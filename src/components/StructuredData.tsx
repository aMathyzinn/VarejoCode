import { URLS } from "@/lib/constants";

const organizationId = "https://varejocode.com.br/#organization";
const websiteId = "https://varejocode.com.br/#website";

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: "VarejoCode",
    url: URLS.WEBSITE,
    logo: `${URLS.WEBSITE}/varejocode-logo.png`,
    image: `${URLS.WEBSITE}/banner.png`,
    description: "Desenvolvimento sob demanda para negócios online. A VarejoCode cria sites, bots para Discord, sistemas, APIs, aplicativos e automações, com escopo, valor e prazo combinados antes de começar.",
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    availableLanguage: "pt-BR",
    sameAs: [URLS.GITHUB, URLS.INSTAGRAM, URLS.YOUTUBE, URLS.DISCORD_INVITE],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "orçamento e atendimento",
        telephone: "+55-21-97903-5423",
        email: URLS.EMAIL,
        url: URLS.WHATSAPP,
        availableLanguage: "pt-BR",
      },
      {
        "@type": "ContactPoint",
        contactType: "acompanhamento de projeto",
        url: URLS.DISCORD_INVITE,
        availableLanguage: "pt-BR",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: "VarejoCode",
    url: URLS.WEBSITE,
    inLanguage: "pt-BR",
    publisher: { "@id": organizationId },
    description: "Informações sobre os serviços, processo, planos, portfólio e canais de atendimento da VarejoCode.",
  };

  const serviceSchema = [
    {
      name: "Desenvolvimento de sites e lojas online",
      description: "Landing pages, catálogos, sites institucionais, lojas, portfólios e blogs com caminhos de contato, pedido e compra organizados.",
    },
    {
      name: "Desenvolvimento de bots para Discord",
      description: "Bots para servidores e comunidades de Discord com moderação, tickets, cargos, comandos e rotinas específicas.",
    },
    {
      name: "Sistemas e APIs sob demanda",
      description: "Painéis, integrações e APIs para pedidos, clientes, estoque, dados e processos que estão espalhados entre planilhas e mensagens.",
    },
    {
      name: "Aplicativos mobile e desktop",
      description: "Aplicativos para Android, iOS, Windows, macOS e Linux quando clientes ou equipe precisam de uma ferramenta própria.",
    },
    {
      name: "Automações e integrações",
      description: "Automações e conexões entre planilhas, formulários, pedidos, avisos, APIs e bots personalizados.",
    },
  ].map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    ...service,
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Brasil" },
    availableChannel: [
      { "@type": "ServiceChannel", serviceUrl: URLS.WHATSAPP },
      { "@type": "ServiceChannel", serviceUrl: URLS.DISCORD_INVITE },
    ],
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ["Quanto tempo leva?", "Landing pages, bots simples e automações menores costumam levar de 3 a 7 dias. Para sistemas maiores, a previsão vai no orçamento antes da aprovação."],
      ["O orçamento tem custo?", "Não. Mandar a ideia e receber escopo, prazo e valor não gera compromisso de contratação."],
      ["Como acompanho o andamento?", "Cada projeto tem um canal privado no Discord. É nele que ficam as atualizações, links de teste, aprovações e decisões."],
      ["Como funciona o pagamento?", "Depois de alinhar escopo, prazo e valor, o pagamento é combinado diretamente por PIX. Em projetos maiores, as etapas também são definidas antes de começar."],
      ["Qual é a diferença entre os planos?", "No Plano Hospedado, a VarejoCode cuida de hospedagem, manutenção e suporte contínuo. No Plano Source, você recebe o código-fonte e hospeda onde quiser."],
      ["Preciso saber tecnologia?", "Não. Diga o que precisa mudar, envie uma referência se tiver e informe quem vai usar. A ferramenta é definida depois."],
      ["O que acontece se eu quiser mudar algo?", "As revisões e os ajustes incluídos são definidos no orçamento. Mudanças que ampliam o escopo são explicadas e orçadas antes de serem feitas."],
    ].map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };

  const schemas = [
    ["organization-schema", organizationSchema],
    ["website-schema", websiteSchema],
    ...serviceSchema.map((service, index) => [`service-schema-${index}`, service] as const),
    ["faq-schema", faqSchema],
  ] as const;

  return schemas.map(([id, schema]) => (
    <script
      key={id}
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
