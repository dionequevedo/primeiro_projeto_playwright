# Projeto de estudo: Playwright + Exemplo de API/Web

Este repositório é um projeto de aprendizado para testes end-to-end com Playwright, integrado a uma API simples e uma interface web estática. Ele reúne exemplos de testes em TypeScript (Playwright), um backend Node/Express (em `apps/api`) e uma web estática servida em `apps/web`.

## Conteúdo

- `apps/api` — Exemplo de API Node/Express (gerenciador de tarefas). Tem scripts para iniciar e rodar migrações.
- `apps/web` — Projeto web simples (interface estática) servido via `http-server`.
- `tests` — Testes Playwright (TypeScript) deste projeto.
- `playwright.config.ts` — Configurações do Playwright Test.
- `playwright-report/` — Relatórios gerados pelo Playwright (após execução dos testes).

## Pré-requisitos

- Node.js (recomendado 18.x ou superior)
- npm ou yarn

## Instalação (dependências)

1. Instale dependências do repositório (root) para executar os testes Playwright:

```bash
npm install
# ou, se preferir yarn:
# yarn
```

2. Instale dependências da API e da Web (caso vá rodar localmente):

```bash
cd apps/api
npm install

# em outra aba/terminal
cd ../web
npm install
```

## Rodando a API

A API de exemplo está em `apps/api`. Scripts úteis (definidos em `apps/api/package.json`):

- `npm start` — inicia o servidor (`node src/server.js`).
- `npm run dev` — inicia em modo de desenvolvimento (neste projeto está configurado como `node src/server.js`).
- `npm run db:init` — aplica migrações (TypeORM).
- `npm run db:drop` — dropa o schema.

Exemplo para iniciar a API:

```bash
cd apps/api
npm start
```

Ao iniciar, a API normalmente ficará disponível em http://localhost:3333 (verifique o `src/server.js` para a porta exata).

## Rodando a interface web

```bash
cd apps/web
npm start
```

Por padrão `apps/web` usa `http-server` e escuta na porta 8080 (ver `apps/web/package.json`). Abra http://localhost:8080.

## Executando os testes Playwright

Os testes Playwright estão no diretório `tests` e usam o `@playwright/test` (configurado no `playwright.config.ts`). Execute os testes a partir da raiz:

```bash
npx playwright test
```

Rodar um teste específico:

```bash
npx playwright test tests/home.spec.ts
```

Gerar/abrir relatório HTML após execução:

```bash
npx playwright show-report
# ou abra o arquivo em playwright-report/index.html
```

Dica: se seus testes dependem da API, inicie `apps/api` antes de executar os testes.

## Estrutura de testes e helpers

- `tests/` — testes Playwright (TypeScript).
- `fixtures/` — modelos e dados de teste.
- `suport/` — helpers utilitários (note a pasta tem nome `suport` no projeto).

Ao adicionar novos testes, siga o padrão já existente em `tests/` e utilize os helpers em `suport` para reduzir duplicação.

## Boas práticas e dicas

- Mantenha a API e a Web locais rodando em portas previsíveis para os testes.
- Use `npx playwright test --headed` para ver os testes rodando em um navegador visível.
- Para depuração, adicione `await page.pause()` ou rode `--debug`.

## Contribuição

1. Crie um branch com sua feature: `git checkout -b feature/meu-ajuste`
2. Adicione testes quando fizer mudanças que afetem fluxos end-to-end.
3. Abra um PR descrevendo o objetivo e como testar localmente.

## Licença

Projeto para fins de aprendizado — licenciado como MIT (veja `package.json`).

---

Se quiser, posso:

- Adicionar um `npm script` no `package.json` da raiz para executar Playwright com `npm run test:e2e`.
- Incluir instruções de CI (GitHub Actions) para rodar os testes automaticamente.

Diga qual opção prefere que eu implemente a seguir.
