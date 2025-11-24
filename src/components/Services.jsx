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
                        className="p-6 bg-[var(--card)] rounded-lg shadow-sm card-hover animate-on-scroll"
                        style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                    >
                        <div
                            className="h-12 w-12 rounded-md flex items-center justify-center bg-[var(--bg)] transition-transform duration-300 hover:scale-110">🔷
                        </div>
                        <h3 className="mt-4 font-semibold text-[var(--text)]">{s.title}</h3>
                        <p className="mt-2 text-[var(--muted)] text-sm">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

