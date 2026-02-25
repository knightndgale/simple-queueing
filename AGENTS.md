# AGENTS.md

## Cursor Cloud specific instructions

**Simple Queuing** is a client-side-only React SPA (no backend). All state lives in browser localStorage via Zustand.

### Services

| Service | Command | Port |
|---------|---------|------|
| Vite dev server | `npm run dev` | 5173 |

### Available scripts

See `package.json` scripts and `README.md` for full list. Key commands:

- `npm run dev` — start dev server
- `npm run build` — TypeScript check + production build
- `npm run lint` — ESLint (note: `.eslintrc` config file is missing from the repo; lint will fail until one is added)

### Known issues

- The ESLint config file (`.eslintrc.cjs` or similar) is not committed to the repo. Running `npm run lint` fails with "ESLint couldn't find a configuration file." TypeScript type checking (`tsc --noEmit`) works fine and can be used as an alternative code quality check.
