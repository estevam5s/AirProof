# AirProof

Landing page visual, estilo Apple, criada para ajudar pessoas a identificar sinais recorrentes de AirPods Pro falsificados antes da compra.

## Objetivo

O foco deste projeto é educacional:

- destacar sinais visuais e funcionais que ajudam a diferenciar original e falso
- reduzir risco de compra por impulso
- organizar evidências em uma experiência visual clara e sofisticada
- apresentar o conteúdo em uma interface premium inspirada em páginas de produto da Apple

## Visão Geral

O site possui duas páginas principais:

- [`index.html`](/Users/estevamsouza/Desktop/detectar-airpods-fake/index.html): home com hero, seções editoriais, comparações visuais, protocolo de compra, notificações, troca de tema, inatividade e CTA para galeria
- [`galeria.html`](/Users/estevamsouza/Desktop/detectar-airpods-fake/galeria.html): galeria completa com todas as imagens e filtros por categoria

Além disso, o projeto agora possui um servidor local para análise com IA:

- [`server.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/server.js): backend que serve os arquivos estáticos, lê `.env`, chama a OpenRouter e expõe o endpoint `/api/ai-detect`
- [`api/ai-detect.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/api/ai-detect.js): função serverless pronta para Vercel usando OpenRouter
- [`api/health.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/api/health.js): endpoint de saúde da integração

## Recursos Implementados

### Experiência visual

- hero com atmosfera cinematográfica, fundo em grade animada e blocos flutuantes
- identidade visual premium com vidro, blur, profundidade e contraste alto
- favicon com logomarca em [`favicon.svg`](/Users/estevamsouza/Desktop/detectar-airpods-fake/favicon.svg)
- footer com marca central, tipografia grande e composição visual inspirada em páginas promocionais

### Efeitos inspirados nos prompts

- carregamento inicial na primeira visita com animação central e assinatura visual
- troca de tema com transição expansiva
- botão de notificações com popover e estado de leitura
- comparador de imagens em destaque com navegação lateral
- seção em arco para prévia da galeria
- overlay de inatividade após 2 minutos com canvas animado baseado em warp/checks/distortion/swirl

### Conteúdo

- categorização por temas como:
  - `caixa`
  - `acabamento`
  - `porta`
  - `serial`
  - `embalagem`
  - `encaixe`
  - `software`
  - `magsafe`
  - `fabricacao`
- home expandida com:
  - sinais principais
  - manifesto editorial
  - protocolo de compra
  - destaques premium
  - comparador visual
  - matriz de autenticidade

### Interações

- persistência de tema com `localStorage`
- loader mostrado apenas na primeira visita
- animações por scroll com `IntersectionObserver`
- cards com hover sutil e sensação de profundidade
- galeria filtrável por categoria
- seção de análise por IA integrada à home
- backend com chave protegida no servidor
- fusão entre regras especializadas e LLM

## Estrutura do Projeto

```text
detectar-airpods-fake/
├── .gitignore
├── app.js
├── favicon.svg
├── galeria.html
├── index.html
├── README.md
├── server.js
├── styles.css
├── package.json
├── detector-llm.js
├── detector-llm-schema.json
├── ALGORITMO_LLM.md
└── image/
    ├── 1.png
    ├── 2.png
    ├── ...
    └── 32.png
```

## Arquivos Principais

### [`index.html`](/Users/estevamsouza/Desktop/detectar-airpods-fake/index.html)

Responsável pela home principal. Contém:

- navbar
- hero
- seções editoriais
- comparador de evidências
- CTA para galeria
- rodapé

### [`galeria.html`](/Users/estevamsouza/Desktop/detectar-airpods-fake/galeria.html)

Responsável pela visualização completa das imagens e descrições.

### [`styles.css`](/Users/estevamsouza/Desktop/detectar-airpods-fake/styles.css)

Concentra:

- sistema visual
- temas `light`, `dark` e `dim`
- efeitos glassmorphism
- layout responsivo
- animações de entrada
- estilo do overlay de inatividade
- estilo da galeria e dos painéis editoriais

### [`app.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/app.js)

Controla:

- dados das evidências
- renderização dos cards
- switcher de tema
- loader de primeira visita
- notificações
- comparador visual
- galeria em arco
- filtro da galeria completa
- overlay de inatividade
- efeitos de reveal por scroll

### [`ALGORITMO_LLM.md`](/Users/estevamsouza/Desktop/detectar-airpods-fake/ALGORITMO_LLM.md)

Especificação completa da arquitetura avançada de detecção de AirPods falsos com LLM, regras especializadas, score, confiança, contradições e pipeline de decisão.

### [`detector-llm.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/detector-llm.js)

Protótipo local do motor de decisão:

- organiza evidências
- aplica pesos por sinal
- detecta contradições
- gera score de autenticidade
- monta prompt estruturado para LLM
- funde análise por regras com resposta do modelo

### [`detector-llm-schema.json`](/Users/estevamsouza/Desktop/detectar-airpods-fake/detector-llm-schema.json)

Schema JSON sugerido para obrigar o modelo a responder em formato auditável e consistente.

### [`server.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/server.js)

Servidor Node sem dependências externas que:

- entrega os arquivos estáticos
- expõe `/api/health`
- expõe `/api/ai-detect`
- lê a chave da OpenRouter a partir do `.env`
- consulta o modelo configurado
- funde a análise do modelo com o motor de regras local

### [`api/ai-detect.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/api/ai-detect.js)

Rota serverless pronta para deploy na Vercel:

