import React from 'react';

export function Toast({ toast, toastType, t, onClose }) {
    if (!toast) return null;

    return (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] toast-enter">
            <div className={`
                relative px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-2xl 
                flex items-start gap-3 sm:gap-4 max-w-sm
                backdrop-blur-sm border-2
                ${toastType === 'success' 
                    ? 'bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white border-white/20 shadow-[0_18px_30px_var(--button-primary-shadow)]' 
                    : 'bg-gradient-to-r from-red-500 to-red-600 text-white border-white/20'
                }
            `}>
                <div className={`
                    flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full 
                    flex items-center justify-center
                    ${toastType === 'success' 
                        ? 'bg-white/20' 
                        : 'bg-white/20'
                    }
                `}>
                    {toastType === 'success' ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm sm:text-base leading-tight">
                        {toastType === 'success' ? t.toast.success : t.toast.error}
                    </p>
                    <p className="text-xs sm:text-sm mt-1 opacity-95 leading-relaxed">
                        {toast}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                    aria-label={t.portfolio.close}
                >
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
                    <div 
                        className="h-full bg-white"
                        style={{
                            animation: 'progress 4s linear forwards',
                            width: '100%'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}


