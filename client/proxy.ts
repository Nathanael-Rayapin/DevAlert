import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { dictionaries } from '@dictionary';

const locales = Object.keys(dictionaries);
const defaultLocale = 'fr';

// Detect the browser's preferred language
function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get('accept-language');

    if (!acceptLanguage) return defaultLocale;

    // Parse preferred languages
    const headers = { 'accept-language': acceptLanguage };
    const languages = new Negotiator({ headers }).languages();

    try {
        return match(languages, locales, defaultLocale);
    } catch {
        return defaultLocale;
    }
}

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the URL already contains a locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect to the URL with the locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    // Match to tell the middleware which routes to intercept
    matcher: [
        // All routes EXCEPT:
        // - Static files (_next/static)
        // - Images (_next/image)
        // - Favicons, robots.txt, etc.
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};