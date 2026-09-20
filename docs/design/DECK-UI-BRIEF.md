# Brief for Codex — UI pass on the presentation deck

Written 20 September 2026 by Claude Code for Neo. Codex owns UI/UX; Claude Code integrates and verifies. Neo's words, looking at slide 4 of `documentation/deck/v1/index.html` on his own screen: "you made that screen like on top of the text" — the animation sits over the title and bullets. Claude Code built the deck and then patched two slides with a "hero" layout; that patch is the bug. Fix it properly and give the whole deck a real UI pass.

## Read first

- `documentation/deck/v1/index.html` (the deck: styles in `<head>`, 15 `<section class="slide">`, two big dictionaries `const EN` and `const BM`, and the deck script at the bottom).
- `documentation/classroom/v1/anim/arcade.css` and `arcade.js` (the two animations; loaded by the deck; do not edit).
- `docs/design/arcade-direction.dc.html` (the Arcade look Neo chose for the animations; the deck's chrome follows the site's own tokens, not Arcade).

## The bug, as Claude Code understands it

Slides with `class="slide hero"` (data-id `screen` and `journey`) use `.inner { display:flex; flex-direction:column; height:100% }` with `.visual { flex:1; min-height:0; justify-content:center }` and a JavaScript `fit()` loop that shrinks the figure's width until its height fits. On viewports where the figure cannot get short enough (its caption box and controls have fixed heights), the centred flex child overflows upward and covers the heading and bullets. Any layout where the animation can cover text is wrong. Replace the approach; do not tune the loop.

## What must be true when you are done

1. On every viewport from 1024×640 upward, and specifically at 1280×800, 1366×768, 1440×900, 1512×982 and 1728×1117: the kicker, title and bullets of every slide are fully readable and never overlapped by anything. The animation on slides 4 and 5 is as large as the remaining space allows; if it cannot fit, the slide scrolls, and nothing overlaps.
2. On phones (390×844, 430×932) and tablets (768×1024): slides stack and scroll; controls stay at least 44 px tall; no horizontal scroll.
3. The Full screen button remains (or a better affordance of your choosing) and works with the Fullscreen API; in full screen the animation is centred on a dark background with its controls reachable.
4. Keep all fifteen slides, every string in `EN` and `BM` (you may not edit the dictionaries except to add new `ui` keys you need, in both languages), the hash deep links (`#n`), keyboard, swipe, dots, counter, the language toggle and its localStorage memory, and the two `[data-arcade]` figures byte for byte.
5. No external resources beyond what the page already loads. No emoji. Valid HTML. Page stays under 120 KB.
6. While you are there: a real UI pass on the deck's chrome. Type scale, spacing, the top and bottom bars, the dots on narrow screens, dark mode, focus states, and the "big numbers", "strip", "stairs", "buyrows" and "cols" visuals. The site's existing tokens and fonts are the palette. Calm, readable, presentation-grade; not decorative.

## Verify before you finish

Use a headless Chromium to screenshot slides 1, 4, 5, 6, 11 and 14 at each viewport in point 1 plus 390×844 and 768×1024, in light and dark, and inspect them yourself for overlap. Write the screenshots to `/private/tmp/deck-ui/` (not into the repository). Then validate the HTML with a Python `html.parser` pass, commit on the current branch with the message `Deck UI pass — Codex: no overlap at any viewport, hero slides rebuilt, chrome polish`, and write `docs/design/DECK-UI-NOTES.md` saying what you changed, what you tested and anything you were unsure of. Do not push. Then stop.
