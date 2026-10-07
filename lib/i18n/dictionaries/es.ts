import type { Dictionary } from './en'

export const es: Dictionary = {
  meta: {
    title: 'Akagitsune — Gateway WebSocket en Tiempo Real',
    description:
      'Un gateway WebSocket genérico y agnóstico al payload, escrito en Rust. Transporte puro: retransmite, no interpreta. Sostiene 1.000.000 de entregas por segundo en benchmarks.',
    shortDescription: 'Un gateway WebSocket genérico y agnóstico al payload, escrito en Rust.',
  },
  nav: {
    about: 'Acerca de',
    performance: 'Rendimiento',
    protocol: 'Protocolo',
    scope: 'Alcance',
    characters: 'Personajes',
    roadmap: 'Hoja de ruta',
    github: 'GitHub',
    toggleMenu: 'Abrir/cerrar menú',
    language: 'Idioma',
    logoAlt: 'Logo de Akagitsune',
  },
  hero: {
    bannerAlt: 'Banner de Akagitsune — ciudad cyberpunk con resplandor carmesí',
    taglineBefore: 'Un gateway WebSocket genérico en tiempo real, escrito en Rust.',
    taglineHighlight: 'Transporte puro',
    taglineAfter: ' — retransmite, no interpreta.',
    stats: {
      sustained: 'Entregas sostenidas',
      p99: 'Peor p99 a 1M/s, un tema',
      delivered: 'Entregadas a 1M/s',
    },
    viewOnGithub: 'Ver en GitHub',
    learnMore: 'Más información',
  },
  whatItIs: {
    eyebrow: 'Qué es',
    title: 'Un relay WebSocket que no estorba',
    intro:
      'Akagitsune es un gateway genérico de tiempo real: una pieza de infraestructura, no un producto. Conecta sockets y mueve bytes. Qué significan esos bytes es decisión enteramente tuya.',
    features: [
      {
        title: 'Agnóstico al payload',
        description:
          'El gateway reenvía tus datos sin tocarlos. Mensajes de chat, estados de juego, dashboards en vivo, telemetría IoT: todo viaja por el mismo cable. El significado es tuyo; el transporte es nuestro.',
      },
      {
        title: 'Tiempo real, siempre',
        description:
          'Construido sobre Rust asíncrono con una ruta crítica sin locks. Cada mensaje se serializa una sola vez —no una vez por receptor— y luego se entrega solo a las conexiones suscritas a su tema.',
      },
      {
        title: 'Backpressure en vez de ruptura',
        description:
          'Cuando un cliente lento se queda atrás, Akagitsune descarta sus mensajes en cola y le avisa, en lugar de frenar a todos los demás. Los rápidos siguen siendo rápidos; los lentos obtienen una segunda oportunidad.',
      },
      {
        title: 'Dos tareas, una conexión',
        description:
          'Cada conexión ejecuta un lector (ingest y fanout hacia las bandejas de entrada de los suscriptores) y un escritor (flush). Colas acotadas en todas partes, sin locks en el código del gateway, clones de mensajes con conteo de referencias. Limpio, predecible, depurable.',
      },
    ],
    getItRunning: 'Ponlo en marcha',
    connectAt: '# Conéctate en ',
  },
  performance: {
    eyebrow: 'Rendimiento',
    title: 'Un millón, sostenido',
    intro: (floorMs, ceilingMs, topicsP99) =>
      `El objetivo es un millón de entregas por segundo dentro de un presupuesto de p99 de ${floorMs}–${ceilingMs} ms. Con un solo tema, los tres patrones de tráfico lo cumplen y siguen cumpliéndolo con el doble de carga. Repartido en 100 temas, el mismo millón de entregas llega completo, pero el p99 queda en ${topicsP99} ms, fuera del presupuesto.`,
    shapeGloss: {
      ingest: 'muchos emisores, un tema',
      mesh: 'todos hablan con todos',
      fanout: 'pocos emisores, muchos sockets',
      topics: 'misma carga, 100 temas',
      explore: 'sonda más allá del objetivo',
    },
    chartTitle: 'p99 de servicio frente a la carga ofrecida',
    chartCaption: (ceilingMs) =>
      `Escala logarítmica, porque la dispersión va de 3 ms a 28 ms. La línea discontinua es el presupuesto de ${ceilingMs} ms; la banda sombreada por encima queda fuera de especificación.`,
    budgetLabel: (ceilingMs) => `presupuesto de ${ceilingMs} ms`,
    topicsLabel: (p99) => `100 temas: ${p99} ms`,
    chartNote:
      'El ingest no se ejecutó a 2M. Los marcadores grises huecos en 3M y 3,59M son sondas exploratorias, y también aguantaron: todos los mensajes entregados, sin punto de ruptura encontrado todavía. El marcador rojo hueco en 1M es la ejecución repartida en temas, la única con la carga del objetivo fuera del presupuesto.',
    offeredReadout: 'entregas/s ofrecidas',
    delivered: 'entregadas',
    tableTitle: 'Cada ejecución, completa',
    tableHint: 'Latencia en milisegundos. Las filas que no cumplen el presupuesto aparecen atenuadas.',
    tableScrollHint: ' Desliza la tabla hacia los lados para ver el resto de las columnas.',
    tableCaption: (ceilingMs) =>
      `Ejecuciones del benchmark por carga ofrecida y patrón de tráfico, con latencia de servicio p50 y p99, tasa de entrega y si cada ejecución se mantuvo dentro del presupuesto de ${ceilingMs} ms.`,
    columns: ['Carga ofrecida', 'Patrón', 'Conex.', 'p50', 'p99', 'Entregadas', 'Frente al presupuesto'],
    verdict: {
      breaks: 'la entrega falla',
      over: 'fuera del presupuesto',
      within: 'dentro del presupuesto',
    },
    footnoteBefore: (hardware) =>
      `Todas las cifras provienen de una única ejecución local en ${hardware}, no de un despliegue en producción. La latencia es latencia de servicio: llegada del mensaje menos el envío real, la más conservadora de las dos cifras que registra el harness. La mayor carga que cualquier ejecución sostuvo dentro del presupuesto fue de `,
    footnoteAfter:
      ' entregas por segundo. Dos ejecuciones con muchos temas, 5.000 temas y alta rotación de suscriptores, tampoco cumplen el presupuesto, y la causa aún no está aislada: en el primer caso el cuello de botella puede ser el generador de carga, y en el segundo puede ser la copia de la lista de suscriptores en cada alta y baja. Cada conexión ahora tiene su bandeja de entrada, así que la memoria por conexión subió de unos 150 KiB a unos 200 KiB. Los scripts y la metodología del benchmark están en el repositorio.',
    hardware:
      'Apple M4 Pro, 14 núcleos, build de release, gateway y generador de carga en la misma máquina',
  },
  protocol: {
    eyebrow: 'Protocolo',
    title: 'Simple por diseño',
    intro:
      'Sin handshake y sin negociación de autenticación. Conéctate, recibe tu ID, suscríbete a un tema, empieza a publicar. Cuatro tipos de frame lo cubren todo.',
    tabs: {
      welcome: {
        label: 'Bienvenida',
        description:
          'Cuando un cliente se conecta, el servidor le envía de inmediato un frame de bienvenida con el UUID que se le asignó. No hace falta handshake, pero no se entrega nada hasta que te suscribes a un tema.',
        code: `// Servidor → Cliente (al conectar)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
      },
      text: {
        label: 'Temas',
        description:
          'Un tema es una clave opaca de 1 a 255 bytes que elige el cliente. Publica en él y solo los demás suscriptores reciben el mensaje. El payload nunca se deserializa: se reenvía byte a byte dentro del sobre.',
        code: `// El cliente envía:
{ "type": "subscribe", "topic": "lobby" }
{ "type": "publish", "topic": "lobby",
  "data": { "action": "move", "x": 42 } }

// El servidor responde a la suscripción:
{ "type": "subscribed", "topic": "lobby" }

// Todos los demás suscriptores de "lobby" reciben:
{
  "type": "message",
  "topic": "lobby",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
      },
      binary: {
        label: 'Frames binarios',
        description:
          'Los frames binarios llevan un byte con la longitud del tema, el tema y luego el payload, que se retransmite intacto. Los suscriptores también reciben el UUID del remitente. Úsalos para protobuf, msgpack, fragmentos de audio o cualquier cosa que no sea JSON.',
        code: `// El cliente envía:
//   [longitud del tema: u8][tema][payload]
// Los suscriptores reciben:
//   [longitud del tema: u8][tema][uuid del remitente: 16 bytes][payload]`,
      },
      control: {
        label: 'Frames de control',
        description:
          'Cuando la bandeja de entrada de un cliente lento se desborda, el gateway descarta sus mensajes más antiguos y le envía una advertencia. Los errores son JSON estructurado e indican el tema al que se refieren. Los frames de más de 64 KiB se rechazan y una conexión admite como máximo 64 suscripciones.',
        code: `// Salir de un tema:
{ "type": "unsubscribe", "topic": "lobby" }

// Advertencia de backpressure (cliente lento):
{ "type": "warning", "dropped": 12 }

// Error (p. ej., publish sin data):
{ "type": "error", "topic": "lobby", "message": "..." }`,
      },
    },
  },
  scope: {
    eyebrow: 'Alcance',
    title: 'Límites nítidos, propósito claro',
    intro:
      'La prueba de alcance es simple: una funcionalidad pertenece al gateway solo si puede implementarse sin saber qué significa el payload. Todo lo demás pertenece a tu aplicación.',
    inGateway: 'En el gateway',
    inYourApp: 'En tu aplicación',
    inScope: [
      'Gestión y ciclo de vida de las conexiones',
      'Retransmisión de mensajes y encapsulado en sobres',
      'Backpressure y manejo de desbordamiento de colas',
      'Enrutamiento por tema',
      'Rate limiting por conexión (planificado)',
      'Autenticación y control de admisión (planificado)',
      'Semántica de entrega y confirmaciones',
      'Backplane multiinstancia (planificado)',
    ],
    outOfScope: [
      'Nombres de usuario, perfiles o identidad',
      'Interpretación del contenido de los mensajes',
      'Historial de chat o persistencia',
      'Lógica de negocio o reglas de dominio',
      'Notificaciones push más allá del WebSocket',
      'Endpoints de API REST para datos',
    ],
    quote: '“Si necesita saber qué dice el mensaje, no pertenece aquí.”',
  },
  characters: {
    eyebrow: 'Los operativos',
    title: 'Cuatro roles, cuatro rostros',
    intro:
      'Cada conexión en Akagitsune ejecuta dos tareas concurrentes —lector y escritor— en torno a un registro de temas compartido, más una líder que las une. Conoce al elenco.',
    viewFullSize: (name) => `Ver a ${name} en tamaño completo`,
    fullSize: (name) => `${name} en tamaño completo`,
    cast: {
      akane: {
        role: 'El gateway',
        task: 'Líder del proyecto',
        description:
          'El rostro de Akagitsune. Akane encarna el propio gateway: elegante, precisa e implacablemente rápida. Coordina a los tres operativos de abajo y se asegura de que cada mensaje llegue a su destino sin interferencias ni demoras. Los ojos carmesí ven todo el tráfico; la máscara de zorro se queda cerca, como recordatorio de que el gateway es infraestructura astuta, no fuerza bruta.',
      },
      messenger: {
        role: 'La mensajera',
        task: 'Tarea lectora',
        description:
          'La Lectora. Kaze intercepta cada frame entrante en el instante en que llega: valida el frame de control, construye el sobre una sola vez y lo distribuye a los suscriptores del tema. Una serialización por mensaje, no por receptor. Su media máscara y su pergamino de datos la marcan como el primer punto de contacto: ella toca el cable para que nadie más tenga que hacerlo.',
      },
      gatekeeper: {
        role: 'El guardián',
        task: 'Registro de temas',
        description:
          'El Registro. Tetsu custodia el mapa sin locks de temas a suscriptores y se sitúa entre cada publicación y cada bandeja de entrada de conexión. Omite los mensajes del propio remitente y entrega el resto solo a las conexiones suscritas a ese tema. Su armadura y su linterna encendida encarnan el principio: custodiar el flujo, nunca el contenido. Sólido, fiable, siempre atento.',
      },
      trickster: {
        role: 'El embaucador',
        task: 'Tarea escritora',
        description:
          'El Escritor. Hayate vacía la bandeja de entrada de la conexión por lotes: un flush por lote, nunca trabajo desperdiciado. Solo el Escritor toca el sink. Su agilidad acrobática refleja la velocidad de la tarea escritora: vaciar la cola, hacer flush, repetir. ¿Las espadas gemelas? Una para cada extremo de la tubería.',
      },
    },
  },
  roadmap: {
    eyebrow: 'Hoja de ruta',
    title: 'Lo que viene',
    intro:
      'Akagitsune está en desarrollo activo. El enrutamiento por tema ya llegó; el resto se lista en el orden en que se planifica, y cada elemento aún debe pasar la prueba de alcance antes de implementarse.',
    status: { achieved: 'Logrado', next: 'Siguiente', planned: 'Planificado', exploring: 'En evaluación' },
    items: [
      {
        title: 'Enrutamiento por tema',
        description:
          'Una publicación llega solo a los suscriptores de su tema. El bus de broadcast único ya no existe: los clientes se suscriben a temas mediante un registro sin locks, con una bandeja de entrada acotada por conexión.',
      },
      {
        title: 'Autenticación al conectar',
        description:
          'Control de admisión en el momento de la conexión, mediante headers, query string o un subprotocolo, nunca como un frame in-band. El gateway verifica la identidad sin interpretar el payload.',
      },
      {
        title: 'Ritmo de publicación',
        description:
          'Retraso opcional por publicación (delay_ms). Ya propuesto; solo empieza después de la autenticación al conectar. Antes de conservarlo, benchmarks repetidos deben mostrar que el lookahead es barato.',
      },
      {
        title: 'Rate limiting por conexión',
        description:
          'Límites de tasa de entrada por conexión para prevenir abusos y suavizar picos de tráfico. Control de admisión, decidido en la capa de transporte.',
      },
      {
        title: 'Autorización de suscripción',
        description:
          'Salió del plan. El gateway es self-hosted y solo los servicios del propio operador llegan a él, así que un cliente admitido ya es de confianza. Solo vuelve si un cliente no confiable, como un navegador, se conecta directamente, lo que exige una credencial emitida por conexión.',
      },
      {
        title: 'Confirmaciones de entrega',
        description:
          'Ack/nack opcional por mensaje. Agnóstico al payload, pero exige estado por mensaje y una ruta de reintento donde hoy no hay ninguna, así que necesita una decisión antes de cualquier propuesta.',
      },
    ],
  },
  footer: {
    tagline: '赤狐 — Gateway WebSocket genérico en tiempo real',
    repository: 'Repositorio',
    architecture: 'Arquitectura',
    builtWith: 'Hecho con Rust, axum y tokio. Código abierto bajo licencia MIT.',
  },
}
