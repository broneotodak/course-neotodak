# Documentation clarity pass · 20 September 2026

For Neo and Lan, from the supplied CLARITY-BRIEF.md. Source pages were read before editing, including the module, both Blueprints, Classroom v1, Home v1, Stores v1, Unity lane v1 and Objek.

## What changed

- Added `documentation/summary/v1/index.html`: eight sections, two short decision lists, no table, and the five requested long-version links. It carries every fact in the brief's final checklist.
- Added `documentation/classroom/v2/index.html`, using v1's page shell and CSS. V1 remains unchanged.
- Put the summary first in the documentation index and pointed the Classroom card to v2. Other cards are unchanged. The module's first footer link now opens the summary; the documentation index remains available beside it.
- The summary copies Home v1's CSS byte for byte and uses the same topbar, eyebrow, answers, section, decision and footer structures. The head differs only in the page-specific title and description; navigation labels and links identify the new page.

## What was cut or merged

- Cut the long opening question, repeated explanations of the two tools, the terminal rationale, repeated Workbench descriptions and repeated arguments for building a small course layer.
- Screen choices became one short paragraph beside the unchanged screen tour. The walkthrough is the unchanged storyboard plus four table rows including its heading row.
- The two-desks table and handover explanation became six bullets. File locations, ownership, the branch handover, memory, builds, review and recording remain.
- The lesson and build-or-use sections retain their tables, with shorter cells and no surrounding prose. Timetable totals and teaching leads moved to the short-version box. The lesson caption states the week-1 and one-desk rules.
- Astra's long response became three short quotes and its seven-row comparison table. Beginner trials, recording recovery, shared-PC logout checks, moderated assessment and the build queue remain.
- Seats, machines and the bill became one section and one table. The required Mac mini sentence appears in both new pages. The Academy plan follows Home v1; old personal-machine names and specifications remain in a closed historical disclosure, outside the plan table. No personal machine is proposed for student workloads.
- Kept all seven classroom decision items. The old bandung-01 recommendation is explicitly replaced by the already documented Home v1 rental plan.

## Source conflicts and items for Claude Code's fact-check

- V1's opening overview says **five minutes** for saving, but its lesson table says **2:50–3:00**. The table's exact times are retained. The conflicting overview sentence was cut; no new duration was invented.
- V1's lesson table lists both desks open, while its adopted rule allows only one until week 7. The table retains the desk columns and uses a caption to apply that rule. Week 1 still has no Godot; Astra starts on day 2 or 3.
- Kit estimates differ: roughly six weeks in the build table, eight weeks in the bill, two weeks to a demonstrator plus six to ten more in Astra's response, and ten to twelve weeks adopted in Blueprint v2.2. All remain, with earlier estimates labelled and the adopted pilot estimate identified. Studio estimates also remain attributed: 2–3 months versus Astra's three to six months or more. These are not silently reconciled.
- V1 initially describes password rotation, then recommends Academy-owned Team/Business workspaces with reassignment. The shorter plan keeps the workspace proposal and one-person-per-seat rule; opening the workspaces remains pending in the summary.
- Buying a Mac was approved in the source documents; its specific M6 / 32 GB / 1 TB order, final price and education eligibility are still open. The stated September 2026 lineup, prices, seat allowances, exchange rate and store terms were preserved from the supplied material, not independently reverified against vendors. The summary labels the Mac price unconfirmed.
- Home v1 supersedes the personal-machine placement and free personal GPU capacity. The brief explicitly requires this replacement. Historical hardware specifications are retained for traceability, not presented as purchases or allocations.
- The animations contain an illustrative approved review and web link. They remain labelled animations, not screenshots; no claim is made that the Workbench or those example results are live.
- The older module, Blueprint text and other index cards retain their earlier cost/placement wording because this brief limits their edits. The new summary and Classroom v2 apply the supplied latest decisions.

## Validation

- Python `html.parser` checked all four changed HTML pages for balanced tags and unique IDs; every local link and fragment resolves. `git diff --check` passes.
- Summary: **803 body words**, including navigation, headings and footer. Section counts including headings: **82, 89, 93, 88, 113, 100, 83, 76**. Each is within 60–120 words. Body total is **821** with a simple whitespace count, also within 700–900.
- Classroom prose: **4,764 → 1,849 words (38.8%)**. Counts include tables, navigation, headings and the closed historical disclosure; they exclude head/style/script contents and the four unchanged animation figures. A whitespace count gives **4,817 → 1,884 (39.1%)**. Neither method relies on hiding text to meet the limit.
- The two animation areas contain **four figures**: one screen tour and three storyboard cards. Every figure and the complete storyboard wrapper match v1 byte for byte. Both “Animation, not a screenshot” lines are unchanged. V1's CSS and JavaScript files are unchanged; v2 loads `../v1/anim/arcade.css` and `../v1/anim/arcade.js`.
- Chromium checked all four pages at **320, 390, 768 and 1200 px** with no page overflow. Tables retain the source style's horizontal scrolling. Summary light/dark views, all **17** animation beats, reduced-motion frames, JavaScript-off frames, loaded local assets and summary/Classroom navigation passed. No JavaScript or local HTTP errors. Opened summary phone, tour desktop and storyboard phone screenshots for visual inspection.
- Checked every required fact from the brief in the summary, six desk bullets, one combined cost table, four walkthrough rows, unchanged Home CSS, unchanged other index cards and unchanged module content outside its footer.
- Temporary validators and screenshots are under `/private/tmp/clarity-*`; no test dependencies or generated screenshots are committed.

## Delivery state

Local clarity commit only, on `wt/0051ff5a/course-neotodak`. No push or deployment. The pre-existing untracked `docs/design/CLARITY-BRIEF.md` is excluded. Claude Code's editorial/factual review remains the next step. This edit changes no verified live infrastructure or durable KB fact.
