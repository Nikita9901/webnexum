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
                    <a href="#services" onClick={(e) => smoothScrollTo(e, 'services')} className="hover:text-[var(--text)]" aria-label={t.nav.services}>{t.nav.services}</a>
                    <a href="#process" onClick={(e) => smoothScrollTo(e, 'process')} className="hover:text-[var(--text)]" aria-label={t.nav.process}>{t.nav.process}</a>
                    <a href="#portfolio" onClick={(e) => smoothScrollTo(e, 'portfolio')} className="hover:text-[var(--text)]" aria-label={t.nav.portfolio}>{t.nav.portfolio}</a>
                    <a href="#about" onClick={(e) => smoothScrollTo(e, 'about')} className="hover:text-[var(--text)]" aria-label={t.nav.about}>{t.nav.about}</a>
                    <a href="#contact"
                       onClick={(e) => smoothScrollTo(e, 'contact')}
                       className="px-4 py-2 rounded bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white hover:brightness-110 transition-all"
                       aria-label={t.nav.contact}>{t.nav.contact}</a>
                </nav>
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => changeLanguage('ru')}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                            language === 'ru' 
                                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white' 
                                : 'text-[var(--muted)] hover:text-[var(--text)]'
                        }`}
                        aria-label="Русский"
                    >
                        RU
                    </button>
                    <button
                        onClick={() => changeLanguage('en')}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-all ${
                            language === 'en' 
                                ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white' 
                                : 'text-[var(--muted)] hover:text-[var(--text)]'
                        }`}
                        aria-label="English"
                    >
                        EN
                    </button>
                </div>
            </div>
        </header>
    );
}


