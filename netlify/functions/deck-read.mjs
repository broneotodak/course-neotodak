// Latest shared edits for a presentation deck. Open read: the deck page merges these over its built-in text.
// Storage: Supabase RPC deck_read (security definer); the table itself has no public policies.
export default async (req) => {
  const url = new URL(req.url); const deck = (url.searchParams.get('deck') || 'v1').slice(0, 40);
  const r = await fetch(`${process.env.KIT_SUPABASE_URL}/rest/v1/rpc/deck_read`, {
    method: 'POST', headers: { apikey: process.env.KIT_SUPABASE_ANON_KEY, Authorization: 'Bearer ' + process.env.KIT_SUPABASE_ANON_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ p_deck: deck }),
  });
  if (!r.ok) return new Response('read failed: ' + (await r.text()).slice(0, 300), { status: 502 });
  return new Response(await r.text(), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
};
export const config = { path: '/api/deck/read' };
