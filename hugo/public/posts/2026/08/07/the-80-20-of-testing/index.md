# The 80/20 of Testing: Why End-to-End Tests Cost the Most and Matter the Most

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2026/08/07/the-80-20-of-testing/ |
| date | 2026-08-07 |
| tags | testing, software development |


Most of the tests you write should be unit and integration tests. Call it 80% of the suite. The remaining 20% is end-to-end -- the tests that drive the real system the way a real user does. That 20% will eat 80% of your testing effort, and it is the part you can least afford to skip.

That is not a failure of planning. It is the shape of the work.

## Why the bulk is cheap

Unit tests are cheap because they lie to you on purpose. You isolate a function, hand it fabricated inputs, and assert on its output. No network, no database, no clock, no filesystem. They run in milliseconds, they fail with a precise line number, and when one breaks you know exactly which change broke it.

Integration tests are a little more expensive -- a real database, a real HTTP handler, maybe a container or two -- but they are still operating inside a world you control. You decide what is in the database. You decide what the upstream service returns. Setup is a fixture, teardown is a truncate.

Because they are cheap, you write a lot of them, and you should. They are where you cover the combinatorics: the null case, the empty list, the off-by-one, the timezone that ruins everything, the malformed payload. Trying to cover that surface end-to-end would be absurd. Nobody wants to boot a browser to find out that a date parser mishandles February 29th.

So the pyramid holds. Wide base of fast, narrow tests. Thin cap of slow, wide ones.

## Why the cap is expensive

Then you get to end-to-end, and every convenience you relied on disappears.

You need the whole system running -- every service, every dependency, in something resembling the shape it takes in production. You need seeded data that is realistic enough to be meaningful and stable enough to assert against. You need authentication, because real users log in. You need to deal with time, because real systems have sessions and expirations and background jobs.

Then you need the test itself to be reliable, which is where most of the effort actually goes. An end-to-end test is a distributed systems problem wearing a test's clothing. The button is there but not yet clickable. The API responded but the UI has not re-rendered. The job is queued but has not run. Every one of those is a race, and every race is a future flaky failure. Writing the assertion takes ten minutes. Making it pass a thousand times in a row takes a week.

And when it does fail, it tells you almost nothing. "Expected the order confirmation page, got the cart page." Somewhere in fifteen thousand lines of code across four services, something went wrong. Go find it. Compare that to a unit test failure, which points at a function and a line.

Then add the maintenance. Someone renames a CSS class and thirty tests break. Someone adds a required field to signup and every test that creates a user breaks. Someone changes a redirect and the whole suite falls over. None of these are real bugs, and all of them cost you an afternoon.

That is the 80%. Not writing the tests. Owning them.

## Why it is worth it anyway

Here is the thing that justifies all of it: your unit tests can be 100% green while your product is completely broken.

This is not a hypothetical. It is the normal case. Every unit passes because every unit is correct in isolation. Every integration test passes because each pair of components agrees. And the login flow is still broken, because the session cookie is set with a `SameSite` policy that the redirect from your identity provider does not survive. No unit owns that bug. No integration test spans it. It lives in the gaps.

End-to-end tests are the only tests that exercise the gaps. They are the only tests that touch:

- **Configuration.** Environment variables, feature flags, connection strings, TLS settings. Unit tests mock all of this away. Production does not.
- **Wiring.** The dependency injection container, the route table, the middleware order. A route registered twice, a middleware in the wrong position -- invisible to everything below.
- **The browser.** The bundle that failed to build, the JavaScript error that blanks the page, the CSS that puts the submit button behind a modal overlay.
- **Real sequences.** Users do not call one endpoint. They sign up, verify an email, log in, add to cart, apply a coupon, pay, and get a receipt. The bugs are in the transitions between steps.
- **Your assumptions about your own mocks.** Every mock is a claim about how a dependency behaves. End-to-end tests are where you find out the claim was wrong.

And there is a value that has nothing to do with catching bugs: an end-to-end test is the only test that a non-engineer can believe. When you tell a stakeholder "checkout works," a passing unit test is a statement about a function. A passing end-to-end test is a recording of a purchase actually being made. One of those ends the conversation.

## What to do with this

The practical implication is not "write more end-to-end tests." It is: budget for the ones you have, and be ruthless about which ones you keep.

**Pick the paths that pay rent.** For most products that is three to ten flows: sign up, log in, the core action the product exists to perform, and the flow that takes money. If a flow being broken for an hour would generate phone calls, it belongs in the 20%. If it would generate a ticket, push it down the pyramid.

**Treat the harness as a product.** The seeded data, the auth helper, the wait-for-idle utility, the page objects -- this is infrastructure. If it is a pile of copy-pasted selectors, your 80% of effort becomes 95%. Give it the same review standards as shipping code.

**Never sleep, always wait for a condition.** Every fixed sleep in an end-to-end suite is a flake with a delay fuse. Wait for the element, the network to settle, the job queue to drain. Ban the arbitrary timeout in review.

**Delete flaky tests you will not fix.** A test that fails 5% of the time for no reason is worse than no test, because it teaches the team to re-run the build instead of reading the failure. Once people click "retry" reflexively, the whole suite has stopped meaning anything. Fix it or cut it.

**Push discoveries down.** When an end-to-end test catches a real bug, that is a signal about a gap in your cheap tests. Fix the bug, then write the unit or integration test that would have caught it. End-to-end tests find the class of problem; the layers below should catch the next instance of it.

The 80/20 split is not a target to optimize away. The cheap tests give you the coverage. The expensive ones give you the confidence. You need both, and you should stop being surprised that the small half is the hard half.

