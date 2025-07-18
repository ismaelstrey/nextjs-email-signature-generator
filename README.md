# Gerador de Assinaturas de Email

Aplicação moderna em Next.js para criar assinaturas de email personalizadas com interface interativa e animações fluidas.

## Características

- Interface moderna e responsiva com animações fluidas
- Formulário interativo para personalização de assinaturas
- Seleção de cores, fontes e estilos
- Upload de imagens (foto de perfil e logo)
- Visualização em tempo real da assinatura
- Múltiplos modelos de assinatura pré-definidos
- Exportação da assinatura para uso no Gmail e outros clientes de email
- Armazenamento local das configurações do usuário

## Tecnologias

- Next.js 14 com App Router
- TypeScript
- Tailwind CSS para estilização
- Framer Motion para animações
- React Hook Form para gerenciamento de formulários
- Zod para validação de dados
- shadcn/ui para componentes de interface

## Como executar

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para visualizar a aplicação.

## Estrutura do Projeto

- `/app`: Rotas e páginas da aplicação
- `/components`: Componentes reutilizáveis
- `/lib`: Utilitários e funções auxiliares
- `/public`: Arquivos estáticos
- `/styles`: Estilos globais
- `/types`: Definições de tipos TypeScript
- `/hooks`: Custom hooks
- `/templates`: Modelos de assinaturas pré-definidos