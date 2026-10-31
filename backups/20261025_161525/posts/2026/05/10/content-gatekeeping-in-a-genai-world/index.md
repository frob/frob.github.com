# Content gatekeeping in a GenAI world

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2026/05/10/content-gatekeeping-in-a-genai-world/ |
| date | 2026-05-10 |
| tags | ai, web development, frontpage |


Let me start with a bit of history. It might seem like a hard thing for today's generation to understand, but content used to cost money -- especially novel or reliable content. In order to keep up with the latest in science or tech, one needed to subscribe to journals or magazines. An encyclopedia set was an expensive necessity before the age when almost all written content became free.

It was in this time that the foundations of the World Wide Web were being laid in the internet protocol that would become http -- the protocol that serves web pages and other hypermedia to the world. And that is why HTTP has had a provision for "Payment Required" responses that has gone unused for 30 years.

HTTP, the communication layer of the web, was designed with the expectation that content would cost money. Instead, the web became a mostly ad-based platform. But those days might be coming to an end. As the browser stops being a destination platform, more and more people are getting fed the content from means that don't feed them ads. Worse yet, they are even getting the direct content. As more and more people access content through Gen AI services, such as Claude, Gemini, ChatGPT, DeepSeek, or Copilot, they are no longer reading content from a single source, but rather a distillation of many sources. In that world, who should be paid, and do ads make sense?

There is actually way more to it than that. We haven't even talked about training data.

## The training data fight is over. The access fight is just starting.

For two years now the conversation about AI and content has been stuck on one question: who gets paid for what was already used to train the models? It is a real question with billion-dollar answers, but it is also a question about the past. Meanwhile a different question has been quietly assembling itself in the background -- who gets paid when a model goes to fetch something *right now* -- and almost nobody is talking about it, even though the plumbing is already getting installed.

There are two sides to the content payment coin: paying for training and paying for inference. So let me lay out the two paradigms next to each other, because I think the second one is where things actually get interesting.

## Paradigm one: licensing the training corpus

