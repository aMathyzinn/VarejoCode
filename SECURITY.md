# Política de Segurança

## Versões Suportadas

| Versão | Suportada          |
| ------ | ------------------ |
| 0.1.x  | :white_check_mark: |

## Reportar Vulnerabilidades

Se você descobrir uma vulnerabilidade de segurança, por favor:

1. **NÃO** abra uma issue pública
2. Entre em contato através do Discord: https://discord.gg/CWEDfvTR5J
3. Forneça detalhes sobre a vulnerabilidade
4. Aguarde resposta em até 48 horas

## Medidas de Segurança Implementadas

### Headers de Segurança
- Content Security Policy (CSP)
- X-Frame-Options (proteção clickjacking)
- X-Content-Type-Options (proteção MIME sniffing)
- Strict-Transport-Security (HSTS)
- Referrer-Policy

### Boas Práticas
- TypeScript strict mode habilitado
- React Strict Mode ativo
- Links externos com rel="noopener noreferrer"
- Validação de tipos em runtime

### Dependências
- Atualizações regulares de pacotes
- Verificação de vulnerabilidades com `npm audit`

## Atualizações de Segurança

Recomendamos:
- Atualizar Next.js para versão 15.x
- Executar `npm audit fix` regularmente
- Monitorar dependabot/renovate para atualizações
