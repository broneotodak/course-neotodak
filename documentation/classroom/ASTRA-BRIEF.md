# Brief for Astra — the student's screen and how we teach (Game Track)

Written 20 September 2026 by Claude Code for Neo. Astra owns the design point of view; Claude Code integrates and verifies. Read this whole file, then read `documentation/v2/index.html` (the current plan) and `index.html` (the 12-week module spec) in this repository before writing anything.

## The question Neo cannot picture yet

Neo: "How do we teach the students? If I am a student and I walk in, what should I expect? Directly a Claude Code terminal? Codex? Or a front end for both, where each shows a different visualisation, like a terminal for the student to type and the result shown in real time in a view? We will have to build this, and we need Astra's point of view, not only Claude Code's."

## Fixed facts (do not re-open)

- 12 weeks, blended, competency-based, Godot 4, beginners with no coding needed. Three games per student: two small, one final. Genre menu in v2 section 04.
- Two AI tools in one kit (v2 section 02). Astra lane: game design document, art direction, assets, UI, gameplay code with the student on branches. Claude Code lane: project memory, scaffolding, build farm, publishing, review gate, prompt record, merging.
- Classroom is the Academy's high-spec Windows PCs. Build farm is a Mac mini at the Kenwingston office. Students never touch it.
- Stance: "Not prompt-only. Not vibe coders." A graduate can open the game with AI off, read, explain, fix and ship it. Prompting is taught and graded.
- Every prompt in both lanes is recorded (v2 section 08).
- Published under the Todak Studios brand through a review gate (v2 sections 05 and 06).

## What we want from you

Write `documentation/classroom/astra-pov.md` in plain everyday English for Neo (a CEO, not an engineer) and Lan. At most 1,400 words. Cover:

1. **The student's screen.** Your recommendation, with a simple text sketch of the layout. Options to weigh: (a) the two tools as they ship (terminal, desktop app, or editor panel) beside the Godot editor; (b) one custom "Todak Studio" front end we build that wraps both tools with a live game view; (c) something in between (for example an editor workspace the kit sets up, with a kit sidebar and live game panel). Say what the student sees on day 1, in week 3 (first Godot game), and in week 10 (3D capstone). Say what the lecturer sees on the projector.
2. **The Astra lane from the student's chair.** What the design desk shows: moodboards, character sheets, storyboards, UI mock-ups, the game design document, gameplay code on a branch. Which of these are pictures, which are text, which are files in the repo. How the student hands work from your lane to the Claude Code lane and back.
3. **A lesson's shape.** One 3-hour classroom session, minute by minute: demo, guided build, AI-off walkthrough, showcase. Where each tool is open and where it is closed.
4. **Build or buy.** What we should build (and roughly how long it takes) versus what we use as-is. Be honest about what is weeks and what is months.
5. **Risks you see** that Claude Code's plan (v2) has missed, and anything in v2 you disagree with.

Rules: no jargon without a plain explanation; no code; do not invent product features you are not sure exist — if unsure, say "to verify"; do not edit any other file; write only the one markdown file.
