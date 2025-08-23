// src/app/[lang]/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { getMessages, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '../../i18n';
import { notFound } from 'next/navigation';

import Header from '@/components/Header';
// <-- 1. IMPORT DU FOOTER AJOUTÉ
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
                                           params: { lang }
                                       }: {
    params: { lang: Locale }
}): Promise<Metadata> {
    const t = await getTranslations({ locale: lang, namespace: 'metadata' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function LocaleLayout({
                                               children,
                                               params: { lang }
                                           }: {
    children: React.ReactNode;
    params: { lang: Locale };
}) {
    if (!locales.includes(lang)) {
        notFound();
    }

    let messages;
    try {
        messages = await getMessages();
        // --- NOTRE ESPION ---
        // Affiche les messages chargés dans le terminal du serveur.
        console.log(`[Layout pour "${lang}"] Messages chargés avec succès.`);

    } catch (error) {
        // S'il y a une erreur ici, on la verra clairement.
        console.error(`[Layout pour "${lang}"] ERREUR CRITIQUE: Impossible de charger les messages !`, error);
    }

    // Si les messages n'ont pas pu être chargés, on affiche un message d'erreur clair
    // au lieu de planter l'application.
    if (!messages) {
        return (
            <html lang={lang}>
            <body>
            <h1>Erreur de chargement des traductions.</h1>
            <p>Veuillez vérifier la console du terminal où `npm run dev` est lancé.</p>
            </body>
            </html>
        );
    }

    return (
        <html lang={lang}>
        <body className={inter.className}>
        <NextIntlClientProvider locale={lang} messages={messages}>
            <Header />

            <main>{children}</main>

            {/* <-- 2. COMPOSANT FOOTER AJOUTÉ */}
            <Footer />
        </NextIntlClientProvider>
        </body>
        </html>
    );
}