import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../Lang/translation.js';


function cx(...xs) {
	return xs.filter(Boolean).join(' ');
}

export function FilterDrawer({
	isOpen,
	onClose,
	searchText,
	setSearchText,
	facetsCats, // string[]
	facetsTypes, // string[]
	selectedCats, // Set<string>
	selectedTypes, // Set<string>
	toggleCat, // (s: string) => void
	toggleType, // (s: string) => void
	clearAll, // () => void
	visibleCount, // number
	availableCats, // Set<string> (para desativar chips incompatíveis)
	availableTypes, // Set<string>
}) {
	const { lang } = useLanguage();
	const panelRef = useRef(null);

	
	useEffect(() => {
		if (!isOpen) return;
		const onKey = e => e.key === 'Escape' && onClose?.();
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isOpen, onClose]);

	const hasFilters = selectedCats.size > 0 || selectedTypes.size > 0 || (searchText?.trim()?.length ?? 0) > 0;

	
	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<motion.aside
					id='archive-filter-panel'
					ref={panelRef}
					key='filter-drawer'
					initial={{ x: '-100%' }}
					animate={{ x: 0 }}
					exit={{ x: '-100%' }}
					transition={{ duration: 0.28 }}
					className='
            fixed  left-0 top-0 z-50
            bg-black border-r-[.5px] border-[#666566]
            text-[#eaebde]
            px-8  overflow-y-auto
            drawer-panel
            pt-[6rem]
          '
					style={{ width: 'var(--drawer-w)' }}
					aria-label='Filter panel'
				>
					{/* Search */}
					<div className='mb-8'>
						<label htmlFor='archive-search' className='sr-only'>
							{lang === 'pt' ? 'Pesquisar no arquivo' : 'Search archive'}
						</label>
						<div className='flex items-center'>
							<input
								id='archive-search'
								type='text'
								value={searchText}
								onChange={e => setSearchText(e.target.value)}
								placeholder={translations[lang].pesquisar}
								onKeyDown={e => {
									if (e.key === 'Escape') setSearchText(''); 
								}}
								className='w-full rounded-xl border border-r-[.5px] border-[#666566] bg-transparent px-3 py-2 text-sm outline-none focus:border-[#eaebde]'
							/>
						</div>
					</div>

					{/* Categoria */}
					<details open className='mb-8'>
						<summary className='cursor-pointer text-xs uppercase tracking-wide '>
							{translations[lang].categoria} {selectedCats.size > 0 ? `(${selectedCats.size})` : ''}
						</summary>

						<div className='mt-3 flex flex-wrap gap-2'>
							{facetsCats.length === 0 && <div className='text-xs opacity-60'>{translations[lang].opções}</div>}

							{facetsCats.map(cat => {
								const active = selectedCats.has(cat);
								const available = availableCats.has(cat) || active;
								return (
									<button
										key={cat}
										onClick={() => available && toggleCat(cat)}
										className={cx(
											'relative group px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b] transition duration-300 hover:bg-[#eaebde] hover:border-[#eaebde] hover:text-black ',
											active ? 'bg-[#eaebde] border-[#eaebde] text-black ' : 'bg-transparent text-[#eaebde] border-[#666566]',
											!available && 'opacity-20 pointer-events-none',
										)}
										aria-pressed={active}
										aria-label={active ? (lang === 'pt' ? `Remover filtro ${cat}` : `Remove filter ${cat}`) : lang === 'pt' ? `Adicionar filtro ${cat}` : `Add filter ${cat}`}
									>
										<span className={active ? 'pr-4' : ''}>{cat}</span>
										{active && (
											<span className='absolute right-2 top-1/2 -translate-y-1/2  group-hover:inline text-[10px] leading-none text-black' aria-hidden>
												<X className='w-3 h-3' />
											</span>
										)}
									</button>
								);
							})}
						</div>
					</details>

					{/* Tipo */}
					<details open>
						<summary className='cursor-pointer text-xs  tracking-wide uppercase'>
							{translations[lang].tipo} {selectedTypes.size > 0 ? `(${selectedTypes.size})` : ''}
						</summary>

						<div className='mt-3 flex flex-wrap gap-2'>
							{facetsTypes.length === 0 && <div className='text-xs opacity-60'>{translations[lang].opções}</div>}

							{facetsTypes.map(tp => {
								const active = selectedTypes.has(tp);
								const available = availableTypes.has(tp) || active;
								return (
									<button
										key={tp}
										onClick={() => available && toggleType(tp)}
										className={cx(
											'relative group px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b] transition duration-300 hover:bg-[#eaebde] hover:border-[#eaebde] hover:text-black ',
											active ? 'bg-[#eaebde] text-black border-[#eaebde]' : 'bg-transparent text-[#eaebde] border-[#666566]',
											!available && 'opacity-20 pointer-events-none',
										)}
										aria-pressed={active}
										aria-label={active ? (lang === 'pt' ? `Remover filtro ${tp}` : `Remove filter ${tp}`) : lang === 'pt' ? `Adicionar filtro ${tp}` : `Add filter ${tp}`}
									>
										<span className={active ? 'pr-4' : ''}>{tp}</span>
										{active && (
											<span className='absolute right-2 top-1/2 -translate-y-1/2  group-hover:inline text-[10px] leading-none text-black' aria-hidden>
												<X className='w-3 h-3' />
											</span>
										)}
									</button>
								);
							})}
						</div>
					</details>

					{/* Clear all */}
					{hasFilters && (
						<div className=' absolute bottom-8 left-8'>
							<button onClick={clearAll} className='px-3 py-1 rounded-xl text-xs border transition duration-500 bg-[#eaebde] text-black  hover:bg-black hover:text-[#eaebde]'>
								{translations[lang].limparTodos}
							</button>
						</div>
					)}
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
