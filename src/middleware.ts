// src/middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    locales: ['en', 'fr','es'],
    defaultLocale: 'en'
});

export const config = {
    // On utilise un matcher plus explicite pour être sûr de tout attraper
    matcher: [
        '/', // La racine du site
        '/(fr|en|es)/:path*', // Tous les chemins préfixés par 'fr' ou 'en'
    ]
};