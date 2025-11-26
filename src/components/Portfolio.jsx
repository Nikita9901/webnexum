import React, { useRef, useState } from 'react';
import { smoothScrollTo } from '../utils/smoothScroll';

// Fallback placeholder image (SVG gradient) for projects without images
const placeholderImg = 'data:image/svg+xml;utf8,' + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#0ea5e9"/>
        <stop offset="1" stop-color="#8b5cf6"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="675" fill="url(#g)"/>
  </svg>
`);

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
                                            className="group bg-[var(--card)] rounded-xl shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-300 w-full flex flex-col border border-transparent hover:border-[var(--accent)]/20"
                                        >
                                            <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-[var(--bg)] to-[var(--surface-muted)] overflow-hidden relative">
                                                <img 
                                                    src={p.img || placeholderImg} 
                                                    alt={`${p.title || 'Project'} - проект веб-разработки от WebNexum`} 
                                                    loading="lazy" 
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="p-5 sm:p-6 flex-1 flex flex-col">
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
                            className="carousel-nav-btn hidden md:flex absolute left-[-10px] top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 z-20 items-center justify-center shadow-[0_15px_30px_var(--button-primary-shadow)]"
                            aria-label="Previous project"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setCurrentIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1))}
                            className="carousel-nav-btn hidden md:flex absolute right-[-10px] top-1/2 -translate-y-1/2 translate-x-1/2 bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 z-20 items-center justify-center shadow-[0_15px_30px_var(--button-primary-shadow)]"
                            aria-label="Next project"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile navigation buttons (visible only on mobile) */}
                <div className="md:hidden flex justify-center gap-3 mt-3">
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1))}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition shadow-[0_15px_30px_var(--button-primary-shadow)]"
                        aria-label="Previous project"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1))}
                        className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white shadow-lg hover:shadow-xl hover:brightness-110 active:scale-95 transition shadow-[0_15px_30px_var(--button-primary-shadow)]"
                        aria-label="Next project"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center gap-1.5 md:gap-2 mt-4 md:mt-6">
                    {portfolio.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`carousel-dot h-1.5 md:h-2 rounded-full transition-all ${
                                index === currentIndex 
                                    ? 'w-4 md:w-8 bg-[var(--accent)]' 
                                    : 'w-1.5 md:w-2 bg-[var(--muted)] opacity-50 hover:opacity-75'
                            }`}
                            aria-label={`Go to project ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

