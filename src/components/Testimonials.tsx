'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ITestimonial } from '@/types';
import { siteDetails } from '@/data/siteDetails';

const Testimonials: React.FC = () => {
    const t = useTranslations('testimonials');
    const testimonialsData: ITestimonial[] = t.raw('items');

    return (
        <div className="grid gap-14 max-w-lg w-full mx-auto lg:gap-8 lg:grid-cols-3 lg:max-w-full">
            {testimonialsData.map((testimonial, index) => (
                <div key={index}>
                    <div className="flex items-center mb-4 w-full justify-center lg:justify-start">
                        <Image
                            src={`/images/testimonial-${index + 1}.webp`}
                            alt={`${testimonial.name} avatar`}
                            width={50}
                            height={50}
                            className="rounded-full shadow-md"
                        />
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-secondary">{testimonial.name}</h3>
                            <p className="text-sm text-foreground-accent">{testimonial.role}</p>
                        </div>
                    </div>
                    {/* --- CORRECTION ICI --- */}
                    <p className="text-foreground-accent text-center lg:text-left">
                        &quot;{testimonial.message.replace('{siteName}', siteDetails.siteName)}&quot;
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Testimonials;