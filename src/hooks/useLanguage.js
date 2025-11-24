import { useState, useEffect } from 'react';
import { translations } from '../constants/translations';

export function useLanguage() {
    const [language, setLanguage] = useState('ru');

    useEffect(() => {
        const detectLanguage = async () => {
            // Check localStorage first
            const savedLang = localStorage.getItem('webnexum_lang');
            if (savedLang && (savedLang === 'ru' || savedLang === 'en')) {
                setLanguage(savedLang);
                return;
            }

            try {
                // Try to detect by IP using free API
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                
                // Check if country code suggests Russian/Belarusian region
                const russianSpeakingCountries = ['RU', 'BY', 'KZ', 'UA', 'KG', 'TJ', 'UZ', 'MD', 'AM', 'AZ', 'GE'];
                const detectedLang = russianSpeakingCountries.includes(data.country_code) ? 'ru' : 'en';
                setLanguage(detectedLang);
                localStorage.setItem('webnexum_lang', detectedLang);
            } catch (error) {
                console.log('IP detection failed, using browser language');
                // Fallback to browser language
                const browserLang = navigator.language || navigator.userLanguage;
                const detectedLang = browserLang.startsWith('ru') ? 'ru' : 'en';
                setLanguage(detectedLang);
                localStorage.setItem('webnexum_lang', detectedLang);
            }
        };

        detectLanguage();
    }, []);

    const changeLanguage = (lang) => {
        setLanguage(lang);
        localStorage.setItem('webnexum_lang', lang);
    };

    const t = translations[language];

    return { language, changeLanguage, t };
}


