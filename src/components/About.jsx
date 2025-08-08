import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { translations } from '../Lang/translation.js';
import { useLanguage } from '../context/LanguageContext';

export function About() {
	const [expanded, setExpanded] = useState(false);
	const { lang } = useLanguage();
	const toggle = () => setExpanded(prev => !prev);

	return (
		<>
			<hr className='border-[#484848]' />
			<div className='container-default '>
				<h2 className='text-2xl mb-8 font-bold text-center lg:text-left'>{translations[lang].sobre}</h2>

				<div className='lg:flex lg:flex-col lg:items-center'>
					<div className='lg:w-2/3 lg:text-[1rem] text-sm space-y-4 text-[#eaebde]'>
						<p dangerouslySetInnerHTML={{ __html: translations[lang].aboutIntro }} />

						<AnimatePresence initial={false}>
							{expanded && (
								<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className='space-y-4 mt-6'>
									<p dangerouslySetInnerHTML={{ __html: translations[lang].aboutExpand }} />

									<img src='/artcover.jpeg' alt='Diana Policarpo & Bernardo Gaeiras' className='w-full h-[450px] rounded-lg object-cover border-[.5px] border-[#484848] pointer-events-none mt-12' />
									<h1 className='text-2xl mt-12 text-center lg:text-left'>{translations[lang].aboutBioTitle}</h1>

									<div className='flex flex-col lg:grid lg:grid-cols-2 gap-12 mt-6'>
										<div>
											<div className='font-bold'>{translations[lang].aboutDianaTitle}</div>
											{translations[lang].aboutDianaText}
										</div>
										<div>
											<div className='font-bold'>{translations[lang].aboutBernardoTitle}</div>
											{translations[lang].aboutBernardoText}
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<div className='mt-4 '>
							<button onClick={toggle} className='  hover:underline transition duration-200 underline-offset-4'>
								{expanded ? <CircleMinus strokeWidth={2} color='black' fill='#eaebde' /> : <CirclePlus strokeWidth={2} color='black' fill='#eaebde' />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
