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
        connect: 'telegram',
        viber: ''
    });
    const [sending, setSending] = useState(false);
    const [toast, setToast] = useState(null);
    const [toastType, setToastType] = useState('success'); // 'success' or 'error'
    const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const [visibleSections, setVisibleSections] = useState(new Set());
    const [counters, setCounters] = useState({ projects: 0, weeks: 0, months: 0 });
    const carouselRef = useRef(null);
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);
    const sectionRefs = useRef({});

    function showToast(text, type = 'success') {
        setToast(text);
        setToastType(type);
        setTimeout(() => {
            setToast(null);
            setToastType('success');
        }, 4000);
    }

    function smoothScrollTo(e, targetId) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
            const headerOffset = 80; // Высота хэдера + отступ
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Particle animation effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth * window.devicePixelRatio;
            canvas.height = canvas.offsetHeight * window.devicePixelRatio;
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Color palette
        const colors = [
            { r: 0, g: 153, b: 168 },   // Teal
            { r: 61, g: 169, b: 245 },  // Bright Blue
            { r: 0, g: 200, b: 220 },   // Cyan
            { r: 100, g: 200, b: 255 }, // Light Blue
        ];

        // Particle class
        class Particle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height / window.devicePixelRatio;
                this.colorIndex = Math.floor(Math.random() * colors.length);
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.pulseSpeed = Math.random() * 0.02 + 0.01;
            }

            reset() {
                this.x = Math.random() * canvas.width / window.devicePixelRatio;
                this.y = -10;
                this.size = Math.random() * 4 + 1.5;
                this.speedY = Math.random() * 0.08 + 0.12;
                this.speedX = Math.random() * 0.04 - 0.02;
                this.opacity = Math.random() * 0.1 + 0.3;
                this.baseOpacity = this.opacity;
                this.colorIndex = Math.floor(Math.random() * colors.length);
            }

            update(mouseX, mouseY) {
                // Smooth mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    const angle = Math.atan2(dy, dx);
                    this.x += Math.cos(angle) * force * 2;
                    this.y += Math.sin(angle) * force * 2;
                }

                // Normal movement with slight drift
                this.y += this.speedY;
                this.x += this.speedX + Math.sin(this.y * 0.01) * 0.02;

                // Pulsing effect
                this.pulsePhase += this.pulseSpeed;
                this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.08;

                // Reset if out of bounds
                if (this.y > canvas.height / window.devicePixelRatio + 10) {
                    this.reset();
                }
                if (this.x < -10 || this.x > canvas.width / window.devicePixelRatio + 10) {
                    this.reset();
                }
            }

            draw(ctx) {
                const color = colors[this.colorIndex];
                
                // Create gradient for glow effect
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0,
                    this.x, this.y, this.size * 3
                );
                gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${this.opacity * 0.6})`);
                gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${this.opacity * 0.3})`);
                gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);

                // Draw glow
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fill();

                // Draw core particle
                ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.min(this.opacity * 1.0, 0.4)})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles
        particlesRef.current = Array.from({ length: 60 }, () => new Particle());

        // Animation loop
        let time = 0;
        const animate = () => {
            time += 0.01;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.update(mouseRef.current.x, mouseRef.current.y);
                particle.draw(ctx);
            });

            // Draw connections with gradient
            for (let i = 0; i < particlesRef.current.length; i++) {
                for (let j = i + 1; j < particlesRef.current.length; j++) {
                    const p1 = particlesRef.current[i];
                    const p2 = particlesRef.current[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        const opacity = (1 - distance / 150) * 0.12;
                        const color1 = colors[p1.colorIndex];
                        const color2 = colors[p2.colorIndex];
                        
                        // Create gradient line
                        const lineGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        lineGradient.addColorStop(0, `rgba(${color1.r}, ${color1.g}, ${color1.b}, ${opacity})`);
                        lineGradient.addColorStop(1, `rgba(${color2.r}, ${color2.g}, ${color2.b}, ${opacity})`);
                        
                        ctx.strokeStyle = lineGradient;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Mouse move handler for particles
    useEffect(() => {
        const handleMouseMove = (e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Back to top scroll handler
    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll reveal animation
    useEffect(() => {
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
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
                observer.observe(el);
            });
        };

        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            setTimeout(initObserver, 50);
        });

        return () => observer.disconnect();
    }, []);

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
            const message = `Имя: ${form.name}\nСпособ связи: ${form.connect}\n${form.connect === 'phone' ? "Телефон" : form.connect === 'email' ? 'Почта' : form.connect === 'viber' ? 'Вайбер' : 'Телеграм'}: ${form[form.connect]}\nТип проекта: ${form.projectType}\nКомментарий: ${form.message}`;

            const res = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
                    message
                )}`
            );
            if (res.ok) {
                setSending(false);
                showToast("Заявка отправлена — спасибо! Мы ответим в ближайшее время.", 'success');
                setForm({name: "", email: "", phone: "", projectType: "website", message: "", connect: 'telegram', telegram: '', viber: ''});
            } else {
                throw new Error('API_ERROR');
            }
        } catch (error) {
            console.error('Error:', error);
            setSending(false);
            showToast(
                "Не удалось отправить заявку. Пожалуйста, свяжитесь с нами напрямую: support@webnexum.com или @webnexum в Telegram.",
                'error'
            );
        }
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
        
        /* Отступ для прокрутки при якорных ссылках */
        section[id] {
          scroll-margin-top: 80px;
        }
        
        /* Скрытый текст для SEO (screen reader only) */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
        
        /* Toast animations */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .toast-enter {
          animation: slideInRight 0.3s ease-out, scaleIn 0.3s ease-out;
        }
        
        .toast-exit {
          animation: slideOutRight 0.3s ease-in;
        }
        
        @keyframes progress {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
            {toast && (
                <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] toast-enter">
                    <div className={`
                        relative px-4 py-3 sm:px-5 sm:py-4 rounded-xl shadow-2xl 
                        flex items-start gap-3 sm:gap-4 max-w-sm
                        backdrop-blur-sm border-2
                        ${toastType === 'success' 
                            ? 'bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white border-white/20' 
                            : 'bg-gradient-to-r from-red-500 to-red-600 text-white border-white/20'
                        }
                    `}>
                        <div className={`
                            flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full 
                            flex items-center justify-center
                            ${toastType === 'success' 
                                ? 'bg-white/20' 
                                : 'bg-white/20'
                            }
                        `}>
                            {toastType === 'success' ? (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm sm:text-base leading-tight">
                                {toastType === 'success' ? 'Успешно!' : 'Ошибка'}
                            </p>
                            <p className="text-xs sm:text-sm mt-1 opacity-95 leading-relaxed">
                                {toast}
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setToast(null);
                                setToastType('success');
                            }}
                            className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Закрыть"
                        >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        {/* Progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-xl overflow-hidden">
                            <div 
                                className="h-full bg-white"
                                style={{
                                    animation: 'progress 4s linear forwards',
                                    width: '100%'
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* NAV */}
            <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-white/10">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="WebNexum - разработка сайтов в Минске" className="w-12 h-12 object-contain rounded"/>
                        <div>
                            <div className="text-lg font-semibold">WebNexum</div>
                            <div className="text-xs text-[var(--muted)] -mt-1">Digital solutions under one roof</div>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-[var(--muted)]" aria-label="Основная навигация">
                        <a href="#services" onClick={(e) => smoothScrollTo(e, 'services')} className="hover:text-[var(--text)]" aria-label="Услуги разработки сайтов">Услуги</a>
                        <a href="#process" onClick={(e) => smoothScrollTo(e, 'process')} className="hover:text-[var(--text)]" aria-label="Процесс разработки">Процесс</a>
                        <a href="#portfolio" onClick={(e) => smoothScrollTo(e, 'portfolio')} className="hover:text-[var(--text)]" aria-label="Портфолио проектов">Портфолио</a>
                        <a href="#about" onClick={(e) => smoothScrollTo(e, 'about')} className="hover:text-[var(--text)]" aria-label="О веб-студии WebNexum">О нас</a>
                        <a href="#contact"
                           onClick={(e) => smoothScrollTo(e, 'contact')}
                           className="px-4 py-2 rounded bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white hover:brightness-110 transition-all"
                           aria-label="Заказать разработку сайта">Оставить заявку</a>
                    </nav>
                </div>
            </header>
            {/* HERO */}
            <main className="relative mx-auto max-w-6xl px-6 pb-12">
                <section className="relative grid md:grid-cols-2 gap-8 items-center pt-12" style={{ overflow: 'visible'}}>
                    {/* Particle Canvas Background - Hero Area Only, extends horizontally */}
                    <div className="relative" style={{ zIndex: 1 }}>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text)]">
                            <span className="gradient-text">Разработка сайтов</span> в Минске под ключ
                        </h1>
                        <p className="mt-4 text-lg text-[var(--muted)] max-w-prose">
                            <strong>WebNexum</strong> — веб-студия в Минске. Разрабатываем <strong>сайты под ключ</strong>, веб-приложения и корпоративные решения. От идеи до поддержки.
                        </p>
                        
                        {/* Скрытый SEO текст */}
                        <div className="sr-only">
                            <h2>Веб-разработка в Минске</h2>
                            <p>WebNexum — профессиональная веб-студия в Минске, специализирующаяся на разработке сайтов под ключ, создании веб-приложений и корпоративных решений. Мы предлагаем полный цикл разработки: от анализа требований до запуска и поддержки проекта. Наши услуги включают создание корпоративных сайтов, лендингов, интернет-магазинов, веб-приложений (SaaS), CRM-систем и кастомного программного обеспечения. Работаем с современными технологиями: React, Node.js, TypeScript, Next.js, Django, Flask. Разработка сайта под ключ в Минске с гарантией качества и прозрачными процессами. Заказать разработку сайта можно через форму обратной связи или связавшись с нами напрямую.</p>
                            <h3>Услуги веб-разработки</h3>
                            <ul>
                                <li>Разработка корпоративных сайтов в Минске</li>
                                <li>Создание лендингов и одностраничных сайтов</li>
                                <li>Разработка интернет-магазинов и e-commerce платформ</li>
                                <li>Создание веб-приложений и SaaS-решений</li>
                                <li>Разработка CRM-систем и внутренних корпоративных систем</li>
                                <li>Мобильная адаптация и PWA разработка</li>
                                <li>UI/UX дизайн и прототипирование</li>
                                <li>Техническая поддержка и сопровождение проектов</li>
                            </ul>
                            <p>Веб-студия WebNexum работает с клиентами в Минске и по всей Беларуси. Мы создаем современные, быстрые и функциональные веб-решения, которые помогают бизнесу расти. Разработка сайта под ключ включает дизайн, верстку, программирование, тестирование и запуск проекта. Стоимость разработки сайта зависит от сложности проекта и объема работ. Свяжитесь с нами для получения детальной оценки вашего проекта.</p>
                        </div>

                        <div className="mt-6 flex gap-4">
                            <a href="#contact"
                               onClick={(e) => smoothScrollTo(e, 'contact')}
                               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-md shadow hover:brightness-110 transition-all">Оставить
                                заявку</a>
                            <a href="#portfolio"
                               onClick={(e) => smoothScrollTo(e, 'portfolio')}
                               className="inline-flex items-center gap-2 px-6 py-3 border rounded-md bg-[var(--bg)] text-[var(--text)]">Посмотреть
                                портфолио</a>
                        </div>

                        <div 
                            id="stats"
                            ref={el => sectionRefs.current['stats'] = el}
                            className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
                        >
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                                <div className="text-xs text-[var(--muted)]">Проекты</div>
                                <div className="text-xl font-semibold text-[var(--text)]">
                                    {counters.projects}+
                                </div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                                <div className="text-xs text-[var(--muted)]">Средний срок</div>
                                <div className="text-xl font-semibold text-[var(--text)]">
                                    {counters.weeks > 0 ? `${counters.weeks}–5` : '4–5'} недель
                                </div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                                <div className="text-xs text-[var(--muted)]">Поддержка</div>
                                <div className="text-xl font-semibold text-[var(--text)]">
                                    {counters.months > 0 ? counters.months : '3'} мес
                                </div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.4s' }}>
                                <div className="text-xs text-[var(--muted)]">Технологии</div>
                                <div className="text-xl font-semibold text-[var(--text)]">React / Node</div>
                            </div>
                        </div>

                    </div>

                    <div className="relative" style={{ zIndex: 1 }}>
                        <div
                            className="w-full h-80 md:h-[420px] bg-gradient-to-br from-white to-[var(--bg)] rounded-lg shadow flex items-center justify-center">
                            <img src={logo} alt="WebNexum - веб-студия разработки сайтов в Минске" className="w-64 h-64 object-contain opacity-90 animate-float"/>
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
                                   onClick={(e) => smoothScrollTo(e, 'contact')}
                                   className="px-5 py-3 bg-[var(--accent-2)] text-white rounded-md hover:brightness-110">
                                    Оставить заявку
                                </a>
                            </div>
                        </div>


                    </div>
                    <canvas
                        ref={canvasRef}
                        className="absolute w-screen h-full"
                        style={{
                            pointerEvents: 'none',
                            zIndex: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            top: 0
                        }}
                    />
                </section>

                {/* SERVICES */}
                <section 
                    id="services" 
                    ref={el => sectionRefs.current['services'] = el}
                    className="mt-20"
                >
                    <h2 className="text-2xl font-semibold animate-on-scroll">Наши услуги</h2>
                    <p className="text-[var(--muted)] mt-2 max-w-prose animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                        Полный цикл <strong>разработки сайтов под ключ</strong>: анализ, дизайн, разработка, тестирование и поддержка.
                    </p>

                    {/* Скрытый SEO текст для услуг */}
                    <div className="sr-only">
                        <p>Веб-студия WebNexum в Минске предлагает полный спектр услуг по разработке сайтов и веб-приложений. Разработка сайта под ключ включает создание лендингов, корпоративных сайтов, интернет-магазинов. Разработка веб-приложений включает создание SaaS-платформ, панелей управления и кастомных решений. Мобильные решения: PWA разработка, интеграции, адаптивная верстка. Дизайн и бренд: UI/UX дизайн, прототипирование, разработка айдентики.</p>
                    </div>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {title: "Разработка сайтов", desc: "Лендинги, корпоративные сайты, интернет-магазины"},
                            {title: "Веб-приложения", desc: "SaaS, панели управления, кастомные решения"},
                            {title: "Мобильные решения", desc: "PWA, интеграции, адаптив"},
                            {title: "Дизайн & Бренд", desc: "UI/UX, прототипы, айдентика"},
                        ].map((s, index) => (
                            <div 
                                key={s.title} 
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

                {/* PROCESS / HOW WE WORK */}
                <section 
                    id="process" 
                    ref={el => sectionRefs.current['process'] = el}
                    className="mt-20"
                >
                    <h2 className="text-2xl font-semibold animate-on-scroll">Как мы работаем</h2>
                    <p className="text-[var(--muted)] mt-2 max-w-prose animate-on-scroll" style={{ transitionDelay: '0.1s' }}>Прозрачный процесс разработки от первого контакта до запуска проекта.</p>
                    
                    {/* Скрытый SEO текст для процесса работы */}
                    <div className="sr-only">
                        <p>Процесс разработки сайта в веб-студии WebNexum включает пять основных этапов: обсуждение и анализ требований, прототипирование и дизайн, разработка по Agile методологии, тестирование и запуск, поддержка и развитие проекта. Мы работаем прозрачно, с регулярными демо и отчетами для клиента. Каждый этап согласовывается перед переходом к следующему.</p>
                    </div>

                    <div className="mt-6 relative">
                        {/* Timeline line for desktop */}
                        <div className="hidden md:block absolute left-6 top-7 bottom-12 w-0.5 bg-gradient-to-b from-[var(--accent)] to-[var(--accent-2)]"></div>

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

                {/* PORTFOLIO */}
                <section id="portfolio" className="mt-20">
                    <h2 className="text-2xl font-semibold">Портфолио</h2>
                    <p className="text-[var(--muted)] mt-2">Примеры проектов — кликайте для деталей.</p>
                    
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
                                        style={{ transform: `translateX(-${currentPortfolioIndex * 100}%)` }}
                                    >
                                        {portfolio.map((p) => (
                                            <div key={p.id} className="min-w-full flex-shrink-0 w-full flex">
                                                <article 
                                                    onClick={() => setSelectedProject(p)}
                                                    className="bg-[var(--card)] rounded-lg shadow hover:shadow-md overflow-hidden cursor-pointer transition-all w-full flex flex-col"
                                                >
                                                    <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-[var(--bg)] to-white overflow-hidden">
                                                        <img src={p.img} alt={`${p.title} - проект веб-разработки от WebNexum`} loading="lazy" className="w-full h-full object-cover"/>
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
                                    className="hidden md:flex absolute left-[-10px] top-1/2 -translate-y-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:brightness-110 transition-all hover:scale-110 z-20 items-center justify-center"
                                    aria-label="Previous project"
                                >
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setCurrentPortfolioIndex((prev) => (prev === portfolio.length - 1 ? 0 : prev + 1))}
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
                <section id="about" className="mt-20">
                    <div className="grid md:grid-cols-2 gap-8 items-start">
                        {/* Почему выбирают нас */}
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">Почему выбирают нас</h2>
                            
                            {/* Скрытый SEO текст */}
                            <div className="sr-only">
                                <p>Веб-студия WebNexum в Минске — это опытная команда senior и middle разработчиков с опытом реализации enterprise задач. Мы предлагаем прозрачные процессы разработки с гибким подходом (Agile), регулярными демо и отчетами. После релиза обеспечиваем техническую поддержку и сопровождение проекта. Разработка сайта под ключ с гарантией качества и соблюдением сроков.</p>
                            </div>
                            
                            <div className="space-y-4">
                                <div className="p-5 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-all card-hover border-l-4 border-[var(--accent)]">
                                    <h3 className="font-semibold text-[var(--text)] mb-2">Опытная команда</h3>
                                    <p className="text-sm text-[var(--muted)]">Senior/middle разработчики с опытом реализации enterprise задач</p>
                                </div>
                                
                                <div className="p-5 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-all card-hover border-l-4 border-[var(--accent-2)]">
                                    <h3 className="font-semibold text-[var(--text)] mb-2">Прозрачные процессы</h3>
                                    <p className="text-sm text-[var(--muted)]">Гибкий подход (Agile) с регулярными демо и отчетами</p>
                                </div>
                                
                                <div className="p-5 bg-[var(--card)] rounded-lg shadow-sm hover:shadow-md transition-all card-hover border-l-4 border-[var(--accent)]">
                                    <h3 className="font-semibold text-[var(--text)] mb-2">Поддержка</h3>
                                    <p className="text-sm text-[var(--muted)]">Сопровождение и техподдержка после релиза</p>
                                </div>
                            </div>
                        </div>

                        {/* О нас */}
                        <div className="relative h-full">
                            <div className="p-8 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] rounded-xl shadow-lg text-white relative overflow-hidden h-full flex flex-col">
                                {/* Декоративные элементы */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                                
                                <div className="relative z-10 flex-1 flex flex-col">
                                    <h3 className="text-2xl font-semibold mb-4">О нас</h3>
                                    <p className="text-white/90 leading-relaxed mb-6 flex-1">
                                        <strong className="text-white">WebNexum</strong> — веб-студия в Минске. Разрабатываем <strong className="text-white">сайты под ключ</strong> и веб-приложения. Работаем с компаниями, которые ценят скорость, качество и результат.
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        <a href="#contact"
                                           onClick={(e) => smoothScrollTo(e, 'contact')}
                                           className="px-5 py-2.5 rounded-lg bg-white text-[var(--accent)] font-medium hover:bg-white/90 transition-all shadow-md hover:shadow-lg">
                                            Связаться
                                        </a>
                                        <a href="#portfolio"
                                           onClick={(e) => smoothScrollTo(e, 'portfolio')}
                                           className="px-5 py-2.5 rounded-lg bg-white/10 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/20">
                                            Кейсы
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CONTACT / FORM */}
                <section id="contact" className="mt-20 mb-24">
                    <div className="max-w-5xl mx-auto bg-gradient-to-br from-[var(--card)] to-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-[var(--bg)]">
                        <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
                            {/* Left Side - Contact Info */}
                            <div className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-6 sm:p-8 md:p-10 text-white">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">Готовы обсудить проект?</h2>
                                <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg">Оставьте заявку — опишем шаги и предварительную оценку.</p>

                                <div className="space-y-3 sm:space-y-4 md:space-y-5">
                                    <a href={'mailto:support@webnexum.com'} target={'_blank'} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs sm:text-sm text-white/70">Email</div>
                                            <div className="font-semibold text-sm sm:text-base truncate">support@webnexum.com</div>
                                        </div>
                                    </a>
                                    <a href={'https://t.me/webnexum'} target={'_blank'} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs sm:text-sm text-white/70">Telegram</div>
                                            <div className="font-semibold text-sm sm:text-base">@webnexum</div>
                                        </div>
                                    </a>
                                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs sm:text-sm text-white/70">Адрес</div>
                                            <div className="font-semibold text-sm sm:text-base">Remote / Минск</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="p-6 sm:p-8 md:p-10 bg-[var(--card)]">
                                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text)] mb-2">Имя</label>
                                        <input 
                                            name="name" 
                                            value={form.name} 
                                            onChange={handleChange} 
                                            required
                                            placeholder="Ваше имя" 
                                            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[var(--muted)]/30 bg-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all text-sm sm:text-base"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text)] mb-2">
                                            Предпочтительный способ связи
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                            {[
                                                {value: "telegram", label: "Telegram", icon: "📱"},
                                                {value: "phone", label: "Звонок", icon: "📞"},
                                                {value: "email", label: "Почта", icon: "✉️"},
                                                {value: "viber", label: "Viber", icon: "💬"},
                                            ].map((opt) => (
                                                <label
                                                    key={opt.value}
                                                    className={`
                                                        flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 cursor-pointer transition-all text-center
                                                        ${form.connect === opt.value 
                                                            ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-md" 
                                                            : "border-[var(--muted)]/30 bg-white hover:border-[var(--accent)]/50 hover:bg-[var(--bg)]"
                                                        }
                                                    `}
                                                >
                                                    <span className="text-base sm:text-lg">{opt.icon}</span>
                                                    <span className="text-xs sm:text-sm font-medium">{opt.label}</span>
                                                    <input
                                                        type="radio"
                                                        name="connect"
                                                        value={opt.value}
                                                        checked={form.connect === opt.value}
                                                        onChange={handleChange}
                                                        className="hidden"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text)] mb-2">
                                                {form.connect === 'phone' ? "Телефон" : form.connect === 'email' ? 'Email' : form.connect === 'viber' ? 'Телефон' : 'Telegram'}
                                            </label>
                                            <input
                                                required
                                                name={form.connect}
                                                value={form[form.connect]}
                                                onChange={handleChange}
                                                type={form.connect === 'phone' || form.connect === 'viber' ? "tel" : form.connect === 'email' ? 'email' : 'text'}
                                                placeholder={form.connect === 'phone' ? "+375 29 123-45-67" : form.connect === 'email' ? 'your@email.com' : form.connect === 'viber' ? '+375 29 123-45-67' : '@username'}
                                                className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[var(--muted)]/30 bg-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all text-sm sm:text-base"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-[var(--text)] mb-2">Тип проекта</label>
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
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-[var(--text)] mb-2">Сообщение</label>
                                        <textarea 
                                            name="message" 
                                            value={form.message} 
                                            onChange={handleChange}
                                            placeholder="Расскажите о вашем проекте..." 
                                            rows={4}
                                            className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[var(--muted)]/30 bg-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all resize-none text-sm sm:text-base"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={sending}
                                        className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
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
                                            <>
                                                <span>Отправить заявку</span>
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                    <p className="text-center text-xs sm:text-sm text-[var(--muted)]">
                                        Мы ответим в рабочее время в течение 1 дня
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="faq" className="mt-20">
                    <h2 className="text-2xl font-semibold">FAQ — Частые вопросы</h2>
                    <FAQ/>
                </section>

            </main>


            {/* FOOTER */}
            <footer className="bg-[var(--text)] text-white" style={{ zIndex: 1 }}>
                <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="WebNexum - разработка сайтов в Минске" className="w-10 h-10 object-contain rounded"/>
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
                                <li><a href="#services" onClick={(e) => smoothScrollTo(e, 'services')} className="hover:text-white transition-colors">Услуги</a></li>
                                <li><a href="#process" onClick={(e) => smoothScrollTo(e, 'process')} className="hover:text-white transition-colors">Процесс</a></li>
                                <li><a href="#portfolio" onClick={(e) => smoothScrollTo(e, 'portfolio')} className="hover:text-white transition-colors">Портфолио</a></li>
                                <li><a href="#contact" onClick={(e) => smoothScrollTo(e, 'contact')} className="hover:text-white transition-colors">Контакты</a></li>
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
                                alt={`${selectedProject.title} - пример работы веб-студии WebNexum в Минске`} 
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
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-md hover:brightness-110 transition-all"
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
                    className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)] text-white rounded-full p-3 md:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
                    aria-label="Вернуться наверх"
                >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            )}

            {/* Структурированные данные для SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "WebNexum",
                        "url": "https://webnexum.com",
                        "description": "Разработка сайтов в Минске под ключ. Веб-студия WebNexum создает корпоративные сайты, лендинги, интернет-магазины и веб-приложения.",
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
                        "provider": {
                            "@type": "LocalBusiness",
                            "name": "WebNexum",
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
