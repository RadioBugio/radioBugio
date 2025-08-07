import React, { createContext, useState, useEffect } from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
	const [language, setLanguage] = useState('pt');

	useEffect(() => {
		const savedLanguage = localStorage.getItem('language');
		if (savedLanguage) {
			setLanguage(savedLanguage);
		} else {
			const browserLang = navigator.language.startsWith('en') ? 'en' : 'pt';
			setLanguage(browserLang);
		}
	}, []);

	const changeLanguage = lang => {
		setLanguage(lang);
		localStorage.setItem('language', lang);
	};

	return <LanguageContext.Provider value={{ language, changeLanguage }}>{children}</LanguageContext.Provider>;
};
