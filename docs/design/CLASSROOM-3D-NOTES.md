# The classroom, in 3D

Built 20 September 2026 by Codex/Astra for Neo. Intended route: `/classroom-3d/`.

## Delivery and state

A self-contained illustrated tour of the **program plan**, in the chosen Arcade palette. The current demonstrator is Pong; the district is not a claim that the full kit, servers or store pipeline are deployed. This distinction appears in the welcome caption, the program-plan badge, the demo link and the permanent animation/demonstrator disclaimer.

Local worktree: `/Users/broneotodak/.openclaw/worktrees/0051ff5a/course-neotodak`.
Branch: `wt/0051ff5a/course-neotodak`.

Commit message: `Classroom in 3D — Codex/Astra: animated tour of the program`.
**Local commit only. No push or deployment.** Claude Code's integration, fleet-browser verification and publication remain pending. No existing page, deployment configuration, `play/` or `journey/` was changed. The pre-existing untracked `CLASSROOM-3D-BRIEF.md` is excluded from the commit.

## The model

- A raised district with streets, trees, lamps and a cutaway classroom. Six illustrative student stations, paired monitors, voxel students, a lecturer and a projector. The six figures are scene dressing, not a cohort-size claim.
- A marked hero Windows PC. The camera travels into its screen for the Workbench sequence. A responsive HTML screen enlargement keeps the sidebar, code, active AI desk and moving Pong legible. The closed desk stays visibly dimmed.
- GitHub repository blocks, the faceted recording database, rented asset services, Kay's racks and queue, the Academy IT room's Mac mini behind a tunnel gate, the course-site arcade, three review chairs and Neo's small pink bypass lever.
- Five shop fronts for Google Play, TestFlight / App Store, itch.io, Steam and Epic. The review panel gives the publishing ladder in readable HTML; the miniature shop signs are supplementary scenery.
- Pink prompt/reply packets with a matched recording copy, cyan assets, green code, white builds and a report page. Approved game cartridges walk along the shops. Recording reaches the projector's class-progress display. Paths remain visible when animation is paused.

Geometry is generated in code. Static primitives are batched into instanced meshes. No model files, downloaded textures, web fonts, analytics, service calls, postprocessing or realtime shadows. Store-sign textures are drawn locally. Three.js and OrbitControls are pinned to **r170 / 0.170.0**, with the MIT licence and upstream provenance under `vendor/`.

## Ten stops

| Stop | View and point |
| --- | --- |
| 1 | District overview; a student's idea becomes a playable game. Distinguishes the plan from today's Pong demo. |
| 2 | Classroom; Academy Windows PCs, the hero student, lecturer and class dashboard. |
| 3 | Workbench; sidebar, code, two desks, Godot; `tgk new` then Run. |
| 4 | Astra/Codex design desk; design alternatives, assets and the student's choice. |
| 5 | Claude Code build desk; paddle code, Godot and student repositories. |
| 6 | Recording; either desk → Kay collector → Todak recording store → journey. |
| 7 | Build/publish; Kay queue → tunnel → Mac mini → review → showcase. |
| 8 | One AI reviewer, lecturer/Neo/Lan, bypass, publishing ladder and updates. |
| 9 | Lecturer's view; class progress on the projector, private prompt-to-game journey separately. |
| 10 | Two small games and a final game, portfolio, authorship and a journey export. |

Normal playback starts automatically, spends about eight seconds on each stop, and ends at stop 10. Play replays from the beginning after completion. Previous, Next, the ten progress buttons, Overview and keyboard arrows work. Space toggles playback unless a link or button has focus.

Dragging the canvas or scrolling to zoom enters exploration and pauses the tour; Next returns to the guided camera and resumes playback. On touch screens, drag the scene to orbit and swipe **the caption or empty controls area** to change stops. Separating these gestures prevents an orbit from also skipping a stop. Vertical swipes do not navigate.

EN/BM is remembered in localStorage, with a storage-blocked fallback. Runtime copy lives in `strings.js`; product names/code remain the same in both languages. The HTML includes a bilingual no-JavaScript slide link. Hashes `#1` through `#10` select a starting stop.

With `prefers-reduced-motion`, the scene is still, camera changes are immediate, and navigation is manual. Play is disabled with an explanatory accessible label. A paused scene does not keep rendering unchanged frames. A lost or unavailable WebGL2 context shows a friendly slide link; no JavaScript also leaves a slide link.

## Documentation decisions

Read the brief's classroom v2, Home v1, Blueprint v2 sections 05–06, demo/try and Arcade reference.

