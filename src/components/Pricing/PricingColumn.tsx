"use client";

import React from 'react';
import clsx from "clsx";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { IPricing } from "@/types";

interface Props {
    // 1. Déclare le type de la prop 'tier' avec votre interface IPricing
    tier: IPricing;
    highlight?: boolean;
    // 2. Déclare le type de la prop 't' pour la fonction de traduction
    t: ReturnType<typeof useTranslations>;
}

const PricingColumn: React.FC<Props> = ({ tier, highlight, t }: Props) => {
    const { name, price, features } = tier;

    return (
        <div className={clsx("w-full max-w-sm mx-auto bg-white rounded-xl border border-gray-200 lg:max-w-full", { "shadow-lg": highlight })}>
            <div className="p-6 border-b border-gray-200 rounded-t-xl">
                <h3 className="text-2xl font-semibold mb-4">{name}</h3>
                <p className="text-3xl md:text-5xl font-bold mb-6">
                    <span className={clsx({ "text-secondary": highlight })}>
                        {/* 3. Utilise 't' pour traduire les prix spéciaux */}
                        {typeof price === 'number' ? `$${price}` : t('custom_price_text')}
                    </span>
                    {typeof price === 'number' && <span className="text-lg font-normal text-gray-600">{t('per_month')}</span>}
                </p>
                <button className={clsx("w-full py-3 px-4 rounded-full transition-colors", { "bg-primary hover:bg-primary-accent": highlight, "bg-hero-background hover:bg-gray-200": !highlight })}>
                    {/* 4. Utilise 't' pour traduire le texte du bouton */}
                    {t('button_text')}
                </button>
            </div>
            <div className="p-6 mt-1">
                <p className="font-bold mb-0">{t('section_features_title')}</p>
                <p className="text-foreground-accent mb-5">{t('features_subtitle')}</p>
                <ul className="space-y-4 mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <BsFillCheckCircleFill className="h-5 w-5 text-secondary mr-2" />
                            <span className="text-foreground-accent">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PricingColumn;