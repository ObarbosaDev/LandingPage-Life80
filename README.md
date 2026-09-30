# Life 80+

Site institucional da pesquisa Life 80+, voltada ao estudo da longevidade em pessoas com 80 anos ou mais. A página apresenta o projeto, explica a avaliação presencial e organiza o primeiro contato de quem deseja participar.

O conteúdo sobre a pesquisa foi conferido na [publicação da Universidade Católica de Brasília](https://ucb2.catolica.edu.br/portal/noticias/projeto-convida-pessoas-idosas-para-pesquisa-sobre-longevidade/) e na apresentação do [Instagram oficial do Life 80+](https://www.instagram.com/life80mais/).

## Executar

Requer Node.js e npm.

```bash
npm install
npm run dev
```

Abra `http://127.0.0.1:3000/`. Para conferir a compilação de produção:

```bash
npm run build
```

## Estrutura

| Caminho | Responsabilidade |
| --- | --- |
| `src/App.tsx` | Hero, navegação, seções da pesquisa, avaliação interativa, participação e rodapé. |
| `src/components/ParticipationForm.tsx` | Formulário, calendário e revisão do pedido de contato. |
| `src/content/research.ts` | Textos e dados institucionais exibidos nas seções. |
| `src/lib/participation.ts` | Regras de datas, formatação e montagem da mensagem. |
| `src/lib/links.ts` | Âncoras internas, Instagram, fonte institucional e e-mail de contato. |
| `src/index.css` | Tipografia, estilos globais e componentes visuais. |
| `public/` | Vídeo e imagem do hero, além do selo obtido no perfil oficial. |

O projeto usa React, TypeScript, Vite, Tailwind CSS e Lucide React. O vídeo do hero é uma cópia local do [arquivo visual escolhido para a página](https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4); `public/footer-bloom.jpg` funciona como imagem inicial e alternativa enquanto o vídeo carrega.

## Fluxo de participação

O formulário recebe nome, idade, telefone, origem do contato e disponibilidade. Uma pessoa da família pode preenchê-lo e informar seu próprio nome. A seleção de data é uma **sugestão**, não uma reserva: a equipe confirma os critérios, o dia e o horário da avaliação. Também é possível preferir combinar a data diretamente com a equipe.

Após a revisão, o site prepara uma mensagem para o canal de contato. **Não há backend, envio automático nem armazenamento dos dados do formulário.** A pessoa confere e confirma o envio no aplicativo de e-mail ou WhatsApp. Enquanto o número oficial de WhatsApp não for informado, a opção disponível é o e-mail `projetolifeplus80@gmail.com`, publicado pela UCB, além de copiar a mensagem.

Para habilitar o WhatsApp quando a equipe confirmar o número:

1. Copie `.env.example` para `.env.local`.
2. Preencha `VITE_LIFE80_WHATSAPP_NUMBER` com `55`, DDD e número, somente dígitos.
3. Reinicie o servidor local.

Não coloque um número presumido na configuração. O valor precisa ser confirmado pela equipe do projeto.

## Navegação e acessibilidade

As ações principais levam a seções reais da página. A avaliação permite explorar quatro temas da pesquisa; o menu mobile fecha ao escolher uma seção ou pressionar Escape. O vídeo respeita a preferência por movimento reduzido, e o formulário oferece mensagens de validação e uma etapa de revisão antes de abrir um canal externo.
