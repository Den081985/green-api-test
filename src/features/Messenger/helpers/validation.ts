import type { InstanceSettings } from '../types';

export const normalizePhone = (value: string) => {
  if (!/^[+\d\s()-]+$/.test(value))
    throw new Error('Введите номер телефона без букв.');
  const digits = value.replace(/\D/g, '');
  const phone = /^8\d{10}$/.test(digits)
    ? `7${digits.slice(1)}`
    : digits;
  if (!/^7\d{10}$/.test(phone))
    throw new Error('Введите номер в формате +7 (999) 123-45-67 или 8 (999) 123-45-67.');
  return phone;
};
export const normalizeApiUrl = (value: string) => {
  const url = new URL(value);
  if (
    url.protocol !== 'https:' ||
    !/(^|\.)green-api\.com$/.test(url.hostname) ||
    url.username ||
    url.password ||
    url.port ||
    url.search ||
    url.hash ||
    !/^\/?$/.test(url.pathname)
  ) {
    throw new Error(
      'Укажите HTTPS apiUrl из кабинета GREEN-API, например https://3100.api.green-api.com.'
    );
  }
  return url.origin;
};

export const validateSettings = (settings: InstanceSettings) => {
  const issues: string[] = [];
  if (settings.webhookUrl)
    issues.push(
      'заполнено поле «Адрес отправки уведомлений (webhookUrl)» — ' +
        'очистите его для получения сообщений в этом приложении'
    );
  if (settings.incomingWebhook === 'no')
    issues.push(
      'выключена настройка «Получать уведомления о входящих сообщениях ' +
        '(incomingWebhook)» — включите её'
    );
  else if (settings.incomingWebhook !== 'yes')
    issues.push(
      'API не вернул ожидаемое значение incomingWebhook (yes/no) — проверьте настройки инстанса'
    );
  if (issues.length)
    throw new Error(
      `В настройках инстанса GREEN-API: ${issues.join('; ')}. ` +
        'Сохраните изменения, подождите около минуты и нажмите «Открыть чат» снова.'
    );
};
