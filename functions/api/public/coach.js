import { json, options, requireEnv, supabaseRows, cleanUrl } from '../../_lib/api.js';

function mapTypes(types) {
  const values = Array.isArray(types) ? types : [];
  const labels = [];
  if (values.includes('individual')) labels.push('Індивідуальні');
  if (values.includes('group')) labels.push('Групові');
  return labels;
}

export async function onRequestOptions({ request }) {
  return options(request);
}

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const id = String(url.searchParams.get('id') || '').trim();
    if (!/^\d+$/.test(id)) {
      return json(request, { code: 'BAD_REQUEST', message: 'Не вказано тренера.' }, 400);
    }

    const users = await supabaseRows(env, 'users', {
      select: 'chat_id,first_name,last_name,city,oblast,district,birth_date,instagram,telegram_username,coach_training_types,role,is_blocked',
      chat_id: `eq.${id}`,
      role: 'eq.coach',
      limit: '1'
    });
    const user = users[0];
    if (!user || user.is_blocked === true) {
      return json(request, { code: 'NOT_FOUND', message: 'Тренера не знайдено.' }, 404);
    }

    const links = await supabaseRows(env, 'coach_venues', {
      select: 'venue_id,listing_visible',
      coach_chat_id: `eq.${id}`,
      teaches_here: 'eq.true'
    });
    const venueIds = links
      .filter((link) => link.listing_visible !== false)
      .map((link) => String(link.venue_id || '').trim())
      .filter((venueId) => /^[A-Za-z0-9_-]+$/.test(venueId));
    if (!venueIds.length) {
      return json(request, { code: 'NOT_FOUND', message: 'Публічну картку тренера не знайдено.' }, 404);
    }

    const venues = await supabaseRows(env, 'venues', {
      select: 'id,name_ua,city,address,instagram_url,telegram_url,phone,is_active',
      id: `in.(${venueIds.join(',')})`,
      is_active: 'eq.true'
    });
    const documents = await supabaseRows(env, 'coach_documents', {
      select: 'id',
      coach_chat_id: `eq.${id}`
    });

    return json(request, {
      code: 'OK',
      profile: {
        firstName: String(user.first_name || ''),
        lastName: String(user.last_name || ''),
        city: String(user.city || ''),
        oblast: String(user.oblast || ''),
        district: String(user.district || ''),
        birthDate: user.birth_date || null,
        instagram: cleanUrl(user.instagram, 'https://instagram.com/'),
        telegramUsername: String(user.telegram_username || '').replace(/^@/, ''),
        trainingTypes: mapTypes(user.coach_training_types),
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
      }
    });
  } catch (error) {
    console.error('public coach card', error.message);
    return json(request, { code: 'SERVER_ERROR', message: 'Картка тимчасово недоступна.' }, 500);
  }
}
