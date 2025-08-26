// src/components/Header.tsx
'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { HiOutlineXMark, HiBars3 } from 'react-icons/hi2';
import { FaFingerprint } from 'react-icons/fa';
import { useTranslations } from 'next-intl';
import Container from './Container';
import { siteDetails } from '@/data/siteDetails';

// On importe notre hook personnalisé `useModal`
import { useModal } from '@/context/ModalContext';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const t = useTranslations('common.header');
    const tMenu = useTranslations('common.header.menu');

    // On récupère la fonction pour ouvrir la modale depuis le contexte partagé
    const { openModal } = useModal();

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const menuItems = [
        { text: tMenu('features'), url: "#features" },
        { text: tMenu('pricing'), url: "#pricing" },
        { text: tMenu('testimonials'), url: "#testimonials" }
    ];

    return (
        <header className="bg-transparent fixed top-0 left-0 right-0 md:absolute z-50 mx-auto w-full">
            <Container className="!px-0">
                <nav className="shadow-md md:shadow-none bg-white md:bg-transparent mx-auto flex justify-between items-center py-2 px-5 md:py-10">
                    <Link href="/" className="flex items-center gap-2">
                        <FaFingerprint className="text-foreground min-w-fit w-7 h-7" />
                        <span className="manrope text-xl font-semibold text-foreground cursor-pointer">
                            {siteDetails.siteName}
                        </span>
                    </Link>

                    <ul className="hidden md:flex space-x-6 items-center">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-foreground-accent transition-colors">
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                type="button"
                                onClick={openModal} // On utilise la fonction du contexte ici
                                className="text-black bg-primary hover:bg-primary-accent px-8 py-3 rounded-full transition-colors"
                            >
                                {t('download_button')}
                            </button>
                        </li>
                    </ul>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="bg-primary text-black focus:outline-none rounded-full w-10 h-10 flex items-center justify-center"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            {isMobileMenuOpen ? <HiOutlineXMark className="h-6 w-6" /> : <HiBars3 className="h-6 w-6" />}
                            <span className="sr-only">Toggle navigation</span>
                        </button>
                    </div>
                </nav>
            </Container>

            <Transition
                show={isMobileMenuOpen}
                enter="transition ease-out duration-200 transform"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75 transform"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div id="mobile-menu" className="md:hidden bg-white shadow-lg">
                    <ul className="flex flex-col space-y-4 pt-1 pb-6 px-6">
                        {menuItems.map(item => (
                            <li key={item.text}>
                                <Link href={item.url} className="text-foreground hover:text-primary block" onClick={toggleMobileMenu}>
                                    {item.text}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <button
                                type="button"
                                onClick={() => {
                                    openModal();
                                    toggleMobileMenu();
                                }}
                                className="text-black bg-primary hover:bg-primary-accent px-5 py-2 rounded-full block w-fit"
                            >
                                {t('get_started_button')}
                            </button>
                        </li>
                    </ul>
                </div>
            </Transition>
        </header>
    );
};

export default Header;