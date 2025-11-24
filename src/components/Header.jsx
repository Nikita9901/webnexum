import React, { useState } from 'react';
import logoLight from '../assets/fulllogo.png';
import logoDark from '../assets/fulllogo-dark.png';
import { smoothScrollTo } from '../utils/smoothScroll';

export function Header({ language, t, changeLanguage, theme = 'light', onToggleTheme }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const logo = theme === 'dark' ? logoDark : logoLight;

    const navLinks = [
        { id: 'services', label: t.nav.services },
        { id: 'process', label: t.nav.process },
        { id: 'portfolio', label: t.nav.portfolio },
        { id: 'about', label: t.nav.about },
        { id: 'contact', label: t.nav.contact, isCTA: true },
    ];

    const handleNavClick = (e, targetId) => {
        smoothScrollTo(e, targetId);
        setMobileMenuOpen(false);
    };

    const ThemeIcon = () =>
        theme === 'dark' ? (
            <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
            </svg>
        ) : (
            <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-6.07l-1.41 1.41M8.34 17.66l-1.41 1.41m12.14 0l-1.41-1.41M8.34 6.34L6.93 4.93" />
            </svg>
        );

    const themeButtonClasses = `p-2.5 rounded-full border shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 ${
        theme === 'dark'
            ? 'bg-[var(--card)] text-[var(--accent)] border-white/10 md:border-white/20'
            : 'bg-white text-[var(--accent)] hover:text-[var(--accent-2)] border-transparent md:border-[color:var(--card-border)]'
    }`;

    const renderLanguageButtons = (extraClasses = '') => (
        <div className={`flex items-center gap-2 ${extraClasses}`}>
            <button
                onClick={() => changeLanguage('ru')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 ${
                    language === 'ru'
                        ? 'bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white shadow-md shadow-[0_8px_20px_var(--button-primary-shadow)]'
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
                        ? 'bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white shadow-md shadow-[0_8px_20px_var(--button-primary-shadow)]'
                        : 'text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--bg)]'
                }`}
                aria-label="English"
                aria-pressed={language === 'en'}
            >
                EN
            </button>
        </div>
    );

    return (
        <>
            <header className="sticky top-0 z-40 backdrop-blur bg-[var(--header-bg)] border-b border-[color:var(--header-border)]">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="WebNexum - разработка сайтов в Минске" className="w-12 h-12 object-contain rounded" />
                        <div>
                            <div className="text-lg font-semibold">WebNexum</div>
                            <div className="text-xs text-[var(--muted)] -mt-1">Digital solutions under one roof</div>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-[var(--muted)]" aria-label={language === 'ru' ? 'Основная навигация' : 'Main navigation'}>
                        {navLinks.map((link) =>
                            link.isCTA ? (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/30 font-semibold shadow-[0_12px_30px_var(--button-primary-shadow)]"
                                    aria-label={link.label}
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className="hover:text-[var(--text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded px-2 py-1"
                                    aria-label={link.label}
                                >
                                    {link.label}
                                </a>
                            )
                        )}
                    </nav>
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex">
                            <button
                                onClick={onToggleTheme}
                                type="button"
                                className={themeButtonClasses}
                                aria-label={language === 'ru' ? 'Переключить тему' : 'Toggle theme'}
                                aria-pressed={theme === 'dark'}
                            >
                                <ThemeIcon />
                            </button>
                        </div>
                        <div className="hidden md:flex">{renderLanguageButtons()}</div>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen((prev) => !prev)}
                            className="md:hidden p-2.5 rounded-lg border border-[color:var(--card-border)] bg-[var(--card)] text-[var(--text)] shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 transition-all duration-300"
                            aria-label={language === 'ru' ? 'Открыть меню' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path d="M6 6l12 12M6 18L18 6" />
                                ) : (
                                    <>
                                        <path d="M4 7h16" />
                                        <path d="M4 12h16" />
                                        <path d="M4 17h16" />
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            <div className={`md:hidden fixed inset-0 z-40 transition-all ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                <div
                    className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setMobileMenuOpen(false)}
                />
                <div
                    className={`absolute inset-y-0 right-0 w-80 max-w-[85%] bg-[var(--card)] text-[var(--text)] shadow-2xl border-l border-[color:var(--card-border)] transition-transform duration-300 ${
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between px-6 py-5 border-b border-[color:var(--card-border)]">
                        <span className="text-sm font-semibold tracking-wide uppercase text-[var(--muted)]">
                            {language === 'ru' ? 'Меню' : 'Menu'}
                        </span>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 rounded-md text-[var(--muted)] hover:text-[var(--text)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/40"
                            aria-label={language === 'ru' ? 'Закрыть меню' : 'Close menu'}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                <path d="M6 6l12 12M6 18L18 6" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 p-6">
                        <nav className="flex flex-col gap-3 text-base font-medium">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className={`px-4 py-3 rounded-lg transition-all duration-300 ${
                                        link.isCTA
                                            ? 'bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white shadow-lg shadow-[0_20px_35px_var(--button-primary-shadow)]'
                                            : 'bg-[var(--surface-muted)] text-[var(--text)] hover:bg-[var(--bg)]'
                                    }`}
                                    aria-label={link.label}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                        <div className="space-y-5">
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">{language === 'ru' ? 'Язык' : 'Language'}</p>
                                {renderLanguageButtons('w-full')}
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">{language === 'ru' ? 'Тема' : 'Theme'}</p>
                                <button
                                    onClick={() => {
                                        onToggleTheme();
                                    }}
                                    type="button"
                                    className={`${themeButtonClasses} w-full justify-center flex`}
                                    aria-label={language === 'ru' ? 'Переключить тему' : 'Toggle theme'}
                                    aria-pressed={theme === 'dark'}
                                >
                                    <ThemeIcon />
                                    <span className="ml-2 text-sm font-semibold">
                                        {theme === 'dark' ? (language === 'ru' ? 'Тёмная' : 'Dark') : (language === 'ru' ? 'Светлая' : 'Light')}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


