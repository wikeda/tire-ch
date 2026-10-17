# TIRE CH 2 — final verification

Published game: https://wikeda.github.io/tire-ch/v2/

The original v1 remains at https://wikeda.github.io/tire-ch/ and on the `v1-archive` branch. The root URL was **not** promoted to v2.

## Evidence
- Live runtime commit: `818b47bfdcb1155c6dbae261a6d92677486cce77`.
- Live-commit CI: https://github.com/wikeda/tire-ch/actions/runs/39054884952 — 56 model tests and 56 desktop/Pixel7-emulated browser tests passed.
- Additional release-candidate CI: https://github.com/wikeda/tire-ch/actions/runs/39055373375 — static build, 56 model tests and 62 browser tests passed. Candidate `73dc6894cbafeb1bd8c5d7a4f4404a987af1272e` includes optional root promotion/archive packaging which was not merged.
- All eight v2 runtime files have identical Git blob hashes in the live commit and tested candidate: index.html, style.css, style2.css, src/app2.js, src/engine2.js, src/storage2.js, src/art.js, src/art2.js.
- Independent final smoke at the exact public v2 URL passed on 2026-10-17 at 17:52–17:53 UTC: collection retention, care, keyboard journey/early return, reload, diary, best timing score and honest adult reward previews.
- Twenty-five actual focused gameplay episodes are documented in [the playtest ledger](playtest-ledger.md). Automated tests are separate, not counted as gameplay episodes.
- Actual CI desktop/mobile full-page screenshots and the twelve-form gallery were downloaded and visually inspected. No physical-phone testing is claimed.

## Scope and remaining limits
The care-only middle remains intentionally calm, and repeated trips expose a small story pool. Cloud input latency limits conclusions about reflex difficulty. Web Locks serializes saves on supported browsers; fallback browsers have compare-before-write protection but not an atomic multi-tab transaction. The interrupted hands-on import attempt was not counted as passed; separate synthetic browser import and backup-failure tests passed. No analytics, accounts, payments, or backend were added.

The candidate branch retains the fixed static build packaging and optional root-routing changes. Live GitHub Pages serves the repository directly; the live game runtime is complete and independently smoke-tested at `/v2/`.
