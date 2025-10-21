import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from '../Lang/translation.js';
import { PortableComponents } from '../utils/PortableComponents.jsx';
import { useLanguage } from '../context/LanguageContext';
import { PortableText } from '@portabletext/react';
import sanityClient from '../SanityClient.js';


export function About() {
	const [expanded, setExpanded] = useState(false);
	const [aboutData, setAboutData] = useState(null);
	const { lang } = useLanguage();

	useEffect(() => {
		sanityClient
			.fetch(
				`*[_type == "sobre"][0]{
				sobre,
				sobreEN,
				sobreExpandido,
				sobreExpandidoEN,
				biografiaDiana,
				biografiaDianaEN,
				biografiaBernardo,
				biografiaBernardoEN,
				fichatecnica,
				fichatecnicaEN
			}`,
			)
			.then(data => setAboutData(data));
	}, []);

	const toggle = () => {
		setExpanded(prev => !prev);
	};

	/* if (!aboutData) return null; */


	if (!aboutData) {
		return <div className='container-default text-[#eaebde]'>Loading...</div>;
	}

	const sobre = lang === 'pt' ? aboutData.sobre : aboutData.sobreEN;
	const sobreExpandido = lang === 'pt' ? aboutData.sobreExpandido : aboutData.sobreExpandidoEN;
	const bioDiana = lang === 'pt' ? aboutData.biografiaDiana : aboutData.biografiaDianaEN;
	const bioBernardo = lang === 'pt' ? aboutData.biografiaBernardo : aboutData.biografiaBernardoEN;
	const fichaTecnica = lang === 'pt' ? aboutData.fichatecnica : aboutData.fichatecnicaEN;


	return (
		<>
			<hr className='border-[#4c4c4b]' />
			<div className='m-[2rem] '>
				<div className='text-xl opacity-60  font-semibold text-center lg:text-left'>{translations[lang].sobre}</div>

				<div className='lg:flex lg:flex-col lg:items-center'>
					<div className='lg:w-2/3 lg:text-[1rem] text-sm space-y-4 text-[#eaebde]'>
						<PortableText value={sobre} />
						<AnimatePresence initial={false}>
							{expanded && (
								<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className='space-y-4 mt-6'>
									<PortableText value={sobreExpandido} />

									<img src='/artcover.jpeg' alt='Diana Policarpo & Bernardo Gaeiras' className='w-full h-[450px] rounded-[15px] object-cover border-[.5px] border-[#484848] pointer-events-none mt-12' />

									<div className='text-2xl mt-12 text-center lg:text-left'>{translations[lang].aboutBioTitle}</div>

									<div className='flex flex-col lg:grid lg:grid-cols-2 gap-12 mt-6'>
										<div>
											<PortableText value={bioDiana} components={PortableComponents} />
										</div>
										<div>
											<PortableText value={bioBernardo} components={PortableComponents} />
										</div>
									</div>

									<div className='text-2xl mt-12 text-center lg:text-left'>{translations[lang].aboutFichaTecnicaTitle}</div>

									{Array.isArray(fichaTecnica) && fichaTecnica.length > 0 && (
										<div className=' border-[.5px] lg:w-1/2 border-[#484848] rounded-2xl p-4'>
											<ul className='flex flex-col gap-2 space-y-1 text-sm'>
												{fichaTecnica.map((item, idx) => (
													<li className='flex flex-col gap-1' key={idx}>
														<span className='opacity-50'>{item.funcao}</span>
														<b>{item.nome}</b> 
													</li>
												))}
											</ul>
										</div>
									)}
								</motion.div>
							)}
						</AnimatePresence>

						<div className='mt-4 '>
							<button onClick={toggle} className='  hover:opacity-50 transition duration-300'>
								{expanded ? <div>Menos</div> : <div>Mais</div>}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
