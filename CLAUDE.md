@AGENTS.md

# arnan.dev

Arnan Comia's personal developer portfolio. Its job is to let a hiring manager
understand him in about thirty seconds, and to let a technical interviewer dig
deeper from there. Optimise for that, not for showing off the framework.

## Commands

```bash
pnpm dev      # dev server on :3000
pnpm build    # static export to out/
pnpm lint
npx tsc --noEmit
npx serve out # preview the production build as it will actually be served
```

## Architecture

Next.js 16 App Router with `output: "export"` — a **fully static** build. There
is no server at runtime, so no route handlers, no server actions, no middleware,
no `next/image` optimizer, and no runtime environment variables. Anything that
needs a server needs a different hosting plan first.

Deployed to Cloudflare Pages from `out/`.

### Content layer

All resume content lives in typed modules under `src/content/` and is imported
through the `./content` barrel. **Components never hardcode content.** Adding a
role or a project is a data edit; if it requires touching a component, the
component's props are wrong.

- Dates are stored as `YYYY-MM` (or `YYYY` for education) and formatted by
  `src/content/format.ts`. Never store a pre-formatted date string.
- Never call `new Date("2026-07")` on these values — it is parsed as UTC and
  renders as the previous month in Philippine time. Use the helpers.
- Durations are computed, never written down, so the site does not go stale.
- `Project.image` is optional on purpose: no screenshots exist yet. Layouts
  must reserve the space so images drop in later as a content change.

## Design

Use the `impeccable` skill for all design and frontend work — layout, visual
hierarchy, typography, spacing, colour, motion, responsive behaviour,
accessibility and UX copy. Invoke it *before* writing component markup or
styles, so the visual system is deliberate rather than default-Tailwind.
Content and data-layer work does not need it.

Performance is a feature here: a recruiter opening this on a phone should not
wait for animation. Target Lighthouse Performance ≥ 95 and Accessibility 100.

## Constraints

**This repository is public.** Treat everything committed as published.

- **Never publish Arnan's phone number**, anywhere, including in any hosted
  PDF. It is on his resume; it must not reach the site.
- The public email is `arnancomia.dev@gmail.com`, rendered obfuscated rather
  than as a plain `mailto:` in markup. The address on the older resume is out
  of date.
- **Never invent metrics.** Arnan has no figures he can stand behind, so
  content describes scope and technical decisions instead. If a number would
  be persuasive, ask him for it rather than estimating one.
- Only list technologies that are verified — from a project's source where it
  is available locally, from the resume otherwise. Do not infer a stack from
  what a project of that kind probably used.
- Client work is described without repository links, client source, or client
  business figures.
- `portfolio-plan.md` is gitignored because it contains personal contact
  details. Keep it that way.
