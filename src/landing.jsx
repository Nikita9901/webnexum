import React, {useState, useRef, useEffect, useMemo} from "react";
import project1Img from "./assets/project1.webp";
import project2Img from "./assets/project2.webp";
import project3Img from "./assets/project3.webp";
import project4Img from "./assets/project4.webp";
import project5Img from "./assets/project5.webp";
import project6Img from "./assets/project6.webp";
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

    // Обновление lang атрибута для SEO
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = language;
        }
    }, [language]);

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
            title: t.projects.project1.title,
            tags: ["Next.js", "Express.js"],
            desc: t.projects.project1.desc,
            img: project1Img,
            href: "https://vendettacity.org",
            problem: t.projects.project1.problem,
            whatWeDid: t.projects.project1.whatWeDid
        },
        {
            id: 2,
            title: t.projects.project2.title,
            tags: ["React", "Node.js", "Bel Assist"],
            desc: t.projects.project2.desc,
            img: project2Img,
            href: undefined,
            problem: t.projects.project2.problem,
            whatWeDid: t.projects.project2.whatWeDid
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
        // New placeholder items (images optional; fallback will be used)
        {
            id: 4,
            title: t.projects.project4.title,
            tags: ["Next.js", "YooKassa"],
            desc: t.projects.project4.desc,
            img: project4Img,
            href: undefined,
            problem: t.projects.project4.problem,
            whatWeDid: t.projects.project4.whatWeDid
        },
        {
            id: 5,
            title: t.projects.project5.title,
            tags: ["React", "Node.js"],
            desc: t.projects.project5.desc,
            img: project5Img,
            href: undefined,
            problem: t.projects.project5.problem,
            whatWeDid: t.projects.project5.whatWeDid
        },
        {
            id: 6,
            title: t.projects.project6.title,
            tags: ["React", "SEO"],
            desc: t.projects.project6.desc,
            img: project6Img,
            href: undefined,
            problem: t.projects.project6.problem,
            whatWeDid: t.projects.project6.whatWeDid
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
            {/* SEO Meta Tags using React 19's built-in support */}
            <title>{t.seo.title}</title>
            <meta name="description" content={t.seo.description} />
            <meta property="og:title" content={t.seo.title} />
            <meta property="og:description" content={t.seo.description} />
            <meta property="og:locale" content={language === 'ru' ? 'ru_RU' : 'en_US'} />

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
        </div>
    );
}
