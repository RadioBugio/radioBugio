// src/components/MenuMobile.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LogoAnimated } from '../components/LogoAnimated';
import { translations } from '../Lang/translation.js';
import { useLanguage } from '../context/LanguageContext';
import { LangSwitcher } from '../components/LangSwitcher';

export function MenuMobile() {
	const [isOpen, setIsOpen] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);
	const [count, setCount] = useState(null);
	const drawerRef = useRef(null);

	const { lang, setLang } = useLanguage();
	const loc = useLocation();
	const navigate = useNavigate();

	const next = lang === 'pt' ? 'EN' : 'PT';
	const toggleLang = () => setLang(lang === 'pt' ? 'en' : 'pt');

	const onArchive = loc.pathname.startsWith('/arquivo');
	const onResearch = loc.pathname.startsWith('/investigacao');

	useEffect(() => {
		const handler = e => {
			const { isOpen, count } = e.detail || {};
			if (typeof isOpen === 'boolean') setFilterOpen(isOpen);
			if (typeof count === 'number') setCount(count);
		};
		window.addEventListener('archive-filter-state', handler);
		return () => window.removeEventListener('archive-filter-state', handler);
	}, []);

	// Fecha ao clicar fora
	useEffect(() => {
		const handleOutsideClick = e => {
			if (isOpen && drawerRef.current && !drawerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleOutsideClick);
		return () => document.removeEventListener('mousedown', handleOutsideClick);
	}, [isOpen]);

	// Bloqueia scroll do body
	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	// Scroll para secção da home (ou navega com hash se não estiveres na home)
	const goToHomeSection = id => {
		if (loc.pathname === '/') {
			const el = document.getElementById(id);
			if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			if (window.location.hash !== `#${id}`) {
				history.replaceState(null, '', `/#${id}`);
			}
		} else {
			navigate(`/#${id}`);
		}
		setIsOpen(false);
	};

	const navAndClose = to => {
		navigate(to);
		setIsOpen(false);
	};

	const toggleArchiveFilter = () => {
		window.dispatchEvent(new CustomEvent('archive-filter-toggle'));
		setIsOpen(false);
	};

	const filterLabelBase = filterOpen ? translations[lang]?.fechar || 'Close' : translations[lang]?.filtro || 'Filter';
	const filterLabel = count != null ? `${filterLabelBase} (${count})` : filterLabelBase;

	return (
		<div className='fixed top-0 left-0 right-0 z-50 lg:hidden'>
			{/* Topbar */}
			<div className='flex justify-between items-center p-4 bg-transparent relative z-50'>
				<Link to='/' onClick={() => setIsOpen(false)}>
					<LogoAnimated className='w-55' />
				</Link>
				<button onClick={() => setIsOpen(v => !v)} className='text-white' aria-label='Menu'>
					{isOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Drawer */}
			<AnimatePresence>
				{isOpen && (
					<>
						{/* Overlay (fecha ao clicar) */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.7 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className='fixed inset-0 bg-black z-10'
							onClick={() => setIsOpen(false)}
						/>

						<motion.div
							ref={drawerRef}
							initial={{ y: '-100%' }}
							animate={{ y: 0 }}
							exit={{ y: '-100%' }}
							transition={{ duration: 0.28 }}
							className='fixed top-0 left-0 right-0 border-b border-[#484848] bg-[#0f0f0f] z-20 rounded-b-2xl shadow-md px-4 pb-4 overflow-hidden'
							role='dialog'
							aria-modal='true'
						>
							{/* Espaço para não colidir com a topbar */}
							<div className='mt-[5rem]' />

							{/* Links */}
							<nav className='flex flex-col items-start gap-2 '>
								{/* <button onClick={() => goToHomeSection('programacao')} className='hover:opacity-70 transition'>
									{translations[lang].programação}
								</button> */}

								{/* Arquivo (rota) */}
								{!onArchive ? (
									<button onClick={() => navAndClose('/arquivo')} className='hover:opacity-70 transition'>
										{translations[lang].arquivo}
									</button>
								) : null}

								{/* Investigação (rota) */}
								{!onResearch ? (
									<button onClick={() => navAndClose('/investigacao')}>
										{translations[lang].investigacao}
									</button>
								) : null}

								{/* About (ancora da home) */}
								<button onClick={() => goToHomeSection('sobre')} >
									{translations[lang].sobre}
								</button>

								<button onClick={toggleLang} aria-label={lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}>
									{next}
								</button>
							</nav>
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</div>
	);
}
