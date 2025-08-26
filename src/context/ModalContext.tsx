// src/context/ModalContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// On définit la structure du contexte
type ModalContextType = {
    openModal: () => void;
    closeModal: () => void;
    isModalOpen: boolean;
};

// On crée le contexte
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// On crée le "Provider" qui va envelopper notre application
export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

// On crée le hook pour utiliser facilement le contexte dans d'autres composants
export const useModal = () => {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};