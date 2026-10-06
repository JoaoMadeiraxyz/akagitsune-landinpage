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
      p99: 'Peor p99 a 1M/s',
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
          'Construido sobre Rust asíncrono con una ruta crítica sin locks. Cada mensaje se serializa una sola vez —no una vez por receptor— y luego se transmite al instante a todos los pares conectados.',
      },
      {
        title: 'Backpressure en vez de ruptura',
        description:
          'Cuando un cliente lento se queda atrás, Akagitsune descarta sus mensajes en cola y le avisa, en lugar de frenar a todos los demás. Los rápidos siguen siendo rápidos; los lentos obtienen una segunda oportunidad.',
      },
      {
        title: 'Tres tareas, una conexión',
        description:
          'Cada conexión ejecuta un lector (ingest), un puente (fanout) y un escritor (flush). Colas acotadas en todas partes, sin locks compartidos, clones de mensajes con conteo de referencias. Limpio, predecible, depurable.',
      },
    ],
    getItRunning: 'Ponlo en marcha',
    connectAt: '# Conéctate en ',
  },
  performance: {
    eyebrow: 'Rendimiento',
    title: 'Un millón, sostenido',
    intro: (floorMs, ceilingMs) =>
      `El objetivo es un millón de entregas por segundo dentro de un presupuesto de p99 de ${floorMs}–${ceilingMs} ms. Los tres patrones de tráfico lo cumplen, e incluso con un 50 % más de carga. Más allá se separan: el fanout es el más costoso y es el primero en romperse.`,
    shapeGloss: {
      ingest: 'muchos emisores, un tema',
      mesh: 'todos hablan con todos',
      fanout: 'un emisor, todos los sockets',
    },
    chartTitle: 'p99 de servicio frente a la carga ofrecida',
    chartCaption: (ceilingMs) =>
      `Escala logarítmica, porque la dispersión va de 3 ms a 825 ms. La línea discontinua es el presupuesto de ${ceilingMs} ms; la banda sombreada por encima queda fuera de especificación.`,
    budgetLabel: (ceilingMs) => `presupuesto de ${ceilingMs} ms`,
    chartNote:
      'El ingest se detiene en 1,5M porque nunca se ejecutó por encima. El marcador hueco en 2,78M es un patrón exploratorio aparte, y el único punto donde lo que cede es la entrega, no la latencia.',
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
      `Todas las cifras provienen de una única ejecución local en ${hardware}, no de un despliegue en producción. La latencia es latencia de servicio: llegada del mensaje menos el envío real, la más conservadora de las dos cifras que registra el harness. La mayor carga que todos los patrones sostuvieron dentro del presupuesto fue de `,
    footnoteAfter:
      ' entregas por segundo. Los scripts y la metodología del benchmark están en el repositorio.',
    hardware:
      'Apple M4 Pro, 14 núcleos, build de release, gateway y generador de carga en la misma máquina',
  },
  protocol: {
    eyebrow: 'Protocolo',
    title: 'Simple por diseño',
    intro:
      'Sin handshake, sin negociación de autenticación, sin ceremonias de suscripción. Conéctate, recibe tu ID, empieza a enviar. Cuatro tipos de frame lo cubren todo.',
    tabs: {
      welcome: {
        label: 'Bienvenida',
        description:
          'Cuando un cliente se conecta, el servidor le envía de inmediato un frame de bienvenida con el UUID que se le asignó. No hace falta handshake: ya estás dentro.',
        code: `// Servidor → Cliente (al conectar)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
      },
      text: {
        label: 'Frames de texto',
        description:
          'Cualquier JSON válido que envíe el cliente se valida, se envuelve en un sobre con el ID del remitente y se retransmite a todas las demás conexiones. El payload nunca se deserializa: se reenvía byte a byte dentro del sobre.',
        code: `// El cliente envía:
{ "action": "move", "x": 42 }

// Todos los demás clientes reciben:
{
  "type": "message",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
      },
      binary: {
        label: 'Frames binarios',
        description:
          'Los frames binarios se retransmiten byte a byte, sin sobre y sin transformación. Úsalos para protobuf, msgpack, fragmentos de audio o cualquier cosa que no sea JSON.',
        code: `// El cliente envía: <bytes en bruto>
// Todos los demás clientes reciben:
//   <los mismos bytes en bruto, intactos>`,
      },
      control: {
        label: 'Frames de control',
        description:
          'Cuando la cola de un cliente lento se desborda, el gateway descarta los mensajes en cola de ese cliente y le envía una advertencia. Los errores se informan como JSON estructurado. Los frames de más de 64 KiB se rechazan.',
        code: `// Advertencia de backpressure (cliente lento):
{ "type": "warning", "dropped": 12 }

// Error (p. ej., JSON inválido):
{ "type": "error", "message": "invalid JSON" }`,
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
      'Enrutamiento por tema / sala (planificado)',
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
    title: 'Cuatro tareas, cuatro rostros',
    intro:
      'Cada conexión en Akagitsune ejecuta tres tareas concurrentes —lector, puente y escritor— más una líder que las une. Conoce al elenco.',
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
          'La Lectora. Kaze intercepta cada frame entrante en el instante en que llega: valida el JSON, construye el sobre una sola vez y lo publica en el bus de broadcast. Una serialización por mensaje, no por receptor. Su media máscara y su pergamino de datos la marcan como el primer punto de contacto: ella toca el cable para que nadie más tenga que hacerlo.',
      },
      gatekeeper: {
        role: 'El guardián',
        task: 'Tarea puente',
        description:
          'El Puente. Tetsu se sitúa entre el bus de broadcast y cada cola de conexión local. Recibe del bus, omite los mensajes del propio remitente y reenvía el resto. Su armadura y su linterna encendida encarnan el principio: custodiar el flujo, nunca el contenido. Sólido, fiable, siempre atento.',
      },
      trickster: {
        role: 'El embaucador',
        task: 'Tarea escritora',
        description:
          'El Escritor. Hayate vacía la cola local por lotes: un flush por lote, nunca trabajo desperdiciado. Solo el Escritor toca el sink. Su agilidad acrobática refleja la velocidad de la tarea escritora: vaciar la cola, hacer flush, repetir. ¿Las espadas gemelas? Una para cada extremo de la tubería.',
      },
    },
  },
  roadmap: {
    eyebrow: 'Hoja de ruta',
    title: 'Lo que viene',
    intro:
      'Akagitsune está en desarrollo activo. Estas son las funcionalidades en el horizonte; todas pasan la prueba de alcance.',
    status: { next: 'Siguiente', planned: 'Planificado', exploring: 'Explorando' },
    items: [
      {
        title: 'Enrutamiento por tema y sala',
        description:
          'Reemplazar el bus de broadcast único por un modelo de suscripción basado en temas. Los clientes se suscriben a salas; los mensajes se enrutan solo a los suscriptores, eliminando el fanout O(N²).',
      },
      {
        title: 'Autenticación',
        description:
          'Control de admisión basado en tokens en el momento de conectarse. El gateway verifica la identidad sin interpretar el payload: la autenticación se resuelve en la capa de transporte, no en la del contenido.',
      },
      {
        title: 'Rate limiting por conexión',
        description:
          'Límites configurables de tasa de entrada (ingest) por conexión para prevenir abusos y suavizar picos de tráfico. Token bucket o ventana deslizante, decidido en la capa de transporte.',
      },
      {
        title: 'Backplane multiinstancia',
        description:
          'Escalado horizontal mediante un backplane compartido (Redis, NATS o un protocolo propio) para que varias instancias del gateway formen un único relay lógico.',
      },
      {
        title: 'Confirmaciones de entrega',
        description:
          'Ack/nack opcional por mensaje para clientes que necesitan garantías de entrega. Sigue siendo agnóstico al payload: el gateway confirma el transporte, no el significado.',
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
