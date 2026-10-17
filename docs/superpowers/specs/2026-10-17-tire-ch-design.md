# TIRE CH design

## Goal
A delightful original mobile-first virtual pet where a tire becomes a car through time and care. Collection persistence makes different personalities worth exploring across generations.

## Approach
Use dependency-free browser JavaScript and original layered SVG instead of a heavy 3D engine. The fixed garage is clear and touch-friendly; additive parts remain recognizable at every stage. Nine final cars combine sport/luxury/adventure with three care ranks.

## Rules
Growth thresholds: 90,300,900,2700 seconds. Snack adds60 seconds with60second cooldown. Other care cooldown8seconds. Personality route determined by drive/wash/explore totals, ties sport then luxury then adventure. Final rank1 by default,rank2 sevencare actions,rank3 eighteencare actions and no breakdown. Final form is locked at final evolution.

Neglect reduces condition; lowneeds drain health and zerohealth immobilizes growth. Repair free, collection retained. Finishing enables newgeneration which preserves collection. Offline computation capped7days, clock backwards no gain.

## Architecture and safeguards
Pure model/time functions separate from UI/SVG. Save validated and numeric fields bounded. Storage errors visible; export/import backup available with replacement confirmation. Sound opt-in and reduced effects available. No thirdparty assets, private data, credentials, payments or backend.

## Acceptance
Desktop/mobile browser actual play, care cooldown, initial evolution, personality branching, offline restore/breakdown/repair, collection retention, save failures, responsive layout and no JS errors. Independent play review precedes release.
