**Astra’s classroom point of view — for Neo and Lan, 20 September 2026**

Choose **the middle option: a prepared workspace with a small Todak lesson panel, beside Godot**. The student’s first experience should be playing something, changing it and explaining the difference. Keep the 12 weeks, three games, two lanes and Todak Studios publishing gate as agreed in [v2](../v2/index.html), alongside the [module spec](../../index.html).

**The student’s screen.** Using two untouched apps is quickest, but leaves beginners managing windows and handovers. A complete “Todak Studio” could look simpler, but makes us responsible for a software product before we have tested the teaching. A prepared workspace gives us a consistent classroom without that commitment.

Use VS Code, a file and code editor, with the existing [Codex panel](https://learn.chatgpt.com/docs/codex/ide) and [Claude Code panel](https://code.claude.com/docs/en/vs-code). Astra is the Codex lane here. Open one AI panel at a time. The proposed Todak panel supplies the lesson, links and status; it is something we build. The exact Windows setup and recording compatibility are **to verify on Academy PCs**.

```text
WINDOWS PC
+----------------------------+--------------------------+
| VS Code                    | Godot                    |
| Todak: today’s task        | Scene being edited       |
| Project / recording status | or game being played     |
|                            |                          |
| Design pictures or files   | Objects and properties   |
| Astra OR Claude Code chat  | Run / Stop / Errors      |
+----------------------------+--------------------------+
```

Godot provides the [running game view](https://docs.godotengine.org/en/stable/tutorials/editor/game_embedding.html). Save, press Run, play and compare. We should promise this repeatable loop; continuous changes while AI writes are **to verify**. Each task must open the matching project copy in Godot. Small screens can alternate full windows. A terminal, the text-command window, opens only for a taught task.

**Day 1:** the machines are already installed. Students sign in, see their name and today’s task, and play a supplied practice scene. They change one visible setting themselves. Claude Code then guides one recorded task and saves its outcome to project memory. Astra stays closed until the lecturer introduces the design desk. This practice scene is not an extra assessed game.

**Week 3:** their first chosen Godot game fills the right side. Left: their one-page design, one script and Astra. They predict what changing speed will do, inspect the change and play it. Claude Code opens at handover for review and the web build.

**Week 10:** the same layout holds the 3D final game. Students switch between the camera, character, movement code and running level. Blender opens only for asset work. Phone testing follows; a powerful classroom PC cannot establish phone performance. Farm jobs return progress and links; students never operate the Kenwingston Mac mini.

**Projector:** the lecturer uses the same layout, enlarged, with a prepared teaching account. Show one decision, its changed file and its result. Keep individual prompt histories and assessment notes off the projector.

**The Astra design desk.** Show the current design beside two or three alternatives. The student chooses and explains why before we build.

| Item | What students see and keep |
| --- | --- |
| Moodboard | A picture collage showing colour, lighting and mood, with source notes. |
| Character sheet | Pictures of poses and views, plus written rules for appearance. |
| Storyboard | A sequence of pictures with captions explaining player actions. |
| Interface mock-up | A picture of menus or on-screen controls; functioning controls come later. |
| Game design document | One page of editable text: player goal, repeated actions, controls, win/lose rules and scope. |
| Gameplay | Real Godot scene and code files, with a readable explanation of the change. |

Selected pictures, notes, design text and game files belong in the **repository**, the project folder with saved version history. Chat alone is not the deliverable. A character picture still needs a separate usable 3D model. Astra directs asset work; Claude Code runs the Academy asset services. Record every prompt in both lanes under the student’s identity, including requests made during handovers.

A **branch** is a separate line of work awaiting review. The kit prepares a separate working folder for Astra’s branch. After playtesting, the student hands Claude Code the branch and a short note: intention, changed files, tests, known problems and asset sources. Stop Astra’s work first. Claude Code checks it, returns specific fixes or merges approved changes into the main project and updates memory. The student plays that accepted version; Astra continues from it. Neither tool silently overwrites the other’s work.

**One three-hour lesson: week 3, make a scoring rule work.** Godot stays open throughout except the break. “AI closed” means stop active tasks and close both panels, including background work.

| Minutes | Activity and open tools |
| --- | --- |
| 0–10 | Play last lesson’s saved game; recall its rule. Both AIs closed. |
| 10–25 | Lecturer demonstrates a scoring change, thinks aloud and tests it. Astra open on projector; students’ AIs closed. |
| 25–35 | Students write the intended rule, limits and test before prompting. Both AIs closed. |
| 35–65 | Guided build, one change at a time. Astra open; Claude Code closed. Lecturer checks predictions against play. |
| 65–75 | Save a working version, stop tasks, close tools and take a break. |
| 75–100 | Reopen Godot and Astra. Students make their own variation, inspect changed lines and test edge cases. Claude Code closed. |
| 100–115 | Close Astra; open Claude Code. Review, return fixes or merge, and record the result. A farm build can queue. |
| 115–145 | Both AIs closed. Partners explain the scoring script, predict a changed value and check it manually. Lecturer hears rotating individual walkthroughs and records who needs another attempt. |
| 145–170 | Showcase in small groups: play, explain one choice, receive feedback. Both AIs closed. |
| 170–180 | Claude Code opens to save verified decisions and check recording/upload status. Astra stays closed. Each student writes tomorrow’s next step. |

Grade prompt quality through clear intent, constraints, evidence and revision. Grade understanding through explanation and an unaided change. Formal no-AI debugging drills start in week 4 as planned. Unfinished students resume from a working checkpoint during supported practice between classes.

**Build or buy.** Use Godot, Blender, Git version history, VS Code and the two official AI interfaces as supplied. Budget named student accounts; permitted seat arrangements, model access and classroom usage limits are **to verify**.

My planning estimate assumes two experienced developers and a lecturer testing weekly: **two weeks for a demonstrator**, then **six to ten further weeks** for a dependable pilot. Build the installer, lesson panel, safe handovers, complete recording, save/recovery checks, farm status and lecturer evidence view. Allow that time for genre coverage and Windows testing too. This is an estimate, not a delivery promise.

A complete custom Studio wrapping both assistants and the game view is **three to six months or more**, plus maintenance. Sign-in, interrupted jobs, upgrades and separating students’ data remain work even when the screen looks simple. I disagree with v2 §11’s two-week kit scope covering every genre and all services.

**What v2 still needs to confront.**

- **Beginner evidence (§11):** experienced staff shipping reference games proves the pipeline. Add observed trials with four to six actual beginners before enrolment. Measure where they need rescue.
- **Recording completeness (§08):** Claude’s [monitoring documentation](https://code.claude.com/docs/en/monitoring-usage) describes content limits and version-dependent records. Test long prompts, restarts, offline queues and both interfaces. Show “saved” versus “waiting to upload”; a recording fault needs recovery, not an automatic student penalty.
- **Shared PCs and home access (§07):** verify work and records reached storage before logout; isolate accounts and local files. Practise on another PC. Test the proposed browser fallback; provide supported lab access and offline exercises meanwhile.
- **Assessment and capacity (§06–08):** AI scores need lecturer moderation. A publish approval or Neo bypass does not prove competence. Simultaneous class builds need a queue; human playtests must check controls, readability and enjoyment.
