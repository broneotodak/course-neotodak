# Brief for Codex (Astra) — "The classroom, in 3D": an animated tour of how the program works

Written 20 September 2026 by Claude Code for Neo. Neo's words: "let's cook something with Codex Astra, like our NACA visualization: a full 3D animation to show how our Classroom works. From students, it goes to the interface kit → Claude Code / Codex Astra → the servers, etc." Codex owns the design and the build; Claude Code integrates, verifies on the fleet browser, and publishes at https://course.neotodak.com/classroom-3d/. Neo judges by eye.

## Read first (all in this repository)

- `documentation/classroom/v2/index.html` — the student's screen (Todak Workbench: sidebar, code, Design desk = Astra/Codex, Build desk = Claude Code, one open at a time; Godot as the live view) and the lesson shape.
- `documentation/home/v1/index.html` — the machines and accounts (Academy-owned): Academy Windows PCs · the Workbench · GitHub organisation (student repositories) · course.neotodak.com (site, showcase `/play`, lecturer page `/journey`) · the recording store (a Supabase database in the Todak organisation) · the Academy's Kay server (collector, publisher desk, build queue) · the Mac mini build server in the Academy IT room (reached by a tunnel; students never log in) · rented GPU / asset services · Todak Studios store accounts (Google Play, TestFlight / App Store, itch.io, Steam, Epic). Do NOT show Neo's personal machines (no NAS, no tr-home, no EdgeXpert).
- `documentation/v2/index.html` sections 05–06 — the publishing ladder and the review gate (one AI reviewer assisting the lecturer, Neo and Lan; Neo can bypass; updates are taught).
- `documentation/demo/try/index.html` — the real flow a student follows today with the kit (`tgk new` → run → design desk → build desk → review → publish → journey).
- `docs/design/arcade-direction.dc.html` — the Arcade look Neo chose (palette: bg #14152a, panel #1f2140, line #4a4d8a, ink #f2f2ff, soft #9a9cc9, pink #ff6ba8, cyan #5be7ff, green #7cff6b). The 3D piece is the same world in three dimensions: voxel / low-poly, flat shading, chunky, no photoreal.
- Concept reference: Neo's "Bandar Siti" fleet visualisation (a living isometric city where buildings are systems and little people walking between them are real jobs). Same spirit here: the classroom and its district, with prompts, assets, code, builds and reviews moving as visible things between buildings.

## Deliverable

A self-contained page at `classroom-3d/index.html` (plus `classroom-3d/scene.js`, `classroom-3d/strings.js`, and a vendored copy of Three.js under `classroom-3d/vendor/`; pin the version in a comment). No build step, no bundler, no analytics, no network calls other than loading its own files.

**The scene.** An isometric-feeling 3D world in the Arcade palette:
1. **The classroom**: rows of desks, Windows PCs, pixel-style students (voxel figures), the lecturer at a projector wall showing the class dashboard. One student's PC is the hero: the camera can fly into it.
2. **The Workbench** on that screen, rendered large: Todak sidebar (steps, buttons), code in the middle, the Design desk (Astra) and Build desk (Claude Code) as two panels, Godot beside it with a tiny Pong running. One desk lit at a time.
3. **The district** outside the room, as buildings with signs: GitHub (student repositories) · course.neotodak.com (site · showcase · journey) · Recording store (database) · Kay server (collector · publisher desk · build queue) · Mac mini build server (Academy IT room, behind a tunnel gate; a "no students" sign) · Asset services (rented GPU) · Todak Studios stores street (Google Play, TestFlight / App Store, itch.io, Steam, Epic) · The review gate (three chairs: lecturer, Neo, Lan; a small "bypass" lever for Neo).
4. **Moving things**: prompts (pink cubes) from the student to a desk and back, and a copy of every prompt flying to the recording store; design assets (cyan) from the Design desk to the design board; code (green) from the Build desk to Godot and GitHub; builds (white) from the build queue to the Mac mini and on to the showcase; a review report (a small page) to the gate; approved games walking down the stores street; the journey lighting up on the lecturer's projector.

**The tour.** Eight to ten stops, each with a title and a two-line caption, in **English and Bahasa Malaysia** (a toggle, top right, remembered in localStorage; all strings in `strings.js`). Auto-advances (about 8 s per stop) with Play/Pause, Previous, Next, an Overview button, keyboard arrows, and swipe on phones. Orbit with the mouse or a finger is allowed at any time; the tour resumes on Next. Stops, in this order: 1 Welcome (overview of the whole district) · 2 The classroom · 3 The Workbench · 4 The Design desk (Astra) · 5 The Build desk (Claude Code) and Godot · 6 Recording: every prompt to the journey · 7 Build and publish: queue → Mac mini → showcase · 8 The review gate and the stores · 9 The lecturer's view · 10 What the student takes home (three games, a portfolio, a journey). Captions must match the documentation's facts; do not invent machines, prices or rules.

**Quality bar.** 60 fps on a 2020 laptop, playable at 390 px wide, total under 3 MB, no WebGL = a friendly message with a link to the slides. Respect `prefers-reduced-motion` (no auto-advance, no idle bobbing). Labels readable on a projector (HTML overlays or sprite text, never tiny 3D text). No emoji. A permanent small line: "Animation, not a screenshot. Demonstrator, not the kit." A top bar like the other pages linking back to `/` and `/documentation/deck/v1/`.

## Rules

- Add files only under `classroom-3d/` and `docs/design/`. Do not edit any other page. Do not touch `netlify.toml`, `_headers`, `play/`, `journey/`.
- Verify in headless Chromium (software GL is fine) at 1280×800 and 390×844: screenshots of stops 1, 3, 7 and 9 in both languages to `/private/tmp/classroom-3d/` (not committed). Check the console for errors and the frame time.
- When done: commit on the current branch with the message `Classroom in 3D — Codex/Astra: animated tour of the program`, write `docs/design/CLASSROOM-3D-NOTES.md` (what you built, how the tour is structured, what to check by eye, anything you were unsure of, sizes). Do not push. Then stop.
