# Deck edit mode — visual pass (Codex)

The presentation deck at `documentation/deck/v1/index.html` gained an **edit mode**: the team clicks
"Edit" (top right, beside EN / BM), changes any point in place, adds or removes points, and
"Save for everyone" stores the edits on the site. The behaviour and JavaScript are final and tested
(20 browser checks). This pass is **visual only**.

## What to style (CSS only, inside the `<style>` block, section "Edit mode")

- `.tools` — the top-right group holding `#langbtn` and `#editbtn`. Same 44px height as the language button.
- `#editbtn` states: normal, `.dirty` (unsaved edits exist — a small warm dot today), `[aria-pressed="true"]` (editing).
- `#editbar` — the bar between the slides and the bottom nav. Children: `.hint` (`#edhint`), `.status` (`#editstatus`),
  `.acts` with four buttons: `#ed-resetall.quiet`, `#ed-reset`, `#ed-save.primary`, `#ed-done`.
  Desktop: one calm row. **Phone (≤ 560px): at most two short rows, about 100px tall, hint hidden or a single line;**
  today it stacks four rows and eats the slide.
- Editable text: `[data-ep]` (dashed outline today) and `[data-ep]:focus`. Editable list items: `li.pt` → `span.ed` +
  `button.rm` (×). Empty item shows its `data-ph` placeholder via `.ed:empty::before`.
  `li.addrow > button.add` ("+ Add a point"). Keep the × and + as real 32–44px targets.
- `.dtop .ttl .edited` — the small "· edited 14:37" note beside the deck title (desktop only).

## Hard rules

- Do not change JavaScript, ids, class names, `data-*` attributes, or the order of elements the script reads.
  You may add wrapper-free CSS only. If a markup tweak inside `#editbar` is unavoidable, keep every id.
- Use the deck's existing tokens (`--method`, `--crew`, `--ship`, surfaces, `--line`) and type; light and dark mode.
- No libraries, no images, no emoji icons. Print-quiet, presentation-grade: the bar must not fight the slide.
- Keep every existing view-mode style byte-identical: viewers who never click Edit must see no change.

## Verify before you finish

- `node --check` is not enough for inline script; open the page and click Edit at 1366×768, 1024×640, 390×844 (light + dark).
- Write what you changed and why to `docs/design/DECK-EDIT-NOTES.md` (short).
