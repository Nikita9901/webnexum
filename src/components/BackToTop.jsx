import React from 'react';

export function BackToTop({ show, onClick }) {
    if (!show) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-4 bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 shadow-[0_18px_36px_var(--button-primary-shadow)]"
            aria-label="Вернуться наверх"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}


