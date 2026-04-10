# Algoritmo LLM para Detectar AirPods Falsos

## Objetivo

Descrever uma arquitetura avançada, prática e escalável para identificar AirPods falsos em minutos usando um modelo de linguagem multimodal, regras especializadas e fusão de evidências.

O objetivo não é apenas responder `falso` ou `original`, mas produzir:

- score de autenticidade
- score de risco de falsificação
- justificativa técnica
- inconsistências detectadas
- nível de confiança
- próximos testes recomendados

## Princípio Central

AirPods falsos raramente falham em apenas um critério. O algoritmo foi desenhado para detectar:

- inconsistência entre sinais físicos
- inconsistência entre comportamento do software e acabamento
- contradições entre serial, embalagem, caixa, materiais e recursos
- padrões típicos de réplicas

Em vez de depender de uma única foto, ele cruza múltiplas evidências em uma decisão probabilística auditável.

## Visão Geral da Arquitetura

```text
Entrada multimodal
├── imagens da caixa, fones, estojo, traseira, conectores
├── observações textuais do usuário
├── prints de tela do iPhone/macOS
├── vídeos curtos do encaixe, tampa e interface
└── metadados opcionais de serial, modelo e origem

        ↓

Camada 1: Normalização de evidências
├── padroniza categorias
├── organiza por tipo de sinal
└── remove ambiguidade de linguagem

        ↓

Camada 2: Extração assistida por LLM multimodal
├── detecta atributos visuais
├── identifica textos e inscrições
├── resume sinais observáveis
└── marca incertezas

        ↓

Camada 3: Motor de Regras Especializadas
├── pesos por evidência
├── sinais críticos
├── contradições
└── cálculo inicial de autenticidade

        ↓

Camada 4: Juiz LLM
├── reavalia o pacote completo
├── explica conflitos
├── estima confiança
└── recomenda verificações adicionais

        ↓

Camada 5: Fusão e Calibração
├── combina score do motor de regras
├── combina score do LLM
├── penaliza baixa cobertura
└── produz resultado final

        ↓

Saída Estruturada
├── classificação
├── score final
├── confiança
├── razões principais
└── próximo passo sugerido
```

## Entradas Aceitas

O algoritmo foi desenhado para operar com qualquer combinação das evidências abaixo:

### Imagens

- frente e traseira da caixa
- interior da tampa
- conector da caixa
- parte traseira de carga dos fones
- borrachinhas e encaixe
- etiqueta ou gravação de origem
- comparações lado a lado

### Evidências textuais

- relato do usuário
- descrição do vendedor
- observações de uso
- diferenças percebidas no som, encaixe ou software

### Evidências de software

- prints de configurações
- nome do dispositivo
- telas de serial
- presença ou ausência de modos
- comportamento do cancelamento de ruído

### Metadados opcionais

- família do dispositivo
- suposta geração
- país de fabricação mostrado
- preço
- canal de compra

## Categorias de Sinal

Cada evidência é organizada em categorias especializadas:

- `serial`
- `embalagem`
- `caixa`
- `porta`
- `magsafe`
- `software`
- `audio`
- `encaixe`
- `acabamento`
- `fabricacao`
- `conectividade`

## Estratégia de Pontuação

O sistema trabalha com dois eixos:

- evidências pró-original
- evidências pró-falso

Cada observação recebe:

- peso base
- criticidade
- direção
- qualidade da evidência

### Criticidade

- `critical`: forte sinal de autenticidade ou falsificação
- `high`: sinal relevante e confiável
- `medium`: sinal útil, mas não decisivo sozinho
- `low`: sinal complementar

### Fórmula conceitual

```text
score_falso =
  soma(sinais_pro_falso * peso * qualidade)
  + bônus_de_contradição
  - bônus_de_consistência_original

score_original =
  soma(sinais_pro_original * peso * qualidade)
  + bônus_de_consistência
  - penalidade_de_contradição

score_final =
  sigmoid(score_falso - score_original)
```

Interpretação sugerida:

- `0.00 - 0.24`: provavelmente original
- `0.25 - 0.44`: indeterminado com tendência a original
- `0.45 - 0.59`: inconclusivo
- `0.60 - 0.79`: suspeito
- `0.80 - 1.00`: alta probabilidade de falsificação

## Regras de Alto Valor

Exemplos de sinais fortes:

### Sinais pró-falso

- serial da caixa diferente do serial detectado no telefone
- menos modos de configuração que o esperado
- cancelamento de ruído mudando fora da orelha
- borrachinhas caindo com facilidade
- acabamento traseiro torto
- porta interna preta onde o padrão esperado é branco
- materiais plásticos onde o original deveria usar papel

