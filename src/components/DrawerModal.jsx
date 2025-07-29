import { useEffect } from 'react';
import { PortableText } from '@portabletext/react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { X, Play, Pause } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';


export function DrawerModal({ isOpen, onClose, episode }) {
		const { isPlaying} = usePlayer();

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);

	if (!episode) return null;

	const { titulo, data, horario, thumbnail, descricao, clusters, clusters2, duracao } = episode;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div className='fixed inset-0 bg-black/60 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

					<motion.div
						key='drawer'
						className='fixed left-0 right-0 bottom-0 h-[80vh] border-t border-[#484848] bg-[#0f0f0f] text-white z-50 rounded-t-4xl p-8 overflow-y-auto'
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.4 }}
					>
						<div className='grid grid-cols-7 gap-8'>
							<div className='col-span-2'>{thumbnail && <img src={urlFor(thumbnail).url()} alt={titulo} className='w-full h-[400px] object-cover rounded-xl mb-6' />}</div>
							<div className='col-span-4  flex flex-row justify-between '>
								<div className='w-3/4 flex flex-col gap-4 '>
									<h2 className='text-xl font-bold'>{titulo}</h2>
									<div className='text-lg leading-relaxed'>
										<PortableText value={descricao} />
									</div>
								</div>
								<div>
									<button  className='focus:outline-none my-4'>
										{isPlaying ? <Pause className='w-8 h-8' stroke='#eaebde' fill='#eaebde' /> : <Play className='w-8 h-8' stroke='#eaebde' fill='#eaebde' />}
									</button>
									<div className='text-sm text-gray-400 flex gap-4 mb-4'>
										<div>
											
											{data?.dia}/{mesParaNumero(data?.mes)}/{data?.ano}
										</div>
										{horario?.inicio}
										{duracao && <p>{duracao} min</p>}
									</div>
									{clusters2 && <div className='inline-block bg-[#88888856] px-2 py-1 text-xs opacity-80 rounded-full mb-2'>{clusters2}</div>}

									{Array.isArray(clusters) && (
										<div className='flex flex-wrap gap-2 mb-4'>
											{clusters.map((c, i) => (
												<div key={i} className='inline-block bg-[#48484856] px-2 py-1 text-xs opacity-80 rounded-full'>
													{c}
												</div>
											))}
										</div>
									)}
								</div>
							</div>
							<div className='col-span-1 text-right '>
								<button onClick={onClose} className='text-white text-xl hover:text-red-400'>
									<X />
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
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
