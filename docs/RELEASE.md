# Publicação da nova VarejoCode

O domínio de destino é `varejocode.com.br`. A versão pública antiga só deve ser substituída depois da conferência de uma prévia do candidato.

## Gerar e abrir a versão local

```powershell
npm ci
npm run lint
npm audit
npm run build
npm run preview
```

Acesse `http://localhost:3000`. A prévia serve somente `out/`, aplica os cabeçalhos de segurança definidos em `vercel.json` e replica o cache dos assets com hash. Não é o servidor de desenvolvimento. Para usar outra porta, defina `PORT` antes de executar. `npm start` também abre essa prévia, pois `next start` não serve projetos com `output: 'export'`.

## Vercel

O arquivo `vercel.json` define build, diretório `out/`, cabeçalhos e cache. A configuração usa hospedagem estática, sem servidor Next em produção. As regras de `.htaccess` não são utilizadas pela Vercel.

1. Vincule o projeto à conta e ao projeto Vercel corretos.
2. Gere uma implantação de prévia, sem promover para produção.
3. Confira home, projetos, contratação, termos, privacidade e tecnologias, incluindo navegação direta e atualização da página.
4. Verifique CSP, HSTS, `nosniff`, bloqueio de iframe, HTTPS, redirecionamentos e imagem de compartilhamento na própria prévia. A configuração local não comprova os cabeçalhos da hospedagem.
5. Faça um teste autorizado de envio e recebimento de contato em WhatsApp e e-mail. Abertura de link ou existência de registro MX não comprova recebimento.
6. Preserve a implantação anterior para reversão, promova a versão conferida e valide `varejocode.com.br` e `www.varejocode.com.br`.

## Dependências

O projeto usa Next 15.5.28, React 19.2.9, React Three Fiber 9.3.0 e a configuração ESLint correspondente. A cena 3D foi alinhada com a versão de React utilizada pelo App Router. Os overrides de PostCSS e do parser de seletores removem versões transitivas com avisos conhecidos. O build verifica a compatibilidade do processamento CSS com Tailwind 3; repita build e auditoria quando atualizar dependências. Não use atualização forçada para migrar Tailwind ou React sem verificar a interface.

## Conteúdo revisado em 25/10/2026

- A página de contratação descreve proposta, escopo, custos e formas de continuidade, sem preços inventados.
- As políticas descrevem os canais e o funcionamento atual do site. Os termos preservam direitos legais de cancelamento e reembolso. Esta atualização de texto não substitui uma revisão jurídica do responsável pelo serviço.
- O número de downloads e a promessa de proposta em 24 horas foram retirados das chamadas até que sua fonte e capacidade operacional sejam confirmadas.
- As imagens originais e o conteúdo anterior das três páginas foram preservados no diretório de artefatos desta conversa, fora da pasta pública.

## Empacotamento

O pacote estático é formado exclusivamente pelo conteúdo de `out/`. Não inclua `.env`, dependências, arquivos de conta da hospedagem ou fontes privadas. Um manifesto de hashes permite identificar exatamente o conjunto publicado. Um ZIP de `out/` serve para hospedagem de arquivos estáticos; para implantação da Vercel com este projeto, use a raiz do repositório e a configuração `vercel.json`.

Antes de substituir a produção, arquive a versão atual da hospedagem. O pacote novo, por si só, não é uma cópia da versão antiga.
