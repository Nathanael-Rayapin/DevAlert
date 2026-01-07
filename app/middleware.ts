import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Negotiator from 'negotiator';
import { match } from '@formatjs/intl-localematcher';
import { dictionaries } from '@dictionary';

const locales = Object.keys(dictionaries);
const defaultLocale = 'fr';

// Détecter la langue préférée du navigateur
function getLocale(request: NextRequest): string {
    const acceptLanguage = request.headers.get('accept-language');

    if (!acceptLanguage) return defaultLocale;

    // Parser les langues préférées
    const headers = { 'accept-language': acceptLanguage };
    const languages = new Negotiator({ headers }).languages();

    try {
        return match(languages, locales, defaultLocale);
    } catch {
        return defaultLocale;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Vérifier si l'URL contient déjà une locale
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Rediriger vers l'URL avec la locale
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname}`;

    return NextResponse.redirect(request.nextUrl);
}