This is the world you have been reading about. Publishers spent 2024 and 2025 either suing AI companies or signing deals with them, and in many cases doing both at the same time with different companies. The Guardian, the Washington Post, NYT (with Amazon), Condé Nast, Hearst, AFP, USA Today -- the list is long enough at this point that there is [a running scorecard](https://digiday.com/media/a-timeline-of-the-major-deals-between-publishers-and-ai-tech-companies-in-2025/). The big number this year is News Corp's [up-to-$50M-a-year deal with Meta](https://pressgazette.co.uk/platforms/news-publisher-ai-deals-lawsuits-openai-google/) for Llama. The Anthropic author settlement [set a $3,000-per-work floor for valuation](https://willscott.me/2025/10/04/ai-licensing-deals-search-visibility-in-2025/) of pirated training material, which everybody in the room is now using as a reference price.

But here is the catch, and it is a big one. [As long as Google's search crawler and its AI-training crawler are functioning as a single system](https://www.niemanlab.org/2025/12/publishers-will-see-no-meaningful-ai-licensing-revenue/), publishers have no real leverage. Blocking AI scraping means blocking search indexing means losing your audience. The result is what you would expect: publishers who block AI crawlers via robots.txt [face a 23.1% monthly visit decline with no corresponding reduction in AI citations](https://www.playwire.com/blog/common-crawl-is-an-ai-training-pipeline-publishers-are-done-pretending-otherwise). You get scraped either way; the only question is whether you also lose your traffic.

It is a bad position to negotiate from. And it is fundamentally a *retrospective* position -- the data is already in the weights. The deals being signed now are partly settlements for the past and partly access for future training rounds, but the leverage curve is pointed the wrong direction. Every additional month of synthetic data, every additional model trained, reduces the marginal value of any one publisher's archive.

Which brings me to the other paradigm. The one where the question gets reframed entirely.

## Paradigm two: paying for content access

### MCP and the runtime fetch

[Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro) is an open standard Anthropic shipped in November 2024 and donated to the Linux Foundation a year later. The pitch is boring on its surface -- it is a JSON-RPC protocol for letting AI applications talk to external tools and data sources in a standardized way. USB-C for AI, as the docs like to put it. The N×M integration problem solved by making every client and every server speak one protocol.

But what MCP actually does, economically, is move the data question from training time to inference time.

Here is what I mean. When I connect Claude to my Google Drive over MCP, the model is not being granted access to Drive as a corpus. It is being granted ephemeral, scoped, user-authorized access to *my* Drive *for this session*, using *my* credentials. The data flows in, the model reads it, the model answers, the data does not get baked into anybody's weights. [Models retrieve live records on demand rather than relying on cached embeddings or static training data](https://www.databricks.com/blog/what-is-model-context-protocol). Every tool call is logged. The publisher's existing auth and access controls do all the work.

This is a fundamentally different deal than licensing. The Financial Times does not have to sell its archive to OpenAI. It has to ship an MCP server that authenticates against the same paywall it already runs. If you are an FT subscriber and you ask Claude about a story, Claude calls the MCP server with your credentials, the server returns the article, Claude reads it and answers. If you are not a subscriber, you get nothing. The content stays paywalled to humans, AI agents traverse the same paywall on behalf of authorized humans, and there is no training-data negotiation at all because no training is happening.

The political shift is significant. In the licensing world, publishers are selling something they have already lost control of. In the MCP world, they are selling something they still hold -- current, authenticated, real-time access to their actual systems. The leverage curve is finally pointed the right direction.

MCP does not solve everything, though. It assumes the user already has an account. It does not help a stranger find your content and pay for it on the spot. For that you need the next layer.

### x402 and RSL -- the missing payment and rights layers

This is the part I think will look obvious in retrospect.

HTTP 402 has been sitting in the spec since the 1990s. It means "Payment Required." It was never implemented. [x402 is a payment standard built around that status code](https://developers.cloudflare.com/agents/agentic-payments/x402/), and Cloudflare has been pushing it hard. The flow is dead simple: agent requests a resource, server returns 402 with a price, agent authorizes a stablecoin payment, server delivers the resource. One round trip. No human in the loop. No API key a human had to configure in a billing dashboard ahead of time.

{{< mermaid >}}
sequenceDiagram
    participant A as Agent
    participant S as Publisher Server
    A->>S: GET /article
    S-->>A: 402 Payment Required (price, asset)
    A->>S: GET /article (X-PAYMENT: signed stablecoin tx)
    S-->>A: 200 OK (article body)
{{< /mermaid >}}

Cloudflare's [pay-per-crawl marketplace](https://blog.cloudflare.com/introducing-pay-per-crawl/) sits on top of this, and the numbers are wild. [Cloudflare's network is processing a billion HTTP 402 responses per day](https://www.coindesk.com/tech/2026/05/05/ai-agents-are-breaking-web-economics-but-cloudflare-says-x402-can-help). AI scrapers visit a site at tens-of-thousands to one relative to the human traffic they send back, compared to a 2-to-1 ratio a decade ago. The unit economics of the open web finally, structurally, support charging.

And then there is [RSL -- Really Simple Licensing](https://willscott.me/2025/10/04/ai-licensing-deals-search-visibility-in-2025/) -- which is robots.txt grown up. Instead of "allowed/disallowed," sites declare *terms* in machine-readable form: pay-per-crawl, pay-per-inference, flat subscription, or free with attribution. Reddit and Medium are early backers. Crawlers and agents can negotiate against the terms before they fetch.

The really interesting part is what happens when you combine these. AWS just shipped [Bedrock AgentCore Payments](https://singhajit.com/dev-weekly/2026/may-4-10/anthropic-spacex-cloudflare-layoffs-cursor-33-aws-agent-payments/) -- agents pay over x402 with stablecoins, and Coinbase runs an x402 Bazaar MCP server with over 10,000 paid endpoints agents can discover. So now MCP gives you the integration and authorization layer, x402 gives you the payment layer, RSL gives you the rights-declaration layer, and the agent traverses all three without ever pausing the user's workflow. The cost shows up on a session budget.

{{< mermaid >}}
flowchart LR
    U[Human user] --> AG[AI agent]
    AG -->|1. discover terms| RSL[(RSL<br/>rights & pricing)]
    AG -->|2. authenticate / call tool| MCP[(MCP server<br/>scoped access)]
    AG -->|3. settle payment| X402[(x402<br/>stablecoin rail)]
    MCP --> PUB[(Publisher content)]
    X402 --> PUB
    PUB --> AG
    AG --> U
{{< /mermaid >}}

That is the whole thing.

## Wrap up

The licensing deals are a one-time settlement of the old web. They matter, the numbers are large, and they will keep happening -- but the leverage curve is wrong and everyone in the business knows it. MCP plus x402 plus RSL is the architecture of the next web, where the unit of commerce is not "human visits page, sees ad" but "agent fetches resource, settles micropayment, returns answer to a human." It is the architecture where my original instinct -- content paywalled, AI pays to access -- actually becomes mechanically possible, because the payment and the auth and the access all happen at the moment of use rather than once-ever at training time.

I should be honest about the caveat. Most of this is still early. On-chain x402 volume was [around $28,000 per day in March](https://www.coindesk.com/tech/2026/05/05/ai-agents-are-breaking-web-economics-but-cloudflare-says-x402-can-help), which is rounding error. MCP server quality is uneven. RSL is more aspiration than adoption. Nobody has settled the question of whether crypto rails win or fiat rails do -- Visa and Mastercard have their own Trusted Agent Protocol pushing the same direction from the other side. The technical pieces exist; the market structure does not yet.

But the technical pieces exist. That is the part that was not true a year ago. Build something, hook up an MCP server with a 402 in front of it, see what happens. That is the pitch, and I think it is going to work.

