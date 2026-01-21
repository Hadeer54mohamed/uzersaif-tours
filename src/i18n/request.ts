import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // الحصول على اللغة من المسار
  let locale = await requestLocale;

  // التأكد من أن اللغة مدعومة، وإلا استخدام اللغة الافتراضية
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});