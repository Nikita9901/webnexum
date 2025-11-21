import {useState, useRef, useEffect} from "react";

export function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    const contentRef = useRef(null);

    return (
        <div
            className="faq-item border border-[#dbe2f1] rounded-xl p-4 mb-3
                       bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
        >
            <button
                className="w-full flex justify-between items-center text-left"
                onClick={() => setOpen(!open)}
            >
                <span className="text-lg font-medium text-[#1c1f33]">
                    {question}
                </span>

                <svg
                    className={`
                        pointer-events-none 
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
                <p className="mt-3 text-[#4a4f6a] leading-relaxed opacity-90">
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
            a: "Разработка дизайна, верстка, React-приложение, Серверная часть, админка, SEO-настройка и публикация."
        },
        {
            q: "Сколько длится разработка?",
            a: "От 5–7 дней для простых сайтов до 8-9 недель для полноценных проектов с функционалом."
        },
        {
            q: "Даете ли вы поддержку?",
            a: "Да, предоставляем техподдержку, обновления и сопровождение проекта."
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
