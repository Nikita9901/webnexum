import React, { useRef, useState } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

export function Portfolio({ t, portfolio, onProjectClick }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const carouselRef = useRef(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            setCurrentIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1));
        }
        if (isRightSwipe) {
            setCurrentIndex((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1));
        }
    };

    return (
        <section id="portfolio" className="mt-20">
            <h2 className="text-2xl font-semibold">{t.portfolio.title}</h2>
            <p className="text-[var(--muted)] mt-2">{t.portfolio.description}</p>
            
            {/* Скрытый SEO текст для портфолио */}
            <div className="sr-only">
                <p>Портфолио веб-студии WebNexum включает примеры успешно реализованных проектов: корпоративные сайты, лендинги, интернет-магазины, веб-приложения и SaaS-платформы. Каждый проект в портфолио демонстрирует наш подход к решению бизнес-задач клиентов через веб-технологии. Мы работаем с различными отраслями: e-commerce, образование, медицина, финансы, технологии. Разработка сайта под ключ с учетом специфики бизнеса клиента.</p>
            </div>

            <div className="mt-6 relative">
                <div className="flex justify-center">
                    {/* Carousel Container */}
                    <div 
                        ref={carouselRef}
                        className="relative rounded-lg max-w-2xl w-full shadow-xl"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <div 
                            className="overflow-hidden rounded-lg shadow-lg"
                        >
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {portfolio.map((p) => (
                                    <div key={p.id} className="min-w-full flex-shrink-0 w-full flex">
                                        <article 
                                            onClick={() => onProjectClick(p)}
                                            className="bg-[var(--card)] rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition-all w-full flex flex-col"
                                        >
                                            <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-[var(--bg)] to-white overflow-hidden">
                                                <img src={p.img} alt={`${p.title} - проект веб-разработки от WebNexum`} loading="lazy" className="w-full h-full object-cover"/>
                                            </div>
                                            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                                <div className="flex items-start justify-between gap-2">
                                                    <h3 className="font-semibold text-lg sm:text-xl text-[var(--text)]">{p.title}</h3>
                                                </div>
                                                <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">{p.desc}</p>
                                                <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                                                    {p.tags.map((tag) => (
                                                        <span key={tag} className="px-2 sm:px-3 py-1 bg-[var(--bg)] rounded text-xs sm:text-sm text-[var(--muted)]">{tag}</span>
                                                    ))}
                                                </div>
                                                <div className="mt-auto pt-4 text-sm text-[var(--accent)] font-medium">
                                                    {t.portfolio.details}
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1))}
                            className="hidden md:flex absolute left-[-10px] top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 transition-all hover:scale-110 z-20 items-center justify-center"
                            aria-label="Previous project"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1))}
                            className="hidden md:flex absolute right-[-10px] top-1/2 -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 transition-all hover:scale-110 z-20 items-center justify-center"
                            aria-label="Next project"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-2 mt-4 sm:mt-6">
                    {portfolio.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${
                                index === currentIndex 
                                    ? 'w-8 bg-[var(--accent)]' 
                                    : 'w-2 bg-[var(--muted)] opacity-50 hover:opacity-75'
                            }`}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

