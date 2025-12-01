import React, { useRef, useEffect } from 'react';
import logoLight from '../assets/fulllogo.png';
import logoDark from '../assets/fulllogo-dark.png';
import { smoothScrollTo } from '../utils/smoothScroll';

export function Hero({ t, language, counters, sectionRefs, theme = 'light' }) {
    const isDarkTheme = theme === 'dark';
    const logo = isDarkTheme ? logoDark : logoLight;
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationRef = useRef(null);

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
                    const force = (100 - distance) / 300;
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

    return (
        <section className="relative grid md:grid-cols-2 gap-8 items-center pt-12" style={{ overflow: 'visible'}}>
            {/* Particle Canvas Background - Hero Area Only, extends horizontally */}
            <div className="relative" style={{ zIndex: 1 }}>
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text)]">
                    <span className="gradient-text">{t.hero.title}</span> {t.hero.titleSuffix}
                </h1>
                <p className="mt-4 text-lg text-[var(--muted)] max-w-prose">
                    {t.hero.description}
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <a href="#contact"
                       onClick={(e) => smoothScrollTo(e, 'contact')}
                       className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-base group shadow-[0_20px_35px_var(--button-primary-shadow)]">
                        <span>{t.hero.cta}</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <a href="#portfolio"
                       onClick={(e) => smoothScrollTo(e, 'portfolio')}
                       className="inline-flex items-center justify-center gap-2 px-8 py-4 border rounded-lg bg-[var(--secondary-btn-bg)] text-[var(--secondary-btn-text)] border-[color:var(--secondary-btn-border)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-all duration-300 font-semibold text-base backdrop-blur-sm">
                        {t.hero.portfolio}
                    </a>
                </div>

                <div 
                    id="stats"
                    ref={el => sectionRefs.current['stats'] = el}
                    className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
                        <div className="text-xs text-[var(--muted)]">{t.stats.projects}</div>
                        <div className="text-xl font-semibold text-[var(--text)]">
                            {counters.projects}+
                        </div>
                    </div>
                    <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
                        <div className="text-xs text-[var(--muted)]">{t.stats.weeks}</div>
                        <div className="text-xl font-semibold text-[var(--text)]">
                            {counters.weeks > 0 ? `${counters.weeks}–5` : '4–5'} {language === 'ru' ? 'недель' : 'weeks'}
                        </div>
                    </div>
                    <div className="p-4 bg-[var(--card)] rounded shadow-sm card-hover animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
                        <div className="text-xs text-[var(--muted)]">{t.stats.months}</div>
                        <div className="text-xl font-semibold text-[var(--text)]">
                            {counters.months > 0 ? counters.months : '3'} {language === 'ru' ? 'мес' : 'mo'}
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
                    className="w-full h-80 md:h-[420px] bg-gradient-to-br from-[var(--hero-card-from)] to-[var(--hero-card-to)] border border-[color:var(--card-border)] rounded-xl shadow-xl flex items-center justify-center overflow-hidden backdrop-blur">
                    <img src={logo} alt="WebNexum - веб-студия разработки сайтов в Минске" className="w-64 h-64 object-contain opacity-90 animate-float"/>
                </div>

                <div className="mt-6 md:absolute md:-bottom-8 md:left-6 md:right-6 animate-slideUp">
                    <div className="mx-auto max-w-4xl bg-[var(--hero-quick-bg)] border border-[color:var(--hero-quick-border)] rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center backdrop-blur">
                        <div className="flex-1">
                            <div className="text-sm text-[var(--muted)]">{t.contact.quickContact}</div>
                            <div className="font-semibold text-[var(--text)]">
                                {t.contact.quickContactDesc}
                            </div>
                        </div>
                        <a href="#contact"
                           onClick={(e) => smoothScrollTo(e, 'contact')}
                           className="px-5 py-3 bg-gradient-to-r from-[var(--gradient-primary-from)] to-[var(--gradient-primary-to)] text-white rounded-md shadow-md hover:shadow-lg hover:brightness-110 transition-all duration-300 shadow-[0_18px_30px_var(--button-primary-shadow)]">
                            {t.nav.contact}
                        </a>
                    </div>
                </div>
            </div>
            <canvas
                ref={canvasRef}
                className={isDarkTheme ? 'fixed inset-0 w-full h-full' : 'absolute w-screen h-full'}
                style={
                    isDarkTheme
                        ? {
                            pointerEvents: 'none',
                            zIndex: 0
                        }
                        : {
                            pointerEvents: 'none',
                            zIndex: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            top: 0
                        }
                }
            />
        </section>
    );
}
