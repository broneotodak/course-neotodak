// Lecturer view data. Gate: ?pin= must match JOURNEY_PIN here, and the database function checks it again.
export default async (req) => {
  const url = new URL(req.url); const pin = url.searchParams.get('pin') || '';
  if (!process.env.JOURNEY_PIN || pin !== process.env.JOURNEY_PIN) return new Response('forbidden', { status: 403 });
  const body = { p_pin: pin, p_student: url.searchParams.get('student') || null, p_game: url.searchParams.get('game') || null, p_limit: Math.min(Number(url.searchParams.get('limit') || 300), 1000) };
  const r = await fetch(`${process.env.KIT_SUPABASE_URL}/rest/v1/rpc/kit_read`, {
    method: 'POST', headers: { apikey: process.env.KIT_SUPABASE_ANON_KEY, Authorization: 'Bearer ' + process.env.KIT_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!r.ok) return new Response('read failed: ' + (await r.text()).slice(0, 300), { status: 502 });
  return new Response(await r.text(), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
};
export const config = { path: '/api/journey/read' };
