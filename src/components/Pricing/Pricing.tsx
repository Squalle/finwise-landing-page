import React from 'react';
import PricingColumn from "./PricingColumn";
import { useTranslations } from "next-intl";
import { IPricing } from "@/types";

const Pricing: React.FC = () => {
    // 1. Récupère les traductions de la section 'pricing'
    const t = useTranslations('pricing');

    // 2. Applique le type IPricing[] aux données brutes du JSON
    const tiers: IPricing[] = t.raw('plans');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
                <PricingColumn
                    key={tier.name}
                    tier={tier}
                    highlight={index === 1}
                    t={t} // 3. Passe la fonction de traduction 't' en prop
                />
            ))}
        </div>
    )
}

export default Pricing;