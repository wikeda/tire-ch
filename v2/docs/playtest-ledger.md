# Independent TIRE CH 2 browser playtest ledger

A tester separate from the implementation agent played the actual rendered game through the cloud Chromium UI. The target is 25 focused gameplay episodes, not 25 complete generations. Model tests and CI browser tests are excluded from this count. No artificial clock changes or injected game state were used. Screenshots were inspected in browser-tool outputs; no persisted screenshot files are claimed.

## Episodes completed before environment replacement

### 1. First kindness journey — initial preview, 16:21–16:22 UTC
Started onboarding, fed the tire, and completed town choices: voices, leaf boat, escort, slow cruise, leave juice, sunset. Reached stage 2 with 0/12 discoveries. Leaf boat promised mood +8 but mood stayed 84 while parts rose 4→5; escort promised parts +2 but gave 5→6. Parent fixed reward calculations and versioned cached modules. Screenshot at 16:22:08 showed a clear layout, but stage 2 already resembled a complete car. Generic reactions weakened choices. Parent revised intermediate art and wrote specific outcomes. Opened and closed the fifth mystery hint without a spoiler.

### 2. Mixed forest journey — build 2.2, continued GEN 01
Splash, escort, sprint, mystery juice, souvenir, wind. Verified clean 79→61 and parts 11→13: reward fixes passed. Ended at stage 4, energy 47, clean 45, heat 34, health 100, parts 18. Found return-hill scene at step 5 followed by departure-fork scene at step 6, and forest stories identical to town. Parent fixed journey framing and route identity in 2.3; retested in episode 7.

### 3. Risky ridge and first discovery — build 2.2
Fuel plus one snack, then risky ridge choices: unknown road, sprint, juice, race, wind, splash. Heat 55→100, health 100→20, energy 22. Discovered submarine ★★ after approximately three real minutes with legitimate trip/snack bonuses. Screenshot at 16:24:06: the unusual submarine was genuinely delightful. Ridge was correctly disabled for low energy. Found final milestone still showed ??? after discovery, and high-heat damage was not forecast. Parent fixed both in 2.3; further live retest pending.

### 4. Adult breakdown and manual repair — build 2.2
Hot snack took health 20→0. Diagnosed, tightened bolts, restarted, then washed and rested. Ended at health 79, heat 0, energy 45, parts 23; collection and rank retained. Free three-click repair gave the same result as spending five parts, making the paid option unappealing. Adult repair copy incorrectly referred to paused growth. Parent improved parts repair to 100 health / 70 energy and fixed copy; live retest pending.

### 5. New generation and over-washing — build 2.2
Confirmed GEN 02; submarine ★★ remained in the collection. Six washes at natural intervals of at least four seconds produced a foam memory hint. First natural evolution occurred at 35 seconds. Enabled FX LOW. Repeated care felt monotonous once meters reached 100. Parent varied care responses and added reactions in 2.4; live retest pending.

### 6. Keyboard outing and early return — build 2.2
Used Enter to start town, follow voices, return early, and rest. Parts 3→4 were retained; care re-enabled. Energy 77, health 100, heat 0. No growth bonuses. Replacing scene buttons lost keyboard focus. Parent added focus transfer in 2.4; retested in episode 11.

### 7. Forest improvements — build 2.3
Continued GEN 02: calm entrance, leaf boat, map, listen, spring water, then aborted before the final reward to preserve natural growth. Departure was step 1 and return step 6. Distinct forest descriptions and terrain forecasts improved the journey. Mood +2 correctly clamped at 100. Screenshot at 16:28:31 showed genuinely skeletal stage 3 art with a steering wheel, a better progression. Found diary reset after reload and mismatched forest outcome nouns. Parent fixed these in 2.5; retested in episode 9.

### 8. Reload during a ridge trip — build 2.3
Flag help, reload at step 2, careful bridge, delivery, abort. Trip step, FX LOW, parts, and memory persisted; diary alone reset. Ended GEN 02 stage 4 with 132 seconds remaining, energy 46, clean 98, health 100, parts 7. No snacks or completed-trip bonuses had been used in this generation. No mobile viewport API was exposed.

