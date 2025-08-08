import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export function LangSwitcher() {
	const { lang, setLang } = useLanguage();

	return (
		<div className='flex  justify-end select-none'>
			<motion.button onClick={() => setLang('pt')} animate={{ opacity: lang === 'pt' ? 1 : 0.5 }} transition={{ duration: 0.2 }} className='px-2 py-1 font-bold text-white'>
				PT
			</motion.button>
			<motion.button onClick={() => setLang('en')} animate={{ opacity: lang === 'en' ? 1 : 0.5 }} transition={{ duration: 0.2 }} className='px-2 py-1 font-bold text-white'>
				ENG
			</motion.button>
		</div>
	);
}
