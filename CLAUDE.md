# Dr Adonis Panagidis Dental Center — instructions for Claude

Private preview of a clinic website (Astro, static; English at `/`, Greek under `/el/`). Netlify builds `panagides-dental-center.netlify.app` from `main` (`npm run build`, publishes `dist/`). The July 2026 single-page version is kept in `legacy/` for reference.

## Ground rules

- Work on a branch and open a pull request. Never merge into `main` without the owner's explicit OK.
- Facts live in `src/data/` (`site.ts`, `treatments.ts`, `cases.ts`, `blog.json`); interface copy in `src/data/ui.ts`. Every fact is in `docs/facts-ledger.md` with its source; open items are in `docs/content-gaps.md`.
- Don't invent clinical facts, prices, credentials, reviews or results. Never call Dr Panagidis a specialist or implantologist; his implantology training is a course certificate (Curriculum Implantology, University of Cologne).
- Every change ships in English and Greek.
- Keep the preview lockdown until the clinic approves: robots meta in `src/layouts/Layout.astro`, the `X-Robots-Tag` header in `netlify.toml`, and `public/robots.txt`.
- Photos: `scripts/process-images.py` makes the web versions; `scripts/import-blog.py` re-imports the clinic's blog.
- Explain changes to the owner in plain, non-technical language.

## Front-end design workflow

Project skills live in `.claude/skills/` (sources, pinned versions and licences: `.claude/THIRD_PARTY_SKILLS.md`). Use exactly one owner per stage:

| Stage | Use |
| --- | --- |
| Clinic standards (evidence, page structure, QA gates) | `premium-clinic-website-playbook` (from the owner's claude.ai account). It is the brief; the skills below serve it. |
| Visual direction | `frontend-design` |
| Palette / type / UX-rule lookups | `ui-ux-pro-max` (`python3 .claude/skills/ui-ux-pro-max/scripts/search.py …`); reference data, not the art direction |
| Motion | `find-animation-opportunities` → `emil-design-eng` → `review-animations`, `animation-performance` |
| Mobile feel | `mobile-native` at the 390 px stage |
| Critique, audit, polish | `impeccable` (`critique`, `audit`, `polish`); `break-ui` for worst-case content (long Greek words); `redesign-existing-projects` only as a checklist |
| New UI libraries | Only after the owner runs `/pick-ui-library` and approves |

Rules:

- Judge design from the rendered page at 390, 768 and 1280 px, in English and Greek, not from source alone.
- Keep the brand colours (slate `#344a5e`, cyan `#00a1c3`, from the clinic logo) and the type (Piazzolla + IBM Plex Sans) in `src/styles/global.css` unless a change is approved.
- Respect `prefers-reduced-motion`; content must be visible without JavaScript. Never rely on colour alone to carry meaning.
- Impeccable telemetry is off (`.impeccable/config.json`). Keep it off.
