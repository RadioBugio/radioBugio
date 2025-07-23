import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';

export function Arquivo({ entrevistas }) {
	const [expandedId, setExpandedId] = useState(null);

	const toggle = id => {
		setExpandedId(prev => (prev === id ? null : id));
	};

	if (!entrevistas || entrevistas.length === 0) {
		return null;
	}

	return (
		<>
			<hr className='border-[#484848]' />
			<div className='text-white container-default relative'>
				<h2 className='text-2xl mb-4 font-bold uppercase'>ARQUIVO</h2>

				<ul className='flex flex-col gap-4 place-self-center-safe'>
					{entrevistas.map(ep => {
						const isOpen = expandedId === ep._id;

						return (
							<li
								key={ep._id}
								onClick={() => toggle(ep._id)}
								className='relative  bg-[#484848] hover:opacity-100 opacity-50 rounded-2xl p-3 transition duration-500  cursor-pointer'
								style={{ width: '900px', maxWidth: '100%' }}
							>
								<div className='grid grid-cols-4'>
									<div className='col-span-1 flex justify-between text-sm opacity-80'>
										<span>
											{ep.data?.dia}/{mesParaNumero(ep.data?.mes)}/{ep.data?.ano}, {ep.horario?.inicio} <br />
											{ep.duracao} min
										</span>
									</div>
									<div className='col-span-2'>
										<h3 className='text-lg font-semibold'>{ep.titulo}</h3>
									</div>
									<div className='col-span-1'>
										<div className='flex flex-col gap-1'>
											<div>{ep.clusters2 && <div className='inline-block bg-[#88888856] px-2 py-1 text-xs opacity-80 rounded-full'>{ep.clusters2}</div>}</div>
											<div>
												{Array.isArray(ep.clusters) &&
													ep.clusters.map((cluster, index) => (
														<div key={index} className='inline-block bg-[#88888856] px-2 py-1 text-xs opacity-80 rounded-full'>
															{cluster}
														</div>
													))}
											</div>
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
											className='overflow-hidden mt-4 text-sm text-gray-300 px-6 pb-6'
										>
											{ep.thumbnail && (
												<div className='w-1/3 pb-8'>
													<img src={urlFor(ep.thumbnail).url()} alt={ep.titulo} className='rounded-2xl' />
												</div>
											)}
											<p>{ep.descricao}</p>
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
