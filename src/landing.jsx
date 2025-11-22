import React, {useState, useRef, useEffect} from "react";
import logo from "./assets/fulllogo.png";
import project1Img from "./assets/project1.png";
import project2Img from "./assets/project2.png";
import project3Img from "./assets/project3.png";
import {FAQ, CustomSelect} from "./atoms.jsx";

// Single-file React landing for WebNexum
// Tailwind CSS classes are used throughout. Ensure Tailwind is available in your project.
// Logo file: use the provided sandbox path as the image source so the canvas/preview can render it.

export default function WebNexumLanding() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "website",
        message: "",
        connect: 'telegram'
    });
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);
    const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const carouselRef = useRef(null);

    function showToast(text) {
        setToast(text);
        setTimeout(() => setToast(null), 3500);
    }

    // Back to top scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && selectedProject) {
                setSelectedProject(null);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [selectedProject]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const portfolio = [
        {
            id: 1,
            title: "Криптоплатформа — Zignaly",
            tags: ["React", "Flask", "MongoDB"],
            desc: "Крипто инвесторская платформа с системой profit sharing.",
            img: project1Img,
            href: "https://zignaly.com",
            problem: "Заказчик столкнулся с необходимостью добвления функционала в масштабируемую платформу для криптоинвестиций с автоматическим распределением прибыли между инвесторами и трейдерами. Существующее решение не справлялось с нагрузкой и не имело необходимой функциональности.",
            whatWeDid: [
                "Переработали архитектуру микросервисов для обеспечения масштабируемости",
                "Реализовали систему автоматического profit sharing с поддержкой множественных стратегий",
                "Создали админ-панель для управления пользователями и стратегиями",
                "Интегрировали API криптобирж для автоматической торговли",
                "Внедрили систему уведомлений и аналитики в реальном времени",
                "Оптимизировали производительность базы данных для обработки больших объемов транзакций"
            ]
        },
        {
            id: 2,
            title: "Страница игры — Vendetta City",
            tags: ["Next.js", "Express.js"],
            desc: "Одностраничный лэндинг для ознакомления с игрой Vendetta City.",
            img: project2Img,
            href: "https://vendettacity.org",
            problem: "Необходимо было создать привлекательный лэндинг для новой игры, который бы эффективно конвертировал посетителей в игроков. Требовалось показать уникальные особенности игры и создать атмосферу, соответствующую игровому миру.",
            whatWeDid: [
                "Разработали современный одностраничный лэндинг с анимациями и интерактивными элементами",
                "Реализовали адаптивный дизайн для всех устройств",
                "Интегрировали систему регистрации и авторизации",
                "Создали секции с геймплейными видео и скриншотами",
                "Добавили систему предзаказа с интеграцией платежных систем",
                "Оптимизировали производительность для быстрой загрузки"
            ]
        },
        {
            id: 3,
            title: "Логистическая система — Buster GFC",
            tags: ["React", "Django"],
            desc: "Подсистема управления заказами в автоматизированной логистической системе.",
            img: project3Img,
            href: undefined,
            problem: "Логистическая компания нуждалась в автоматизации процесса управления заказами. Ручная обработка заказов приводила к ошибкам, задержкам и неэффективному использованию ресурсов. Требовалась система для отслеживания заказов от создания до доставки.",
            whatWeDid: [
                "Разработали полнофункциональную систему управления заказами",
                "Реализовали автоматическое распределение заказов по складам и курьерам",
                "Создали систему отслеживания статусов заказов в реальном времени",
                "Интегрировали API транспортных компаний для автоматического создания накладных",
                "Внедрили систему уведомлений для клиентов и сотрудников",
                "Разработали аналитическую панель для оптимизации логистических процессов"
            ]
        },
    ];

    // Touch handlers for swipe
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
            setCurrentPortfolioIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1));
        }
        if (isRightSwipe) {
            setCurrentPortfolioIndex((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1));
        }
    };

    function handleChange(e) {
        const {name, value} = e.target;
        const phoneRegex = /^[+\d\s\-()]*$/;
        if (name === "phone") {
            if (phoneRegex.test(value)) {
                setForm((p) => ({...p, [name]: value}));
            }
        } else {
            setForm((p) => ({...p, [name]: value}));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        try {
            const botToken = import.meta.env.VITE_BOT_TOKEN;
            const chatId = '6430506427';
            const message = `Имя: ${form.name}\nСпособ связи: ${form.connect}\n${form.connect === 'phone' ? "Телефон" : form.connect === 'email' ? 'Почта' : 'Телеграм'}: ${form[form.connect]}\nТелефон: ${form.phone}\nТип проекта: ${form.projectType}\nКомментарий: ${form.message}`;

            const res = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
                    message
                )}`
            );
            if (res.ok) {
                setSending(false);
                showToast("Заявка отправлена — спасибо! Мы ответим в ближайшее время.");
                setForm({name: "", email: "", phone: "", projectType: "website", message: "", connect: 'telegram', telegram: ''});
            } else {
                throw new Error('Failed to send message to Telegram');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setSending(false);
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <style>{`
        :root{
          --accent: #0099A8; /* Teal */
          --accent-2: #3DA9F5; /* Bright Blue */
          --text: #1E2A36; /* Dark Navy */
          --muted: #6B7A88;
          --bg: #F4F6F8;
          --card: #ffffff;
        }
        /* subtle utilities for the page preview */
      `}</style>
            {toast && (
                <div className="fixed top-6 right-6 z-[9999] animate-fadeIn">
                    <div className="px-5 py-3 bg-[var(--accent)] text-white rounded-lg shadow-lg flex items-center gap-3">
                        <span className="text-xl">✓</span>
                        <span className="font-medium">{toast}</span>
                    </div>
                </div>
            )}
            {/* NAV */}
            <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-white/10">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="WebNexum logo" className="w-12 h-12 object-contain rounded"/>
                        <div>
                            <div className="text-lg font-semibold">WebNexum</div>
                            <div className="text-xs text-[var(--muted)] -mt-1">Digital solutions under one roof</div>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-[var(--muted)]">
                        <a href="#services" className="hover:text-[var(--text)]">Услуги</a>
                        <a href="#process" className="hover:text-[var(--text)]">Процесс</a>
                        <a href="#portfolio" className="hover:text-[var(--text)]">Портфолио</a>
                        <a href="#about" className="hover:text-[var(--text)]">О нас</a>
                        <a href="#contact"
                           className="px-4 py-2 rounded bg-[var(--accent)] text-white hover:brightness-110">Оставить
                            заявку</a>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <main className="mx-auto max-w-6xl px-6 py-12">
                <section className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="absolute opacity-0">
                            WebNexum — разработка сайтов, веб-приложений и ПО под ключ
                        </h1>
                        <h2 className="absolute opacity-0">
                            Разработка сайта под ключ и веб-приложений под ключ — WebNexum
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text)]">WebNexum —
                            цифровые решения под ключ</h3>
                        <p className="mt-4 text-lg text-[var(--muted)] max-w-prose">Разрабатываем сайты, веб‑приложения
                            и кастомное ПО — от идеи до поддержки. Быстро, прозрачно, с упором на бизнес‑результат.</p>
                        <p className="absolute opacity-0">
                            заказать разработку сайта, разработка приложений React / Node.js, разработка корпоративного сайта, разработка лендингов, создание веб-приложений, разработка сайта под ключ
                            WebNexum — веб-студия, специализирующаяся на разработке сайтов, веб-приложений (SaaS) и кастомного ПО под ключ. Мы создаём корпоративные сайты, лендинги, CRM, интерфейсы и web-панели. Работаем в Минске и по всему миру.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <a href="#contact"
                               className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-md shadow hover:brightness-110">Оставить
                                заявку</a>
                            <a href="#portfolio"
                               className="inline-flex items-center gap-2 px-6 py-3 border rounded-md text-[var(--text)]">Посмотреть
                                портфолио</a>
                        </div>

                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm">
                                <div className="text-xs text-[var(--muted)]">Проекты</div>
                                <div className="text-xl font-semibold text-[var(--text)]">{portfolio.length+10}</div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm">
                                <div className="text-xs text-[var(--muted)]">Средний срок</div>
                                <div className="text-xl font-semibold text-[var(--text)]">4–5 недель</div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm">
                                <div className="text-xs text-[var(--muted)]">Поддержка</div>
                                <div className="text-xl font-semibold text-[var(--text)]">3 мес</div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm">
                                <div className="text-xs text-[var(--muted)]">Технологии</div>
                                <div className="text-xl font-semibold text-[var(--text)]">React / Node</div>
                            </div>
                        </div>

                    </div>

                    <div className="relative">
                        <div
                            className="w-full h-80 md:h-[420px] bg-gradient-to-br from-white to-[var(--bg)] rounded-lg shadow flex items-center justify-center">
                            <img src={logo} alt="" className="w-64 h-64 object-contain opacity-90"/>
                        </div>

                        <div className="mt-6 md:absolute md:-bottom-8 md:left-6 md:right-6 animate-slideUp">
                            <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center">
                                <div className="flex-1">
                                    <div className="text-sm text-[var(--muted)]">Быстрый контакт</div>
                                    <div className="font-semibold text-[var(--text)]">
                                        Готовы обсудить проект? Оставьте заявку — мы ответим в течение рабочего дня.
                                    </div>
                                </div>
                                <a href="#contact"
                                   className="px-5 py-3 bg-[var(--accent-2)] text-white rounded-md hover:brightness-110">
                                    Оставить заявку
                                </a>
                            </div>
                        </div>


                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="mt-20">
                    <h2 className="text-2xl font-semibold">Наши услуги</h2>
                    <p className="text-[var(--muted)] mt-2 max-w-prose">Полный цикл разработки: анализ, дизайн,
                        разработка, тестирование и поддержка.</p>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {title: "Разработка сайтов", desc: "Лендинги, корпоративные сайты, интернет-магазины"},
                            {title: "Веб-приложения", desc: "SaaS, панели управления, кастомные решения"},
                            {title: "Мобильные решения", desc: "PWA, интеграции, адаптив"},
                            {title: "Дизайн & Бренд", desc: "UI/UX, прототипы, айдентика"},
                        ].map((s) => (
                            <div key={s.title} className="p-6 bg-[var(--card)] rounded-lg shadow-sm">
                                <div
                                    className="h-12 w-12 rounded-md flex items-center justify-center bg-[var(--bg)]">🔷
                                </div>
                                <h3 className="mt-4 font-semibold text-[var(--text)]">{s.title}</h3>
                                <p className="mt-2 text-[var(--muted)] text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PROCESS / HOW WE WORK */}
                <section id="process" className="mt-20">
                    <h2 className="text-2xl font-semibold">Как мы работаем</h2>
                    <p className="text-[var(--muted)] mt-2 max-w-prose">Прозрачный процесс разработки от первого контакта до запуска проекта.</p>

                    <div className="mt-6 relative">
                        {/* Timeline line for desktop */}
                        <div className="hidden md:block absolute left-6 top-0 bottom-12 w-0.5 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]"></div>

                        <div className="space-y-4 md:space-y-6">
                            {[
                                {
                                    step: "01",
                                    title: "Обсуждение и анализ",
                                    desc: "Изучаем требования, цели проекта и целевую аудиторию. Формируем техническое задание.",
                                    icon: "💬"
                                },
                                {
                                    step: "02",
                                    title: "Прототипирование и дизайн",
                                    desc: "Создаём wireframes и дизайн-макеты с учётом UX/UI best practices. Согласовываем каждый этап.",
                                    icon: "🎨"
                                },
                                {
                                    step: "03",
                                    title: "Разработка",
                                    desc: "Пишем чистый, масштабируемый код. Работаем по Agile методологии с регулярными демо.",
                                    icon: "⚙️"
                                },
                                {
                                    step: "04",
                                    title: "Тестирование и запуск",
                                    desc: "Проводим комплексное тестирование. Готовим к деплою и запускаем проект.",
                                    icon: "🚀"
                                },
                                {
                                    step: "05",
                                    title: "Поддержка и развитие",
                                    desc: "Обеспечиваем техническую поддержку и дальнейшее развитие проекта.",
                                    icon: "🔧"
                                }
                            ].map((item, index) => (
                                <div key={index} className="relative flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
                                    {/* Step number circle */}
                                    <div className="flex-shrink-0 relative z-10 flex items-center sm:items-start">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-xs sm:text-sm md:text-base">{item.step}</span>
                                        </div>
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 sm:pt-0.5">
                                        <div className="bg-[var(--card)] rounded-lg shadow-sm p-4 md:p-5 hover:shadow-md transition-shadow">
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

                {/* PORTFOLIO */}
                <section id="portfolio" className="mt-20">
                    <h2 className="text-2xl font-semibold">Портфолио</h2>
                    <p className="text-[var(--muted)] mt-2">Примеры проектов — кликайте для деталей.</p>

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
                                        style={{ transform: `translateX(-${currentPortfolioIndex * 100}%)` }}
                                    >
                                        {portfolio.map((p) => (
                                            <div key={p.id} className="min-w-full flex-shrink-0 w-full flex">
                                                <article 
                                                    onClick={() => setSelectedProject(p)}
                                                    className="bg-[var(--card)] rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition-all w-full flex flex-col"
                                                >
                                                    <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-[var(--bg)] to-white overflow-hidden">
                                                        <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover"/>
                                                    </div>
                                                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                                        <div className="flex items-start justify-between gap-2">
                                                            <h3 className="font-semibold text-lg sm:text-xl text-[var(--text)]">{p.title}</h3>
                                                            {/* {p.href && (
                                                                <a 
                                                                    href={p.href} 
                                                                    target="_blank" 
                                                                    rel="noopener noreferrer"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                    className="text-[var(--accent)] hover:underline text-sm flex-shrink-0"
                                                                >
                                                                    Открыть →
                                                                </a>
                                                            )} */}
                                                        </div>
                                                        <p className="mt-2 text-sm sm:text-base text-[var(--muted)]">{p.desc}</p>
                                                        <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
                                                            {p.tags.map((t) => (
                                                                <span key={t} className="px-2 sm:px-3 py-1 bg-[var(--bg)] rounded text-xs sm:text-sm text-[var(--muted)]">{t}</span>
                                                            ))}
                                                        </div>
                                                        <div className="mt-auto pt-4 text-sm text-[var(--accent)] font-medium">
                                                            Подробнее →
                                                        </div>
                                                    </div>
                                                </article>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
                                <button
                                    onClick={() => setCurrentPortfolioIndex((prev) => (prev === 0 ? portfolio.length - 1 : prev - 1))}
                                    className="hidden md:flex absolute left-[-10px] top-1/2 -translate-y-1/2 -translate-x-1/2 bg-[var(--accent)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 transition-all hover:scale-110 z-20 items-center justify-center"
                                    aria-label="Previous project"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setCurrentPortfolioIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1))}
                                    className="hidden md:flex absolute right-[-10px] top-1/2 -translate-y-1/2 translate-x-1/2 bg-[var(--accent)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 transition-all hover:scale-110 z-20 items-center justify-center"
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
                                    onClick={() => setCurrentPortfolioIndex(index)}
                                    className={`h-2 rounded-full transition-all ${
                                        index === currentPortfolioIndex 
                                            ? 'w-8 bg-[var(--accent)]' 
                                            : 'w-2 bg-[var(--muted)] opacity-50 hover:opacity-75'
                                    }`}
                                    aria-label={`Go to project ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADVANTAGES / ABOUT */}
                <section id="about" className="mt-20 grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h2 className="text-2xl font-semibold">Почему выбирают нас</h2>
                        <ul className="mt-6 space-y-4 text-[var(--muted)]">
                            <li>— Команда senior/middle разработчиков с опытом реализации enterprise задач.</li>
                            <li>— Прозрачные процессы и гибкий подход (Agile).</li>
                            <li>— Поддержка и сопровождение после релиза.</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-[var(--card)] rounded-lg shadow">
                        <h3 className="font-semibold">О нас</h3>
                        <p className="mt-3 text-[var(--muted)]">WebNexum — небольшая, но опытная студия разработки. Мы
                            работаем с компаниями, которые ценят скорость, качество и результат. С нами проще запускать
                            цифровые продукты.</p>
                        <div className="mt-4 flex gap-3">
                            <a href="#contact"
                               className="px-4 py-2 rounded bg-[var(--accent)] text-white hover:brightness-110">Связаться</a>
                            <a href="#portfolio" className="px-4 py-2 rounded border hover:brightness-75">Кейсы</a>
                        </div>
                    </div>
                </section>

                {/* CONTACT / FORM */}
                <section id="contact" className="mt-20 mb-24">
                    <div className="max-w-4xl mx-auto bg-[var(--card)] rounded-lg shadow-lg p-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-2xl font-semibold">Готовы обсудить проект?</h2>
                                <p className="mt-2 text-[var(--muted)]">Оставьте заявку — опишем шаги и предварительную
                                    оценку.</p>

                                <div className="mt-6 space-y-4 text-sm text-[var(--muted)]">
                                    <div><strong>Email:</strong> <a href={'mailto:support@webnexum.com'}
                                                                    target={'_blank'}><u>support@webnexum.com</u></a></div>
                                    <div><strong>Telegram:</strong> <a href={'https://t.me/webnexum'}
                                                                       target={'_blank'}><u>webnexum</u></a></div>
                                    <div><strong>Адрес:</strong> Remote / Минск</div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input name="name" value={form.name} onChange={handleChange} required
                                           placeholder="Имя" className="w-full px-4 py-3 rounded border"/>
                                </div>
                                <div className="space-y-3">
                                    <div className="text-sm text-[var(--muted)] font-medium">
                                        Предпочтительный способ связи:
                                    </div>

                                    <div className="flex items-center gap-3 flex-wrap">
                                        {[
                                            {value: "telegram", label: "Telegram"},
                                            {value: "phone", label: "Звонок"},
                                            {value: "email", label: "Почта"}
                                        ].map((opt) => (
                                            <label
                                                key={opt.value}
                                                className={`
                                                    flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition
                                                    bg-[var(--card)] hover:bg-[var(--card-hover)]
                                                    shadow-sm
                                                    ${form.connect === opt.value ? "border-[var(--accent)] shadow-md" : "border-gray-300/60"}
                                                `}
                                            >
                                                <span
                                                    className={`
                                                        relative flex items-center justify-center
                                                        w-5 h-5 rounded-full border-2 transition
                                                        ${form.connect === opt.value ? "border-[var(--accent)]" : "border-gray-400"}
                                                    `}
                                                >
                                                    <span
                                                        className={`
                                                            absolute w-3 h-3 rounded-full bg-[var(--accent)] scale-0 opacity-0 transition
                                                            ${form.connect === opt.value ? "scale-100 opacity-100" : ""}
                                                        `}
                                                    />
                                                </span>
                                                <input
                                                    type="radio"
                                                    name="connect"
                                                    value={opt.value}
                                                    checked={form.connect === opt.value}
                                                    onChange={handleChange}
                                                    className="hidden"
                                                />
                                                <span className="text-sm whitespace-nowrap">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input
                                        name={form.connect}
                                        value={form[form.connect]}
                                        onChange={handleChange}
                                        type={form.connect === 'phone' ? "tel" : form.connect === 'email' ? 'email' : 'text'}
                                        placeholder={form.connect === 'phone' ? "Телефон" : form.connect === 'email' ? 'Email' : 'Telegram'}
                                        className="w-full px-4 py-3 rounded border"/>
                                    <div className="relative">
                                        <CustomSelect
                                            value={form.projectType}
                                            onChange={(v) => setForm({ ...form, projectType: v })}
                                            options={[
                                                { value: "website", label: "Сайт-лендинг" },
                                                { value: "webapp", label: "Веб-приложение" },
                                                { value: "software", label: "ПО под ключ" },
                                                { value: "other", label: "Другое" },
                                            ]}
                                        />
                                    </div>

                                </div>
                                <textarea name="message" value={form.message} onChange={handleChange}
                                          placeholder="Коротко о задаче" rows={4}
                                          className="w-full px-4 py-3 rounded border"/>


                                <div className="flex items-center gap-4">
                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="
                                            px-6 py-3 bg-[var(--accent)] text-white rounded-md
                                            hover:brightness-110 transition flex items-center gap-2
                                            min-h-[72px] min-w-[152px]
                                        "
                                    >
                                        {sending ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-5 w-5 text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                                                    />
                                                </svg>
                                                <span>Отправка...</span>
                                            </>
                                        ) : (
                                            'Отправить заявку'
                                        )}
                                    </button>
                                    <div className="text-sm text-[var(--muted)]">Мы ответим в рабочее время в течение 1
                                        дня.
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>
                <section id="faq" className="mt-20">
                    <h2 className="text-2xl font-semibold">FAQ — Частые вопросы</h2>
                    <FAQ/>
                </section>

            </main>


            {/* FOOTER */}
            <footer className="bg-[var(--text)] text-white">
                <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="WebNexum logo" className="w-10 h-10 object-contain rounded"/>
                            <div>
                                <div className="font-semibold">WebNexum</div>
                                <div className="text-xs text-white/80">Digital solutions under one roof</div>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-white/80">© WebNexum 2025. Все права защищены.</p>
                    </div>

                    <div className="md:col-span-2 flex justify-between">
                        <div>
                            <h4 className="font-semibold">Навигация</h4>
                            <ul className="mt-2 text-sm text-white/80 space-y-2">
                                <li><a href="#services">Услуги</a></li>
                                <li><a href="#process">Процесс</a></li>
                                <li><a href="#portfolio">Портфолио</a></li>
                                <li><a href="#contact">Контакты</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Контакты</h4>
                            <ul className="mt-2 text-sm text-white/80 space-y-2">
                                <li>support@webnexum.com</li>
                                <li>+375 29 640-28-89</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Project Detail Modal */}
            {selectedProject && (
                <div 
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={() => setSelectedProject(null)}
                >
                    <div 
                        className="bg-[var(--card)] rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedProject(null)}
                            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                            aria-label="Закрыть"
                        >
                            <svg className="w-6 h-6 text-[var(--text)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Project Image */}
                        <div className="relative w-full h-64 md:h-80 bg-gradient-to-br from-[var(--bg)] to-white flex items-center justify-center overflow-hidden">
                            <img 
                                src={selectedProject.img} 
                                alt={selectedProject.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Project Content */}
                        <div className="p-6 md:p-8">
                            {/* Header */}
                            <div className="mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-2">
                                    {selectedProject.title}
                                </h2>
                                <p className="text-lg text-[var(--muted)]">
                                    {selectedProject.desc}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {selectedProject.tags.map((tag) => (
                                        <span 
                                            key={tag} 
                                            className="px-3 py-1 bg-[var(--bg)] rounded-full text-sm text-[var(--muted)]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {/* {selectedProject.href && (
                                    <a 
                                        href={selectedProject.href} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[var(--accent)] text-white rounded-md hover:brightness-110 transition"
                                    >
                                        Открыть проект
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                )} */}
                            </div>

                            {/* Problem Section */}
                            <div className="mb-6 pb-6 border-b border-[var(--bg)]">
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-3 flex items-center gap-2">
                                    <span className="text-[var(--accent)]">📋</span>
                                    Проблема заказчика
                                </h3>
                                <p className="text-[var(--muted)] leading-relaxed">
                                    {selectedProject.problem}
                                </p>
                            </div>

                            {/* What We Did Section */}
                            <div>
                                <h3 className="text-xl font-semibold text-[var(--text)] mb-4 flex items-center gap-2">
                                    <span className="text-[var(--accent)]">⚙️</span>
                                    Что мы сделали
                                </h3>
                                <ul className="space-y-3">
                                    {selectedProject.whatWeDid.map((item, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="text-[var(--muted)] leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[var(--accent)] hover:bg-[var(--accent-2)] text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    aria-label="Вернуться наверх"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            )}
        </div>
    );
}
