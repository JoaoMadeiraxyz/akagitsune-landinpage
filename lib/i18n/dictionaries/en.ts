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
      p99: 'Worst p99 at 1M/s',
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
          'Built on asynchronous Rust with a lock-free hot path. Every message is serialized once — not once per receiver — then broadcast to all connected peers instantly.',
      },
      {
        title: 'Backpressure Over Breakage',
        description:
          'When a slow client falls behind, Akagitsune drops its queued messages and warns it — rather than slowing down everyone else. The fast stay fast; the slow get a second chance.',
      },
      {
        title: 'Three Tasks, One Connection',
        description:
          'Each connection runs a reader (ingest), a bridge (fanout), and a writer (flush). Bounded queues everywhere, no shared locks, reference-counted message clones. Clean, predictable, debuggable.',
      },
    ],
    getItRunning: 'Get it running',
    connectAt: '# Connect at ',
  },
  performance: {
    eyebrow: 'Performance',
    title: 'One million, sustained',
    intro: (floorMs: number, ceilingMs: number) =>
      `The target is a million deliveries a second inside a ${floorMs}–${ceilingMs} ms p99 budget. All three traffic shapes clear it, and clear half again as much. Past that they part ways: fanout is the expensive one, and it breaks first.`,
    shapeGloss: {
      ingest: 'many senders, one topic',
      mesh: 'everyone talks to everyone',
      fanout: 'one sender, every socket',
    },
    chartTitle: 'Service p99 against offered load',
    chartCaption: (ceilingMs: number) =>
      `Log scale, because the spread runs from 3 ms to 825 ms. The dashed rule is the ${ceilingMs} ms budget; the tinted band above it is out of spec.`,
    budgetLabel: (ceilingMs: number) => `${ceilingMs} ms budget`,
    chartNote:
      'Ingest stops at 1.5M because it was never run above it. The hollow marker at 2.78M is a separate exploratory shape, and the only point where delivery rather than latency is what gives out.',
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
      `Every number is from a single local run on ${hardware} — not a production deployment. Latency is service latency: message arrival minus actual send, the more conservative of the two figures the harness records. The highest load every shape held inside the budget was `,
    footnoteAfter:
      ' deliveries a second. Benchmark scripts and methodology are in the repository.',
    hardware:
      'Apple M4 Pro, 14 cores, release build, gateway and load generator on the same machine',
  },
  protocol: {
    eyebrow: 'Protocol',
    title: 'Simple by design',
    intro:
      'No handshake, no auth negotiation, no subscription dance. Connect, receive your ID, start sending. Four frame types cover everything.',
    tabs: {
      welcome: {
        label: 'Welcome',
        description:
          "On connect, the server immediately sends a welcome frame with the client's assigned UUID. No handshake required — you're in.",
        code: `// Server → Client (on connect)
{
  "type": "welcome",
  "id": "a3f1b2c4-5678-..."
}`,
      },
      text: {
        label: 'Text Frames',
        description:
          "Any valid JSON the client sends is validated, wrapped in an envelope with the sender's ID, and relayed to every other connection. The payload is never deserialized — forwarded byte-for-byte inside the envelope.",
        code: `// Client sends:
{ "action": "move", "x": 42 }

// Every other client receives:
{
  "type": "message",
  "from": "a3f1b2c4-5678-...",
  "data": { "action": "move", "x": 42 }
}`,
      },
      binary: {
        label: 'Binary Frames',
        description:
          "Binary frames are relayed byte-for-byte with no envelope and no transformation. Use them for protobuf, msgpack, audio chunks, or anything that isn't JSON.",
        code: `// Client sends: <raw bytes>
// Every other client receives:
//   <same raw bytes, untouched>`,
      },
      control: {
        label: 'Control Frames',
        description:
          "When a slow client's queue overflows, the gateway drops queued messages for that client and sends a warning. Errors are reported as structured JSON. Frames over 64 KiB are rejected.",
        code: `// Backpressure warning (slow client):
{ "type": "warning", "dropped": 12 }

// Error (e.g., invalid JSON):
{ "type": "error", "message": "invalid JSON" }`,
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
      'Topic / room-based routing (planned)',
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
    title: 'Four tasks, four faces',
    intro:
      'Every connection in Akagitsune runs three concurrent tasks — reader, bridge, and writer — plus a lead that ties them together. Meet the cast.',
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
          'The Reader. Kaze intercepts every incoming frame the instant it arrives — validates the JSON, constructs the envelope once, and publishes to the broadcast bus. One serialization per message, not per receiver. Her half-mask and data scroll mark her as the first point of contact: she touches the wire so nobody else has to.',
      },
      gatekeeper: {
        role: 'The Gatekeeper',
        task: 'Bridge Task',
        description:
          "The Bridge. Tetsu stands between the broadcast bus and every local connection queue. He receives from the bus, skips the sender's own messages, and forwards the rest. His armored frame and glowing lantern embody the principle: guard the flow, never the content. Sturdy, reliable, always watching.",
      },
      trickster: {
        role: 'The Trickster',
        task: 'Writer Task',
        description:
          "The Writer. Hayate drains the local queue in batches — one flush per batch, never wasted work. Only the Writer touches the sink. His acrobatic agility mirrors the writer task's speed: clear the queue, flush, repeat. The twin blades? One for each end of the pipe.",
      },
    },
  },
  roadmap: {
    eyebrow: 'Roadmap',
    title: 'What comes next',
    intro:
      'Akagitsune is under active development. These are the features on the horizon — all of them pass the scope test.',
    status: { next: 'Next', planned: 'Planned', exploring: 'Exploring' },
    items: [
      {
        title: 'Topic & Room Routing',
        description:
          'Replace the single broadcast bus with a topic-based subscription model. Clients subscribe to rooms; messages route only to subscribers — eliminating O(N²) fanout.',
      },
      {
        title: 'Authentication',
        description:
          'Token-based admission control at connection time. The gateway verifies identity without interpreting payload — auth is transport-level, not content-level.',
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
