# VarejoCode Website

Site institucional da VarejoCode - Plataforma de desenvolvimento de software sob demanda via Discord.

## 🎨 Design

- **Paleta**: Black/White suave (tons de cinza/preto para combinar com a logo)
- **Tema**: Dark/Light mode com toggle
- **Animações**: Framer Motion para transições suaves
- **Mobile-first**: Design responsivo otimizado para dispositivos móveis

## 💰 Modelo de Negócio

### Planos Variáveis por Projeto

Os preços **NÃO são fixos**, variam conforme a complexidade do projeto:

**Plano Hospedado:**
- Valor inicial menor + mensalidade
- Exemplo: Site simples R$ 60 + R$ 25/mês
- Inclui: hospedagem completa, suporte contínuo, manutenções gratuitas
- Cliente não tem acesso ao código-fonte

**Plano Source:**
- Pagamento único maior
- Exemplo: Site simples R$ 200
- Cliente recebe código-fonte completo
- Sem compromisso, sem mensalidade
- Cliente hospeda onde quiser

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas
- **Lucide React** - Ícones modernos
- **next-themes** - Suporte a dark/light mode

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página inicial
├── components/
│   ├── sections/        # Seções da landing page
│   │   ├── HeroSection.tsx
│   │   ├── ComparisonSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── FAQSection.tsx
│   │   └── CTASection.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── FloatingButton.tsx
│   ├── ThemeProvider.tsx
│   └── Logo.tsx
└── lib/
    └── utils.ts         # Funções utilitárias
```

## 🛠️ Instalação

1. Instale as dependências:
```bash
npm install
```

2. **IMPORTANTE**: Adicione a logo do VarejoCode:
   - Salve a logo como `logo.png` na pasta `public/`
   - A logo é o carrinho de compras com símbolo de código

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3000](http://localhost:3000)

## 📦 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linting

## 🎨 Características

- ✅ Design responsivo (mobile-first)
- ✅ Tema claro/escuro
- ✅ Animações suaves
- ✅ Paleta black/white minimalista
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ Preços variáveis por projeto (não fixos)

## 🔗 Links

- Discord: [discord.gg/varejocode](https://discord.gg/varejocode)

