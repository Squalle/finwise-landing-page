// src/components/DemoRequestModal.tsx
"use client";

import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from '@formspree/react';
import { useModal } from '@/context/ModalContext';

// Importez la librairie pour le téléphone et ses styles
import PhoneInput, { type Country } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// Styles personnalisés pour mieux intégrer le champ téléphone
const phoneInputStyles = `
  .PhoneInputInput {
    flex: 1;
    min-width: 0;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
  .PhoneInputInput:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    border-color: var(--primary);
    box-shadow: 0 0 0 1px var(--primary);
  }
`;

export default function DemoRequestModal() {
    const t = useTranslations('form');
    const [state, handleSubmit] = useForm('VOTRE_ID_FORMULAIRE'); // N'oubliez pas de mettre votre ID Formspree
    const { isModalOpen, closeModal } = useModal();

    const [phone, setPhone] = useState<string | undefined>();
    const [country, setCountry] = useState<Country | undefined>();

    useEffect(() => {
        // On ne fait l'appel que si la modale est ouverte
        if (isModalOpen) {
            fetch('https://ipapi.co/country_code/')
                .then((res) => res.text())
                .then((response) => setCountry(response as Country))
                .catch(() => setCountry('FR')); // Pays par défaut en cas d'échec
        }
    }, [isModalOpen]);

    if (state.succeeded) {
        return (
            <Transition appear show={isModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                        <DialogPanel className="max-w-lg space-y-4 bg-white p-8 rounded-2xl shadow-lg text-center">
                            <DialogTitle as="h3" className="text-2xl font-bold manrope">{t('success_title')}</DialogTitle>
                            <p>{t('success_message')}</p>
                            <button onClick={closeModal} className="mt-4 w-full rounded-full bg-primary py-2.5 px-4 text-sm font-semibold text-black hover:bg-primary-accent">{t('close_button')}</button>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        );
    }

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={closeModal}>
                <style>{phoneInputStyles}</style>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel className="max-w-lg space-y-4 bg-white p-8 rounded-2xl shadow-lg">
                        <DialogTitle as="h3" className="text-2xl font-bold manrope">{t('demo_title')}</DialogTitle>
                        <p className="text-foreground-accent">{t('demo_subtitle')}</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="w-full">
                                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">{t('firstname_label')}</label>
                                    <input type="text" name="firstname" id="firstname" required minLength={2} maxLength={100} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('name_label')}</label>
                                    <input type="text" name="name" id="name" required minLength={2} maxLength={100} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email_label')}</label>
                                <input type="email" name="email" id="email" required maxLength={100} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('phone_label')}</label>
                                <PhoneInput
                                    id="phone"
                                    international
                                    defaultCountry={country}
                                    value={phone}
                                    onChange={setPhone}
                                    className="mt-1"
                                />
                                <input type="hidden" name="phone" value={phone || ''} />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-gray-700">{t('company_label')}</label>
                                <input type="text" name="company" id="company" maxLength={100} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm" />
                            </div>

                            {state.errors && <p className="text-red-500 text-sm">{t('error_message')}</p>}

                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={closeModal} className="w-full rounded-full bg-gray-100 py-2.5 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-200">
                                    {t('cancel_button')}
                                </button>
                                <button type="submit" disabled={state.submitting} className="w-full rounded-full bg-primary py-2.5 px-4 text-sm font-semibold text-black hover:bg-primary-accent disabled:bg-gray-300">
                                    {state.submitting ? t('submitting_button') : t('submit_button')}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </Transition>
    );
}