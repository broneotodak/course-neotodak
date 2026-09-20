// Receives kit events (prompts, publishes, reviews, steps) from a student's machine and stores them.
// Two locks: header x-kit-token must match KIT_INGEST_TOKEN here, and the database function checks the same token again.
// Storage: Supabase RPC kit_ingest (security definer) with the public key; the table itself has no public policies.
export default async (req) => {
  if (req.method !== 'POST') return new Response('POST only', { status: 405 });
  const token = req.headers.get('x-kit-token') || '';
  if (!process.env.KIT_INGEST_TOKEN || token !== process.env.KIT_INGEST_TOKEN) return new Response('forbidden', { status: 403 });
  let body; try { body = await req.json(); } catch { return new Response('bad json', { status: 400 }); }
  const rows = (Array.isArray(body) ? body : [body]).slice(0, 500).map(e => ({
    client_id: e.id ? String(e.id).slice(0, 160) : null, at: e.at || new Date().toISOString(), kind: String(e.kind || 'prompt').slice(0, 20),
    student: String(e.student || '').slice(0, 80), game: String(e.game || '').slice(0, 80), week: Number(e.week) || null,
    desk: e.desk ? String(e.desk).slice(0, 20) : null, prompt: e.prompt ? String(e.prompt).slice(0, 4000) : null,
    data: e.data && typeof e.data === 'object' ? e.data : null, source: String(e.source || 'tgk').slice(0, 40),
  })).filter(r => r.student && r.game);
  if (!rows.length) return Response.json({ ok: true, inserted: 0 });
  const r = await fetch(`${process.env.KIT_SUPABASE_URL}/rest/v1/rpc/kit_ingest`, {
    method: 'POST', headers: { apikey: process.env.KIT_SUPABASE_ANON_KEY, Authorization: 'Bearer ' + process.env.KIT_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_token: token, p_events: rows }),
  });
  if (!r.ok) return new Response('store failed: ' + (await r.text()).slice(0, 300), { status: 502 });
  return Response.json({ ok: true, inserted: Number(await r.text()) || rows.length });
};
export const config = { path: '/api/journey/ingest' };
