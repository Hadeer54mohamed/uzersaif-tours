import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // الحصول على اللغة المفضلة من الكوكيز أو استخدام العربية كافتراضي
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar';
  
  // إضافة الهيدر للغة
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);
  
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
