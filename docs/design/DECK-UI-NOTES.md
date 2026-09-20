# Deck UI pass

20 September 2026 · Codex · `documentation/deck/v1/index.html`

Slides 4 and 5 now reserve space for their headings and bullets before laying out the animations. Content that cannot fit scrolls downward. The animation cannot centre itself over the slide copy.

## Changes

- Replaced the shrinking `fit()` loop and centred flex layout with CSS Grid. Text, captions and controls use their natural heights; the SVG drawing takes the remaining space with its original aspect ratio. A 180 px minimum drawing height prevents endless shrinking on short desktop screens. Grid tracks retain their minimum content size, and the slide owns vertical scrolling. No resize measurement or width-fitting JavaScript remains.
- Put the top bar, deck and bottom bar in separate page grid rows. Wrapping navigation and safe-area padding cannot cover slide content.
- Reworked heading sizes, bullet spacing, opening slide hierarchy and secondary text contrast using the existing site tokens and system fonts. Removed unrelated page styles and scoped number-card styling so it cannot affect Arcade SVG classes.
- Refined number cards, the lesson timeline, numbered publishing steps, purchase rows and decision columns. Lesson cards have readable labels and duration indicators; phone and tablet layouts stack. All fifteen navigation dots remain visible on narrow screens, in their own row above Back / counter / Next. Buttons and top navigation links are at least 44 px tall.
- Added visible keyboard focus, meaningful slide/dot labels, `aria-current`, an announced counter and a translated language-switch label. Space activates focused buttons. Animation controls keep their keyboard events, vertical gestures do not change slides, and the existing edge-tap hint now has a matching action on the empty page edges.
- Retained the Fullscreen API. The artwork is centred on a dark surface, controls remain reachable by scrolling, the button changes to Exit full screen in both languages, and exit restores focus. Unavailable fullscreen is hidden; a rejected request shows a translated inline status.

## Preserved

All fifteen slides, every existing value in `EN` and `BM`, the `#n` links, keyboard navigation, swipe, dots, counter and remembered language selection remain. Only new `ui` keys were added to the dictionaries. The two animation areas contain **four** `[data-arcade]` figures; all four source blocks are byte-identical to the starting version. `arcade.css` and `arcade.js` are unchanged. The existing local stylesheet was moved into the head; no resource, font, dependency or emoji was added.

## Verification

Headless Chromium **148.0.7778.96**, served locally with Playwright:

| Viewports | Languages | Themes | Slides checked |
| --- | --- | --- | --- |
| 1024×640, 1280×800, 1366×768, 1440×900, 1512×982, 1728×1117 | EN, BM | Light, dark | All 15 |
| 390×844, 430×932, 768×1024 | EN, BM | Light, dark | All 15 |

- **540 layout checks passed:** no overlap between headings, bullets and visuals; no overlap between each figure's drawing, caption and controls; no horizontal overflow; no controls under 44 px; no overlap between deck and bars. Every desktop kicker, title and bullet list fits in the initial viewport across this matrix.
- **216 screenshots** cover slides 1, 4, 5, 6, 11 and 14 at every size, language and theme above. Inspected all captures via contact sheets, plus individual fullscreen and scrolled animation views. Extra phone and desktop captures cover the number cards and publishing steps. Screenshots, scripts and JSON results are in `/private/tmp/deck-ui/`, outside the repository. Names follow `en-light-1366x768-s04.png`; `-bottom` files show the lower portion of overflowing animation slides.
- Passed actual fullscreen entry/exit for both animation slides at desktop, phone and tablet sizes, reachability of every animation control, EN/BM exit labels, restored focus, viewport resize during fullscreen, and a simulated rejected request.
- Passed hash entry/change, Back/Next, all keyboard shortcuts, Space on buttons, dots, horizontal swipe, vertical swipe rejection, edge taps, language persistence after reload, all **17 animation beats**, normal playback, reduced motion and a 200% CSS zoom reflow check. No JavaScript or HTTP errors.
- Python `html.parser` pass: balanced HTML/SVG, 15 slide sections, 26 unique source IDs. Compared original dictionary values and figure blocks against the starting file and both animation assets against Git. `git diff --check` passed. Final page: **73,477 bytes**, below 120 KB.

## Review limits and open content

The test matrix uses Chromium viewport emulation, not physical phones or Safari/Firefox. The parser pass checks structure and IDs; it is not a full standards-conformance validator. Screenshots use reduced motion for stable frames; normal playback was checked separately. Short viewports intentionally require vertical scrolling for animation captions and controls.

The supplied copy remains unchanged, including slide 15's proposed move to the Academy domain versus slides 10 and 14 saying the base address stays. Hardware names, estimates and programme facts were not re-verified during this UI pass. Claude Code can resolve content questions during integration.

## Delivery

Local commit only on `wt/0051ff5a/course-neotodak`. No push or deployment. The pre-existing untracked `docs/design/DECK-UI-BRIEF.md` is excluded. Claude Code's integration review is pending.
