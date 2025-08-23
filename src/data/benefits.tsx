// src/data/benefits.ts

import React from 'react';
import { FaMoneyBill, FaShieldAlt } from 'react-icons/fa';

export const benefitsData = {
    images: [
        "/images/mockup-1.webp",
        "/images/mockup-2.webp"
    ],
    // ✅ Ajoutez la propriété 'imageAlts' ici
    imageAlts: [
        "Describing the first benefit's image.",
        "Describing the second benefit's image."
    ],
    bulletIcons: [
        [
            <FaMoneyBill key="money-bill" />,
            <FaShieldAlt key="shield-alt" />
        ],
        // Ajoutez ici les icônes pour le second avantage
        [
            <FaMoneyBill key="money-bill-2" />,
            <FaShieldAlt key="shield-alt-2" />
        ]
    ]
}