### Sinais pró-original

- serial consistente entre embalagem e sistema
- caixa com MagSafe quando compatível com a versão alegada
- inscrição de origem coerente
- som de carregamento sutil
- encaixe firme das pontas
- proteção interna e embalagem coerentes

## Contradições

O algoritmo não só soma sinais, ele também detecta conflitos.

Exemplos:

- serial parece coerente, mas software mostra recursos incompatíveis
- caixa parece original, mas materiais internos e porta divergem
- visual do estojo parece bom, mas comportamento do cancelamento é típico de réplica

Quando há contradição:

- a confiança cai
- o algoritmo aumenta o peso de análise manual
- o resultado final tende a `inconclusivo` ou `suspeito`

## Papel do LLM

O LLM não substitui as regras; ele atua como:

- extrator multimodal de atributos
- sintetizador de observações dispersas
- resolvedor de ambiguidade
- juiz explicativo

### O LLM deve responder em formato estruturado

Campos essenciais:

- `classification`
- `confidence`
- `fake_probability`
- `authentic_probability`
- `key_findings`
- `contradictions`
- `missing_evidence`
- `recommended_next_checks`

## Pipeline Operacional

### Etapa 1: aquisição

Receber imagens, texto e prints.

### Etapa 2: normalização

Transformar tudo em um pacote consistente:

```json
{
  "device_family": "AirPods Pro",
  "claimed_version": "2nd generation",
  "evidence": [
    {
      "type": "image",
      "category": "serial",
      "observation": "serial da caixa não coincide com o iPhone",
      "quality": 0.95
    }
  ]
}
```

### Etapa 3: extração LLM

O modelo recebe imagens e descrições para converter observações em sinais estruturados.

### Etapa 4: score por regras

Cada observação é pontuada usando pesos especializados.

### Etapa 5: juízo LLM

O modelo analisa o pacote já estruturado e explica o caso.

### Etapa 6: fusão final

Combinar:

- score do motor de regras
- score do LLM
- nível de cobertura do caso
- quantidade de conflitos

## Heurística de Cobertura

O algoritmo deve penalizar casos com pouca evidência.

Exemplo:

- apenas 1 foto da tampa: baixa cobertura
- caixa, serial, software e encaixe: alta cobertura

Regra:

- quanto menor a cobertura, menor a confiança
- um alto score de falsidade com baixa cobertura vira `suspeito`, não `confirmado`

## Saída Final Esperada

Exemplo:

```json
{
  "classification": "likely_fake",
  "fake_probability": 0.91,
  "authentic_probability": 0.09,
  "confidence": 0.87,
  "risk_level": "high",
  "summary": "O conjunto apresenta múltiplos sinais consistentes com réplica.",
  "key_findings": [
    "serial inconsistente entre caixa e telefone",
    "porta interna preta",
    "menos modos de configuração",
    "borrachinhas com encaixe fraco"
  ],
  "contradictions": [],
  "recommended_next_checks": [
    "confirmar gravação traseira",
    "validar MagSafe",
    "testar transição automática entre dispositivos Apple"
  ]
}
```

## Estratégia de Prompting

O prompt ideal deve:

- proibir conclusão baseada em apenas um detalhe
- exigir separação entre observação e inferência
- exigir resposta JSON estruturada
- exigir que o modelo diga quando a evidência é insuficiente

## Casos Limite

O algoritmo precisa tratar:

- réplicas de alta qualidade
- fotos ruins ou com iluminação ruim
- acessórios trocados
- caixa original com fones falsos
- fones originais com estojo falso

Nesses cenários, a saída correta pode ser:

- `inconclusive`
- `mixed_evidence`
- `needs_more_checks`

## Estratégia de Evolução

Para tornar o detector realmente poderoso em produção:

1. coletar dataset validado de originais e réplicas
2. calibrar pesos com casos reais
3. separar detector por família de produto
4. manter base de sinais por geração
5. usar visão computacional para atributos repetitivos
6. usar LLM como camada semântica e explicativa
7. registrar erros e recalibrar periodicamente

## Limitação Técnica Importante

Nenhum detector sério deve prometer 100% de certeza para `qualquer` caso usando apenas uma evidência. O desenho correto é:

- forte triagem em minutos
- resposta probabilística
- justificativa auditável
- recomendação de próximos testes

Esse é o padrão tecnicamente defensável para um sistema real.

## Arquivos Relacionados

- [`detector-llm.js`](/Users/estevamsouza/Desktop/detectar-airpods-fake/detector-llm.js)
- [`detector-llm-schema.json`](/Users/estevamsouza/Desktop/detectar-airpods-fake/detector-llm-schema.json)

