export const en = {
  meta: {
    title: 'Akagitsune — Realtime WebSocket Gateway',
    description:
      'A generic, payload-agnostic realtime WebSocket gateway built in Rust. Pure transport: it relays, it does not interpret. Sustains 1,000,000 deliveries per second in benchmarks.',
    shortDescription: 'A generic, payload-agnostic realtime WebSocket gateway built in Rust.',
  },
  nav: {
    about: 'About',
    performance: 'Performance',
    protocol: 'Protocol',
    scope: 'Scope',
    characters: 'Characters',
    roadmap: 'Roadmap',
    github: 'GitHub',
    toggleMenu: 'Toggle menu',
    language: 'Language',
    logoAlt: 'Akagitsune logo',
  },
  hero: {
    bannerAlt: 'Akagitsune banner — cyberpunk cityscape with crimson glow',
    taglineBefore: 'A generic realtime WebSocket gateway built in Rust.',
    taglineHighlight: 'Pure transport',
    taglineAfter: ' — it relays, it does not interpret.',
    stats: {
      sustained: 'Deliveries sustained',
      p99: 'Worst p99 at 1M/s, one topic',
      delivered: 'Delivered at 1M/s',
    },
    viewOnGithub: 'View on GitHub',
    learnMore: 'Learn More',
  },
  whatItIs: {
    eyebrow: 'What It Is',
    title: 'A WebSocket relay that stays out of your way',
    intro:
      'Akagitsune is a generic realtime gateway — a piece of infrastructure, not a product. It connects sockets and moves bytes. What those bytes mean is entirely your decision.',
    features: [
      {
        title: 'Payload-Agnostic',
        description:
          'The gateway forwards your data without touching it. Chat messages, game states, live dashboards, IoT telemetry — it all rides the same wire. The meaning is yours; the transport is ours.',
      },
      {
        title: 'Real-Time, Always',
        description:
          'Built on asynchronous Rust with a lock-free hot path. Every message is serialized once — not once per receiver — then delivered only to the connections subscribed to its topic.',
      },
      {
        title: 'Backpressure Over Breakage',
        description:
          'When a slow client falls behind, Akagitsune drops its queued messages and warns it — rather than slowing down everyone else. The fast stay fast; the slow get a second chance.',
      },
      {
        title: 'Two Tasks, One Connection',
        description:
          'Each connection runs a reader (ingest and fanout into subscriber inboxes) and a writer (flush). Bounded queues everywhere, no locks in gateway code, reference-counted message clones. Clean, predictable, debuggable.',
      },
    ],
    getItRunning: 'Get it running',
    connectAt: '# Connect at ',
  },
  performance: {
    eyebrow: 'Performance',
    title: 'One million, sustained',
    intro: (floorMs: number, ceilingMs: number, topicsP99: string) =>
      `The target is a million deliveries a second inside a ${floorMs}–${ceilingMs} ms p99 budget. On a single topic all three traffic shapes clear it, and keep clearing it at twice the load. Spread across 100 topics the same million deliveries all arrive, but p99 lands at ${topicsP99} ms, over budget.`,
    shapeGloss: {
      ingest: 'many senders, one topic',
      mesh: 'everyone talks to everyone',
      fanout: 'few senders, many sockets',
      topics: 'same load, 100 topics',
      explore: 'probe past the goal',
    },
    chartTitle: 'Service p99 against offered load',
    chartCaption: (ceilingMs: number) =>
      `Log scale, because the spread runs from 3 ms to 28 ms. The dashed rule is the ${ceilingMs} ms budget; the tinted band above it is out of spec.`,
    budgetLabel: (ceilingMs: number) => `${ceilingMs} ms budget`,
    topicsLabel: (p99: string) => `100 topics: ${p99} ms`,
    chartNote:
      'Ingest was not run at 2M. The hollow grey markers at 3M and 3.59M are exploratory probes, and they held too: every message delivered, no breaking point found yet. The hollow red marker at 1M is the topic-spread run, the only goal-load run over budget.',
    offeredReadout: 'deliveries/s offered',
    delivered: 'delivered',
    tableTitle: 'Every run, in full',
    tableHint: 'Latency in milliseconds. Rows that miss the budget are dimmed.',
    tableScrollHint: ' Scroll the table sideways for the rest of the columns.',
    tableCaption: (ceilingMs: number) =>
      `Benchmark runs by offered load and traffic shape, with p50 and p99 service latency, delivery rate, and whether each run stayed inside the ${ceilingMs} ms budget.`,
    columns: ['Offered load', 'Shape', 'Conns', 'p50', 'p99', 'Delivered', 'Against budget'],
    verdict: {
      breaks: 'delivery breaks',
      over: 'over budget',
      within: 'within budget',
    },
    footnoteBefore: (hardware: string) =>
      `Every number is from a single local run on ${hardware} — not a production deployment. Latency is service latency: message arrival minus actual send, the more conservative of the two figures the harness records. The highest load any run held inside the budget was `,
    footnoteAfter:
      ' deliveries a second. Two topic-heavy runs, 5,000 topics and membership churn, also miss the budget, and the cause is not yet isolated: the load generator may be the bottleneck in the first case, and copying the subscriber list on every join and leave may be in the second. Every connection now owns an inbox, so memory per connection rose from about 150 KiB to about 200 KiB. Benchmark scripts and methodology are in the repository.',
    hardware:
      'Apple M4 Pro, 14 cores, release build, gateway and load generator on the same machine',
  },
  protocol: {
    eyebrow: 'Protocol',
    title: 'Simple by design',
    intro:
      'No handshake and no auth negotiation. Connect, receive your ID, subscribe to a topic, start publishing. Four kinds of frame cover everything.',
    tabs: {
      welcome: {
        label: 'Welcome',
        description:
          "On connect, the server immediately sends a welcome frame with the client's assigned UUID. No handshake required — but nothing is delivered until you subscribe to a topic.",
        code: `// Server → Client (on connect)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
      },
      text: {
        label: 'Topics',
        description:
          'A topic is an opaque key of 1–255 bytes that the client chooses. Publish to it and only the other subscribers receive the message. The payload is never deserialized — forwarded byte-for-byte inside the envelope.',
        code: `// Client sends:
{ "type": "subscribe", "topic": "lobby" }
{ "type": "publish", "topic": "lobby",
  "data": { "action": "move", "x": 42 } }

// Server answers the subscribe:
{ "type": "subscribed", "topic": "lobby" }

// Every other subscriber of "lobby" receives:
{
  "type": "message",
  "topic": "lobby",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
      },
      binary: {
        label: 'Binary Frames',
        description:
          "Binary frames carry a one-byte topic length and the topic, then the payload, which is relayed untouched. Subscribers also get the sender's UUID. Use them for protobuf, msgpack, audio chunks, or anything that isn't JSON.",
        code: `// Client sends:
//   [topic length: u8][topic][payload]
// Subscribers receive:
//   [topic length: u8][topic][sender uuid: 16 bytes][payload]`,
      },
      control: {
        label: 'Control Frames',
        description:
          "When a slow client's inbox overflows, the gateway drops its oldest queued messages and sends a warning. Errors are structured JSON and name the topic they concern. Frames over 64 KiB are rejected, and a connection holds at most 64 subscriptions.",
        code: `// Leave a topic:
{ "type": "unsubscribe", "topic": "lobby" }

// Backpressure warning (slow client):
{ "type": "warning", "dropped": 12 }

// Error (e.g., publish without data):
{ "type": "error", "topic": "lobby", "message": "..." }`,
      },
    },
  },
  scope: {
    eyebrow: 'Scope',
    title: 'Sharp boundaries, clear purpose',
    intro:
      'The scope test is simple: a feature belongs in the gateway only if it can be implemented without knowing what the payload means. Everything else belongs in your application.',
    inGateway: 'In the gateway',
    inYourApp: 'In your app',
    inScope: [
      'Connection management & lifecycle',
      'Message relay & envelope framing',
      'Backpressure & queue overflow handling',
      'Topic-based routing',
      'Per-connection rate limiting (planned)',
      'Auth & admission control (planned)',
      'Delivery semantics & acknowledgements',
      'Multi-instance backplane (planned)',
    ],
    outOfScope: [
      'Usernames, profiles, or identity',
      'Message content interpretation',
      'Chat history or persistence',
      'Business logic or domain rules',
      'Push notifications beyond WebSocket',
      'REST API endpoints for data',
    ],
    quote: '“If it needs to know what the message says, it doesn’t belong here.”',
  },
  characters: {
    eyebrow: 'The Operatives',
    title: 'Four roles, four faces',
    intro:
      'Every connection in Akagitsune runs two concurrent tasks — reader and writer — around one shared topic registry, plus a lead that ties them together. Meet the cast.',
    viewFullSize: (name: string) => `View ${name} full size`,
    fullSize: (name: string) => `${name} full size`,
    cast: {
      akane: {
        role: 'The Gateway',
        task: 'Project Lead',
        description:
          'The face of Akagitsune. Akane embodies the gateway itself — poised, precise, and relentlessly fast. She coordinates the three operatives below, ensuring every message reaches its destination without interference or delay. The crimson eyes see all traffic; the fox mask stays close, a reminder that the gateway is cunning infrastructure, not blunt force.',
      },
      messenger: {
        role: 'The Messenger',
        task: 'Reader Task',
        description:
          'The Reader. Kaze intercepts every incoming frame the instant it arrives — validates the control frame, constructs the envelope once, and fans it out to the subscribers of the topic. One serialization per message, not per receiver. Her half-mask and data scroll mark her as the first point of contact: she touches the wire so nobody else has to.',
      },
      gatekeeper: {
        role: 'The Gatekeeper',
        task: 'Topic Registry',
        description:
          "The Registry. Tetsu keeps the lock-free map from topic to subscribers and sits between every publish and every connection inbox. He skips the sender's own messages and hands the rest only to the connections subscribed to that topic. His armored frame and glowing lantern embody the principle: guard the flow, never the content. Sturdy, reliable, always watching.",
      },
      trickster: {
        role: 'The Trickster',
        task: 'Writer Task',
        description:
          "The Writer. Hayate drains the connection's inbox in batches — one flush per batch, never wasted work. Only the Writer touches the sink. His acrobatic agility mirrors the writer task's speed: clear the queue, flush, repeat. The twin blades? One for each end of the pipe.",
      },
    },
  },
  roadmap: {
    eyebrow: 'Roadmap',
    title: 'What comes next',
    intro:
      'Akagitsune is under active development. Topic routing has landed; these are the features on the horizon — all of them pass the scope test.',
    status: { achieved: 'Achieved', next: 'Next', planned: 'Planned', exploring: 'Exploring' },
    items: [
      {
        title: 'Topic Routing',
        description:
          'The single broadcast bus is gone. Clients subscribe to topics and a publish reaches only the other subscribers of its topic, through a lock-free registry and one bounded inbox per connection.',
      },
      {
        title: 'Authentication',
        description:
          'Token-based admission control at connection time. The gateway verifies identity without interpreting payload — auth is transport-level, not content-level. It also unlocks per-topic read and write permissions.',
      },
      {
        title: 'Per-Connection Rate Limiting',
        description:
          'Configurable ingest rate limits per connection to prevent abuse and smooth traffic spikes. Token bucket or sliding window, decided at the transport layer.',
      },
      {
        title: 'Multi-Instance Backplane',
        description:
          'Horizontal scaling via a shared backplane (Redis, NATS, or a custom protocol) so multiple gateway instances form a single logical relay.',
      },
      {
        title: 'Delivery Acknowledgements',
        description:
          'Optional per-message ack/nack for clients that need delivery guarantees. Still payload-agnostic — the gateway confirms transport, not meaning.',
      },
    ],
  },
  footer: {
    tagline: '赤狐 — Generic Realtime WebSocket Gateway',
    repository: 'Repository',
    architecture: 'Architecture',
    builtWith: 'Built with Rust, axum & tokio. Open source under MIT.',
  },
}

export type Dictionary = typeof en
