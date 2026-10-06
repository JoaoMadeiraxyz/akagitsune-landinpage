import type { Dictionary } from './en'

export const ptBR: Dictionary = {
  meta: {
    title: 'Akagitsune — Gateway WebSocket em Tempo Real',
    description:
      'Um gateway WebSocket genérico e agnóstico a payload, escrito em Rust. Transporte puro: ele repassa, não interpreta. Sustenta 1.000.000 de entregas por segundo em benchmarks.',
    shortDescription: 'Um gateway WebSocket genérico e agnóstico a payload, escrito em Rust.',
  },
  nav: {
    about: 'Sobre',
    performance: 'Desempenho',
    protocol: 'Protocolo',
    scope: 'Escopo',
    characters: 'Personagens',
    roadmap: 'Roadmap',
    github: 'GitHub',
    toggleMenu: 'Abrir/fechar menu',
    language: 'Idioma',
    logoAlt: 'Logo do Akagitsune',
  },
  hero: {
    bannerAlt: 'Banner do Akagitsune — cidade cyberpunk com brilho carmesim',
    taglineBefore: 'Um gateway WebSocket genérico em tempo real, escrito em Rust.',
    taglineHighlight: 'Transporte puro',
    taglineAfter: ' — ele repassa, não interpreta.',
    stats: {
      sustained: 'Entregas sustentadas',
      p99: 'Pior p99 em 1M/s',
      delivered: 'Entregues em 1M/s',
    },
    viewOnGithub: 'Ver no GitHub',
    learnMore: 'Saiba mais',
  },
  whatItIs: {
    eyebrow: 'O Que É',
    title: 'Um relay WebSocket que não atrapalha',
    intro:
      'O Akagitsune é um gateway genérico de tempo real — uma peça de infraestrutura, não um produto. Ele conecta sockets e move bytes. O que esses bytes significam é decisão inteiramente sua.',
    features: [
      {
        title: 'Agnóstico a Payload',
        description:
          'O gateway encaminha seus dados sem tocá-los. Mensagens de chat, estados de jogo, dashboards ao vivo, telemetria IoT — tudo trafega pelo mesmo fio. O significado é seu; o transporte é nosso.',
      },
      {
        title: 'Tempo Real, Sempre',
        description:
          'Construído em Rust assíncrono, com um caminho crítico sem locks. Cada mensagem é serializada uma única vez — não uma vez por destinatário — e então transmitida instantaneamente a todos os clientes conectados.',
      },
      {
        title: 'Backpressure em Vez de Quebra',
        description:
          'Quando um cliente lento fica para trás, o Akagitsune descarta as mensagens enfileiradas dele e o avisa — em vez de atrasar todos os outros. Os rápidos continuam rápidos; os lentos ganham uma segunda chance.',
      },
      {
        title: 'Três Tarefas, Uma Conexão',
        description:
          'Cada conexão executa um leitor (ingest), uma ponte (fanout) e um escritor (flush). Filas com tamanho limitado por toda parte, sem locks compartilhados, clones de mensagem com contagem de referência. Limpo, previsível, depurável.',
      },
    ],
    getItRunning: 'Ponha para rodar',
    connectAt: '# Conecte em ',
  },
  performance: {
    eyebrow: 'Desempenho',
    title: 'Um milhão, sustentado',
    intro: (floorMs, ceilingMs) =>
      `A meta é um milhão de entregas por segundo dentro de um orçamento de p99 de ${floorMs}–${ceilingMs} ms. Os três formatos de tráfego passam com folga, aguentando até 50% a mais que a meta. Além disso, eles se separam: o fanout é o mais caro e é o primeiro a quebrar.`,
    shapeGloss: {
      ingest: 'muitos emissores, um tópico',
      mesh: 'todos falam com todos',
      fanout: 'um emissor, todos os sockets',
    },
    chartTitle: 'p99 de serviço contra a carga oferecida',
    chartCaption: (ceilingMs) =>
      `Escala logarítmica, porque a variação vai de 3 ms a 825 ms. A linha tracejada é o orçamento de ${ceilingMs} ms; a faixa sombreada acima dela está fora da especificação.`,
    budgetLabel: (ceilingMs) => `orçamento de ${ceilingMs} ms`,
    chartNote:
      'O ingest para em 1,5M porque nunca foi executado acima disso. O marcador vazio em 2,78M é um formato exploratório à parte, e o único ponto em que o que falha é a entrega, não a latência.',
    offeredReadout: 'entregas/s oferecidas',
    delivered: 'entregues',
    tableTitle: 'Cada execução, por completo',
    tableHint: 'Latência em milissegundos. Linhas que estouram o orçamento aparecem esmaecidas.',
    tableScrollHint: ' Role a tabela para o lado para ver as demais colunas.',
    tableCaption: (ceilingMs) =>
      `Execuções do benchmark por carga oferecida e formato de tráfego, com latência de serviço p50 e p99, taxa de entrega e se cada execução ficou dentro do orçamento de ${ceilingMs} ms.`,
    columns: ['Carga oferecida', 'Formato', 'Conexões', 'p50', 'p99', 'Entregues', 'Em relação ao orçamento'],
    verdict: {
      breaks: 'entrega falha',
      over: 'acima do orçamento',
      within: 'dentro do orçamento',
    },
    footnoteBefore: (hardware) =>
      `Todos os números vêm de uma única execução local em ${hardware} — não de um deployment em produção. A latência é a latência de serviço: chegada da mensagem menos o envio real, a mais conservadora das duas medidas registradas pelo harness. A maior carga que todos os formatos seguraram dentro do orçamento foi de `,
    footnoteAfter:
      ' de entregas por segundo. Os scripts e a metodologia do benchmark estão no repositório.',
    hardware:
      'um Apple M4 Pro, 14 núcleos, build de release, com gateway e gerador de carga na mesma máquina',
  },
  protocol: {
    eyebrow: 'Protocolo',
    title: 'Simples por design',
    intro:
      'Sem handshake, sem negociação de autenticação, sem a dança de assinatura de tópicos. Conecte, receba seu ID, comece a enviar. Quatro tipos de frame cobrem tudo.',
    tabs: {
      welcome: {
        label: 'Boas-vindas',
        description:
          'Ao conectar, o servidor envia imediatamente um frame de boas-vindas com o UUID atribuído ao cliente. Nenhum handshake necessário — você já está dentro.',
        code: `// Servidor → Cliente (ao conectar)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
      },
      text: {
        label: 'Frames de Texto',
        description:
          'Qualquer JSON válido enviado pelo cliente é validado, encapsulado em um envelope com o ID do remetente e repassado a todas as outras conexões. O payload nunca é desserializado — é encaminhado byte a byte dentro do envelope.',
        code: `// O cliente envia:
{ "action": "move", "x": 42 }

// Todos os outros clientes recebem:
{
  "type": "message",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
      },
      binary: {
        label: 'Frames Binários',
        description:
          'Frames binários são repassados byte a byte, sem envelope e sem transformação. Use-os para protobuf, msgpack, trechos de áudio ou qualquer coisa que não seja JSON.',
        code: `// O cliente envia: <bytes brutos>
// Todos os outros clientes recebem:
//   <os mesmos bytes brutos, intactos>`,
      },
      control: {
        label: 'Frames de Controle',
        description:
          'Quando a fila de um cliente lento transborda, o gateway descarta as mensagens enfileiradas desse cliente e envia um aviso. Erros são informados como JSON estruturado. Frames acima de 64 KiB são rejeitados.',
        code: `// Aviso de backpressure (cliente lento):
{ "type": "warning", "dropped": 12 }

// Erro (ex.: JSON inválido):
{ "type": "error", "message": "invalid JSON" }`,
      },
    },
  },
  scope: {
    eyebrow: 'Escopo',
    title: 'Limites nítidos, propósito claro',
    intro:
      'O teste de escopo é simples: uma funcionalidade só pertence ao gateway se puder ser implementada sem saber o que o payload significa. Todo o resto pertence à sua aplicação.',
    inGateway: 'No gateway',
    inYourApp: 'Na sua aplicação',
    inScope: [
      'Gerenciamento e ciclo de vida de conexões',
      'Repasse de mensagens e enquadramento em envelope',
      'Backpressure e tratamento de estouro de fila',
      'Roteamento por tópico / sala (planejado)',
      'Rate limiting por conexão (planejado)',
      'Autenticação e controle de admissão (planejado)',
      'Semântica de entrega e confirmações',
      'Backplane multi-instância (planejado)',
    ],
    outOfScope: [
      'Nomes de usuário, perfis ou identidade',
      'Interpretação do conteúdo das mensagens',
      'Histórico de chat ou persistência',
      'Lógica de negócio ou regras de domínio',
      'Notificações push além do WebSocket',
      'Endpoints de API REST para dados',
    ],
    quote: '“Se precisa saber o que a mensagem diz, não pertence aqui.”',
  },
  characters: {
    eyebrow: 'Os Agentes',
    title: 'Quatro tarefas, quatro rostos',
    intro:
      'Cada conexão no Akagitsune executa três tarefas concorrentes — leitor, ponte e escritor — mais uma líder que as une. Conheça o elenco.',
    viewFullSize: (name) => `Ver ${name} em tamanho real`,
    fullSize: (name) => `${name} em tamanho real`,
    cast: {
      akane: {
        role: 'O Gateway',
        task: 'Líder do Projeto',
        description:
          'O rosto do Akagitsune. Akane encarna o próprio gateway — elegante, precisa e implacavelmente rápida. Ela coordena os três agentes abaixo, garantindo que cada mensagem chegue ao destino sem interferência nem atraso. Os olhos carmesim enxergam todo o tráfego; a máscara de raposa fica por perto, lembrando que o gateway é uma infraestrutura astuta, não força bruta.',
      },
      messenger: {
        role: 'A Mensageira',
        task: 'Tarefa Leitora',
        description:
          'A Leitora. Kaze intercepta cada frame recebido no instante em que chega — valida o JSON, monta o envelope uma única vez e publica no barramento de broadcast. Uma serialização por mensagem, não por destinatário. A meia-máscara e o pergaminho de dados a marcam como o primeiro ponto de contato: ela toca o fio para que ninguém mais precise.',
      },
      gatekeeper: {
        role: 'O Guardião',
        task: 'Tarefa Ponte',
        description:
          'A Ponte. Tetsu fica entre o barramento de broadcast e cada fila de conexão local. Ele recebe do barramento, ignora as mensagens do próprio remetente e encaminha o resto. Seu corpo blindado e a lanterna brilhante encarnam o princípio: proteger o fluxo, nunca o conteúdo. Robusto, confiável, sempre vigilante.',
      },
      trickster: {
        role: 'O Trapaceiro',
        task: 'Tarefa Escritora',
        description:
          'O Escritor. Hayate esvazia a fila local em lotes — um flush por lote, nunca trabalho desperdiçado. Só o Escritor toca o sink. Sua agilidade acrobática espelha a velocidade da tarefa escritora: esvaziar a fila, dar flush, repetir. As lâminas gêmeas? Uma para cada ponta do duto.',
      },
    },
  },
  roadmap: {
    eyebrow: 'Roadmap',
    title: 'O que vem a seguir',
    intro:
      'O Akagitsune está em desenvolvimento ativo. Estas são as funcionalidades no horizonte — todas passam no teste de escopo.',
    status: { next: 'Próximo', planned: 'Planejado', exploring: 'Em exploração' },
    items: [
      {
        title: 'Roteamento por Tópico e Sala',
        description:
          'Substituir o barramento de broadcast único por um modelo de assinatura baseado em tópicos. Clientes assinam salas; mensagens vão apenas aos assinantes — eliminando o fanout O(N²).',
      },
      {
        title: 'Autenticação',
        description:
          'Controle de admissão baseado em token no momento da conexão. O gateway verifica a identidade sem interpretar o payload — a autenticação é da camada de transporte, não do conteúdo.',
      },
      {
        title: 'Rate Limiting por Conexão',
        description:
          'Limites configuráveis de taxa de ingestão por conexão para evitar abusos e suavizar picos de tráfego. Token bucket ou janela deslizante, decidido na camada de transporte.',
      },
      {
        title: 'Backplane Multi-Instância',
        description:
          'Escalabilidade horizontal por meio de um backplane compartilhado (Redis, NATS ou um protocolo próprio), para que várias instâncias do gateway formem um único relay lógico.',
      },
      {
        title: 'Confirmações de Entrega',
        description:
          'Ack/nack opcional por mensagem para clientes que precisam de garantias de entrega. Continua agnóstico a payload — o gateway confirma o transporte, não o significado.',
      },
    ],
  },
  footer: {
    tagline: '赤狐 — Gateway WebSocket Genérico em Tempo Real',
    repository: 'Repositório',
    architecture: 'Arquitetura',
    builtWith: 'Feito com Rust, axum e tokio. Código aberto sob licença MIT.',
  },
}
