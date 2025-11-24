import React from 'react';
import logo from '../assets/fulllogo.png';
import { smoothScrollTo } from '../utils/smoothScroll';

export function Header({ language, t, changeLanguage }) {
    return (
        <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img src={logo} alt="WebNexum - разработка сайтов в Минске" className="w-12 h-12 object-contain rounded"/>
                    <div>
                        <div className="text-lg font-semibold">WebNexum</div>
                        <div className="text-xs text-[var(--muted)] -mt-1">Digital solutions under one roof</div>
                    </div>
                </div>
                <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-[var(--muted)]" aria-label={language === 'ru' ? "Основная навигация" : "Main navigation"}>
                    <a href="#services" onClick={(e) => smoothScrollTo(e, 'services')} className="hover:text-[var(--text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded px-2 py-1" aria-label={t.nav.services}>{t.nav.services}</a>
                    <a href="#process" onClick={(e) => smoothScrollTo(e, 'process')} className="hover:text-[var(--text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded px-2 py-1" aria-label={t.nav.process}>{t.nav.process}</a>
                    <a href="#portfolio" onClick={(e) => smoothScrollTo(e, 'portfolio')} className="hover:text-[var(--text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded px-2 py-1" aria-label={t.nav.portfolio}>{t.nav.portfolio}</a>
                    <a href="#about" onClick={(e) => smoothScrollTo(e, 'about')} className="hover:text-[var(--text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded px-2 py-1" aria-label={t.nav.about}>{t.nav.about}</a>
                    <a href="#contact"
                       onClick={(e) => smoothScrollTo(e, 'contact')}
                       className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 font-semibold"
                       aria-label={t.nav.contact}>{t.nav.contact}</a>
                </nav>
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => changeLanguage('ru')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 ${
                            language === 'ru' 
                                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md' 
                                : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]'
                        }`}
                        aria-label="Русский"
                        aria-pressed={language === 'ru'}
                    >
                        RU
                    </button>
                    <button
                        onClick={() => changeLanguage('en')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 ${
                            language === 'en' 
                                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white shadow-md' 
                                : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]'
                        }`}
                        aria-label="English"
                        aria-pressed={language === 'en'}
                    >
                        EN
                    </button>
                </div>
            </div>
        </header>
    );
}


