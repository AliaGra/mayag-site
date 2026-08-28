const ALLOWED_ORIGINS = new Set([
  'https://mayag.fit',
  'https://www.mayag.fit',
  'http://localhost:8788',
  'http://127.0.0.1:8788'
]);

export function corsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Origin'
  };
  if (ALLOWED_ORIGINS.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type';
  }
  return headers;
}

export function json(request, body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: corsHeaders(request)
  });
}

export function options(request) {
  return new Response(null, { status: 204, headers: corsHeaders(request) });
}

export function requireEnv(env, name) {
  const value = String(env[name] || '').trim();
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export async function supabaseRows(env, table, params) {
  const baseUrl = requireEnv(env, 'SUPABASE_URL')
    .replace(/\/rest\/v1\/?$/i, '')
    .replace(/\/$/, '');
  const serviceKey = requireEnv(env, 'SUPABASE_SERVICE_ROLE_KEY');
  const query = new URLSearchParams(params || {});
  const response = await fetch(`${baseUrl}/rest/v1/${table}?${query.toString()}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Accept: 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(`Supabase ${table}: ${response.status}`);
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

export function cleanUrl(value, fallbackBase) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  return `${fallbackBase}${raw.replace(/^@/, '')}`;
}
