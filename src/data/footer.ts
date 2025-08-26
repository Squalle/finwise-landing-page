// src/data/footer.ts (ou renommez-le footerData.ts pour plus de clarté)

import { ISocials } from "@/types";

export const footerData: {
    email: string;
    telephone: string;
    socials: ISocials;
} = {
    email: 'info@procreche.com',
    telephone: '+1 (123) 456-7890',
    socials: {
        twitter: 'https://twitter.com/Twitter',
        facebook: 'https://facebook.com',
        linkedin: 'https://www.linkedin.com',
        instagram: 'https://www.instagram.com',
    }
}