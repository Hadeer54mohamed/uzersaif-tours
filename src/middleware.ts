import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // تطابق جميع المسارات ما عدا الملفات الثابتة و API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
