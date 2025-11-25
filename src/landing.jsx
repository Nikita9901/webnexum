import React, {useState, useRef, useEffect, useMemo} from "react";
import project1Img from "./assets/project1.png";
import project2Img from "./assets/project2.png";
import project3Img from "./assets/project3.png";
import {FAQ} from "./atoms.jsx";
import { useLanguage } from "./hooks/useLanguage";
import { Header } from "./components/Header";
import { Toast } from "./components/Toast";
import { BackToTop } from "./components/BackToTop";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Portfolio } from "./components/Portfolio";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { ProjectModal } from "./components/ProjectModal";
import "./styles/global.css";

export default function WebNexumLanding() {
    const { language, changeLanguage, t } = useLanguage();
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        return localStorage.getItem('wn-theme') || 'dark';
    });
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        projectType: "website",
        message: "",
        connect: 'telegram',
        viber: ''
    });
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);
    const [toastType, setToastType] = useState('success'); // 'success' or 'error'
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [counters, setCounters] = useState({ projects: 0, weeks: 0, months: 0 });
    
    // Services list with translations
    const servicesList = useMemo(() => [
        t.services.website,
        t.services.webapp,
        t.services.mobile,
        t.services.design,
    ], [t, language]);
    
    const sectionRefs = useRef({});

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('wn-theme', theme);
    }, [theme]);

    // Обновление lang атрибута и meta тегов для SEO
    useEffect(() => {
        if (typeof document === 'undefined') return;
        document.documentElement.lang = language;
        
        // Обновляем title
        document.title = t.seo.title;
        
        // Обновляем meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', t.seo.description);
        
        // Обновляем og:title
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', t.seo.title);
        
        // Обновляем og:description
        let ogDescription = document.querySelector('meta[property="og:description"]');
        if (!ogDescription) {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute('content', t.seo.description);
        
        // Обновляем og:locale в зависимости от языка
        let ogLocale = document.querySelector('meta[property="og:locale"]');
        if (!ogLocale) {
            ogLocale = document.createElement('meta');
            ogLocale.setAttribute('property', 'og:locale');
            document.head.appendChild(ogLocale);
        }
        ogLocale.setAttribute('content', language === 'ru' ? 'ru_RU' : 'en_US');
    }, [language, t]);

    function showToast(text, type = 'success') {
        setToast(text);
        setToastType(type);
        setTimeout(() => {
            setToast(null);
            setToastType('success');
        }, 4000);
    }

    // Back to top scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll reveal animation - reset and re-observe when language changes
    useEffect(() => {
        // Reset animation classes when language changes
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.classList.remove('visible');
        });

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id) {
                        setVisibleSections(prev => new Set([...prev, entry.target.id]));
                    }
                    // Add visible class directly to element
                    entry.target.classList.add('visible');
                    // Stop observing once visible
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections and animated elements after DOM is ready
        const initObserver = () => {
            // Observe section containers
            Object.values(sectionRefs.current).forEach(ref => {
                if (ref) {
                    observer.observe(ref);
                }
            });
            
            // Observe all elements with animate-on-scroll class
            const allAnimatedElements = document.querySelectorAll('.animate-on-scroll');
            allAnimatedElements.forEach(el => {
                observer.observe(el);
            });
        };

        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            setTimeout(initObserver, 50);
        });

        return () => observer.disconnect();
    }, [language]);

    // Animated counters
    useEffect(() => {
        const statsSection = sectionRefs.current['stats'];
        if (!statsSection) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const duration = 1200;
                const steps = 60;
                const stepTime = duration / steps;
                
                const targetProjects = 13;
                const targetWeeks = 4;
                const targetMonths = 3;

                let currentStep = 0;
                const counterInterval = setInterval(() => {
                    currentStep++;
                    const progress = currentStep / steps;
                    const easeOut = 1 - Math.pow(1 - progress, 3);

                    setCounters({
                        projects: Math.floor(targetProjects * easeOut),
                        weeks: Math.floor(targetWeeks * easeOut),
                        months: Math.floor(targetMonths * easeOut)
                    });

                    if (currentStep >= steps) {
                        clearInterval(counterInterval);
                        setCounters({
                            projects: targetProjects,
                            weeks: targetWeeks,
                            months: targetMonths
                        });
                    }
                }, stepTime);

                observer.disconnect();
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
        return () => observer.disconnect();
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

    // Portfolio data with translations
    const portfolio = useMemo(() => [
        {
            id: 1,
            title: t.projects.project2.title,
            tags: ["Next.js", "Express.js"],
            desc: t.projects.project2.desc,
            img: project2Img,
            href: "https://vendettacity.org",
            problem: t.projects.project2.problem,
            whatWeDid: t.projects.project2.whatWeDid
        },
        {
            id: 2,
            title: t.projects.project1.title,
            tags: ["React", "Flask", "MongoDB"],
            desc: t.projects.project1.desc,
            img: project1Img,
            href: "https://zignaly.com",
            problem: t.projects.project1.problem,
            whatWeDid: t.projects.project1.whatWeDid
        },
        {
            id: 3,
            title: t.projects.project3.title,
            tags: ["React", "Django"],
            desc: t.projects.project3.desc,
            img: project3Img,
            href: undefined,
            problem: t.projects.project3.problem,
            whatWeDid: t.projects.project3.whatWeDid
        },
    ], [t]);


    function handleChange(e) {
        const {name, value} = e.target;
        const phoneRegex = /^[+\d\s\-()]*$/;

        if (name === "phone" || name === "viber") {
            if (phoneRegex.test(value)) {
                console.log(name, value)
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
            const connectMethodNames = {
                ru: { phone: "Телефон", email: "Почта", viber: "Вайбер", telegram: "Телеграм" },
                en: { phone: "Phone", email: "Email", viber: "Viber", telegram: "Telegram" }
            };
            const connectName = connectMethodNames[language][form.connect] || form.connect;
            const message = `${language === 'ru' ? 'Имя' : 'Name'}: ${form.name}\n${language === 'ru' ? 'Способ связи' : 'Contact Method'}: ${connectName}\n${connectName}: ${form[form.connect]}\n${language === 'ru' ? 'Тип проекта' : 'Project Type'}: ${form.projectType}\n${language === 'ru' ? 'Комментарий' : 'Comment'}: ${form.message}`;

            const res = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
                    message
                )}`
            );
            if (res.ok) {
                setSending(false);
                showToast(t.toast.sent, 'success');
                setForm({name: "", email: "", phone: "", projectType: "website", message: "", connect: 'telegram', telegram: '', viber: ''});
            } else {
                throw new Error('API_ERROR');
            }
        } catch (error) {
            console.error('Error:', error);
            setSending(false);
            showToast(t.toast.errorMsg, 'error');
        }
    }

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
            <Toast 
                toast={toast} 
                toastType={toastType} 
                t={t} 
                onClose={() => {
                    setToast(null);
                    setToastType('success');
                }} 
            />
            <Header language={language} t={t} changeLanguage={changeLanguage} theme={theme} onToggleTheme={toggleTheme} />
            <main className="relative mx-auto max-w-6xl px-6 pb-12">
                <Hero t={t} language={language} counters={counters} sectionRefs={sectionRefs} theme={theme} />
                <Services t={t} language={language} servicesList={servicesList} sectionRefs={sectionRefs} />
                <Process t={t} language={language} sectionRefs={sectionRefs} />
                <Portfolio t={t} portfolio={portfolio} onProjectClick={setSelectedProject} />
                <About t={t} theme={theme} />
                <Contact t={t} form={form} handleChange={handleChange} handleSubmit={handleSubmit} sending={sending} language={language} />
                <section id="faq" className="mt-20">
                    <h2 className="text-2xl font-semibold">{t.faq.title}</h2>
                    <FAQ language={language} />
                </section>
            </main>

            <Footer t={t} language={language} theme={theme} />
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} />

            <BackToTop show={showBackToTop} onClick={scrollToTop} />

            {/* Структурированные данные для SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "WebNexum",
                        "alternateName": ["Веб-студия WebNexum", "WebNexum Web Studio"],
                        "url": "https://webnexum.com",
                        "description": t.seo.description,
                        "inLanguage": ["ru", "en"],
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": "https://webnexum.com/?s={search_term_string}",
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Service",
                        "serviceType": "Веб-разработка",
                        "inLanguage": ["ru", "en"],
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "WebNexum",
                            "alternateName": ["Веб-студия WebNexum", "WebNexum Web Studio"],
                            "address": {
                                "@type": "PostalAddress",
                                "addressLocality": "Минск",
                                "addressCountry": "BY"
                            }
                        },
                        "areaServed": {
                            "@type": "Country",
                            "name": "Беларусь"
                        },
                        "hasOfferCatalog": {
                            "@type": "OfferCatalog",
                            "name": "Услуги веб-разработки",
                            "itemListElement": [
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Разработка сайтов",
                                        "description": "Создание лендингов, корпоративных сайтов, интернет-магазинов"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Разработка веб-приложений",
                                        "description": "Создание SaaS-платформ, панелей управления, кастомных решений"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Мобильные решения",
                                        "description": "PWA разработка, интеграции, адаптивная верстка"
                                    }
                                },
                                {
                                    "@type": "Offer",
                                    "itemOffered": {
                                        "@type": "Service",
                                        "name": "Дизайн и бренд",
                                        "description": "UI/UX дизайн, прототипирование, разработка айдентики"
                                    }
                                }
                            ]
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Что входит в создание сайта?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Разработка дизайна, верстка, React-приложение, серверная часть, админка, SEO-настройка и публикация. Полный цикл от идеи до запуска."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Сколько длится разработка?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "От 5–7 дней для простых сайтов до 8-9 недель для полноценных проектов с функционалом. Точные сроки определяются после анализа требований."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Как формируется стоимость проекта?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Стоимость зависит от объема работ, сложности функционала и сроков. После обсуждения требований мы предоставляем детальную оценку. Работаем с фиксированной стоимостью по договору."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Какие технологии вы используете?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Основной стек: React, Node.js, TypeScript, PostgreSQL/MongoDB. Также работаем с Next.js, Express, Django, Flask. Выбираем технологии под конкретную задачу."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Даете ли вы поддержку?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Да, предоставляем техподдержку, обновления и сопровождение проекта. Включаем 3 месяца бесплатной поддержки после запуска, далее — по договоренности."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Можно ли доработать существующий проект?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Конечно. Работаем с проектами на любых технологиях. Можем добавить функционал, переработать дизайн, оптимизировать производительность или мигрировать на современный стек."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Как проходит процесс работы?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Обсуждение требований → Техническое задание → Дизайн и прототипы → Разработка с регулярными демо → Тестирование → Запуск. Работаем по Agile с прозрачной коммуникацией."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Какие гарантии вы предоставляете?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Гарантируем соответствие техническому заданию, исправление багов в течение гарантийного периода, передачу исходного кода и документации. Все фиксируется в договоре."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Как происходит оплата?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Обычно работаем по схеме: 30% предоплата, 40% по готовности основной части, 30% после запуска. Возможны индивидуальные условия для крупных проектов."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Работаете ли вы с зарубежными клиентами?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Да, работаем удаленно с клиентами по всему миру. Используем современные инструменты для коммуникации и управления проектами. Гибкий график работы."
                                }
                            }
                        ]
                    })
                }}
            />
        </div>
    );
}
