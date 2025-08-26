"use client";

import React from 'react';
import { useTranslations } from 'next-intl';

// Importez tous vos composants de logo
import KenziLogo from './logos/KenziLogo';
import RaoudLogo from './logos/RaoudLogo';
import SuperkidsLogo from './logos/SuperkidsLogo';         // <-- LOGO AJOUTÉ
import AupetitparadisLogo from './logos/AupetitparadisLogo'; // <-- LOGO AJOUTÉ

const Logos: React.FC = () => {
    const t = useTranslations('logos');
    const customersCount = "2000+";

    return (
        <section id="logos" className="py-32 px-5 bg-background">
            <p className="text-lg font-medium text-center text-foreground">
                {t('trusted_by_text', { customersCount: customersCount })}
            </p>
            <div className="mt-8 w-full flex flex-wrap flex-row items-center justify-center gap-x-12 gap-y-10 text-foreground opacity-50">
                {/* Utilisez les composants ici */}
                <KenziLogo className="h-10 w-auto" />
                <RaoudLogo className="h-12 w-auto" />
                <SuperkidsLogo className="h-10 w-auto" />      {/* <-- LOGO AJOUTÉ */}
                <AupetitparadisLogo className="h-12 w-auto" /> {/* <-- LOGO AJOUTÉ */}
            </div>
        </section>
    );
};

export default Logos;