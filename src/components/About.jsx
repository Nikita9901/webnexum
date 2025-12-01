import React from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

export function About({ t, theme = 'light' }) {
    return (
        <section id="about" className="mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                    <h2 className="text-2xl font-semibold mb-6">{t.about.why}</h2>
                    
                    <div className="space-y-4">
                        <div className="p-5 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-all card-hover border-l-4 border-[var(--accent)]">
                            <h3 className="font-semibold text-[var(--text)] mb-2">{t.about.team.title}</h3>
                            <p className="text-sm text-[var(--muted)]">{t.about.team.desc}</p>
                        </div>
                        
                        <div className="p-5 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-all card-hover border-l-4 border-[var(--accent-2)]">
                            <h3 className="font-semibold text-[var(--text)] mb-2">{t.about.process.title}</h3>
                            <p className="text-sm text-[var(--muted)]">{t.about.process.desc}</p>
                        </div>
                        
                        <div className="p-5 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-all card-hover border-l-4 border-[var(--accent)]">
                            <h3 className="font-semibold text-[var(--text)] mb-2">{t.about.support.title}</h3>
                            <p className="text-sm text-[var(--muted)]">{t.about.support.desc}</p>
                        </div>
                    </div>
                </div>

                {/* О нас */}
                <div className="relative h-full">
                <div className="p-8 md:p-10 bg-gradient-to-br from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] rounded-2xl shadow-2xl text-white relative overflow-hidden h-full flex flex-col shadow-[0_30px_60px_var(--button-primary-shadow)]">
                        {/* Декоративные элементы */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-xl"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16 blur-xl"></div>
                        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
                        
                        <div className="relative z-10 flex-1 flex flex-col">
                            <h3 className="text-2xl font-semibold mb-4">{t.about.aboutTitle}</h3>
                            <p className="text-white/90 leading-relaxed mb-6 flex-1">
                                {t.about.aboutText}
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <a
                                    href="#contact"
                                    onClick={(e) => smoothScrollTo(e, 'contact')}
                                    className="px-5 py-2.5 rounded-lg bg-white text-[#4f85bf] font-medium transition-all shadow-md hover:bg-white/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30"
                                >
                                    {t.about.contact}
                                </a>
                                <a href="#portfolio"
                                   onClick={(e) => smoothScrollTo(e, 'portfolio')}
                                   className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
                                    {t.about.cases}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
