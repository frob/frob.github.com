# An experienced developers view on writing software in the age of vibe coding and generative ai

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2026/04/29/an-experienced-developers-view-on-writing-software-in-the-age-of-vibe-coding-and-generative-ai/ |
| date | 2026-04-29 |
| tags | frontpage, rant, web development, ai |
| description | AI agents can build a full-stack app in an afternoon, but should it. The right workflow depends on your experience level. A guide to using generative AI effectively whether you're a seasoned engineer or just starting out. |


## I have spent many tokens building with AI in many different ways and using different stacks

I have seen a recent trend revived among software developers. This is the belief that the productivity of a Software Engineer should (or can be) measured in lines of code per week. This is a metric that was, largely, discarded by Software Engineers 50 years ago. The truth of the matter is that every line of code is a liability. This liability used to be mitigated by the time it took skilled and experienced people to plan, design, and write the code. These were people who had accumulated enough **passive knowledge** to instinctively recognize when something was wrong, and enough **active knowledge** to make deliberate, informed decisions. 

Generative AI has changed everything and now non-skilled people who have never written a line of code before in their lives are starting to write complicated 10,000+ line applications. The dirty secret is that they still don't know what they are doing. If you are one of those people, I do not mean to offend you. It is you who, most of all, needs to read this post.

### TL;DR

AI coding agents can generate a full-stack app in an afternoon, but whether that's a superpower or a liability depends on your experience. Senior devs have accumulated deep **passive knowledge** from years of shipping and debugging production systems; they can safely use agents as force multipliers and trust their instincts to catch bad output. Mid-level devs are still building **active knowledge** in areas like security and architecture; they should treat the agent as a collaborative partner and resist accepting suggestions they can't evaluate. Junior devs should flip the relationship entirely: use the agent as a tutor, not a generator, or risk shipping working code they can't explain, debug, or extend. The right workflow for each level is covered below.

---

## Vibe Coding a Full-Stack App: How Your Experience Level Should Change Your Workflow

AI agents can build a full-stack application in an afternoon. A database schema, auth system, API layer, and polished frontend, all generated from a few prompts. It feels like a superpower, and in many ways it is. But the right workflow for wielding that power depends entirely on what you already know.

Getting this wrong has different consequences at different levels. Senior devs waste time untangling inconsistent generated code. Mid-level devs accumulate technical debt they don't realize is there. And junior devs face the most insidious risk of all: learning nothing while believing they've learned everything.

This post walks through a recommended workflow for using AI agents to plan and build a production full-stack application (one with user accounts, a web interface, and an authenticated API) and then shows how that workflow should change based on where you are in your career.

---

## The Universal Foundation

Regardless of experience level, a few principles hold:

**Spec first, always.** A mediocre agent with a great spec beats a great agent with a vague spec every time. Before any code is generated, you should have a written document covering your data model, API routes, auth flows, and key technical decisions. The spec is the single highest-leverage artifact in the entire process.

**Commit before every agent session.** Version control is your undo button. If a session goes sideways, `git reset --hard` and try again with better instructions. This sounds obvious, but it fundamentally changes your risk tolerance. You can let the agent take bigger swings when you know you can revert cleanly.

**Be willing to throw away generated code.** The sunk cost fallacy hits hard when an agent has produced 500 lines and you realize the approach is wrong. Throw it away. Rewrite the prompt. Try again. The code was cheap to produce and it's cheap to replace.

The shared workflow skeleton looks like this: **spec → scaffold → feature loop → testing and hardening → deployment.** What changes across experience levels is how you move through each phase, how much you delegate, and where you apply scrutiny.

---

## The Senior Dev (20+ Years)

At this level, the agent is a **force multiplier on existing expertise**. You already know what good code looks like, what production systems require, and where the sharp edges are. You have built, through experience shipping production software and, more importantly, you've been there when production goes down. Maybe, you've led a team of Juniors. An experienced engineer has built up enough **passive knowledge** to build software in nearly any stack with or without Generative AI. For an experienced developer the workflow is about directing the agent's output and maintaining quality at volume.

### Spec Phase

You write the spec. Use the agent conversationally to sanity-check your decisions: rubber-duck your database schema, talk through auth strategies (JWT vs. session, OAuth provider choices), and pressure-test your API design. But the decisions are yours. You have the context the agent doesn't: your team's capabilities, your infrastructure constraints, your product timeline.

### Scaffolding

Use one focused agent session to generate the entire project skeleton: ORM models, migration files, auth middleware, representative API routes, and the frontend shell with auth pages. Generate the skeleton of the whole app in one shot rather than building feature-by-feature. This lets the agent establish consistent patterns (error handling conventions, response envelope shapes, middleware chains, component structure) that it can follow in later sessions.

**Review this output ruthlessly.** Patterns established in the scaffold propagate everywhere. If the agent picks a weird error-handling convention or an inconsistent response shape, fix it now. Fixing patterns in the foundation is 100x cheaper than fixing them after fifty features are built on top.

