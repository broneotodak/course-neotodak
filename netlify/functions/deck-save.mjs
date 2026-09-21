// Saves the team's edits to a presentation deck so everyone sees them. Open by Neo's call (demo rule: no PIN).
// Safety: only known slide fields, plain text plus <b> <i> <br>, size caps, every save kept as history (deck_edits).
// Storage: Supabase RPC deck_save (security definer); the table itself has no public policies.
const FIELD = /^(\d{1,2})\.(kicker|title|points|decided|open|big|lesson|ladder|buy)$/;
const clean = (s) => String(s).slice(0, 2000).replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/&lt;(\/?)(b|i|strong|em|u)&gt;/gi, '<$1$2>').replace(/&lt;br\s*\/?&gt;/gi, '<br>').replace(/(<br>\s*)+$/, '').trim();
function validate(ov) {
  if (!ov || typeof ov !== 'object' || Array.isArray(ov)) throw new Error('overrides must be an object');
  const out = {};
  for (const lang of Object.keys(ov)) {
    if (!/^(en|bm)$/.test(lang)) throw new Error('bad language ' + lang);
    const L = ov[lang]; if (!L || typeof L !== 'object' || Array.isArray(L)) throw new Error('bad language block');
    const o = {};
    for (const k of Object.keys(L)) {
      const m = FIELD.exec(k); if (!m) throw new Error('bad key ' + k);
      const v = L[k], f = m[2];
      if (f === 'kicker' || f === 'title') { if (typeof v !== 'string') throw new Error('bad ' + k); o[k] = clean(v); }
      else if (f === 'points' || f === 'decided' || f === 'open') {
        if (!Array.isArray(v) || v.length > 40) throw new Error('bad ' + k);
        o[k] = v.map(x => { if (typeof x !== 'string') throw new Error('bad item in ' + k); return clean(x); });
      } else {
        if (!Array.isArray(v) || v.length > 12) throw new Error('bad ' + k);
        o[k] = v.map(row => { if (!Array.isArray(row) || row.length > 3) throw new Error('bad row in ' + k); return row.map(x => { if (typeof x !== 'string') throw new Error('bad cell in ' + k); return clean(x); }); });
      }
    }
    out[lang] = o;
  }
  return out;
}
export default async (req) => {
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });
  const text = await req.text(); if (text.length > 200000) return Response.json({ ok: false, error: 'too big' }, { status: 413 });
  let body; try { body = JSON.parse(text); } catch { return Response.json({ ok: false, error: 'bad json' }, { status: 400 }); }
  let overrides; try { overrides = validate(body.overrides); } catch (e) { return Response.json({ ok: false, error: e.message }, { status: 400 }); }
  const deck = String(body.deck || 'v1').slice(0, 40);
  const base = Number.isFinite(Number(body.base)) ? Number(body.base) : null;
  const by = body.by ? String(body.by).slice(0, 80) : null;
  const r = await fetch(`${process.env.KIT_SUPABASE_URL}/rest/v1/rpc/deck_save`, {
    method: 'POST', headers: { apikey: process.env.KIT_SUPABASE_ANON_KEY, Authorization: 'Bearer ' + process.env.KIT_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_deck: deck, p_overrides: overrides, p_by: by, p_base: base }),
  });
  if (!r.ok) return Response.json({ ok: false, error: 'store failed: ' + (await r.text()).slice(0, 300) }, { status: 502 });
  return new Response(await r.text(), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
};
export const config = { path: '/api/deck/save' };
