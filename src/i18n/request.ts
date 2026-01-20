import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const locales = ['ar', 'en'] as const;
const defaultLocale = 'ar';

export default getRequestConfig(async () => {
  // الحصول على اللغة من الكوكيز أو الهيدر أو استخدام اللغة الافتراضية
  const cookieStore = await cookies();
  const headersList = await headers();
  
  // محاولة الحصول على اللغة من الكوكيز
  let locale: string | undefined = cookieStore.get('NEXT_LOCALE')?.value;
  
  // إذا لم توجد، نحاول من Accept-Language header
  if (!locale) {
    const acceptLanguage = headersList.get('accept-language');
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(',')[0].split('-')[0];
      if (locales.includes(preferredLocale as any)) {
        locale = preferredLocale;
      }
    }
  }
  
  // التأكد من أن اللغة مدعومة، وإلا استخدام اللغة الافتراضية
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});