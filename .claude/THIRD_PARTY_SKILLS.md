# Third-party skills in `.claude/`

Copied 20 October 2026 from `Tahiti18/route-discovery-platform` (`main` at `5b0bcea`, via `dental-art-nicosia`), design skills only; the Neon database skills were left out because this site has no database. Each folder keeps its upstream licence file. To update, re-copy from a newer upstream commit and update this table.

| Skill(s) | Upstream | Pinned commit / version | Licence | How installed |
| --- | --- | --- | --- | --- |
| `emil-design-eng`, `review-animations`, `animation-performance`, `find-animation-opportunities`, `break-ui`, `mobile-native`, `improve-animations`, `pick-ui-library` | https://github.com/emilkowalski/skills | `2d228630ba1446365f614a108cb8252f1feda202` | MIT | Folders copied unchanged |
| `ui-ux-pro-max` (core skill only, tests excluded) | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill | `56ea9cf174ed86786187daa9de0e6247cb0747e4` (v2.15.0 line) | MIT | Folder copied unchanged; scripts reviewed: stdlib only, no network, writes files only with `--persist` |
| `redesign-existing-projects` (upstream folder `skills/redesign-skill`, renamed to match its `name`) | https://github.com/Leonxlnx/taste-skill | `f624f37a8c650b9cc550253104925efe4c8de246` | MIT | `SKILL.md` copied unchanged; markdown only |
| `impeccable` skill + `.claude/agents/impeccable-*.md` | https://github.com/pbakaus/impeccable | `impeccable@4.6.0`, engine 0.1.15 (windows-x64) | Apache-2.0 | `npx impeccable@4.6.0 install --providers=claude --scope=project --yes`; telemetry off in `.impeccable/config.json` |
| `frontend-design` (added 20 October 2026) | https://github.com/anthropics/claude-plugins-official, plugin `frontend-design` (author: Anthropic) | Plugin version "unknown", installed on the laptop 3 August 2026. SHA-256: `SKILL.md` `1608ea77fbb6fc30d13a97d12cfa8ebf31358d40f0dd97beed24829d6b3f45dd`, `LICENSE.txt` `0d542e0c8804e39aa7f37eb00da5a762149dc682d7829451287e11b938e94594` | Apache-2.0 | `SKILL.md` and `LICENSE.txt` copied unchanged from the installed plugin, so cloud sessions, which can't see the laptop's plugins, have it. Markdown only. Where the plugin is also installed, the same skill shows twice (`frontend-design` and `frontend-design:frontend-design`); either is fine. |

**Local change:** `review-animations/SKILL.md` had `disable-model-invocation: true` (the upstream default) removed on 17 October 2026, at the user's request, so Claude can run it at the motion stage of the design workflow. Re-apply this after any update.

Impeccable also registers SessionStart, PostToolUse (Edit/Write) and Stop hooks in `.claude/settings.local.json`. That file is machine-local and not committed. Re-run the install command on another machine to get the hooks. Its engine binary (`scripts/bin/`) is gitignored and fetched on first run.
