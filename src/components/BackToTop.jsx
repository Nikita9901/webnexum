import React from 'react';

export function BackToTop({ show, onClick }) {
    if (!show) return null;

    return (
        <button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
            aria-label="Вернуться наверх"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}


