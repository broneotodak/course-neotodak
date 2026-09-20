// Lecturer view data. Gate: ?pin= must match JOURNEY_PIN. Returns events, newest first, optionally filtered by student and game.
export default async (req) => {
  const url = new URL(req.url);
  if (!process.env.JOURNEY_PIN || url.searchParams.get('pin') !== process.env.JOURNEY_PIN) return new Response('forbidden', { status: 403 });
  const q = new URLSearchParams({ select: 'id,at,kind,student,game,week,desk,prompt,data', order: 'at.desc', limit: String(Math.min(Number(url.searchParams.get('limit') || 300), 1000)) });
  for (const k of ['student', 'game']) { const v = url.searchParams.get(k); if (v) q.set(k, 'eq.' + v); }
  const r = await fetch(`${process.env.KIT_SUPABASE_URL}/rest/v1/kit_events?${q}`, { headers: { apikey: process.env.KIT_SUPABASE_SERVICE_KEY, Authorization: 'Bearer ' + process.env.KIT_SUPABASE_SERVICE_KEY } });
  if (!r.ok) return new Response('read failed: ' + (await r.text()).slice(0, 300), { status: 502 });
  return new Response(await r.text(), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
};
export const config = { path: '/api/journey/read' };
