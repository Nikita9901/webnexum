import React from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

export function About({ t }) {
    return (
        <section id="about" className="mt-20">
            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Почему выбирают нас */}
                <div>
                    <h2 className="text-2xl font-semibold mb-6">{t.about.why}</h2>
                    
                    {/* Скрытый SEO текст */}
                    <div className="sr-only">
                        <p>Веб-студия WebNexum в Минске — это опытная команда senior и middle разработчиков с опытом реализации enterprise задач. Мы предлагаем прозрачные процессы разработки с гибким подходом (Agile), регулярными демо и отчетами. После релиза обеспечиваем техническую поддержку и сопровождение проекта. Разработка сайта под ключ с гарантией качества и соблюдением сроков.</p>
                    </div>
                    
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
                    <div className="p-8 md:p-10 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] rounded-2xl shadow-2xl text-white relative overflow-hidden h-full flex flex-col">
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
                                <a href="#contact"
                                   onClick={(e) => smoothScrollTo(e, 'contact')}
                                   className="px-5 py-2.5 rounded-lg bg-white text-[var(--accent)] font-medium hover:bg-white/90 transition-all shadow-md hover:shadow-lg">
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

