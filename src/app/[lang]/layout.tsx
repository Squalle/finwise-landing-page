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
import Footer from '@/components/Footer';
// 1. Importer le Provider ET la Modale
import { ModalProvider } from '@/context/ModalContext';
import DemoRequestModal from '@/components/DemoRequestModal';

const inter = Inter({ subsets: ['latin'] });

// (La fonction generateMetadata ne change pas)
export async function generateMetadata({ params: { lang } }: { params: { lang: Locale } }): Promise<Metadata> {
    const t = await getTranslations({ locale: lang, namespace: 'metadata' });
    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function LocaleLayout({ children, params: { lang } }: { children: React.ReactNode; params: { lang: Locale }; }) {
    if (!locales.includes(lang)) {
        notFound();
    }
    const messages = await getMessages();

    return (
        <html lang={lang}>
        <body className={inter.className}>
        <NextIntlClientProvider locale={lang} messages={messages}>
            {/* 2. Le Provider enveloppe tout */}
            <ModalProvider>
                <Header />
                <main>{children}</main>
                <Footer />

                {/* 3. La modale est rendue ici. Elle s'affichera quand l'état changera. */}
                <DemoRequestModal />
            </ModalProvider>
        </NextIntlClientProvider>
        </body>
        </html>
    );
}