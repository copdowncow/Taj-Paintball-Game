// Email уведомления через Resend (resend.com)
// Бесплатно: 3000 писем/месяц
// Регистрация: https://resend.com → получить API key

const RESEND_KEY = process.env.RESEND_API_KEY || '';
const FROM = process.env.EMAIL_FROM || 'Taj Paintball <noreply@tajpaintball.tj>';

async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_KEY) {
    console.warn('Email not sent: RESEND_API_KEY not configured');
    return false;
  }
  if (!to || !to.includes('@')) {
    console.warn('Email not sent: invalid email address:', to);
    return false;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    const data = await res.json() as { id?: string; name?: string; message?: string };
    if (res.ok && data.id) {
      console.log('Email sent:', data.id, 'to:', to);
      return true;
    }
    console.error('Email error:', data.message || data.name);
    return false;
  } catch (e) {
    console.error('Email send error:', e);
    return false;
  }
}

// ─── Шаблоны писем ────────────────────────────────────────────────────────────

const BASE_STYLE = `
  font-family: Inter, system-ui, sans-serif;
  background: #0a0a0a;
  color: #ffffff;
  max-width: 520px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
`;

const HEADER = `
  <div style="background: linear-gradient(135deg, #f97316, #dc2626); padding: 32px 24px; text-align: center;">
    <div style="font-size: 28px; font-weight: 900; color: white; letter-spacing: -1px;">
      🎯 TAJ PAINTBALL
    </div>
  </div>
`;

function card(content: string) {
  return `
    <div style="${BASE_STYLE}">
      ${HEADER}
      <div style="padding: 28px 24px; background: #111111;">
        ${content}
      </div>
      <div style="padding: 16px 24px; background: #0a0a0a; text-align: center; border-top: 1px solid #222;">
        <p style="color: #555; font-size: 12px; margin: 0;">
          Чордомаи Аэропорт, рядом с клиникой «Нигох» · +992 50 213 14 15
        </p>
      </div>
    </div>
  `;
}

function row(label: string, value: string) {
  return `
    <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #222;">
      <span style="color: #888; font-size: 14px;">${label}</span>
      <span style="color: #fff; font-size: 14px; font-weight: 600;">${value}</span>
    </div>
  `;
}

function btn(text: string, href: string) {
  return `
    <a href="${href}" style="display: inline-block; background: #f97316; color: white; font-weight: 700;
      padding: 14px 28px; border-radius: 12px; text-decoration: none; font-size: 15px; margin-top: 20px;">
      ${text}
    </a>
  `;
}

