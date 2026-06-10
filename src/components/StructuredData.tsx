import Script from 'next/script';

export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VarejoCode",
    "url": "https://varejocode.com.br",
    "logo": "https://varejocode.com.br/logo.png",
    "description": "Plataforma de desenvolvimento de software sob demanda via Discord. Sem burocracia, sem taxas abusivas. Powered by aMathyzin Group.",
    "sameAs": [
      "https://discord.gg/THE7mm5uVk"
    ],
    "parentOrganization": {
      "@type": "Organization",
      "name": "aMathyzin Group",
      "url": "https://amathyzin.com.br/",
      "logo": "https://amathyzin.com.br/imgs/logo.webp"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "contato@varejocode.com.br",
      "url": "https://discord.gg/THE7mm5uVk",
      "availableLanguage": "Portuguese"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "VarejoCode",
    "url": "https://varejocode.com.br",
    "description": "Desenvolvimento de software sob demanda via Discord",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://varejocode.com.br/#servicos?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Desenvolvimento de Bots para Discord",
        "description": "Bots personalizados para Discord com moderação, música, economia, RPG e sistemas de ticket.",
        "provider": {
          "@type": "Organization",
          "name": "VarejoCode"
        }
      },
      {
        "@type": "Service",
        "name": "Desenvolvimento de Websites e Landing Pages",
        "description": "Sites institucionais, e-commerce, portfolios e blogs responsivos e modernos.",
        "provider": {
          "@type": "Organization",
          "name": "VarejoCode"
        }
      },
      {
        "@type": "Service",
        "name": "Desenvolvimento de Aplicativos Mobile",
        "description": "Apps para Android e iOS usando React Native e Flutter.",
        "provider": {
          "@type": "Organization",
          "name": "VarejoCode"
        }
      },
      {
        "@type": "Service",
        "name": "Automações em Python",
        "description": "Web scraping, automação de processos, APIs e bots personalizados.",
        "provider": {
          "@type": "Organization",
          "name": "VarejoCode"
        }
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Como funciona o processo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Você entra no nosso servidor Discord, abre um ticket, descreve seu projeto e recebe um orçamento personalizado. Após aprovação, iniciamos o desenvolvimento."
        }
      },
      {
        "@type": "Question",
        "name": "Quais formas de pagamento são aceitas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Aceitamos PIX, cartão de crédito e transferência bancária. O pagamento é direto, sem intermediários."
        }
      },
      {
        "@type": "Question",
        "name": "Qual a diferença entre os planos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No Plano Hospedado você paga menos inicialmente e uma mensalidade para hospedagem e suporte. No Plano Source você paga uma única vez e recebe o código-fonte completo."
        }
      },
      {
        "@type": "Question",
        "name": "Quanto tempo leva para desenvolver um projeto?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "O prazo varia de acordo com a complexidade do projeto. Projetos simples podem ficar prontos em 3-7 dias, enquanto projetos mais complexos podem levar semanas."
        }
      },
      {
        "@type": "Question",
        "name": "Posso solicitar alterações depois da entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sim! No Plano Hospedado as manutenções são gratuitas. No Plano Source você pode solicitar alterações mediante orçamento."
        }
      },
      {
        "@type": "Question",
        "name": "Preciso ter conhecimento técnico?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Não! Cuidamos de toda a parte técnica. Você só precisa nos dizer o que deseja e nós fazemos acontecer."
        }
      },
      {
        "@type": "Question",
        "name": "Como é o suporte após a entrega?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No Plano Hospedado o suporte é contínuo e incluído. No Plano Source oferecemos garantia de 30 dias e suporte adicional mediante contratação."
        }
      }
    ]
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "VarejoCode",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "bestRating": "5",
      "ratingCount": "80"
    }
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="rating-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
    </>
  );
}
