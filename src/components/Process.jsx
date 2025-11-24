import React from 'react';

export function Process({ t, language, sectionRefs }) {
    return (
        <section 
            key={`process-${language}`}
            id="process" 
            ref={el => sectionRefs.current['process'] = el}
            className="mt-20"
        >
            <h2 key={`process-title-${language}`} className="text-2xl font-semibold animate-on-scroll">{t.process.title}</h2>
            <p key={`process-desc-${language}`} className="text-[var(--muted)] mt-2 max-w-prose animate-on-scroll" style={{ transitionDelay: '0.1s' }}>{t.process.description}</p>
            
            {/* Скрытый SEO текст для процесса работы */}
            <div className="sr-only">
                <p>Процесс разработки сайта в веб-студии WebNexum включает пять основных этапов: обсуждение и анализ требований, прототипирование и дизайн, разработка по Agile методологии, тестирование и запуск, поддержка и развитие проекта. Мы работаем прозрачно, с регулярными демо и отчетами для клиента. Каждый этап согласовывается перед переходом к следующему.</p>
            </div>

            <div className="mt-6 relative">
                {/* Timeline line for desktop */}
                <div className="hidden md:block absolute left-6 top-7 bottom-12 w-0.5 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]"></div>

                <div className="space-y-4 md:space-y-6">
                    {[
                        { step: "01", ...t.process.step1, icon: "💬" },
                        { step: "02", ...t.process.step2, icon: "🎨" },
                        { step: "03", ...t.process.step3, icon: "⚙️" },
                        { step: "04", ...t.process.step4, icon: "🚀" },
                        { step: "05", ...t.process.step5, icon: "🔧" }
                    ].map((item, index) => (
                        <div 
                            key={index} 
                            className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 animate-on-scroll"
                            style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                        >
                            {/* Step number circle */}
                            <div className="flex-shrink-0 relative z-10 flex items-center justify-center sm:justify-start">
                                <div className="md:-ml-1 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110">

                                    <span className="text-white font-bold text-xs sm:text-sm md:text-base">{item.step}</span>
                                    </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1 sm:pt-0.5">
                                <div className="bg-[var(--card)] rounded-lg shadow-sm p-4 md:p-5 hover:shadow-md transition-all duration-300 card-hover">
                                    <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                                        <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">{item.icon}</div>
                                        <div className="flex-1">
                                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[var(--text)] mb-1 sm:mb-1.5">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm md:text-base text-[var(--muted)] leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

