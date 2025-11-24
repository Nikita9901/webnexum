import {useState, useRef, useEffect} from "react";

export function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div
            className="faq-item border border-[#dbe2f1] rounded-xl mb-3
                       bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
        >
            <button
                className="w-full flex justify-between items-center text-left p-4 min-h-[60px]"
                onClick={() => setOpen(!open)}
            >
                <span className="text-lg font-medium text-[#1c1f33] pr-4">
                    {question}
                </span>

                <svg
                    className={`
                        pointer-events-none 
                        w-5 h-5 opacity-60 flex-shrink-0
                        transition-transform duration-300
                        [transition-timing-function:cubic-bezier(.34,1.56,.64,1)]
                        ${open ? "rotate-180 scale-110" : "rotate-0 scale-100"}
                    `}
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <div
                ref={contentRef}
                style={{
                    maxHeight: open ? contentRef.current?.scrollHeight : 0,
                }}
                className={`
                    overflow-hidden 
                    transition-all duration-400 ease-in-out 
                    
                    ${open ? "animate-faqSpring" : "opacity-0"}
                `}
            >
                <p className="px-4 pb-4 text-[#4a4f6a] leading-relaxed opacity-90">
                    {answer}
                </p>
            </div>
        </div>
    );
}

export function FAQ() {
    const faqList = [
        {
            q: "Что входит в создание сайта?",
            a: "Разработка дизайна, верстка, React-приложение, серверная часть, админка, SEO-настройка и публикация. Полный цикл от идеи до запуска."
        },
        {
            q: "Сколько длится разработка?",
            a: "От 5–7 дней для простых сайтов до 8-9 недель для полноценных проектов с функционалом. Точные сроки определяются после анализа требований."
        },
        {
            q: "Как формируется стоимость проекта?",
            a: "Стоимость зависит от объема работ, сложности функционала и сроков. После обсуждения требований мы предоставляем детальную оценку. Работаем с фиксированной стоимостью по договору."
        },
        {
            q: "Какие технологии вы используете?",
            a: "Основной стек: React, Node.js, TypeScript, PostgreSQL/MongoDB. Также работаем с Next.js, Express, Django, Flask. Выбираем технологии под конкретную задачу."
        },
        {
            q: "Даете ли вы поддержку?",
            a: "Да, предоставляем техподдержку, обновления и сопровождение проекта. Включаем 3 месяца бесплатной поддержки после запуска, далее — по договоренности."
        },
        {
            q: "Можно ли доработать существующий проект?",
            a: "Конечно. Работаем с проектами на любых технологиях. Можем добавить функционал, переработать дизайн, оптимизировать производительность или мигрировать на современный стек."
        },
        {
            q: "Как проходит процесс работы?",
            a: "Обсуждение требований → Техническое задание → Дизайн и прототипы → Разработка с регулярными демо → Тестирование → Запуск. Работаем по Agile с прозрачной коммуникацией."
        },
        {
            q: "Какие гарантии вы предоставляете?",
            a: "Гарантируем соответствие техническому заданию, исправление багов в течение гарантийного периода, передачу исходного кода и документации. Все фиксируется в договоре."
        },
        {
            q: "Как происходит оплата?",
            a: "Обычно работаем по схеме: 30% предоплата, 40% по готовности основной части, 30% после запуска. Возможны индивидуальные условия для крупных проектов."
        },
        {
            q: "Работаете ли вы с зарубежными клиентами?",
            a: "Да, работаем удаленно с клиентами по всему миру. Используем современные инструменты для коммуникации и управления проектами. Гибкий график работы."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto mt-10">
            {faqList.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
        </div>
    );
}

export function CustomSelect({ value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const close = e => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("click", close);
        return () => document.removeEventListener("click", close);
    }, []);

    const current = options.find(o => o.value === value);

    return (
        <div ref={ref} className="relative w-full">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className="
                    w-full px-4 py-3 rounded-lg border
                    bg-[var(--card)] text-[var(--text)]
                    border-gray-300/60
                    flex items-center justify-between
                    hover:border-[var(--accent)]
                    transition-all
                "
            >
                {current.label}
                <svg
                    className={`
                        pointer-events-none absolute right-3 top-1/2 -translate-y-1/2
                        w-4 h-4 opacity-60
                        transition-transform duration-300
                        [transition-timing-function:cubic-bezier(.34,1.56,.64,1)]
                        ${open ? "rotate-180 scale-110" : "rotate-0 scale-100"}
                    `}
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className="
            absolute mt-2 w-full rounded-lg shadow-lg z-50
            bg-[var(--card)] border border-gray-300/60
            overflow-hidden

            animate-dropdownSpring
        "
                >
                    {options.map(opt => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                            className="
                    px-4 py-3 cursor-pointer
                    hover:bg-[var(--accent)] hover:text-white
                    hover:opacity-70
                    rounded-lg
                "
                        >
                            {opt.label}
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
