// src/components/Pricing/Pricing.tsx
import React from 'react';
import PricingColumn from "./PricingColumn";
import { useTranslations } from "next-intl";
import { IPricing } from "@/types";

const Pricing: React.FC = () => {
    const t = useTranslations('pricing');
    const tiers: IPricing[] = t.raw('plans');

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {tiers.map((tier, index) => ( // <-- "index" est déjà disponible ici
                <PricingColumn
                    key={tier.name}
                    tier={tier}
                    highlight={index === 1}
                    t={t}
                    index={index} // <-- ON AJOUTE L'INDEX EN PROP
                />
            ))}
        </div>
    )
}

export default Pricing;