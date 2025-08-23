"use client";

import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing/Pricing";
import FAQ from "@/components/FAQ";
import Logos from "@/components/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import { useTranslations } from "next-intl";

const HomePage: React.FC = () => {
    // Créez une instance de traduction pour chaque section
    const tPricing = useTranslations("pricing");
    const tTestimonials = useTranslations("testimonials");

    return (
        <>
            <Hero />
            <Logos />
            <Container>
                <Benefits />

                {/* --- CORRECTION ICI --- */}
                <Section
                    id="pricing"
                    title={tPricing("title")}
                    description={tPricing("description")}
                >
                    <Pricing />
                </Section>

                {/* --- CORRECTION ICI --- */}
                <Section
                    id="testimonials"
                    title={tTestimonials("title")} // Vous devrez aussi ajouter "title" et "description" à votre section testimonials dans le JSON
                    description={tTestimonials("description")}
                >
                    <Testimonials />
                </Section>

                <FAQ />
                <Stats />
                <CTA />
            </Container>
        </>
    );
};

export default HomePage;