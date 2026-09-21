# Deck edit mode — visual pass

Changes are confined to the **Edit mode** CSS in `documentation/deck/v1/index.html`. Markup, JavaScript, and every byte outside that section are unchanged.

- The toolbar retains its normal appearance and 44px controls. Editing uses a soft method tint; the warm unsaved dot sits inside the button without widening it.
- The edit bar uses the existing neutral surface, with a clear Save action and restrained reset controls. Desktop is one 61px row. At widths up to 760px, two fixed rows total 103px: status and whole-deck reset above, then slide reset, Save, and Done. The hint is hidden on smaller screens. Long status messages remain scrollable without expanding the bar.
- Quiet solid boundaries replace dashed outlines. Focus gains the method outline and surface; empty points keep a readable placeholder. Remove targets are 36px on desktop and 40px on phones; Add is 40px high. Hover states use existing method/crew tokens.
- The desktop edited note keeps its existing view-mode appearance, with stable numerals while editing. Print hides editor actions and field outlines. Both themes inherit the deck's existing tokens and type.

Verified in Chromium by opening the page and clicking Edit at **1366×768, 1024×640, and 390×844**, in light/dark and EN/BM. All 36 before/after view-mode screenshots (title, standard slide, and columns across those configurations) are byte-identical. The phone bar fell from 179.5px EN / 199px BM to 103px.

Also checked focus, placeholders, add/remove, reset, dirty indicator, disabled/enabled Save, saved/error/conflict states, print, and horizontal overflow across all 15 slides. Save responses were local fixtures; no shared content was written. Additional narrow-phone and breakpoint checks cover 320, 560, 760, and 761px. No page errors; no libraries or assets added. Local changes only, not deployed.