// ─── Письмо 1: Заявка принята ─────────────────────────────────────────────────
export function emailBookingCreated(params: {
  to: string;
  booking_number: string;
  customer_name: string;
  game_date: string;
  game_time: string;
  players_count: number;
  balls_count: number;
  total_price: number;
  prepayment_amount: number;
}) {
  const subject = `🎯 Заявка #${params.booking_number} принята — Taj Paintball`;
  const html = card(`
    <h2 style="color: #f97316; font-size: 22px; font-weight: 900; margin: 0 0 8px;">
      Заявка принята!
    </h2>
    <p style="color: #aaa; font-size: 14px; margin: 0 0 24px;">
      Привет, ${params.customer_name}! Мы получили вашу заявку на игру.
    </p>
    ${row('📋 Номер брони', `#${params.booking_number}`)}
    ${row('📅 Дата', new Date(params.game_date + 'T12:00:00').toLocaleDateString('ru-RU', { weekday:'long', day:'numeric', month:'long', year:'numeric' }))}
    ${row('🕐 Время', params.game_time.substring(0, 5))}
    ${row('👥 Игроков', `${params.players_count} чел.`)}
    ${row('🎯 Шаров', `${params.balls_count} шт.`)}
    ${row('💵 Итого', `${params.total_price} сомони`)}
    ${row('💰 Предоплата', `${params.prepayment_amount} сомони`)}
    <div style="background: #1a1000; border: 1px solid #f97316; border-radius: 12px; padding: 16px; margin-top: 20px;">
      <p style="color: #f97316; font-weight: 700; font-size: 14px; margin: 0 0 8px;">
        💰 Как внести предоплату:
      </p>
      <p style="color: #ccc; font-size: 13px; margin: 0; line-height: 1.6;">
        Переведите <strong style="color: white;">${params.prepayment_amount} сомони</strong> на номер
        <strong style="color: white;">+992 50 213 14 15</strong> через Алиф, СМАРТ или любой перевод.
        После оплаты прикрепите чек на сайте — бронь будет подтверждена автоматически.
      </p>
    </div>
    <p style="color: #555; font-size: 12px; margin-top: 20px;">
      Вопросы? Звоните: <a href="tel:+992502131415" style="color: #f97316;">+992 50 213 14 15</a>
    </p>
  `);
  return sendEmail(params.to, subject, html);
}

// ─── Письмо 2: Бронь подтверждена ────────────────────────────────────────────
export function emailBookingConfirmed(params: {
  to: string;
  booking_number: string;
  customer_name: string;
  game_date: string;
  game_time: string;
  players_count: number;
  total_price: number;
  prepayment_amount: number;
}) {
  const subject = `✅ Бронь #${params.booking_number} подтверждена — Taj Paintball`;
  const html = card(`
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 52px;">✅</div>
      <h2 style="color: #4ade80; font-size: 22px; font-weight: 900; margin: 8px 0 4px;">
        Бронь подтверждена!
      </h2>
      <p style="color: #aaa; font-size: 14px; margin: 0;">
        ${params.customer_name}, ждём вас на игру!
      </p>
    </div>
    ${row('📋 Номер брони', `#${params.booking_number}`)}
    ${row('📅 Дата', new Date(params.game_date + 'T12:00:00').toLocaleDateString('ru-RU', { weekday:'long', day:'numeric', month:'long' }))}
    ${row('🕐 Время', params.game_time.substring(0, 5))}
    ${row('👥 Игроков', `${params.players_count} чел.`)}
    ${row('💵 Остаток при игре', `${params.total_price - params.prepayment_amount} сомони`)}
    <div style="background: #0a1a0a; border: 1px solid #4ade80; border-radius: 12px; padding: 16px; margin-top: 20px;">
      <p style="color: #4ade80; font-weight: 700; font-size: 14px; margin: 0 0 6px;">📍 Как нас найти:</p>
      <p style="color: #ccc; font-size: 13px; margin: 0;">
        Чордомаи Аэропорт, рядом с клиникой «Нигох»
      </p>
    </div>
  `);
  return sendEmail(params.to, subject, html);
}

// ─── Письмо 3: Бронь отменена ─────────────────────────────────────────────────
export function emailBookingCancelled(params: {
  to: string;
  booking_number: string;
  customer_name: string;
}) {
  const subject = `❌ Бронь #${params.booking_number} отменена — Taj Paintball`;
  const html = card(`
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="font-size: 52px;">😔</div>
      <h2 style="color: #f87171; font-size: 22px; font-weight: 900; margin: 8px 0 4px;">
        Бронь отменена
      </h2>
      <p style="color: #aaa; font-size: 14px; margin: 0;">
        ${params.customer_name}, бронь #${params.booking_number} была отменена.
      </p>
    </div>
    <p style="color: #aaa; font-size: 14px; text-align: center; margin: 0 0 20px;">
      Если это ошибка или хотите перебронировать — свяжитесь с нами:
    </p>
    <div style="text-align: center;">
      <a href="tel:+992502131415" style="display: inline-block; background: #f97316; color: white;
        font-weight: 700; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-size: 15px;">
        📞 +992 50 213 14 15
      </a>
    </div>
  `);
  return sendEmail(params.to, subject, html);
}

// ─── Письмо 4: Вопрос/сообщение от администратора ────────────────────────────
export function emailAdminMessage(params: {
  to: string;
  customer_name: string;
  booking_number: string;
  message: string;
}) {
  const subject = `💬 Сообщение по брони #${params.booking_number} — Taj Paintball`;
  const html = card(`
    <h2 style="color: #f97316; font-size: 20px; font-weight: 900; margin: 0 0 8px;">
      Сообщение от администратора
    </h2>
    <p style="color: #aaa; font-size: 14px; margin: 0 0 20px;">
      ${params.customer_name}, по вашей брони #${params.booking_number}:
    </p>
    <div style="background: #1a1a1a; border-left: 3px solid #f97316; border-radius: 0 12px 12px 0;
      padding: 16px; margin-bottom: 20px;">
      <p style="color: #fff; font-size: 15px; margin: 0; line-height: 1.6;">${params.message}</p>
    </div>
    <p style="color: #555; font-size: 13px;">
      Ответить: <a href="tel:+992502131415" style="color: #f97316;">+992 50 213 14 15</a>
    </p>
  `);
  return sendEmail(params.to, subject, html);
}
