import React from 'react';
import logoLight from '../assets/fulllogo.png';
import logoDark from '../assets/fulllogo-dark.png';
import { smoothScrollTo } from '../utils/smoothScroll';

export function Footer({ t, language, theme = 'light' }) {
    const logo = theme === 'dark' ? logoDark : logoLight;
    return (
        <footer className="bg-[var(--footer-bg)] text-[var(--footer-text)] transition-colors duration-300" style={{ zIndex: 1 }}>
            <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="WebNexum - разработка сайтов в Минске" className="w-10 h-10 object-contain rounded"/>
                        <div>
                            <div className="font-semibold">WebNexum</div>
                            <div className="text-xs text-[var(--footer-muted)]">Digital solutions under one roof</div>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-[var(--footer-muted)]">{t.footer.rights}</p>
                </div>

                <div className="md:col-span-2 flex justify-between">
                    <div>
                        <h4 className="font-semibold">{language === 'ru' ? 'Навигация' : 'Navigation'}</h4>
                        <ul className="mt-2 text-sm text-[var(--footer-muted)] space-y-3">
                            <li><a href="#services" onClick={(e) => smoothScrollTo(e, 'services')} className="hover:text-[var(--footer-text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1" aria-label={t.nav.services}>{t.nav.services}</a></li>
                            <li><a href="#process" onClick={(e) => smoothScrollTo(e, 'process')} className="hover:text-[var(--footer-text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1" aria-label={t.nav.process}>{t.nav.process}</a></li>
                            <li><a href="#portfolio" onClick={(e) => smoothScrollTo(e, 'portfolio')} className="hover:text-[var(--footer-text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1" aria-label={t.nav.portfolio}>{t.nav.portfolio}</a></li>
                            <li><a href="#contact" onClick={(e) => smoothScrollTo(e, 'contact')} className="hover:text-[var(--footer-text)] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1" aria-label={language === 'ru' ? 'Контакты' : 'Contact'}>{language === 'ru' ? 'Контакты' : 'Contact'}</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold">{language === 'ru' ? 'Контакты' : 'Contacts'}</h4>
                        <ul className="mt-2 text-sm text-[var(--footer-muted)] space-y-2">
                            <li>support@webnexum.com</li>
                            <li>+375 29 640-28-89</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

