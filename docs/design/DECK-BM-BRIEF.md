# Brief for Astra — Bahasa Malaysia version of the plan deck

Written 20 September 2026 by Claude Code for Neo. `en.json` in this folder holds every string of a 15-slide presentation of the Todak AI Creator Program plan, plus the captions of four small animations. Produce `bm.json` beside it: the same structure, the same keys, the same array lengths, with every English string translated into natural Bahasa Malaysia as spoken in Malaysia by a professional talking to a CEO and a business owner: clear, warm, plain, not stiff textbook Malay and not Indonesian. Rules:

- Keep every `<b>…</b>` tag exactly where it is around the equivalent words. Keep every number, currency (RM, USD), product and company name (Todak Studios, Todak Academy, Astra, Claude Code, Godot, Unity, Roblox, Steam, Epic Games Store, itch.io, Google Play, TestFlight, Workbench, Mac mini, GitHub), and keys like "M6 · 32 GB · 1 TB" unchanged.
- "Not prompt-only. Not vibe coders." may stay in English with a short Malay gloss after it if you think a CEO audience would expect that; otherwise translate it well.
- The `ui` object: short interface words (Back/Next/Start etc.). `lang` becomes "BM" and `other` becomes "EN".
- The `captions` object: animation captions; keep the leading "1 · ", "2 · " markers and the `<b>` tags. The keys ending in `_heading` are figure headings with a `<small>` part; keep the tags.
- Do not add, drop or reorder anything. Do not translate the `id` values or the array shapes such as `big`, `lesson`, `ladder`, `buy`, `decided`, `open`; translate only the human-readable strings inside them (times like "0:00" and "15 min" become "15 minit").
- Output: write `bm.json` as valid UTF-8 JSON (no comments, no trailing commas). Then run `python3 -c "import json;a=json.load(open('en.json'));b=json.load(open('bm.json'));print(len(a['slides']),len(b['slides']))"` to check it parses. Then stop. Do not write any other file.
