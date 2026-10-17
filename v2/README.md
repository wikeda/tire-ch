# TIRE CH 2 — runtime

A tiny tire grows through time, care and short road stories into an unexpected vehicle. All artwork is original SVG. No accounts, payments, analytics or backend.

The production root and this path load the same v2 runtime. Original v1 remains playable at `/v1/`. The original localStorage key (`tire-ch-v1`) is preserved; v2 uses its own key. `v1/` inside this preview is a playable archive.

## Play loop
- Natural assembly milestones: 35, 100, 210 and 360 seconds.
- Care responds to context. Repeated overfeeding or polishing can lead to strange discoveries.
- Snacks add 25 growth and 24 heat; excessive heat damages the pet. Rest cools it.
- Road outings have six choices with visible consequences. Forest and ridge have distinct stories and terrain costs. Rapid consecutive decisions add heat and energy costs instead of disabling input.
- Adult form and rank lock on discovery. Twelve distinct shapes remain hidden until found; the collection and best ranks survive generations.
- Optional three-tap timing practice costs energy; misses add heat, good runs earn modest growth and parts. Slow mode widens the target; care-only play remains viable.
- Stars describe the journey record, not whether a form is a good or bad outcome.
- Manual wire-sequence recovery is always available. Spending five parts restores a stronger condition.
- Long absence is bounded and does not kill the pet. Save export/import is local to the browser. Failed backups and stale tabs are protected against overwrites; supported browsers serialize saves with Web Locks.

## Verification
`node --test tests/*.test.js v2/tests/*.test.js` from repository root runs model tests. GitHub Actions runs desktop and Pixel 7–emulated browser regression tests. Those tests are **not** counted as independent gameplay sessions.

The independent playtest ledger is `docs/playtest-ledger.md`. It records actual UI interactions, findings, changes and retests. Twenty-five focused independent UI play episodes are documented, including a strict six-minute natural-growth generation. These are not twenty-five full generations. See the ledger for evidence limits.
