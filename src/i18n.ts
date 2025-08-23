// src/i18n.ts
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

export const locales = ['en', 'fr', 'es'] as const;
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number];

function isValidLocale(locale: string | undefined): locale is Locale {
    return !!locale && (locales as ReadonlyArray<string>).includes(locale);
}

export default getRequestConfig(async ({locale}) => {
    // --- NOTRE ESPION ---
    console.log(`--- [i18n.ts] Début du traitement. La locale reçue est : "${locale}" ---`);

    if (!isValidLocale(locale)) {
        console.error(`--- [i18n.ts] ERREUR: La locale "${locale}" est invalide. Déclenchement de notFound(). ---`);
        notFound();
    }

    console.log(`--- [i18n.ts] Locale "${locale}" validée. Chargement des messages... ---`);

    try {
        const messages = (await import(`../messages/${locale}.json`)).default;
        console.log(`--- [i18n.ts] Fichier de messages pour "${locale}" chargé avec succès. ---`);
        return {
            messages,
            locale: locale
        };
    } catch (error) {
        console.error(`--- [i18n.ts] ERREUR FATALE: Le fichier de messages pour "${locale}" est introuvable ou invalide. Vérifiez le fichier ../messages/${locale}.json`, error);
        // On déclenche notFound() ici aussi pour être sûr
        notFound();
    }
});