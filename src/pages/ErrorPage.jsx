import { useEffect } from 'react';
import { translations } from '../Lang/translation.js';
import { useLanguage } from '../context/LanguageContext';

export function ErrorPage() {
		const { lang } = useLanguage();


	useEffect(() => {
		const timer = setTimeout(() => {
			window.location.href = '/';
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<div>
			<div className='w-full h-screen flex justify-center items-center text-xl flex-col'>
				{translations[lang].errorPage.map((text, index) => (
					<p key={index}>{text}</p>
				))}
			</div>
		</div>
	);
}
