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
      p99: 'Pior p99 em 1M/s, um tópico',
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
          'Construído em Rust assíncrono, com um caminho crítico sem locks. Cada mensagem é serializada uma única vez — não uma vez por destinatário — e então entregue apenas às conexões assinantes do seu tópico.',
      },
      {
        title: 'Backpressure em Vez de Quebra',
        description:
          'Quando um cliente lento fica para trás, o Akagitsune descarta as mensagens enfileiradas dele e o avisa — em vez de atrasar todos os outros. Os rápidos continuam rápidos; os lentos ganham uma segunda chance.',
      },
      {
        title: 'Duas Tarefas, Uma Conexão',
        description:
          'Cada conexão executa um leitor (ingest e fanout para as caixas de entrada dos assinantes) e um escritor (flush). Filas com tamanho limitado por toda parte, sem locks no código do gateway, clones de mensagem com contagem de referência. Limpo, previsível, depurável.',
      },
    ],
    getItRunning: 'Ponha para rodar',
    connectAt: '# Conecte em ',
  },
  performance: {
    eyebrow: 'Desempenho',
    title: 'Um milhão, sustentado',
    intro: (floorMs, ceilingMs, topicsP99) =>
      `A meta é um milhão de entregas por segundo dentro de um orçamento de p99 de ${floorMs}–${ceilingMs} ms. Em um único tópico, os três formatos de tráfego passam e continuam passando com o dobro da carga. Espalhado por 100 tópicos, o mesmo milhão de entregas chega inteiro, mas o p99 fica em ${topicsP99} ms, acima do orçamento.`,
    shapeGloss: {
      ingest: 'muitos emissores, um tópico',
      mesh: 'todos falam com todos',
      fanout: 'poucos emissores, muitos sockets',
      topics: 'mesma carga, 100 tópicos',
      explore: 'sonda além da meta',
    },
    chartTitle: 'p99 de serviço contra a carga oferecida',
    chartCaption: (ceilingMs) =>
      `Escala logarítmica, porque a variação vai de 3 ms a 28 ms. A linha tracejada é o orçamento de ${ceilingMs} ms; a faixa sombreada acima dela está fora da especificação.`,
    budgetLabel: (ceilingMs) => `orçamento de ${ceilingMs} ms`,
    topicsLabel: (p99) => `100 tópicos: ${p99} ms`,
    chartNote:
      'O ingest não foi executado em 2M. Os marcadores cinza vazios em 3M e 3,59M são sondas exploratórias, e também aguentaram: todas as mensagens entregues, nenhum ponto de ruptura encontrado ainda. O marcador vermelho vazio em 1M é a execução espalhada por tópicos, a única na carga da meta acima do orçamento.',
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
      `Todos os números vêm de uma única execução local em ${hardware} — não de um deployment em produção. A latência é a latência de serviço: chegada da mensagem menos o envio real, a mais conservadora das duas medidas registradas pelo harness. A maior carga que qualquer execução segurou dentro do orçamento foi de `,
    footnoteAfter:
      ' de entregas por segundo. Duas execuções pesadas em tópicos, 5.000 tópicos e entra-e-sai de assinantes, também estouram o orçamento, e a causa ainda não foi isolada: no primeiro caso o gerador de carga pode ser o gargalo, e no segundo pode ser a cópia da lista de assinantes a cada entrada e saída. Cada conexão agora tem sua caixa de entrada, então a memória por conexão subiu de cerca de 150 KiB para cerca de 200 KiB. Os scripts e a metodologia do benchmark estão no repositório.',
    hardware:
      'um Apple M4 Pro, 14 núcleos, build de release, com gateway e gerador de carga na mesma máquina',
  },
  protocol: {
    eyebrow: 'Protocolo',
    title: 'Simples por design',
    intro:
      'Sem handshake e sem negociação de autenticação. Conecte, receba seu ID, assine um tópico, comece a publicar. Quatro tipos de frame cobrem tudo.',
    tabs: {
      welcome: {
        label: 'Boas-vindas',
        description:
          'Ao conectar, o servidor envia imediatamente um frame de boas-vindas com o UUID atribuído ao cliente. Nenhum handshake necessário — mas nada é entregue até você assinar um tópico.',
        code: `// Servidor → Cliente (ao conectar)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
      },
      text: {
        label: 'Tópicos',
        description:
          'Um tópico é uma chave opaca de 1 a 255 bytes escolhida pelo cliente. Publique nele e só os outros assinantes recebem a mensagem. O payload nunca é desserializado — é encaminhado byte a byte dentro do envelope.',
        code: `// O cliente envia:
{ "type": "subscribe", "topic": "lobby" }
{ "type": "publish", "topic": "lobby",
  "data": { "action": "move", "x": 42 } }

// O servidor responde à assinatura:
{ "type": "subscribed", "topic": "lobby" }

// Todos os outros assinantes de "lobby" recebem:
{
  "type": "message",
  "topic": "lobby",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
      },
      binary: {
        label: 'Frames Binários',
        description:
          'Frames binários carregam um byte com o tamanho do tópico, o tópico e depois o payload, que é repassado intacto. Os assinantes também recebem o UUID do remetente. Use-os para protobuf, msgpack, trechos de áudio ou qualquer coisa que não seja JSON.',
        code: `// O cliente envia:
//   [tamanho do tópico: u8][tópico][payload]
// Os assinantes recebem:
//   [tamanho do tópico: u8][tópico][uuid do remetente: 16 bytes][payload]`,
      },
      control: {
        label: 'Frames de Controle',
        description:
          'Quando a caixa de entrada de um cliente lento transborda, o gateway descarta as mensagens mais antigas dele e envia um aviso. Erros são JSON estruturado e informam o tópico a que se referem. Frames acima de 64 KiB são rejeitados, e uma conexão tem no máximo 64 assinaturas.',
        code: `// Sair de um tópico:
{ "type": "unsubscribe", "topic": "lobby" }

// Aviso de backpressure (cliente lento):
{ "type": "warning", "dropped": 12 }

// Erro (ex.: publish sem data):
{ "type": "error", "topic": "lobby", "message": "..." }`,
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
      'Roteamento por tópico',
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
    title: 'Quatro papéis, quatro rostos',
    intro:
      'Cada conexão no Akagitsune executa duas tarefas concorrentes — leitor e escritor — em torno de um registro de tópicos compartilhado, mais uma líder que as une. Conheça o elenco.',
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
          'A Leitora. Kaze intercepta cada frame recebido no instante em que chega — valida o frame de controle, monta o envelope uma única vez e o distribui aos assinantes do tópico. Uma serialização por mensagem, não por destinatário. A meia-máscara e o pergaminho de dados a marcam como o primeiro ponto de contato: ela toca o fio para que ninguém mais precise.',
      },
      gatekeeper: {
        role: 'O Guardião',
        task: 'Registro de Tópicos',
        description:
          'O Registro. Tetsu guarda o mapa sem locks de tópicos para assinantes e fica entre cada publicação e cada caixa de entrada de conexão. Ele ignora as mensagens do próprio remetente e entrega o resto apenas às conexões assinantes daquele tópico. Seu corpo blindado e a lanterna brilhante encarnam o princípio: proteger o fluxo, nunca o conteúdo. Robusto, confiável, sempre vigilante.',
      },
      trickster: {
        role: 'O Trapaceiro',
        task: 'Tarefa Escritora',
        description:
          'O Escritor. Hayate esvazia a caixa de entrada da conexão em lotes — um flush por lote, nunca trabalho desperdiçado. Só o Escritor toca o sink. Sua agilidade acrobática espelha a velocidade da tarefa escritora: esvaziar a fila, dar flush, repetir. As lâminas gêmeas? Uma para cada ponta do duto.',
      },
    },
  },
  roadmap: {
    eyebrow: 'Roadmap',
    title: 'O que vem a seguir',
    intro:
      'O Akagitsune está em desenvolvimento ativo. O roteamento por tópico já chegou; o restante está na ordem em que é planejado, e cada item ainda precisa passar no teste de escopo antes de ser implementado.',
    status: { achieved: 'Concluído', next: 'Próximo', planned: 'Planejado', exploring: 'Em avaliação' },
    items: [
      {
        title: 'Roteamento por Tópico',
        description:
          'Uma publicação chega apenas aos assinantes do seu tópico. O barramento de broadcast único acabou: clientes assinam tópicos por meio de um registro sem locks, com uma caixa de entrada limitada por conexão.',
      },
      {
        title: 'Autenticação no Momento da Conexão',
        description:
          'Controle de admissão na conexão, por headers, query string ou subprotocolo — nunca como um frame in-band. O gateway verifica a identidade sem interpretar o payload.',
      },
      {
        title: 'Autorização de Assinatura',
        description:
          'Hoje qualquer conexão lê qualquer tópico que consiga adivinhar. O subscribe é o único lugar onde a checagem entra; a pergunta em aberto é como o gateway descobre o que uma conexão pode assinar sem aprender nenhum vocabulário de domínio.',
      },
      {
        title: 'Ritmo de Publicação',
        description:
          'Atraso opcional por publicação (delay_ms). Já proposto, só começa depois de autenticação e autorização de assinatura. Antes de ser mantido, benchmarks repetidos precisam mostrar que o lookahead é barato.',
      },
      {
        title: 'Rate Limiting por Conexão',
        description:
          'Limites de taxa de ingestão por conexão para evitar abusos e suavizar picos de tráfego. Controle de admissão, decidido na camada de transporte.',
      },
      {
        title: 'Confirmações de Entrega',
        description:
          'Ack/nack opcional por mensagem. Agnóstico a payload, mas exige estado por mensagem e um caminho de retry onde hoje não há nenhum, então precisa de uma decisão antes de qualquer proposta.',
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
