import { useState, useEffect } from 'react';
import { translations } from '../constants/translations';

export function useLanguage() {
    const [language, setLanguage] = useState('ru'); // Default to 'ru' initially

    useEffect(() => {
        // 1. Check for a language preference saved in localStorage.
        const savedLang = localStorage.getItem('webnexum_lang');
        if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
            setLanguage(savedLang);
            return;
        }

        // 2. If no preference is saved, detect from the browser's language setting.
        // This is the client-side equivalent of the 'Accept-Language' header.
        const browserLang = (navigator.language || navigator.userLanguage).toLowerCase();
        const detectedLang = browserLang.startsWith('ru') ? 'ru' : 'en';
        
        setLanguage(detectedLang);
        // Save the detected language as the new default for subsequent visits.
        localStorage.setItem('webnexum_lang', detectedLang);
    }, []);

    const changeLanguage = (lang) => {
        if (lang === 'ru' || lang === 'en') {
            setLanguage(lang);
            localStorage.setItem('webnexum_lang', lang);
        }
    };

    const t = translations[language];

    return { language, changeLanguage, t };
}
