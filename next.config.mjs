// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

// Le chemin vers votre fichier i18n.ts est NÉCESSAIRE ici
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {},
    },
};

export default withNextIntl(nextConfig);