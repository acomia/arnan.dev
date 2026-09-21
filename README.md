# arnan.dev

Personal developer portfolio for Arnan Comia — frontend developer working in
React Native and Next.js.

## Status

Scaffolded. Framework, tooling and the static export pipeline are in place;
site content and layout are not built yet.

## Stack

- **Next.js 16** (App Router) with `output: "export"` — a fully static build
- **React 19**
- **TypeScript**, strict
- **Tailwind CSS 4**
- **ESLint** via `eslint-config-next`
- **pnpm**

Resume content will live in typed modules under `src/content/` rather than
inline in components, so updating the site after a new role means editing one
array.

## Hosting

Cloudflare Pages, serving the static `out/` directory. Build command
`pnpm build`, output directory `out`. No server runtime required, which is why
the image optimizer is disabled in `next.config.ts`.

## Local development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static export to out/
pnpm lint
```

To preview the production build exactly as it will be served:

```bash
pnpm build && npx serve out
```

## Links

- GitHub: [@acomia](https://github.com/acomia)
- LinkedIn: [arnan-comia](https://www.linkedin.com/in/arnan-comia)
