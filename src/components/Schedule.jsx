import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';

export function Schedule({ entrevistas }) {
	const [expandedId, setExpandedId] = useState(null);

	const toggle = id => {
		setExpandedId(prev => (prev === id ? null : id));
	};

	if (!entrevistas || entrevistas.length === 0) {
		return null;
	}

	return (
		<>
			
			<div className='container-default text-white  '>
				<h2 className='text-2xl mb-4 font-bold uppercase  '>PROGRAMAÇÃO</h2>
				<ul className='flex flex-col gap-6 w-2/3 place-self-center-safe '>
					{entrevistas.map(ep => {
						const isOpen = expandedId === ep._id;

						return (
							<li key={ep._id} onClick={() => toggle(ep._id)} className='cursor-pointer border-[.5px] border-[#484848] p-3 transition duration-500 hover:bg-black'>
								<div className='text-xs'>{ep.clusters2}</div>
								<div className='pt-4 grid grid-cols-4'>
									<div className='col-span-1 flex justify-between text-sm opacity-80 mb-2'>
										<span>
											{ep.data?.dia}/{mesParaNumero(ep.data?.mes)} <br></br>
											{ep.horario?.inicio} - {ep.horario?.fim}
											<br></br>
											{ep.duracao} min
										</span>
									</div>
									<div className='col-span-3'>
										<h3 className='text-lg font-semibold'>
											<span class='inline-block bg-white text-black font-bold px-1.5 py-0 mr-2'>{ep.programa}</span> {ep.titulo}
										</h3>

										<div className='mt-3 flex  gap-4'>
											{Array.isArray(ep.clusters) &&
												ep.clusters.map((cluster, index) => (
													<div key={index} className='inline-block bg-[#48484856] px-2 py-1 text-xs opacity-80 rounded-full'>
														{cluster}
													</div>
												))}
										</div>
									</div>
								</div>

								<AnimatePresence initial={false}>
									{isOpen && (
										<motion.div
											initial={{ opacity: 0, height: 0 }}
											animate={{ opacity: 1, height: 'auto' }}
											exit={{ opacity: 0, height: 0 }}
											transition={{ duration: 0.3 }}
											className='overflow-hidden mt-4 text-sm text-gray-300'
										>
											<div className='w-1/3'>{ep.thumbnail && <img src={urlFor(ep.thumbnail).url()} alt={ep.titulo} />}</div>
											<p className='mb-2'>{ep.descricao}</p>
										</motion.div>
									)}
								</AnimatePresence>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
}

function mesParaNumero(mes) {
	const mapa = {
		Janeiro: '01',
		Fevereiro: '02',
		Março: '03',
		Abril: '04',
		Maio: '05',
		Junho: '06',
		Julho: '07',
		Agosto: '08',
		Setembro: '09',
		Outubro: '10',
		Novembro: '11',
		Dezembro: '12',
	};
	return mapa[mes] || '';
}