- Home v1's later update wins: **course.neotodak.com stays**. No personal machines or operational addresses appear. The database is Supabase in the Todak organisation; the Kay server and Mac mini are Academy assets.
- The Mac mini is in the Academy IT room, reached through the tunnel. Students never log in. No model, specification, price or procurement claim is added.
- Every game goes through the review route. Neo's bypass skips the wait for human approval; the AI reviewer still runs and the reason is recorded. Publishing approval is distinct from passing the course.
- Store destinations follow the Blueprint's ladder. App Store release is optional; Steam/Epic are showcase picks. The Epic organisation is explicitly still to open. Updates return through review.
- The projector shows illustrative steps, build status and showcase links. The separate private lecturer-view strip explains the journey. No personal prompt histories or assessment notes are displayed on the class wall.
- One desk is lit at a time throughout this tour. The documentation allows both desks together from week 7; this demonstration uses the simpler week-3 teaching view.

## Verification

Chromium **148.0.7778.96**, headless, local HTTP server. Scripts, JSON reports and PNGs are in **`/private/tmp/classroom-3d/`**, outside the repository.

- **254 checks passed** in `verification.json`: all ten stops × EN/BM × 1280×800 and 390×844; page width, footer reachability, caption/control separation, inset containment and text clipping. All nine district signs fit in both desktop overview languages.
- All 40 stop/size/language screenshots captured and inspected via four contact sheets, with individual views during refinement. The requested sixteen are named `{en,bm}-{1280x800,390x844}-s{01,03,07,09}.png`. These use reduced motion for deterministic inspection. `motion-1280-s{1,3,7,9}.png` also captures the normal-motion camera after settling.
- No JavaScript errors, console errors or off-origin requests. Only this page's local files were requested.
- Automatic eight-second advance, pause, end/replay, arrows, overview, orbit and resume, language persistence, single active AI desk and reduced-motion idle rendering passed.
- Synthetic swipe checks plus actual Chromium touch input passed. High-DPI phone rendering, 200% CSS zoom with reachable controls, malformed fractional hashes, blocked localStorage, unavailable WebGL and context loss also passed (`extra-results.json`).
- JS syntax and whitespace checks passed. No existing test suite or build step is needed.

Frame timing, without claiming an older laptop was tested:

| Renderer / measurement | Result |
| --- | --- |
| Headless Apple M4 Pro, ANGLE Metal, antialiasing on, 1280×800 | Mean **8.37 ms** (~119 fps); p95 **9.80 ms**, after warm-up. |
| Final full test, SwiftShader software GL, antialiasing on, 1280×800 | Mean **20.33 ms** (~49 fps); median **17.50 ms**; p95 **26.00 ms**. |
| Final test's CPU render/update submission | Mean **0.42 ms**, p95 **0.70 ms**; not a GPU-completion measurement. |
| Model workload | Roughly **14,000 triangles**, **38–56 draw calls** depending on stop; seven geometries and five local canvas textures. |

Pixel ratio is capped at 1.65 on desktop and 1.5 on phones. `performance-variants.json` includes the hardware and software comparison. A 2020 laptop, physical phone, physical projector, Safari and Firefox were **not** tested; Claude Code should confirm the target hardware's sustained 60 fps before publishing.

## What to check by eye

1. The overview's nine building labels, and whether the classroom is the first thing the eye finds.
2. The fly into the hero PC, especially the change from the physical screen to the readable enlargement. Orbit hides enlargements so the district remains explorable.
3. The handoff from cyan design to green code, and the pink recording copies.
4. Queue → tunnel → Mac → review → showcase; the three review chairs and Neo's lever. Motion is illustrative, not live telemetry or exact queue timing.
5. The BM phone Workbench, longer captions and store ladder; review-panel text can scroll on shorter phone screens.
6. The lecturer's wall versus the separate private journey explanation. The dashboard values are fictional illustrations.

The source documentation still mixes older proposals with later decisions; the choices above follow the brief and the later Home/classroom clarifications. No infrastructure, program policy or KB fact was changed.

## Sizes

Uncompressed bytes, including vendored documentation/licence:

| File | Bytes |
| --- | ---: |
| `index.html` | 26,228 |
| `scene.js` | 38,000 |
| `strings.js` | 15,322 |
| `vendor/three.module.min.js` | 691,648 |
| `vendor/OrbitControls.js` | 32,192 |
| `vendor/LICENSE` | 1,081 |
| `vendor/README.md` | 730 |
| **Entire classroom-3d directory** | **805,201 (~0.81 MB)** |

The five runtime files total 803,390 bytes before HTTP compression. The page requires a static HTTP server for ES modules; there is no package install or build command. No screenshots are committed.
