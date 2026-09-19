# Classroom v1 · Arcade animation pass

Built from `arcade-direction.dc.html`: the same palette, square panels, pixel font, scanlines, student sprite and two-monitor screen layout. SVG artwork is inline; shared styling and the vanilla timeline are in `documentation/classroom/v1/anim/`. No generated images or runtime libraries.

- Screen tour: five beats in 12 seconds, character-by-character prompt, three highlighted lines, reload toast, stepped Pong motion and score, then the sidebar tick and memory chip.
- Storyboard: three scenes with four beats each and separate Play/Pause, Previous and Next controls. Cards sit side by side on desktop and stack on phones. Previous/Next pause on a complete beat; Play resumes after hover/focus leaves the cabinet.
- Both illustrations have the requested disclosure. Reduced motion and JavaScript off show final frames. Controls reserve their space before JS starts. Captions reserve the longest beat's height. Offscreen cabinets also pause.

Uncertainty: the section 02 Day 1 table still opens Astra and makes a moodboard, while this brief and section 06 say practice first, Astra closed. The animation follows the brief and section 06; none of the table text changed. Day 1's second monitor is a practice view, not Godot. “Review report: approved” is the brief's illustrative result; the table mentions a fix list. The returned Pong link is drawn example text, not a real published build.

Checked: Python HTML parser (balanced tags, quoted attributes, unique IDs); original page content outside the two insertions byte-for-byte unchanged; JS syntax; desktop light/dark screenshots and phone screenshots; all 17 beats; 44px controls; widths from 320 to 1200px; typing, motion, score, loop, hover/focus and explicit pause; reduced motion including preference changes; no-JS final frames. HTML + CSS + JS total approximately 96 KB, below 200 KB. No browser JS errors.

Check by eye before going live: compare the screen tour's five beats against the chosen artboard, confirm the small editor text and monitor labels at the intended projection size, watch the slider/scene change and 3D character-to-phone sequence, and review phone captions and control wrapping. The tour keeps both monitors in one scaled overview on phones; captions carry the readable explanation. Google Fonts is the sole external resource; test font fallback if the classroom blocks it.

Local design pass only. Not pushed or deployed. Claude Code's screenshot comparison and publishing remain pending.
