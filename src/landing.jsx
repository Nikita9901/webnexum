import React, { useState } from "react";
import logo from "./assets/fulllogo.png";

// Single-file React landing for WebNexum
// Tailwind CSS classes are used throughout. Ensure Tailwind is available in your project.
// Logo file: use the provided sandbox path as the image source so the canvas/preview can render it.

export default function WebNexumLanding() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", projectType: "website", message: "" });
    const [sending, setSending] = useState(false);


    const portfolio = [
        { id: 1, title: "B2B Portal — AtlasCorp", tags: ["React", "Node.js"], desc: "Корпоративный портал для управления клиентами и сводной аналитики.", img: null },
        { id: 2, title: "E‑commerce — BloomShop", tags: ["Next.js", "Stripe"], desc: "Интернет-магазин с кастомной админкой и интеграцией платежей.", img: null },
        { id: 3, title: "SaaS Dashboard — Synapse", tags: ["React", "GraphQL"], desc: "Интерактивная панель с реальным временем и метриками.", img: null },
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        setSending(true);
        try {
            const botToken = process.env.BOT_TOKEN;
            const chatId = '6430506427';
            const message = `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nProject type: ${form.projectType}\nMessage: ${form.message}`;

            const res = await fetch(
                `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
                    message
                )}`
            );
            if (res.ok) {
                setSending(false);
                alert("Заявка отправлена — спасибо! Мы свяжемся в ближайшее время.");
                setForm({ name: "", email: "", phone: "", projectType: "website", message: "" });
            }
            else {
                throw new Error('Failed to send message to Telegram');
            }
        } catch (error) {
            console.error('Error:', error);
        }
        setSending(false);
    }

    // async function handleSubmit(e) {
    //     e.preventDefault();
    //     setSending(true);
    //     // Simulate submit — replace with real API call
    //     await new Promise((r) => setTimeout(r, 800));
    //     console.log("Send lead", form);
    //     setSending(false);
    //
    //
    // }

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

            {/* NAV */}
            <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-white/10">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src={logo} alt="WebNexum logo" className="w-12 h-12 object-contain rounded" />
                        <div>
                            <div className="text-lg font-semibold">WebNexum</div>
                            <div className="text-xs text-[var(--muted)] -mt-1">Digital solutions under one roof</div>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-[var(--muted)]">
                        <a href="#services" className="hover:text-[var(--text)]">Услуги</a>
                        <a href="#portfolio" className="hover:text-[var(--text)]">Портфолио</a>
                        <a href="#about" className="hover:text-[var(--text)]">О нас</a>
                        <a href="#contact" className="px-4 py-2 rounded bg-[var(--accent)] text-white hover:brightness-110">Оставить заявку</a>
                    </nav>
                </div>
            </header>

            {/* HERO */}
            <main className="mx-auto max-w-6xl px-6 py-12">
                <section className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-[var(--text)]">WebNexum — цифровые решения под ключ</h1>
                        <p className="mt-4 text-lg text-[var(--muted)] max-w-prose">Разрабатываем сайты, веб‑приложения и кастомное ПО — от идеи до поддержки. Быстро, прозрачно, с упором на бизнес‑результат.</p>

                        <div className="mt-6 flex gap-4">
                            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white rounded-md shadow hover:brightness-110">Оставить заявку</a>
                            <a href="#portfolio" className="inline-flex items-center gap-2 px-6 py-3 border rounded-md text-[var(--text)]">Посмотреть портфолио</a>
                        </div>

                        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm">
                                <div className="text-xs text-[var(--muted)]">Проекты</div>
                                <div className="text-xl font-semibold text-[var(--text)]">{portfolio.length}</div>
                            </div>
                            <div className="p-4 bg-[var(--card)] rounded shadow-sm">
                                <div className="text-xs text-[var(--muted)]">Средний срок</div>
                                <div className="text-xl font-semibold text-[var(--text)]">6–12 недель</div>
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
                        <div className="w-full h-80 md:h-[420px] bg-gradient-to-br from-white to-[var(--bg)] rounded-lg shadow flex items-center justify-center">
                            {/* Placeholder for hero illustration / render logo */}
                            <img src={logo} alt="webnexum hero" className="w-64 h-64 object-contain opacity-90" />
                        </div>

                        <div className="absolute -bottom-8 left-6 right-6">
                            <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center">
                                <div className="flex-1">
                                    <div className="text-sm text-[var(--muted)]">Быстрый контакт</div>
                                    <div className="font-semibold text-[var(--text)]">Готовы обсудить проект? Оставьте заявку — мы ответим в течение рабочего дня.</div>
                                </div>
                                <a href="#contact" className="px-5 py-3 bg-[var(--accent-2)] text-white rounded-md hover:brightness-110">Оставить заявку</a>
                            </div>
                        </div>

                    </div>
                </section>

                {/* SERVICES */}
                <section id="services" className="mt-20">
                    <h2 className="text-2xl font-semibold">Наши услуги</h2>
                    <p className="text-[var(--muted)] mt-2 max-w-prose">Полный цикл разработки: анализ, дизайн, разработка, тестирование и поддержка.</p>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { title: "Разработка сайтов", desc: "Лендинги, корпоративные сайты, интернет-магазины" },
                            { title: "Веб-приложения", desc: "SaaS, панели управления, кастомные решения" },
                            { title: "Мобильные решения", desc: "PWA, интеграции, адаптив" },
                            { title: "Дизайн & Бренд", desc: "UI/UX, прототипы, айдентика" },
                        ].map((s) => (
                            <div key={s.title} className="p-6 bg-[var(--card)] rounded-lg shadow-sm">
                                <div className="h-12 w-12 rounded-md flex items-center justify-center bg-[var(--bg)]">🔷</div>
                                <h3 className="mt-4 font-semibold text-[var(--text)]">{s.title}</h3>
                                <p className="mt-2 text-[var(--muted)] text-sm">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* PORTFOLIO */}
                <section id="portfolio" className="mt-20">
                    <h2 className="text-2xl font-semibold">Портфолио</h2>
                    <p className="text-[var(--muted)] mt-2">Примеры проектов — кликайте для деталей.</p>

                    <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {portfolio.map((p) => (
                            <article key={p.id} className="bg-[var(--card)] rounded-lg shadow hover:shadow-md overflow-hidden">
                                <div className="h-44 bg-gradient-to-br from-[var(--bg)] to-white flex items-center justify-center">{/* image placeholder */}
                                    <div className="text-[var(--muted)]">Превью проекта</div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-[var(--text)]">{p.title}</h3>
                                    <p className="mt-2 text-sm text-[var(--muted)]">{p.desc}</p>
                                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
                                        {p.tags.map((t) => (
                                            <span key={t} className="px-2 py-1 bg-[var(--bg)] rounded">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </article>
                        ))}
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
                        <p className="mt-3 text-[var(--muted)]">WebNexum — небольшая, но опытная студия разработки. Мы работаем с компаниями, которые ценят скорость, качество и результат. С нами проще запускать цифровые продукты.</p>
                        <div className="mt-4 flex gap-3">
                            <a href="#contact" className="px-4 py-2 rounded bg-[var(--accent)] text-white hover:brightness-110">Связаться</a>
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
                                <p className="mt-2 text-[var(--muted)]">Оставьте заявку — опишем шаги и предварительную оценку.</p>

                                <div className="mt-6 space-y-4 text-sm text-[var(--muted)]">
                                    <div><strong>Email:</strong> support@webnexum.com</div>
                                    <div><strong>Telegram:</strong> @webnexum</div>
                                    <div><strong>Адрес:</strong> Remote / Минск</div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input name="name" value={form.name} onChange={handleChange} required placeholder="Имя" className="w-full px-4 py-3 rounded border" />
                                    <input name="email" value={form.email} onChange={handleChange} type="email" required placeholder="Email" className="w-full px-4 py-3 rounded border" />
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Телефон" className="w-full px-4 py-3 rounded border" />
                                    <select name="projectType" value={form.projectType} onChange={handleChange} className="w-full px-4 py-3 rounded border">
                                        <option value="website">Сайт-лендинг</option>
                                        <option value="webapp">Веб-приложение</option>
                                        <option value="software">ПО под ключ</option>
                                        <option value="other">Другое</option>
                                    </select>
                                </div>
                                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Коротко о задаче" rows={4} className="w-full px-4 py-3 rounded border" />
                                <div className="flex items-center gap-4">
                                    <button type="submit" disabled={sending} className="px-6 py-3 bg-[var(--accent)] text-white rounded-md hover:brightness-110">{sending? 'Отправка...' : 'Отправить заявку'}</button>
                                    <div className="text-sm text-[var(--muted)]">Мы ответим в рабочее время в течение 1 дня.</div>
                                </div>
                            </form>

                        </div>
                    </div>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="bg-[var(--text)] text-white">
                <div className="mx-auto max-w-6xl px-6 py-10 grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <img src={logo} alt="WebNexum logo" className="w-10 h-10 object-contain rounded" />
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
                                <li><a href="#portfolio">Портфолио</a></li>
                                <li><a href="#contact">Контакты</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold">Контакты</h4>
                            <ul className="mt-2 text-sm text-white/80 space-y-2">
                                <li>hello@webnexum.com</li>
                                <li>+7 900 000 00 00</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
