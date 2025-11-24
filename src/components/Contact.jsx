import React from 'react';
import { CustomSelect } from '../atoms';

export function Contact({ t, form, handleChange, handleSubmit, sending, language }) {
    return (
        <section id="contact" className="mt-20 mb-24">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-[var(--card)] to-white rounded-xl md:rounded-2xl shadow-2xl overflow-hidden border border-[var(--bg)]">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-0">
                    {/* Left Side - Contact Info */}
                    <div className="bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] p-6 sm:p-8 md:p-10 text-white">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">{t.contact.title}</h2>
                        <p className="text-white/90 mb-6 sm:mb-8 text-base sm:text-lg">{t.contact.description}</p>

                        <div className="space-y-3 sm:space-y-4 md:space-y-5">
                            <a href={'mailto:support@webnexum.com'} target={'_blank'} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-xs sm:text-sm text-white/70">{t.contact.email}</div>
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
                                    <div className="text-xs sm:text-sm text-white/70">{t.contact.telegram}</div>
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
                                    <div className="text-xs sm:text-sm text-white/70">{t.contact.address}</div>
                                    <div className="font-semibold text-sm sm:text-base">{t.contact.addressValue}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="p-6 sm:p-8 md:p-10 bg-[var(--card)]">
                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[var(--text)] mb-2">{t.contact.name}</label>
                                <input 
                                    name="name" 
                                    value={form.name} 
                                    onChange={handleChange} 
                                    required
                                    placeholder={t.contact.namePlaceholder} 
                                    className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[var(--muted)]/30 bg-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all text-sm sm:text-base"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                                    {t.contact.connectMethod}
                                </label>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    {[
                                        {value: "telegram", label: t.contact.telegramOption, icon: "📱"},
                                        {value: "phone", label: t.contact.phoneOption, icon: "📞"},
                                        {value: "email", label: t.contact.emailOption, icon: "✉️"},
                                        {value: "viber", label: t.contact.viberOption, icon: "💬"},
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
                                        {form.connect === 'phone' ? t.contact.phone : form.connect === 'email' ? t.contact.emailField : form.connect === 'viber' ? t.contact.phone : t.contact.telegram}
                                    </label>
                                    <input
                                        required
                                        name={form.connect}
                                        value={form[form.connect]}
                                        onChange={handleChange}
                                        type={form.connect === 'phone' || form.connect === 'viber' ? "tel" : form.connect === 'email' ? 'email' : 'text'}
                                        placeholder={form.connect === 'phone' ? t.contact.phonePlaceholder : form.connect === 'email' ? t.contact.emailPlaceholder : form.connect === 'viber' ? t.contact.viberPlaceholder : '@username'}
                                        className="w-full px-4 py-2.5 sm:py-3 rounded-lg border border-[var(--muted)]/30 bg-white focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 outline-none transition-all text-sm sm:text-base"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[var(--text)] mb-2">{t.contact.projectType}</label>
                                    <CustomSelect
                                        value={form.projectType}
                                        onChange={(v) => {
                                            const event = { target: { name: 'projectType', value: v } };
                                            handleChange(event);
                                        }}
                                        options={[
                                            { value: "website", label: t.contact.projectTypes.website },
                                            { value: "webapp", label: t.contact.projectTypes.webapp },
                                            { value: "software", label: t.contact.projectTypes.software },
                                            { value: "other", label: t.contact.projectTypes.other },
                                        ]}
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-[var(--text)] mb-2">{t.contact.message}</label>
                                <textarea 
                                    name="message" 
                                    value={form.message} 
                                    onChange={handleChange}
                                    placeholder={t.contact.messagePlaceholder} 
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
                                        <span>{t.contact.sending}</span>
                                    </>
                                ) : (
                                    <>
                                        <span>{t.contact.submit}</span>
                                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-xs sm:text-sm text-[var(--muted)]">
                                {language === 'ru' ? 'Мы ответим в рабочее время в течение 1 дня' : 'We will respond within 1 business day'}
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

