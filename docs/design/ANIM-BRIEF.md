# Brief for Codex (Astra) — Arcade animations for Classroom v1

Written 20 September 2026 by Claude Code. Neo (CEO, Todak Studios) looked at three animated directions and chose **C · Arcade**. The chosen artboard is `docs/design/arcade-direction.dc.html` in this repository: it is the source of truth for look, motion, palette, type and how the student is drawn. Ignore its `<x-dc>` / `DCLogic` wrapper and `support.js`; the SVG and CSS inside it are what matter. Codex owns this design pass; Claude Code will screenshot the result and compare it with the artboard before it goes live.

## The page

`documentation/classroom/v1/index.html` (a single static HTML page, published on course.neotodak.com by pushing `main`). Read the whole file first. It describes the "Todak Workbench", the student's screen for a 12-week game course: Monitor 1 is an editor workspace with a Todak sidebar (week and game, today's steps with tick boxes, design board thumbnails, Run / Build / Publish / Review buttons, recording status), the code in the middle, and two chat panels on the right, the Design desk (Astra) and the Build desk (Claude Code), one open at a time until week 7. Monitor 2 is Godot with the game running, the live view. Section 02 walks a student through Day 1, Week 3 and Week 10.

## Deliverables

**D1 · Screen tour (section 01).** Replace the static mock-up block, the `<div class="screen">…</div>` under the heading "Option B, drawn", with an animated Arcade screen tour of the exact Workbench layout above. Five beats, exactly as the artboard: (1) the student types "make the left paddle move with W and S" in the Build desk (typed letter by letter); (2) three new code lines appear highlighted in the code panel; (3) Godot on Monitor 2 shows "Reloaded paddle.gd"; (4) Press Play: the left paddle moves, the ball bounces, a score ticks; (5) the "Paddle moves" step gets its tick in the sidebar and a "saved to memory" chip lights in the Build desk. Captions per beat in a game dialog box with a blinking cursor. Step dots. Real `<button>` controls, at least 44 px tall: Play/Pause (state visible), Previous, Next. Auto-plays and loops (about 12 s), pauses on hover or focus, keyboard reachable. Label Monitor 1 and Monitor 2 like the artboard.

**D2 · Storyboard (section 02).** Insert, right after the section's `.sec-head` and before its table, an animated storyboard with three scenes, one per row of that table, each 3–4 beats with captions taken from the table's own words:
- Day 1: signs in and sees "Week 1 · Your first loop" → plays the supplied practice scene → slides one setting and the scene changes → explains the difference; Claude Code saves it to memory. Astra's desk stays closed.
- Week 3: scaffold Pong from the template → "make the left paddle move with W and S" → paddle and ball moving → "publish to web" returns a link.
- Week 10: character sheet on the Design desk → 3D character in the level on Godot → test build on the student's phone → review report: approved; the lecturer, Neo and Lan see it.
Draw the student as a pixel sprite at a two-monitor desk, like the artboard; draw a projector or a lecturer only where the text needs it. One shared Play/Pause plus Previous/Next scene, or per-scene controls; either is fine. Scenes can play in sequence.

**Under each animation** put one line in the page's normal style: "Animation, not a screenshot. The real Workbench is built in the kit phase."

## Look and motion (from the artboard)

Pixel art: `shape-rendering: crispEdges`, no rounded corners, chunky rects, a scanline overlay on the game and screen panels, `steps()` timing, a blinking cursor. Type: "Press Start 2P" through a Google Fonts `<link>` (that is the only external resource allowed), small sizes, with the page's own font for any longer caption text if legibility needs it. Palette: background #14152a, panel #1f2140, line #4a4d8a, ink #f2f2ff, soft #9a9cc9, pink #ff6ba8, cyan #5be7ff, green #7cff6b; game screens #0d0f1a. The animation panels are dark arcade cabinets in both the page's light and dark themes; everything outside them keeps the page's existing tokens. Captions sit inside the dark panels so they stay readable in both themes. No emoji anywhere; icons are drawn.

## Technical rules

- Inline SVG + CSS + a small amount of vanilla JavaScript. Put shared CSS and JS in `documentation/classroom/v1/anim/arcade.css` and `documentation/classroom/v1/anim/arcade.js`, referenced relatively from the page, or inline them; your call. No libraries, no external scripts, no images or data URIs: draw everything.
- `prefers-reduced-motion`: no auto-play, show the final beat, Previous/Next still step through.
- No layout shift: fixed aspect-ratio boxes. Works at phone width (SVG `viewBox` scaling; controls wrap; 16 px side gutter already set by the page). Keep the page under 200 KB in total.
- Valid HTML: every tag closed, every attribute quoted. Do not change any other text, section, style token or file on the page. Only the two insertion points plus the new `anim/` files.
- If JavaScript is off, the final beat shows as a static picture.

## When done

Validate the HTML (a Python `html.parser` pass is enough), check the file size, then commit on the current branch with the message: `Classroom v1: Arcade animations (screen tour + day 1 / week 3 / week 10 storyboard) — Codex pass`. Do not push. Write a short `docs/design/ANIM-NOTES.md` saying what you built, what you were unsure of, and what to check by eye. Then stop.
