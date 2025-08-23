"use client"

import React from 'react';
import { useTranslations } from 'next-intl';
import { IStats } from '@/types'; // Assurez-vous d'avoir cette interface
import { statsIcons } from '@/data/stats'; // Importez les icônes

const Stats: React.FC = () => {
    // Récupère les traductions pour la section 'stats'
    const t = useTranslations('stats');

    // Applique le type IStats[] aux données brutes du JSON
    const statsData: IStats[] = t.raw('items');

    return (
        <section id="stats" className="py-10 lg:py-20">
            <div className="grid sm:grid-cols-3 gap-8">
                {statsData.map((stat, index) => (
                    <div key={stat.title} className="text-center sm:text-left max-w-md sm:max-w-full mx-auto">
                        <h3 className="mb-5 flex items-center gap-2 text-3xl font-semibold justify-center sm:justify-start">
                            {statsIcons[index]}
                            {stat.title}
                        </h3>
                        <p className="text-foreground-accent">{stat.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;