### Feature Development

One feature per agent session. Each session gets context that includes the spec, the relevant slice of the codebase, and a clear description of the feature. The agent writes the migration, API routes, service logic, and frontend components. You review, test, and iterate within the session, then commit when it's solid.

Keep sessions focused. If you find yourself saying "now let's also add X," start a new session instead. Long sessions with lots of context-switching produce worse code.

### Where to Apply Extra Scrutiny

**Auth and security.** Use a battle-tested auth library (Auth.js for Next.js, Django's built-in auth, FastAPI-Users). The agent will happily write a custom JWT flow, but you'll spend more time auditing it than you save. Even with a library, manually verify token expiry, refresh flows, CORS configuration, CSRF protection, rate limiting on auth endpoints, and password hashing algorithms.

**Cross-boundary refactoring.** Agents are great at refactoring within a file or module. Refactoring across the API boundary, specifically changing response shapes that affect both frontend and backend, tends to produce subtle breakage. Do those manually or in very focused sessions with explicit instructions.

**Testing.** Use agents to generate test scaffolding, but drive what gets tested and review the assertions. Agents love to write tests that pass but don't actually verify meaningful behavior.

### Where to Let the Agent Rip

CRUD routes, form validation, data transformation functions, migration files, Docker configs, CI/CD pipelines, infrastructure-as-code. The boring parts are where the ROI is highest. Let the agent handle the volume work and save your attention for the parts that require judgment.

---

## The Mid-Level Dev (5–10 Years)

At this level, the agent shifts from force multiplier to **collaborative partner**. You have strong opinions about some parts of the architecture but genuine uncertainty about others. Maybe you've built APIs but never designed an auth system from scratch, or you've done frontend work but never thought hard about database indexing.

The core risk at this level is **hidden technical debt from decisions you couldn't evaluate**. The agent will confidently fill in your knowledge gaps with plausible-sounding choices, and if you can't distinguish a good decision from a merely reasonable one, those choices accumulate silently. Question everything and don't ask the agent; instead look things up the old-fashioned way. If you lack the **active knowledge** to finish a task then you probably shouldn't just go along with whatever the GenAI has suggested. 

### Spec Phase

Instead of "write me a spec," the workflow becomes "explain the tradeoffs, then let me decide." For every architectural choice you're unsure about, ask the agent to lay out the options the way a tech lead would in a design review: what are the alternatives, what are the tradeoffs, what would you recommend for this specific use case and why. Then you make the call. This is slower, but it means you actually understand your own system. This would be a good time to phone a friend or ask for a more experienced set of eyes to look at what is being suggested.

### Scaffolding

Same approach as the senior dev, but add a dedicated review step after generation. Before building any features, ask the agent to describe the patterns it established: "What's the error-handling strategy? What's the API response envelope? How is auth middleware applied?" If it describes something you don't recognize from the code, that's a red flag -- the patterns aren't consistent even within the scaffold.

### Feature Development

Add a walkthrough step to the feature loop. After the agent generates a feature, ask it to walk you through the code before you review it yourself. Not because you can't read code, but because agents sometimes use patterns or libraries you haven't encountered, and understanding the intent before reading the implementation makes review dramatically more effective.

### Auth

Use a library and follow its official documentation exactly. Resist the temptation to customize the auth flow based on agent suggestions. Agents will happily add "convenient" shortcuts (disabling CSRF for API routes, storing tokens in localStorage) and if you don't have the security background to smell that something's off, you'll ship it. If the agent produces auth code that deviates from the library's documented patterns, ask it to explain why. If the explanation involves the word "simpler," be skeptical.

### Testing as a Substitute for Intuition

Lean on testing more aggressively than a senior dev would. Not because you'll write better tests, but because tests are how you discover that something is wrong when you lack the intuition to sense it. Ask the agent to write integration tests for every API route, including unhappy paths: expired tokens, malformed input, unauthorized access to other users' data. Run them and read the failures carefully. A failing test you don't understand is a learning opportunity about your own system.

### The Learning Log

Keep a running document of things the agent did that you didn't understand, decisions it made that you had to ask about, and patterns it used that were new to you. This serves two purposes: it's a reference for future decisions, and it's a forcing function to make sure you're understanding what's being generated rather than just accepting it.

---

## The Intern / New Dev

This is where the recommendations change fundamentally, not just in emphasis but in kind. Because the core risk is completely different.

For the senior dev, the risk is wasted time. For the mid-level dev, the risk is hidden technical debt. For the intern, the risk is **learning nothing while believing you've learned everything.** An agent will happily build your entire app while you watch, and you'll feel productive the whole time, and at the end you'll have a working application you can't debug, can't extend, and can't explain in an interview.

### Don't Start with the Full Stack

The workflow described above assumes you can read generated code and evaluate whether it's good. If you've never shipped production code, you can't do that yet -- not because you're not smart enough, but because you don't have the reference points. You don't know what "normal" looks like, so you can't spot "weird."

Start with a single layer.

**Weeks 1–2: Build the API with no frontend.** Use the agent to help, but change the workflow dramatically. Instead of asking the agent to generate a feature, ask it to explain what you need to build, then try writing it yourself, then use the agent to review what you wrote. The loop is: **understand → attempt → compare → learn.**

Use Postman or curl to test your API manually. This teaches you something critical: the API is the real application. The frontend is just one client. Starting full-stack tends to produce the misconception that the API exists to serve the React app, which leads to architectural instincts that take years to unlearn.

**Weeks 3–4: Add the frontend.** Now you have an API you understand because you built it. Add the frontend as a separate layer that talks to your existing API. Again, agent as collaborator, not generator.

### Use Managed Auth, Not a Library

For the senior dev, the recommendation is "use a library and audit the integration." For the mid-level dev, "use a library and follow the docs exactly." For you: **use a fully managed auth service** like Clerk, Auth0, or Supabase Auth.

Not because auth is conceptually beyond you, but because auth fails silently. A broken API route throws an error. A broken React component shows a blank screen. A broken auth system looks like it works perfectly until someone's account gets compromised. You need security intuition to evaluate auth code, and that takes time to develop. Use a service, learn how auth works conceptually on the side, and revisit the decision when you have more experience.

### Flip the Agent Relationship

For experienced devs, the agent is a code generator you review. For you, flip that entirely. The agent is a **tutor that occasionally writes code.**

An experienced dev prompts: *"Build me a paginated endpoint for listing users with role-based filtering."*

You, instead: *"I need to build a paginated endpoint for listing users. Before writing any code, explain what pagination strategies exist, which one you'd recommend for this use case, and what the SQL query would look like. Then I'll try implementing it."*

After your attempt: *"Here's my implementation. Review it, tell me what I got wrong, and explain why it's wrong -- not just how to fix it."*

This is radically different from vibe coding. It's more like pair programming with a very patient senior engineer. It's slower by a factor of maybe 5x. But you actually learn.

### Concepts That Will Trip You Up

There are things experienced devs handle unconsciously that you'll need to engage with explicitly:

**Environment variables and secrets.** Ask the agent to explain the difference between hardcoding a database URL, using a `.env` file, and using a secrets manager, and why each matters. If you don't understand this, you will eventually commit a secret to git, and that's a genuinely bad day.

**Database migrations.** The concept of schema changes as versioned, sequential operations is likely new. Don't let the agent just generate migrations silently. Ask it to explain what each migration does and why migrations exist at all, as opposed to just editing the schema directly.

**Error handling as an API contract.** You probably catch errors to prevent crashes. You don't yet think about error handling as a contract with the frontend developers consuming your API. Ask the agent to explain HTTP status codes, error response shapes, and why consistency here matters for everyone downstream.

### The Learning Log (Mandatory Version)

The learning log from the mid-level section becomes non-negotiable here, but changes form. Don't just log things you didn't understand; log things you thought you understood but got wrong. Every time the agent corrects you, write down what you assumed, what was actually true, and why. After a few weeks, review the log. You'll start seeing patterns in your misconceptions, and those patterns tell you exactly what to study next.

### Resist the Demo Trap

You're going to have moments where the agent produces something impressive (a beautiful dashboard, a working auth flow, a real-time feature) and you'll want to show it off or ship it. The temptation is enormous because the gap between "thing I could build alone" and "thing the agent built while I nodded along" is massive at your level.

But shipping code you can't explain is a career liability, not an asset. When your manager asks "why did you implement it this way?" or "this broke in production, can you fix it?" you need an answer beyond "the AI did it."

---

## The Common Thread

Across all three levels, a few truths hold:

**The spec is always the highest-leverage artifact.** Whether you write it yourself, collaborate on it, or use it as a learning exercise, the spec shapes everything downstream. Time invested here pays compound returns.

**Auth deserves more caution than you think.** At every level, the recommendation is some version of "don't hand-roll this, and be more careful than your instincts suggest." The severity of auth failures is disproportionate to how mundane the code looks.

**The agent's willingness to help is not evidence that you should accept the help.** Agents are infinitely willing. They'll generate anything you ask for, with confidence, whether or not it's a good idea. The judgment about when to accept generated code, when to push back, and when to write it yourself -- that's on you at every level.

**These levels aren't fixed.** The whole point of having different workflows is that you're supposed to graduate from one to the next. The intern who follows the tutoring workflow rigorously will build the intuition to work at the mid-level workflow within months, not years. The mid-level dev who takes the learning log seriously will develop the architectural instincts that make the senior workflow effective. The agent accelerates that progression, but only if you're actually engaging with the work, not just outsourcing it.

---

## Closing Thought

The best use of AI agents isn't building software faster. It's building software at the appropriate speed for your current level of understanding (your mix of **active** and **passive knowledge**) with a deliberate ramp toward building it faster as you grow. The agent meets you where you are, but you have to be honest about where that is.