## Interrupted attempt, not counted
At 16:29:32 an export completed and returned a download path. The subsequent file-chooser/import tool call hung and was aborted after 2,865 seconds. Import success was not verified and the call was not blindly retried. Environment replacement reset the browser profile, so the original GEN 02 adult outcome and full six-minute completion remain unverified. All preceding observations survive in the conversation; this ledger was reconstructed from that evidence.

## Episodes after environment replacement

### 9. Deliberate forest and diary retest — build 2.5, fresh GEN 01, 17:18–17:19 UTC
New browser profile began at onboarding with no collection. Fed tire and completed a deliberate forest route: calm, boat, map, listen, spring, wave. Reloaded mid-trip. Diary text and corrected acorn-robot nouns persisted. Ended with energy 99, heat 0, parts 7, stage 3. Normal deliberate play incurred no rush penalty. Brief rush forecasts add visual complexity but explain the tradeoff.

### 10. Fast safe-choice comparison — build 2.5
Automated six actual visible first-choice clicks on town in about two seconds. Rush costs were advertised. Energy 99→76, heat 0→20, parts 7→13, compared with heat 0 after deliberate play. The energy-positive rush exploit no longer reproduced. No further delay recommended: a small cost is preferable to disabling known choices.

### 11. Keyboard-only full forest journey — build 2.5, 17:20 UTC
Rested, started forest with Enter, and used focused Enter through the journey. Used Tab to select an alternative fruit choice. Each new scene focused its first choice; no lost-focus trap. Episode 6 fix passed. Rest reaction Zzz was visible. Ended stage 4 with 114 seconds remaining, energy 71, heat 9, parts 19. Keyboard play was noticeably smoother.

## Uncounted mobile investigation
Native Chromium Ctrl+Shift+I produced an explicit organization-policy notice that DevTools was not allowed. Dismissed and stopped; no bypass attempted. Hands-on mobile remains unverified. CI mobile emulation is separate evidence, not a play episode.

## Status
11 / 25 focused gameplay episodes completed. One adult generation observed before reset; current fresh generation is approaching adulthood. Further pure six-minute, no-bonus generation planned. All dates above are 2026-10-17 UTC.

### 12. Varied care and second observed adult reveal — build 2.5, 17:21–17:22 UTC
Fed the nearly grown vehicle, enabled sound, and then repeatedly overfed at legal intervals. Reaction text varied (burp, sparkling eyes, a chime in its belly), and a bread-eating animation appeared. Episode 5's repetitive-feedback issue improved. Audio toggle changed to ON, but audible output was not independently assessed. Taxi ★★★ emerged around 17:22:33 after real elapsed time and three legitimate trip bonuses, with no snacks this generation. Screenshot at 17:22:39 showed a cheerful taxi, clear next-generation control, and final milestone now labeled 相棒: episode 3's milestone fix passed. Late overfeeding did not change an already finalized form, as expected. Care animation remains entertaining briefly, but discovery is still the stronger reward.

Updated count: 12 / 25 focused episodes. Two adult generations actually observed across the reset. Beginning a fresh, strictly no-bonus six-minute generation next.

### 13. Strict six-minute natural growth — in progress, started 17:23:12 UTC
GEN 02 began through the normal next-generation control. No snacks, growth-granting choices, or completed trips have been used. Six washes and the eighth mystery hint set a polishing personality; natural stage 2 was observed at approximately 35 seconds and stage 3 after 100 seconds. Updated to 2.6 without losing age or diary.

During the same episode, opened a second game tab and rested there. The original correctly displayed a stale-save warning and stopped autosaving. However, its care buttons still accepted feed, showing energy 77→100 and a successful animation despite the change being unsavable. Reported this UX bug: disable or intercept stale-tab mutation controls. Closed the second tab and used the visible latest-save button; energy returned to the newer saved value 86. No growth bonus was introduced.

Midpoint pacing impression: calm and forgiving as a desk companion, but few active decisions once a personality hint is set and needs stay high. A short harmless repair puzzle could add interaction; that proposal is not yet playtested. Episode 13 is not counted complete until the no-bonus adult outcome is observed.