- recebe os sinais escolhidos na interface
- constrói o pacote de evidências
- consulta a OpenRouter
- reforça o contexto do LLM com as features do algoritmo
- funde a resposta do modelo com o score por regras

### [`vercel.json`](/Users/estevamsouza/Desktop/detectar-airpods-fake/vercel.json)

Configuração de runtime das funções serverless para deploy na Vercel.

## Como Executar

O frontend continua leve e sem build, mas a análise por IA exige o backend local.

### Subir com backend e IA

No diretório do projeto:

```bash
npm start
```

Depois acesse:

```text
http://localhost:3000
```

### Verificar saúde do backend

```text
http://localhost:3000/api/health
```

### Importante sobre a IA

A seção “Análise por IA” da home envia os sinais selecionados para:

- o motor local de regras
- o modelo configurado na OpenRouter
- a camada de fusão final

## Configuração do `.env`

O projeto lê:

```env
OPENROUTER_API_KEY=...
OPENROUTER_MODEL=nvidia/nemotron-3-super-120b-a12b:free
SITE_URL=https://air-proof.vercel.app
SITE_NAME=AirProof
```

O `.env` está listado no `.gitignore` para evitar versionamento acidental da chave.

## Deploy na Vercel

Para produção na Vercel, o ideal é cadastrar as variáveis no painel do projeto:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`
- `SITE_URL`
- `SITE_NAME`

Mesmo que você mantenha um `.env` local, a Vercel usa com mais segurança as variáveis configuradas no dashboard.

As rotas usadas em produção serão:

- `/api/health`
- `/api/ai-detect`

## Fluxo da Experiência

### Primeira visita

1. o usuário acessa a home
2. o loader inicial aparece uma única vez
3. após a animação, o site principal é exibido
4. o tema atual fica salvo no navegador

### Inatividade

1. se não houver interação por 2 minutos, o overlay de repouso é ativado
2. o fundo procedural animado ocupa toda a tela
3. a mensagem central informa o estado de inatividade
4. qualquer movimento, clique, tecla, toque ou scroll fecha o overlay

### Exploração de conteúdo

1. o usuário vê os sinais mais importantes
2. percorre o protocolo de compra
3. compara imagens em destaque
4. roda uma análise com IA baseada nos sinais observados
5. acessa a galeria completa para consultar todas as evidências

## Dados das Evidências

As evidências são definidas em `app.js` no array `evidenceItems`.

Cada item possui estrutura similar a:

```js
{
  id: 10,
  image: "image/10.png",
  title: "Serial não bate",
  detail: "Na réplica, o número serial pode ser diferente entre caixa e telefone.",
  category: "serial",
  featured: true
}
```

Campos usados:

- `id`: identificador numérico
- `image`: caminho da imagem
- `title`: título curto
- `detail`: explicação da evidência
- `category`: categoria usada na galeria e organização interna
- `featured`: define destaque em certas seções da home

## Como Personalizar

### Alterar textos

Edite:

- [`index.html`](/Users/estevamsouza/Desktop/detectar-airpods-fake/index.html)
- [`galeria.html`](/Users/estevamsouza/Desktop/detectar-airpods-fake/galeria.html)
- [`app.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/app.js)

### Alterar evidências

Atualize o array `evidenceItems` em [`app.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/app.js).

### Alterar imagens

Substitua ou acrescente arquivos em [`image`](/Users/estevamsouza/Desktop/detectar-airpods-fake/image) e ajuste os caminhos no JavaScript.

### Alterar paleta e temas

Edite as variáveis CSS em [`styles.css`](/Users/estevamsouza/Desktop/detectar-airpods-fake/styles.css):

- `--bg`
- `--bg-elevated`
- `--text`
- `--muted`
- `--accent`
- `--accent-2`
- `--hero-a`
- `--hero-b`

### Ajustar tempo de inatividade

Em [`app.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/app.js), dentro de `initInactivityOverlay()`:

```js
const timeout = 2 * 60 * 1000;
```

## Responsividade

O layout foi preparado para:

- desktop
- tablet
- mobile

Inclui:

- reorganização das colunas em telas menores
- adaptação do arco de imagens
- ajuste de cards e painéis
- navbar mais compacta

## Validação Técnica

Validação já executada no JavaScript:

```bash
node --check app.js
```

## Decisões de Implementação

### Por que site estático

Foi adotada uma abordagem estática para:

- reduzir dependências
- facilitar execução local
- manter portabilidade
- permitir imageação simples em qualquer hosting estático

### Por que canvas no overlay de inatividade

O prompt original de inatividade fazia referência a shader/warp. Como o projeto atual não usa React nem dependências externas de renderização, o efeito foi reinterpretado em `canvas` para manter:

- sensação de shader procedural
- movimento contínuo
- padrão em checks
- distorção e swirl
- boa compatibilidade sem build

## Melhorias Futuras

- transformar em projeto com bundler e componentes reutilizáveis
- migrar para React/Next se houver necessidade de escalabilidade
- adicionar lazy loading avançado para imagens
- adicionar modo de comparação lado a lado interativo
- incluir página sobre golpes comuns em marketplaces
- implementar trilha sonora sutil opcional ou efeitos sonoros de interface
- adicionar analytics local ou eventos de interação

## Observações

- este projeto é educacional e informativo
- não substitui verificação oficial da Apple ou do vendedor
- uma única pista visual não deve ser usada isoladamente
- o ideal é validar múltiplos sinais ao mesmo tempo

---

Se este projeto for evoluído, o próximo passo mais sólido é separar conteúdo, tema, efeitos e componentes em módulos independentes para facilitar manutenção e expansão.
