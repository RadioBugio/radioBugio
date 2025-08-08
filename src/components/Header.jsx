import React from 'react';
import { Link } from 'react-router-dom';
import { MenuMobile } from './MenuMobile';
import { LangSwitcher } from '../components/LangSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../Lang/translation.js';


export function Header() {
	const { lang } = useLanguage();
	
	const scrollToSection = id => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<div className='fixed top-0 left-0 right-0 h-30 bg-gradient-to-b from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none'></div>

			<div className='hidden lg:block  fixed top-0 left-0 right-0 z-50  '>
				<div className='mx-8 mt-8 grid grid-cols-3 gap-4   '>
					<div className=' flex flex-col items-start '>
						<button onClick={() => scrollToSection('programacao')} className='hover:underline  '>
							{translations[lang].programação}
						</button>
						<button  className='opacity-40 cursor-not-allowed'>
							{translations[lang].arquivo}
						</button>
						<button onClick={() => scrollToSection('sobre')} className='hover:underline '>
							{translations[lang].sobre}
						</button>
					</div>
					<div className='flex flex-col items-center '>
						<Link to='/'>
							<img src='/logos/logoBugio.svg' alt='Rádio Bugio Logo' className='w-60  ' />
						</Link>
					</div>

					<div className='text-right '>
						<LangSwitcher />
					</div>
				</div>
			</div>

			<MenuMobile />
		</>
	);
}
