import { json, options, requireEnv, supabaseRows, cleanUrl } from '../../_lib/api.js';

const LOGIN_MAX_AGE_SECONDS = 24 * 60 * 60;

function hexEqual(left, right) {
  if (!left || !right || left.length !== right.length) return false;
  let result = 0;
  for (let i = 0; i < left.length; i += 1) {
    result |= left.charCodeAt(i) ^ right.charCodeAt(i);
  }
  return result === 0;
}

function bytesToHex(bytes) {
  return Array.from(new Uint8Array(bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

async function verifyTelegramLogin(payload, botToken) {
  if (!payload || typeof payload !== 'object') return false;
  const hash = String(payload.hash || '').trim().toLowerCase();
  const authDate = Number(payload.auth_date);
  const id = String(payload.id || '').trim();
  if (!hash || !id || !Number.isInteger(authDate)) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - authDate) > LOGIN_MAX_AGE_SECONDS) return false;

  const checkString = Object.keys(payload)
    .filter((key) => key !== 'hash' && payload[key] !== undefined && payload[key] !== null)
    .sort()
    .map((key) => `${key}=${payload[key]}`)
    .join('\n');
  const secret = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(botToken));
  const key = await crypto.subtle.importKey(
    'raw',
    secret,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(checkString));
  return hexEqual(bytesToHex(signature), hash);
}

function mapTypes(types) {
  const values = Array.isArray(types) ? types : [];
  const labels = [];
  if (values.includes('individual')) labels.push('Індивідуальні');
  if (values.includes('group')) labels.push('Групові');
  return labels;
}

function mapServices(modes) {
  const values = Array.isArray(modes) ? modes : [];
  const labels = [];
  if (values.includes('offline')) labels.push('Офлайн');
  if (values.includes('online')) labels.push('Онлайн');
  if (values.includes('programs')) labels.push('Програми');
  return labels;
}

export async function getCoachProfile(env, chatId) {
  const select =
    'user_id,chat_id,first_name,last_name,city,oblast,district,birth_date,instagram,telegram_username,coach_training_types,coach_service_modes,role,is_blocked';
  let users = await supabaseRows(env, 'users', {
    select,
    chat_id: `eq.${chatId}`,
    limit: '1'
  });
  // Older imported profiles may have the Telegram ID only in user_id.
  if (!users.length) {
    users = await supabaseRows(env, 'users', {
      select,
      user_id: `eq.${chatId}`,
      limit: '1'
    });
  }
  const user = users[0];
  if (!user) return { code: 'USER_NOT_FOUND' };
  if (user.is_blocked === true) return { code: 'BLOCKED' };
  if (String(user.role || '').toLowerCase() !== 'coach') {
    return { code: 'ROLE_NOT_AVAILABLE', role: String(user.role || '') };
  }

  const links = await supabaseRows(env, 'coach_venues', {
    select: 'venue_id,is_primary,teaches_here,listing_visible',
    coach_chat_id: `eq.${chatId}`,
    teaches_here: 'eq.true'
  });
  const venueIds = links
    .filter((link) => link.listing_visible !== false)
    .map((link) => String(link.venue_id || '').trim())
    .filter((id) => /^[A-Za-z0-9_-]+$/.test(id));
  let venues = [];
  if (venueIds.length) {
    venues = await supabaseRows(env, 'venues', {
      select: 'id,name_ua,city,address,instagram_url,telegram_url,phone,is_active',
      id: `in.(${venueIds.join(',')})`,
      is_active: 'eq.true'
    });
  }

  const documents = await supabaseRows(env, 'coach_documents', {
    select: 'id',
    coach_chat_id: `eq.${chatId}`
  });

  const profile = {
    publicId: String(chatId),
    firstName: String(user.first_name || ''),
    lastName: String(user.last_name || ''),
    city: String(user.city || ''),
    oblast: String(user.oblast || ''),
    district: String(user.district || ''),
    birthDate: user.birth_date || null,
    instagram: cleanUrl(user.instagram, 'https://instagram.com/'),
    telegramUsername: String(user.telegram_username || '').replace(/^@/, ''),
    trainingTypes: mapTypes(user.coach_training_types),
    serviceModes: mapServices(user.coach_service_modes),
    documentsCount: documents.length,
    venues: venues.map((venue) => ({
      id: String(venue.id),
      name: String(venue.name_ua || ''),
      city: String(venue.city || ''),
      address: String(venue.address || ''),
      instagram: cleanUrl(venue.instagram_url, 'https://instagram.com/'),
      telegram: String(venue.telegram_url || ''),
      phone: String(venue.phone || '')
    }))
  };
  return { code: 'OK', profile };
}

export async function onRequestOptions({ request }) {
  return options(request);
}

export async function onRequestPost({ request, env }) {
  try {
    const payload = await request.json();
    const botToken = requireEnv(env, 'BOT_TOKEN');
    if (!(await verifyTelegramLogin(payload, botToken))) {
      return json(request, { code: 'INVALID_TELEGRAM_LOGIN', message: 'Не вдалося підтвердити Telegram.' }, 401);
    }
    const result = await getCoachProfile(env, String(payload.id));
    if (result.code === 'USER_NOT_FOUND') {
      return json(request, {
        code: result.code,
        message: 'Профіль MAYAG ще не знайдено. Спочатку відкрий бота й заверши реєстрацію.'
      }, 404);
    }
    if (result.code === 'ROLE_NOT_AVAILABLE') {
      return json(request, {
        code: result.code,
        role: result.role,
        message: 'Кабінет на сайті поки доступний лише для тренерів.'
      }, 403);
    }
    if (result.code === 'BLOCKED') {
      return json(request, { code: result.code, message: 'Доступ до платформи призупинено.' }, 403);
    }
    return json(request, result);
  } catch (error) {
    console.error('cabinet coach login', error.message);
    return json(request, { code: 'SERVER_ERROR', message: 'Кабінет тимчасово недоступний.' }, 500);
  }
}
