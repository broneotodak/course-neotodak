# Brief for Astra — make the documentation short and clear

Written 20 September 2026 by Claude Code for Neo. Neo's words after reading the site with Lan: "it's a bit too long and too confusing." Astra writes, Claude Code directs and fact-checks. Read this whole file first, then read every page under `documentation/` (index.html, v2/, classroom/v1/, home/v1/, stores/v1/, unity/v1/) and the module page `index.html`.

## Who reads these pages

Neo (CEO of Todak Studios) and Lan (owner of Todak). Busy, not engineers, reading on a phone between meetings. They want to know what was decided, what it costs, and what they must still decide. They do not want to be taught.

## Deliverable A · "The program in five minutes" — new page `documentation/summary/v1/index.html`

One page, plain everyday English, 700 to 900 words, no more. Copy the `<head>` and the visual style of `documentation/home/v1/index.html` exactly (same CSS, same topbar, eyebrow, `.answers` box, `.sec-head`, tables, `.decisions`, footer). Sections, in this order, each 60 to 120 words, one table at most in the whole page:

1. What this is (the course, three games per student, published by Todak Studios, 12 weeks).
2. What a student sees (the Todak Workbench: Astra design desk, Claude Code build desk, one open at a time, Godot as the live view, no terminal until week 4).
3. How a lesson runs (demo, design warm-up, guided build, AI-off walkthrough, showcase, save).
4. Who owns what (its own home on the Academy's domain and accounts, nothing on Neo's personal domain or machines).
5. What we buy (one Mac mini as OUR build server; seats; rented GPU hours). Include this sentence, verbatim or very close: **"One Mac mini, controlled by us. Students never log into it. It exists so that iPhone builds and TestFlight are possible at all; a Windows PC cannot make an iPhone build."**
6. Where games are published (web and itch.io first, Google Play and TestFlight for the final game, Steam and Epic as showcase picks, Roblox as a separate lane later).
7. The Unity question in three sentences (course stays Godot; the studio tests Unity for two weeks because its own games are Unity games; pass or fail decides).
8. Decided, and still open: two short lists. Decided: 50/20/30 profit split; Studios brand; review gate with Neo's bypass; consent + IP licence + NDA at registration; Workbench; Arcade animations; off Neo's estate. Open: domain confirmation with Lan/Kai; Mac mini M6 32 GB / 1 TB purchase; Team/Business workspaces; timetable; the Unity fortnight; Epic and Roblox accounts; who drafts the paperwork.

End with one line: "The long versions: Blueprint v2 · Classroom v2 · Home v1 · Stores v1 · Unity lane v1", each linked.

## Deliverable B · Classroom v2 — new page `documentation/classroom/v2/index.html`

Start from a copy of `documentation/classroom/v1/index.html`. Cut it to **at most half the words** of v1's prose. Rules:
- Keep BOTH animations exactly as they are: every element from `<figure class="arcade-cabinet"` (or whatever the two `<figure>` blocks are called) to its `</figure>`, the `anim/arcade.css` and `anim/arcade.js` links, and the "Animation, not a screenshot" lines. Do not edit inside them. Copy the `anim/` folder is NOT needed: reference `../v1/anim/arcade.css` and `../v1/anim/arcade.js` from v2, or copy the two files into `documentation/classroom/v2/anim/`; either is fine, but the page must load them.
- Keep every decision, every number and every name. Do not add facts. Do not change a number. If a sentence is only rationale or repetition, cut it.
- Merge sections: (02 Walk in) can shrink to the storyboard plus a four-line table; (03 The two desks) becomes six bullets; (04 One lesson) keeps its table, drops the prose; (05 Build or use) keeps its table only; (06 Astra's POV) keeps the "where the two views differ" table and at most three short quotes; (07 Seats), (08 Machines) and (09 The bill) merge into one section called "Seats, machines and the bill" with one table and the Mac mini sentence from Deliverable A; (10 Decisions) stays.
- Section 08's machines table must not list Neo's personal machines (tr-home, EdgeXpert, bandung-01, the NAS) as the plan; say the program runs on Academy-owned pieces and link Home v1.
- Short sentences. Plain words. No jargon without a plain explanation. No emoji.
- Add a changelog line "v2 · 20 Sep 2026 · Cut to half the length after Neo and Lan found v1 too long; facts unchanged; animations unchanged." and set the footer to "Classroom v2".

## Deliverable C · index

In `documentation/index.html`, add the summary as the FIRST card with the label "Start here · The program in five minutes", and change the Classroom card to point at v2 (label "Classroom v2 · current"), leaving the other cards as they are. In `index.html` (the module page) change the footer link text to start with "Start here" and point that first link at `/documentation/summary/v1/`.

## Facts that must survive unchanged (check yourself before finishing)

50% Todak Studios / 20% Todak Academy / 30% student · 12 weeks · three games (two small, one final) · Mac mini M6, 32 GB, 1 TB · one desk open at a time until week 7 · terminal from week 4 · seats about USD 20 a month billed yearly or USD 25 monthly each, Claude Team and ChatGPT Business · RM570–710 per student for both seats over 12 weeks · RM8.6k–10.7k for a cohort of 15, RM11.4k–14.3k for 20 · asset budget about RM50 per student · course database RM0 then about RM120 a month · GPU rental about RM300–700 per cohort · three 3-hour sessions a week proposed · creator.todakacademy.edu.my · todak-academy GitHub organisation · Todak Cloudflare account · Supabase project in the Todak organisation · Kay .213 server · Steam Direct USD 100 per game recoupable · Epic USD 100 per game recoupable, 100/0 on the first USD 1M per game per year then 88/12 · Roblox cash-out at 30,000 Robux · Unity experiment: two weeks, pass = playable on Android and Windows within ten working days, at least 70% agent-produced, farm-built, fun audit comparable.

## When done

Validate every changed page with a Python `html.parser` pass (balanced tags), check the summary is 700–900 words of body text, check Classroom v2 prose is at most half of v1's, then commit on the current branch with the message `Docs clarity pass: five-minute summary + Classroom v2 — Astra edit` and write `docs/design/CLARITY-NOTES.md` listing what you cut, what you merged, and anything you were unsure about. Do not push. Then stop.
