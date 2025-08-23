import Link from 'next/link';
import React from 'react';
import { FaFingerprint } from 'react-icons/fa';
import { useTranslations } from 'next-intl'; // Importez le hook de traduction

import { siteDetails } from '@/data/siteDetails';
import { footerData } from '@/data/footer'; // Assurez-vous d'importer le fichier de données adapté
import { getPlatformIconByName } from '@/utils';

const Footer: React.FC = () => {
    // Récupère les traductions pour la section 'footer' dans common.json
    const t = useTranslations('common.footer');

    // Définissez les liens rapides en utilisant les traductions
    const quickLinks = [
        {
            text: t('quickLinks.features'),
            url: "#features"
        },
        {
            text: t('quickLinks.pricing'),
            url: "#pricing"
        },
        {
            text: t('quickLinks.testimonials'),
            url: "#testimonials"
        }
    ];

    return (
        <footer className="bg-hero-background text-foreground py-10">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <Link href="/" className="flex items-center gap-2">
                        <FaFingerprint className="min-w-fit w-5 h-5 md:w-7 md:h-7" />
                        <h3 className="manrope text-xl font-semibold cursor-pointer">
                            {siteDetails.siteName}
                        </h3>
                    </Link>
                    <p className="mt-3.5 text-foreground-accent">
                        {/* Utilise la traduction pour le sous-titre */}
                        {t('subheading')}
                    </p>
                </div>
                <div>
                    {/* Utilise la traduction pour le titre des liens rapides */}
                    <h4 className="text-lg font-semibold mb-4">{t('quickLinks_title')}</h4>
                    <ul className="text-foreground-accent">
                        {quickLinks.map(link => (
                            <li key={link.text} className="mb-2">
                                <Link href={link.url} className="hover:text-foreground">{link.text}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {/* Utilise la traduction pour le titre du contact */}
                    <h4 className="text-lg font-semibold mb-4">{t('contact_title')}</h4>

                    {footerData.email && <a href={`mailto:${footerData.email}`} className="block text-foreground-accent hover:text-foreground">Email: {footerData.email}</a>}

                    {footerData.telephone && <a href={`tel:${footerData.telephone}`} className="block text-foreground-accent hover:text-foreground">Phone: {footerData.telephone}</a>}

                    {footerData.socials && (
                        <div className="mt-5 flex items-center gap-5 flex-wrap">
                            {Object.keys(footerData.socials).map(platformName => {
                                // Assurez-vous que l'URL existe avant d'afficher le lien
                                if (footerData.socials[platformName]) {
                                    return (
                                        <Link
                                            href={footerData.socials[platformName]!} // Utilisation de ! pour affirmer que la valeur n'est pas undefined
                                            key={platformName}
                                            aria-label={platformName}
                                        >
                                            {getPlatformIconByName(platformName)}
                                        </Link>
                                    )
                                }
                                return null; // Retourne null si l'URL est undefined
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 md:text-center text-foreground-accent px-6">
                <p>
                    {/* Utilise la traduction pour le copyright, en injectant l'année et le nom du site */}
                    {t('copyright_text', { year: new Date().getFullYear(), siteName: siteDetails.siteName })}
                </p>
                <p className="text-sm mt-2 text-gray-500">
                    {t('made_by_text')}
                    <a href="https://nexilaunch.com" target="_blank" rel="noopener noreferrer">Nexi Launch</a>
                </p>
                <p className="text-sm mt-2 text-gray-500">
                    {t('ui_kit_text')}
                    <a href="https://ui8.net/youthmind/products/fintech-finance-mobile-app-ui-kit" target="_blank" rel="noopener noreferrer">Youthmind</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;