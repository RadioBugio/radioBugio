// src/components/Header.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuMobile } from './MenuMobile';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../Lang/translation.js';
import { LogoAnimated } from '../components/LogoAnimated';

const sideVariants = {
	visible: { y: 0, opacity: 1, pointerEvents: 'auto', transition: { duration: 0.28 } },
	hidden: { y: -24, opacity: 0, pointerEvents: 'none', transition: { duration: 0.24 } },
};

export function Header() {
	const { lang, setLang } = useLanguage();
	const loc = useLocation();
	const onArchive = loc.pathname.startsWith('/arquivo');

	const [filterOpen, setFilterOpen] = useState(false);
	const [count, setCount] = useState(null);

	const [showSides, setShowSides] = useState(true);
	const lastY = useRef(0);

	const next = lang === 'pt' ? 'EN' : 'PT';
	const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

	useEffect(() => {
		const handler = e => {
			const { isOpen, count } = e.detail || {};
			if (typeof isOpen === 'boolean') setFilterOpen(isOpen);
			if (typeof count === 'number') setCount(count);
		};
		window.addEventListener('archive-filter-state', handler);
		return () => window.removeEventListener('archive-filter-state', handler);
	}, []);

	useEffect(() => {
		if (!onArchive) {
			setFilterOpen(false);
			setCount(null);
		}
	}, [onArchive]);

	useEffect(() => {
		lastY.current = window.scrollY || 0;

		const MIN_DELTA = 8;
		const TOP_STICKY = 40;

		const onScroll = () => {
			if (onArchive && filterOpen) {
				setShowSides(true);
				return;
			}

			const y = window.scrollY || 0;
			const delta = y - lastY.current;

			if (y < TOP_STICKY) {
				setShowSides(true);
			} else if (Math.abs(delta) > MIN_DELTA) {
				setShowSides(delta < 0); 
			}
			lastY.current = y;
		};

		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, [onArchive, filterOpen]);

	useEffect(() => {
		if (!filterOpen) lastY.current = window.scrollY || 0;
		if (onArchive && filterOpen) setShowSides(true);
	}, [filterOpen, onArchive]);

	const scrollToSection = id => {
		const el = document.getElementById(id);
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	};

	// acionar toggle da gaveta de filtro na página /arquivo
	const toggleArchiveFilter = () => {
		window.dispatchEvent(new CustomEvent('archive-filter-toggle'));
	};

	const filterLabelBase = filterOpen ? translations[lang]?.fechar || 'Close' : translations[lang]?.filtro || 'Filter';
	const filterLabel = count != null ? `${filterLabelBase} (${count})` : filterLabelBase;

	return (
		<>
			{/* gradiente superior */}
			<div className='fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none' />

			<div className='hidden lg:block fixed top-0 left-0 right-0 z-60'>
				<div className='mx-8 mt-6 grid grid-cols-3 items-center'>
					{/* COL 1 */}
					<motion.div className='flex items-center gap-4' variants={sideVariants} animate={showSides ? 'visible' : 'hidden'}>
						{onArchive ? (
							<button onClick={toggleArchiveFilter} className='hover:opacity-50 transition duration-300' aria-expanded={filterOpen} aria-controls='archive-filter-panel'>
								{filterLabel}
							</button>
						) : (
							<>
								<button onClick={() => scrollToSection('programacao')} className='hover:opacity-50 transition duration-300'>
									{translations[lang].programação}
								</button>
								<NavLink to='/arquivo' className='hover:opacity-50 transition duration-300'>
									{translations[lang].arquivo}
								</NavLink>
								<NavLink to='/investigacao' className='hover:opacity-50 transition duration-300'>
									{translations[lang].investigacao}
								</NavLink>
								<button onClick={() => scrollToSection('sobre')} className='hover:opacity-50 transition duration-300'>
									{translations[lang].sobre}
								</button>
							</>
						)}
					</motion.div>

					{/* COL 2: logo sempre visível */}
					<div className='flex justify-center'>
						<Link to='/'>
							<LogoAnimated className='w-60' />
						</Link>
					</div>

					{/* COL 3 */}
					<motion.div className='flex justify-end items-center gap-4' variants={sideVariants} animate={showSides ? 'visible' : 'hidden'}>
						{onArchive ? (
							<>
								<button onClick={() => scrollToSection('programacao')} className='hover:opacity-50 transition duration-300'>
									{translations[lang].programação}
								</button>
								<NavLink to='/investigacao' className='hover:opacity-50 transition duration-300'>
									{translations[lang].investigacao}
								</NavLink>
								<button onClick={() => scrollToSection('sobre')} className='hover:opacity-50 transition duration-300'>
									{translations[lang].sobre}
								</button>
								<button onClick={toggleLang} className='hover:opacity-50 transition duration-300' aria-label={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}>
									{next}
								</button>
							</>
						) : (
							<button onClick={toggleLang} className='hover:opacity-50 transition duration-300' aria-label={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}>
								{next}
							</button>
						)}
					</motion.div>
				</div>
			</div>

			<MenuMobile />
		</>
	);
}
