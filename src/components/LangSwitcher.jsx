import { useLanguage } from '../context/LanguageContext';

export function LangSwitcher() {
	const { lang, setLang } = useLanguage();

	return (
		<div className='flex gap-2 justify-end'>
			<button className={lang === 'pt' ? 'font-bold underline' : ''} onClick={() => setLang('pt')}>
				PT
			</button>
			<span>/</span>
			<button className={lang === 'en' ? 'font-bold underline' : ''} onClick={() => setLang('en')}>
				ENG
			</button>
		</div>
	);
}
