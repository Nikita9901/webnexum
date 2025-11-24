import React from 'react';

export function Services({ t, language, servicesList, sectionRefs }) {
    return (
        <section 
            key={`services-${language}`}
            id="services" 
            ref={el => sectionRefs.current['services'] = el}
            className="mt-20"
        >
            <h2 key={`services-title-${language}`} className="text-2xl font-semibold animate-on-scroll">{t.services.title}</h2>
            <p key={`services-desc-${language}`} className="text-[var(--muted)] mt-2 max-w-prose animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                {t.services.description}
            </p>

            {/* Скрытый SEO текст для услуг */}
            <div className="sr-only">
                <p>Веб-студия WebNexum в Минске предлагает полный спектр услуг по разработке сайтов и веб-приложений. Разработка сайта под ключ включает создание лендингов, корпоративных сайтов, интернет-магазинов. Разработка веб-приложений включает создание SaaS-платформ, панелей управления и кастомных решений. Мобильные решения: PWA разработка, интеграции, адаптивная верстка. Дизайн и бренд: UI/UX дизайн, прототипирование, разработка айдентики.</p>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesList.map((s, index) => (
                    <div 
                        key={`service-${index}-${language}`} 
                        className="group p-6 bg-[var(--card)] rounded-lg shadow-sm card-hover animate-on-scroll border border-transparent hover:border-[var(--accent)]/20 transition-all duration-300"
                        style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                    >
                        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-[var(--accent)]/10 to-[var(--accent-2)]/10 transition-all duration-300 group-hover:from-[var(--accent)]/20 group-hover:to-[var(--accent-2)]/20 group-hover:scale-110">
                            {index === 0 && (
                                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            )}
                            {index === 1 && (
                                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            )}
                            {index === 2 && (
                                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                            )}
                            {index === 3 && (
                                <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                            )}
                        </div>
                        <h3 className="mt-4 font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-300">{s.title}</h3>
                        <p className="mt-2 text-[var(--muted)] text-sm leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

