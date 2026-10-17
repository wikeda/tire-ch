# TIRE CH 2 — development preview

A tiny tire grows through time, care and short road stories into an unexpected vehicle. All artwork is original SVG. No accounts, payments, analytics or backend.

The stable v1 game at the repository root remains unchanged during this preview. The original localStorage key (`tire-ch-v1`) is preserved; v2 uses its own key. `v1/` inside this preview is a playable archive.

## Play loop
- Natural assembly milestones: 35, 100, 210 and 360 seconds.
- Care responds to context. Repeated overfeeding or polishing can lead to strange discoveries.
- Snacks add 25 growth and 24 heat; excessive heat damages the pet. Rest cools it.
- Road outings have six choices with visible consequences. Forest and ridge have distinct stories and terrain costs. Rapid consecutive decisions add heat and energy costs instead of disabling input.
- Adult form and rank lock on discovery. Twelve distinct shapes remain hidden until found; the collection and best ranks survive generations.
- Manual recovery is always available. Spending five parts restores a stronger condition.
- Long absence is bounded and does not kill the pet. Save export/import is local to the browser. Failed backups and stale tabs are protected against overwrites; supported browsers serialize saves with Web Locks.

## Verification
`node --test tests/*.test.js v2/tests/*.test.js` from repository root runs model tests. GitHub Actions runs desktop and Pixel 7–emulated browser regression tests. Those tests are **not** counted as independent gameplay sessions.

The independent playtest ledger is `docs/playtest-ledger.md`. It records actual UI interactions, findings, changes and retests. Development continues until the requested playtest cycle is complete; this preview is not a finished-release claim.
