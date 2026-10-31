# AWS is updating Lambda

| key | value |
| --- | --- |
| url | http://localhost:1313/posts/2026/10/25/aws-is-updating-lambda/ |
| date | 2026-10-25 |
| tags | software development, web development, open source, frontpage |
| description | AWS keeps adding new ways to run Lambda at scale. Most of the hidden-cost stories that justify them are really stories about architecture nobody priced per user, not about Lambda, and Managed Instances is doing something cannier than it looks. |


Lambda is getting some well-deserved attention with some new updates. It's one of my favorite AWS services, so I'm pretty interested to see how all these changes can be utilized.

On top of the classic one-event-at-a-time function, AWS is now shipping:

- **[Web Functions](https://aws.amazon.com/blogs/aws/announcing-aws-lambda-web-functions-for-fast-consistent-web-app-performance-anywhere/).** A real HTTP server, multi-concurrency, billed for active CPU instead of wall-clock.
- **[MicroVMs](https://aws.amazon.com/blogs/aws/run-isolated-sandboxes-with-full-lifecycle-control-aws-lambda-introduces-microvms/).** Stateful sandboxes that suspend and resume for hours, with full disk and your own Dockerfile.
- **[Durable Functions](https://aws.amazon.com/about-aws/whats-new/2025/12/lambda-durable-multi-step-applications-ai-workflows/).** Checkpointed workflows that can run for a year.
- **[Managed Instances](https://aws.amazon.com/about-aws/whats-new/2025/11/aws-lambda-managed-instances/).** Lambda's developer experience, but on dedicated EC2 in your own VPC with 90-minute timeouts and Savings Plans attached.

It's a real pile of new capability, and most of it is aimed squarely at a story I've heard a hundred times: a company builds on Lambda, picks up actual customers, discovers those customers have outpaced the free tier, and realizes nobody ever worked out what this product costs per user. Then they spend a quarter re-architecting to find out before the bill decides for them.

That surprise bill is usually called a hidden cost of serverless. I think it's being blamed on the wrong thing.

## The hidden cost isn't a Lambda problem

Nobody gets surprised by an EC2 bill the same way. You provision a box, you know roughly what it costs, and if it's too small you resize it. There's no story where EC2 "forces a rewrite" at scale. Lambda bills get called a hidden cost specifically because people built as if the pricing model didn't apply to them, and it was always going to apply to them.

If your function is doing what Lambda is for -- validate a request, call one thing, return -- the bill scales the way you'd expect, because the work scales the way you'd expect. The surprise shows up when the function is holding a connection open, polling something, or sitting there burning wall-clock while it waits on an upstream call that has nothing to do with CPU. That's not Lambda being expensive. That's a design that was never actually serverless-shaped, running on serverless pricing, with the free tier hiding that fact for exactly as long as the free tier covers your usage. Scale erases the subsidy and the architecture shows up for the first time. "It worked fine on the free tier" was never a verdict on the design, and "it's basically free per user" was never a number anyone actually checked. The design hadn't been load-tested, and the cost hadn't been priced, until an actual customer base did both at once.

I built [webform relay](/posts/2026/09/08/introducing-webform-relay-forms-without-a-backend/) around that pricing model instead of in spite of it. It's a serverless form handler for static sites: point a `<form>` at it, and it validates the submission and relays it to email, SMTP, a webhook, or Salesforce, all configured from one YAML file with no application code to write. One container image, `MemorySize: 128`, `Timeout: 25`. No session, no cache, no background anything. The config lives in S3, not in the deployment, so changing a form field is an upload, not a redeploy. The anti-spam check is an HMAC-signed timestamp with no storage behind it at all, because the entire economic case for the thing is that it costs nothing when nobody's submitting, and anything stateful breaks that immediately. There's no surprise waiting at the end of that road, because nothing about the design counts on being forgiven by cheap pricing later.

[Daily Breadle](https://dailybreadle.com), a daily Bible verse scramble game, is the busier of the two. A generator function picks the day's verse on a cron and fires an event; a builder function renders the Hugo site and pushes it to S3; a separate pair of functions handle the newsletter. Four functions, an event bus, two dead-letter queues so a dropped retry is something I can see instead of something that silently didn't happen. The most expensive thing in the whole stack gets `MemorySize: 2048` and `Timeout: 300`, five minutes, once a day. That's the ceiling for the entire project. None of it needed more room than classic Lambda already gives you, because none of it was ever asked to do more than classic Lambda is for.

## Paving the cowpath out of serverless

Here's where Managed Instances gets interesting, and it's worth looking past the marketing to see what it's actually doing.

Before Managed Instances, the moment a team decided Lambda's pricing model didn't fit their workload anymore, "move off Lambda" meant starting over. Containerize the function properly instead of letting SAM paper over it. Stand up an ECS or EKS cluster, or a fleet of EC2 instances, and own the autoscaling yourself. Redo the networking: security groups and subnets instead of a VPC config block. Rewrite the IAM from a function's execution role to instance roles and task roles. Replace the whole deploy pipeline, because `sam deploy` isn't the tool for any of what you just built. None of that work is really about the code. It's plumbing, and it's the kind of plumbing that takes a quarter and touches everything.

That cliff was the real danger for AWS, and not just because of the migration cost. The moment a team is already tearing out the deploy pipeline, the networking, and the IAM to leave Lambda, there's nothing stopping them from doing that work on a different cloud entirely. If you're rebuilding everything anyway, rebuilding it on GCP costs about the same as rebuilding it on AWS.

Managed Instances erases that cliff. Same SAM template, same event sources, same console; the only thing that changes is which capacity it runs on underneath. That's AWS paving the cowpath: noticing that everyone who outgrows Lambda walks the same worn path to EC2 or EKS, and laying a much smoother road right next to it that happens to stay inside Lambda's tooling and inside AWS. It's a genuinely less painful migration for whoever's doing it. It also removes the moment someone would have reconsidered their whole cloud, which is exactly the point. This is less a fix for the hidden cost than a way of making sure outgrowing Lambda never becomes a reason to leave AWS.

## The CPU-idle problem is real, and it's new

Where the new stuff is honestly solving something, rather than patching around bad planning, is Web Functions and its active-CPU billing. In 2014, when Lambda shipped, waiting fifteen seconds for an upstream response while doing nothing wasn't a common shape of workload. Lambda was priced for short, bursty, mostly-CPU-bound work, because that's what event-driven glue code looked like at the time. Billing wall-clock and billing CPU were close enough to the same thing that nobody needed to tell them apart.

Streaming a response while an LLM decodes tokens for twenty-five seconds breaks that assumption completely. You're paying full price for a function that's 99.9% idle, and no amount of good architecture fixes that, because the pricing model itself doesn't match the workload anymore. That one isn't a hidden cost from bad design. It's Lambda catching up to a workload it was never built to price, and it's a legitimately nice thing to see solved rather than worked around.

MicroVMs are in the same honest category, and the one I'd actually reach for myself. I plan on expanding [ztd](/posts/2026/09/10/introducing-ztd-disposable-vms-for-untrusted-agent-work/) to support Firecracker directly, not just the EC2 backend it has today, and Lambda's MicroVM primitive is exactly the kind of managed Firecracker surface that makes doing that on AWS worth it, instead of rolling my own.

## Still just a function

None of that changes what I reach for when I sit down to build a form handler or a cron job. Serverless has always meant someone else's computer, and the deal was always: you get to not think about the computer, in exchange for working inside the shape it's good at. Web Functions and MicroVMs are AWS extending that deal to workloads that genuinely didn't fit the old shape. They're not a refund for the ones that never should have been built to need it.

