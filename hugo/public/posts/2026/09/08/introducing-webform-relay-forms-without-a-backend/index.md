# Introducing webform relay; forms without a backend

| key | value |
| --- | --- |
| url | https://www.frobiovox.com/posts/2026/09/08/introducing-webform-relay-forms-without-a-backend/ |
| date | 2026-09-08 |
| tags | open source, web development, tutorial, frontpage |
| description | A serverless form handler for static sites. Point a form at a URL, and it validates the submission and relays it to SES, SMTP, a webhook, or Salesforce Web2Lead. One YAML file, no application code. |


A static site is a wonderful thing right up until somebody asks for a contact form.

Everything else about the static site story holds together. Content in markdown, build in CI, files on a CDN, no server to patch, no database to back up, no PHP version to worry about at 2am. Then one form shows up and suddenly the answer is "well, we'll need a backend." Not a big backend. A backend that accepts a POST, validates four fields, and sends an email. And now you own a server, or a container, or a runtime version, or a third-party SaaS that will start charging per submission the moment anyone actually uses the thing.

I have watched this play out enough times. The form is never the interesting part of the project and it is always the part that drags a whole hosting story behind it. In other words I have written this form enough times and enough ways that I don't want to have to write it again. I know everything that it needs to do, in every variation. I kind of miss [Drupal's webform module](https://www.drupal.org/project/webform) but I cannot use that on a static site.

So I wrote [webform relay](https://gitlab.com/frob/webform-relay). Point a `<form>` at a URL, and it validates the submission and relays it to wherever it needs to go -- email through SES, a plain SMTP server, a generic webhook, or Salesforce Web2Lead. There is no application code to write. There is no server. There is one YAML file. I even threw in some form conditionals and static content printing through htmx.

## The whole configuration

This is a working config. Not a fragment, not pseudo-config -- this is the file:

```yaml
# webform.yaml
cache_ttl: 30s

forms:
  contact:
    fields:
      - name: name
        required: true
      - name: email
        required: true
        type: email
      - name: message
        required: true
        type: textarea
    outputs:
      - type: email
        to: you@example.com
        subject: "New contact form submission"
        mapping:
          from_name: name
          from_email: email
          body: message
```

`fields` is what the form accepts and what gets validated. `outputs` is where it goes. `mapping` renames form fields into whatever the destination calls them, and an output sends *only* what the mapping lists -- nothing gets passed through implicitly.

That file lives in S3, not in the deployment. Change it, upload it, and the running function picks it up within `cache_ttl`. Adding a field or a second recipient is a file upload, not a redeploy. That decision drove more of the design than anything else, because the point of the whole exercise is to not think about the form again after you build it.

## What it does

The config file above is the minimum. The rest of the surface, since the list of things it won't do further down is otherwise going to read as the longer list:

- **Four destination types.** `email` (SES), `smtp` (any server -- TLS mode picked from the port, 465 implicit, 587 STARTTLS, minimum TLS 1.2, PLAIN auth when a username is set), `http_post` (a generic url-encoded webhook), and `salesforce_web2lead`.
- **Fan-out.** Outputs are a list and all of them run on every submission. Per-output `on_error: fail | continue` decides whether a dead downstream takes the whole request down with it or just gets logged.
- **Field mapping and static values.** `mapping` renames form fields into whatever the destination calls them; `static` injects fixed values like a Salesforce org id or a `lead_source`. An output sends only what those two list.
- **A real field model.** `text`, `textarea`, `email`, `url`, `tel`, `number`, `date`, `select`, `radios`, `checkboxes`, `checkbox`, `hidden`, plus a non-input `html` type for static content between fields. Labels, help text, hints, placeholders, defaults, `autocomplete`, arbitrary extra attributes, and `prefix`/`suffix`/`wrapper` for when your CSS framework wants markup around the input.
- **Server-side validation.** `min_length`, `max_length`, `min`, `max`, `step`, `pattern` (RE2), `one_of`, `min_selected`, `max_selected`, `matches_field`, `differs_from` -- with a per-constraint `messages` block when the default wording is wrong for your form.
- **Multi-value fields that survive the trip.** Checkbox groups and multi-selects stay multi-valued through validation, mapping, and every output type. Webhooks get the repeated key, email gets one line per value.
- **Conditional fields.** `show_when` shows or hides any field based on another field's value (`equals`, `one_of`, `filled`, `empty`, and friends, combinable with `all`/`any`), evaluated server-side and re-rendered live over htmx. Hidden fields collapse to a value-preserving `<input type="hidden">` and skip validation.
- **Strict parsing.** Unknown or misspelled config keys are a hard error at load, not a silently ignored line. Typing `requried` fails immediately instead of at 4pm on a Friday.
- **Templating in output values.** `{{ .fields.email }}` in a subject line, `{{ env "SMTP_PASSWORD" }}` for a secret out of the Lambda environment. Locked to a small function whitelist, and the syntax is checked when the config loads rather than when a submission arrives. URLs are never templated.
- **Accessible generated markup.** `task generate:form FORM=contact` or `GET /api/v1/form/{form}` renders the field model to HTML with every control labelled, `fieldset`/`legend` around option groups, and `aria-describedby` wiring. The form you serve and the form the server validates come from one definition.
- **htmx-native responses.** `HX-Request` gets HTML fragments -- confirmation on success, or the form re-rendered with inline errors, values intact, `aria-invalid` set. Everything else gets the same JSON it always got.
- **Three spam layers, all optional.** Honeypot field, the signed min-fill token, and server-side captcha verification for reCAPTCHA v2/v3, hCaptcha, or Turnstile.
- **CORS and throttling as deploy parameters.** `ALLOWED_ORIGINS` for browser reads, and stage throttling that defaults to 10 requests a second with a burst of 20 so a public endpoint can't run up a bill.
- **A CLI and a JSON Schema.** `webform-relay config validate`, `form list`, `form html`, and `form schema` -- which prints the schema so your editor can autocomplete the config file and yell at you before S3 ever sees it.

## Getting it running

It runs as a Go binary in a container on Lambda, behind API Gateway, deployed with SAM. Everything -- Go, the AWS CLI, SAM itself -- runs in Docker through the Taskfile, so the only things you install on the host are Docker and Task.

It is meant to be vendored into your own project rather than forked, using [v](/posts/2026/08/30/introducing-v-the-easiest-vendor-utility/):

```bash
v add https://gitlab.com/frob/webform-relay <tag>

task relay:tools:build       # build the SAM/AWS CLI tools image (once)
task relay:aws:bootstrap     # one-time: deploy IAM user + both S3 buckets
task relay:build:container
task relay:deploy:app
```

Then the config:

```bash
task relay:validate:config CONFIG=webform.yaml
task relay:upload:config CONFIG=webform.yaml
```

And the form. You can write it yourself:

```html
<form method="post" action="https://<api-id>.execute-api.<region>.amazonaws.com/api/v1/submit/contact">
  <input name="name" type="text">
  <input name="email" type="email">
  <textarea name="message"></textarea>
  <button type="submit">Send</button>
</form>
```

Or let it write the form for you from the same field definitions it validates against, so the two can't drift apart:

```bash
task generate:form FORM=contact
```

The generated markup is the accessible version -- every control labelled, `fieldset` and `legend` around option groups, `aria-describedby` wired to help text.

Test it:

```bash
curl -X POST \
  https://<api-id>.execute-api.<region>.amazonaws.com/api/v1/submit/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Jane&email=jane@example.com&message=Hello"
# → {"message":"ok"}
```

That's the loop. One YAML file, one deploy, no code.

## More than one destination

Outputs are a list, and every output on a form runs on every submission. The case that actually motivated this was a lead form that has to reach both a CRM and a human inbox:

```yaml
    outputs:
      - type: salesforce_web2lead
        url: https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8
        mapping:
          last_name: name
          email: email
          description: message
        static:
          oid: "00Dxxxxxxxxxxxxxxx"
          retURL: "https://yoursite.com/thank-you"
          lead_source: Website

      - type: email
        to: sales@yourcompany.com
        subject: "New lead from website"
```

Web2Lead is a public servlet that takes a url-encoded POST, so there are no Salesforce API credentials involved. It is a `http_post` with a different name and a note that says what it is for. `static` injects the fixed values -- your org id, the return URL, the lead source. The bonus here is validation and complex form elements, it's much easier when you control the form and then send it to Salesforce behind the scenes.

Each output takes an `on_error` of `fail` or `continue`, so a flaky webhook can be allowed to fail without taking the email with it.

## It speaks htmx

A plain form POST does a full page navigation, and for a lot of static sites that's fine -- you get a JSON body back, which is not fine, but that's what a `retURL` is for.

The better answer, if you're already on a static site, is [htmx](https://htmx.org). The relay is built for it, and the whole integration hangs off one rule: if the request carries `HX-Request: true`, which htmx sends on everything, the response is an HTML fragment instead of JSON. Every other client keeps getting the same JSON it always got, byte for byte.

The minimum version:

```html
<form hx-post="https://<relay-host>/api/v1/submit/contact"
      hx-target="#result" hx-target-error="#errors"
      hx-ext="response-targets">
  <!-- fields … -->
  <div id="errors"></div>
</form>
<div id="result"></div>
```

Three outcomes, three fragments:

- Success returns `<div class="form-confirmation">` with the form's `confirmation` message, which is a per-form config key and defaults to `Thank you.`
- A validation failure returns the **whole form, re-rendered** -- the submitter's values back in the boxes, each failing field's message inline in a `<p class="field-error">` wired up through `aria-invalid` and `aria-describedby`, and a fresh anti-spam token. Swap it over the original with `hx-swap="outerHTML"` and you have server-side validation that behaves like client-side validation, without writing any addtional Javascript.
- Anything else -- an expired token, a dead downstream -- returns `<ul class="form-errors">` with the messages, escaped.

The status codes are real, which is the part that bites people: validation is a `422`, an unknown form is a `404`. htmx only swaps `2xx` by default, so error fragments need the [`response-targets`](https://htmx.org/extensions/response-targets/) extension and an `hx-target-error`. That's the `hx-ext` line above.

You don't have to write the form at all, either. `GET /api/v1/form/{form}` serves the whole thing as a fragment, so the page can be a hole:

```html
<div hx-get="https://<relay-host>/api/v1/form/contact"
     hx-trigger="load" hx-swap="innerHTML"></div>
```

That endpoint reads current values from the query string, so it repopulates and re-evaluates conditional visibility on every render. Which is what makes `show_when` work without any JavaScript of my own: when a field controls another field's visibility, the relay emits the re-render attributes onto the controller itself --

```html
hx-get="…/api/v1/form/contact" hx-trigger="change"
hx-target="closest form" hx-swap="outerHTML" hx-include="closest form"
```

Changing it round-trips the form and gets back a version with the dependent fields shown or hidden. Server-rendered conditional forms, and the only client-side dependency is htmx itself.

If you'd rather own your markup and just need the token, `GET /api/v1/token/{form}` returns nothing but the hidden input:

```html
<input hx-get="https://<relay-host>/api/v1/token/contact"
       hx-trigger="load" hx-swap="outerHTML">
```

One deployment note. htmx sends `HX-Request` and friends, those are not CORS-simple headers, and a cross-origin request with them triggers a preflight. The `AllowHeaders` on the API already lists them, so this works out of the box -- but it's the reason that list exists, and if you ever hand-roll the CORS config, that's what you'll have broken.

## Spam, without a database

The obvious problem with a public endpoint is that it is a public endpoint. There are three layers, all optional.

The honeypot is the boring one: name a decoy field, and any submission that fills it gets dropped and receives the exact same `200 {"message":"ok"}` a real submission gets. There is no signal to learn from.

The one I like better is the min-fill token. When the form is rendered, the server mints an HMAC-signed timestamp bound to that form id and drops it in a hidden input. On submit, it checks how long the human took. Under the threshold, the submission is a bot, and it gets the same silent success. A genuinely stale page gets a distinct "form expired" response instead, because that one is a real person who left a tab open.

The part I care about is that this needs no storage. The signature is over `form_id` and `issued_at`, so verifying elapsed time takes no session, no table, no Redis. The function stays stateless, which is the entire reason it costs nothing when nobody is submitting.

It is also not what a captcha is, and the docs say so: the token isn't single-use, so with no server state it can be replayed until it expires. It raises the cost of automation. It is not proof of a human. For that there is a `captcha` block that verifies reCAPTCHA v2/v3, hCaptcha, or Turnstile server-side before anything gets relayed.

## Two common gotchas worth pointing out

Both of these were surfaced the first time somebody ran the deploy path end to end on a fresh account.

The deploy user's IAM policy was applied as an inline user policy. Inline user policies cap at 2048 bytes. The rendered policy is about 3.4KB, which means it had been over the limit for as long as it had existed, and `task aws:bootstrap-user` failed with `LimitExceeded: Maximum policy size of 2048 bytes exceeded`. The fix was a customer-managed policy instead -- 6144 bytes, and versioned, which brings its own wrinkle since a managed policy holds five versions and then refuses new ones, so the update path prunes before it writes.

The other one is `ALLOWED_ORIGINS`. API Gateway wants full origins. Give it a bare hostname, a trailing slash, or a space after a comma and it rejects the value with `Invalid format for origin` -- but only while CloudFormation is in the middle of creating the HTTP API, several minutes in, leaving a `ROLLBACK_COMPLETE` stack that has to be torn down before you can try again. There is now a one-line precondition on `task deploy:app` that checks each entry against `^(\*|https?://[^/[:space:]]+)$` and fails in about a second. Very little of that work was clever. It just moved a failure from four minutes and a manual teardown to instantly, which is most of what deploy tooling is for.

A related note on CORS, since it confuses people: `ALLOWED_ORIGINS` controls who may *read the response* from a browser. A plain HTML form POST isn't subject to CORS at all and works no matter what you set. It only matters if you're submitting with `fetch`.

## What it doesn't do

- **No file uploads.** Submissions are `application/x-www-form-urlencoded` only. No multipart, no attachments, and that is a deliberate non-goal rather than a todo.
- **No durability on failure.** If a required output hard-fails -- SES throttles you, the webhook is down -- the endpoint returns a 500 and the submission is gone. There is no queue and no retry yet. This is the top item for 0.4.x and there is a design doc weighing SQS-and-worker against an S3 spool, but it is not built, and I would rather say that plainly than let someone find out during a product launch.
- **No per-IP rate limiting.** There is stage-level throttling at 10 requests a second with a burst of 20, which caps your bill. It does not stop one abusive address from eating the whole budget. Per-IP means WAF, WAF is about five dollars a month before requests, and I have not decided that is worth it by default.
- **Secrets sit in the config file.** An SMTP password or a captcha secret in `webform.yaml` is plaintext in your S3 bucket. There's a `{{ env "NAME" }}` template function to pull them from the Lambda environment instead, which is what I'd use, but there is no first-class Secrets Manager integration.
- **No dashboard.** There is nowhere to browse what has been submitted. There's an optional second stack that archives raw submissions to a private bucket through a Lambda-free API Gateway to S3 proxy, and some tasks to read them back, and that is the entire story. The Dashboard is another app. Though it is on the roadmap to add a csv export to the S3 proxy.

## Is this for you?

If you already run a backend, no. Add a route. You have all the machinery. Drupal has the fantasic [webform](https://www.drupal.org/project/webform) and I got a good deal of inspiration there when building this.

If you're on a host that includes forms in the price and you're happy with it, and you don't need complex submission handling, also no.

But if you have a static site, or a Go binary, or a game's landing page, or anything else where the form is the only thing standing between you and having no server at all -- this is the smallest, robust, version of that I could build. One YAML file in a bucket. No idle cost. No runtime to keep patched.

It's at [gitlab.com/frob/webform-relay](https://gitlab.com/frob/webform-relay), AGPLv3 licensed, with the docs published from the same repo. It is not on GitHub, which I mention because I recently had to change all the docs pages where the GenAI decieded to link to github --alas, that is what writing software looks like in 2026.

