import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
	const [lang, setLang] = useState(() => {
		return localStorage.getItem('lang') || 'pt';
	});

	useEffect(() => {
		localStorage.setItem('lang', lang);
	}, [lang]);

	return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	return useContext(LanguageContext);
}
