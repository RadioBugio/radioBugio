import React, { useState, useRef, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { LangSwitcher } from '../components/LangSwitcher';
import { translations } from '../Lang/translation.js';
import { useLanguage } from '../context/LanguageContext';

export function MenuMobile() {
	const [isOpen, setIsOpen] = useState(false);
	const drawerRef = useRef(null);
	const { lang } = useLanguage();

	const scrollToSection = id => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
		setIsOpen(false); 
	};

	useEffect(() => {
		const handleOutsideClick = e => {
			if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isOpen]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	return (
		<div className='fixed top-0 left-0 right-0 z-50 lg:hidden'>
			<div className='flex justify-between items-center p-6 bg-transparent relative z-50'>
				<Link to='/'>
					<img src='/logos/logoBugio.svg' alt='Logo' className='w-70 pointer-events-none' />
				</Link>
				<button onClick={() => setIsOpen(!isOpen)} className='text-white'>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<>
						{/* Overlay */}
						<motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className='fixed inset-0 bg-black z-10' />

						{/* Drawer */}
						<motion.div
							ref={drawerRef}
							initial={{ y: '-100%' }}
							animate={{ y: 0 }}
							exit={{ y: '-100%' }}
							transition={{ duration: 0.3 }}
							className='fixed top-0 left-0 right-0 border-[.5px] border-[#484848] bg-[#0f0f0f] z-10 rounded-b-2xl shadow-md px-6 pb-6 overflow-hidden'
						>
							<div className='mt-[6em]'>
								<div className='flex flex-col items-start gap-3 text-xl mb-4'>
									<button onClick={() => scrollToSection('programacao')}>{translations[lang].programação}</button>
									<button onClick={() => scrollToSection('arquivo')}>{translations[lang].arquivo}</button>
									<button onClick={() => scrollToSection('sobre')}>{translations[lang].sobre}</button>
								</div>
								<LangSwitcher />
							</div>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
