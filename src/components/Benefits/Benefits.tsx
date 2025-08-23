"use client"
import React from 'react'
import { useTranslations } from 'next-intl';
import BenefitSection from "./BenefitSection"
import { benefitsData } from '@/data/benefits'; // Importez le fichier de données statiques

// 1. Importez les interfaces nécessaires
import { IBenefit, IBenefitBullet } from "@/types";

// 2. Définissez une nouvelle interface pour la structure combinée
interface ICombinedBenefitBullet extends IBenefitBullet {
    icon: React.ReactElement;
}

interface ICombinedBenefit extends IBenefit {
    imageSrc: string;
    image_alt: string;
    bullets: ICombinedBenefitBullet[];
}


const Benefits: React.FC = () => {
    const t = useTranslations('benefits');
    // 3. Typage explicite des données du JSON
    const benefitsTrans: IBenefit[] = t.raw('items');

    return (
        <div id="features">
            <h2 className="sr-only">{t('heading')}</h2>
            {benefitsTrans.map((item, index) => {
                const benefitWithStaticData: ICombinedBenefit = {
                    ...item,
                    imageSrc: benefitsData.images[index],
                    image_alt: benefitsData.imageAlts[index], // Assurez-vous d'avoir cette propriété dans votre data
                    // 4. Typage explicite du tableau 'bullets'
                    bullets: item.bullets.map((bullet, bulletIndex) => ({
                        ...bullet,
                        icon: benefitsData.bulletIcons[index][bulletIndex]
                    }))
                };
                return <BenefitSection key={index} benefit={benefitWithStaticData} imageAtRight={index % 2 !== 0} />
            })}
        </div>
    )
}

export default Benefits;