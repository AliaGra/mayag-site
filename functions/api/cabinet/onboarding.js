import {
  json,
  options,
  supabaseMutation,
  supabaseRows
} from '../../_lib/api.js';
import { getCoachProfile } from './coach.js';

const REQUEST_TTL_MS = 15 * 60 * 1000;
const BOT_URL = 'https://t.me/MAYAG_fit_Platform_bot';

function normalizePhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.startsWith('00')) digits = digits.slice(2);
  if (digits.startsWith('0')) digits = '380' + digits;
  return digits.length >= 10 && digits.length <= 15 ? `+${digits}` : '';
}

function bytesToHex(bytes) {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function createToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

async function hashToken(token) {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(String(token))
  );
  return bytesToHex(new Uint8Array(digest));
}

function publicStatus(row) {
  const expiresAt = new Date(row.expires_at).getTime();
  if (row.status === 'pending' || row.status === 'contact_confirmed') {
    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return 'expired';
  }
  return row.status;
}

export async function onRequestOptions({ request }) {
  return options(request);
}

export async function onRequestPost({ request, env }) {
  try {
    const payload = await request.json();
    const phone = normalizePhone(payload && payload.phone);
    if (!phone) {
      return json(request, {
        code: 'INVALID_PHONE',
        message: 'Введи коректний номер телефону.'
      }, 400);
    }
    const token = await createToken();
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + REQUEST_TTL_MS).toISOString();
    const rows = await supabaseMutation(
      env,
      'web_cabinet_onboarding',
      'POST',
      {},
      { token_hash: tokenHash, phone, expires_at: expiresAt }
    );
    if (!rows.length) throw new Error('Onboarding request was not created');
    return json(request, {
      code: 'OK',
      token,
      expiresAt,
      telegramUrl: `${BOT_URL}?start=web_${token}`
    });
  } catch (error) {
    console.error('cabinet onboarding create', error.message);
    return json(request, {
      code: 'SERVER_ERROR',
      message: 'Не вдалося створити запит. Спробуй ще раз.'
    }, 500);
  }
}

export async function onRequestGet({ request, env }) {
  try {
    const token = new URL(request.url).searchParams.get('token') || '';
    if (!/^[a-f0-9]{64}$/i.test(token)) {
      return json(request, { code: 'INVALID_TOKEN' }, 400);
    }
    const tokenHash = await hashToken(token);
    const rows = await supabaseRows(env, 'web_cabinet_onboarding', {
      select: 'status,chat_id,expires_at',
      token_hash: `eq.${tokenHash}`,
      limit: '1'
    });
    const row = rows[0];
    if (!row) return json(request, { code: 'NOT_FOUND' }, 404);
    const status = publicStatus(row);
    if (status === 'expired') {
      if (row.status !== 'expired') {
        await supabaseMutation(env, 'web_cabinet_onboarding', 'PATCH', {
          token_hash: `eq.${tokenHash}`
        }, { status: 'expired' });
      }
      return json(request, { code: 'OK', status: 'expired' });
    }
    if (status !== 'completed') return json(request, { code: 'OK', status });
    const profile = await getCoachProfile(env, String(row.chat_id || ''));
    return json(request, {
      code: 'OK',
      status,
      profile: profile.profile || null,
      profileCode: profile.code,
      message: profile.code === 'ROLE_NOT_AVAILABLE'
        ? 'Кабінет на сайті доступний лише для тренерів.'
        : profile.code === 'BLOCKED'
          ? 'Доступ до платформи призупинено.'
          : profile.code === 'USER_NOT_FOUND'
            ? 'Профіль MAYAG ще не знайдено.'
            : ''
    });
  } catch (error) {
    console.error('cabinet onboarding status', error.message);
    return json(request, {
      code: 'SERVER_ERROR',
      message: 'Не вдалося перевірити статус реєстрації.'
    }, 500);
  }
}
