import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { PortableText } from '@portabletext/react';

export function Schedule({ entrevistas }) {
	const [expandedId, setExpandedId] = useState(null);
	const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
	const [showTooltip, setShowTooltip] = useState(false);
	const [hoveredId, setHoveredId] = useState(null);


	const toggle = id => {
		setExpandedId(prev => (prev === id ? null : id));
	};

	const handleMouseMove = e => {
		setCursorPos({ x: e.clientX, y: e.clientY });
	};

	const handleMouseEnter = () => setShowTooltip(true);
	const handleMouseLeave = () => setShowTooltip(false);

	if (!entrevistas || entrevistas.length === 0) {
		return null;
	}

	return (
		<>
			<div className='container-default text-white relative'>
				<h2 className='text-2xl mb-4 font-bold uppercase'>PROGRAMAÇÃO</h2>
				<ul className='flex flex-col gap-6 w-2/3 place-self-center-safe rounded-2xl'>
					{entrevistas.map(ep => {
						const isOpen = expandedId === ep._id;
						const isHovered = hoveredId === ep._id;

						return (
							<li
								key={ep._id}
								onClick={() => toggle(ep._id)}
								onMouseMove={e => {
									handleMouseMove(e);
									setHoveredId(ep._id);
								}}
								onMouseEnter={() => {
									handleMouseEnter();
									setHoveredId(ep._id);
								}}
								onMouseLeave={() => {
									handleMouseLeave();
									setHoveredId(null);
								}}
								className={`relative border-[.5px] border-[#484848] rounded-2xl p-3 transition duration-500 hover:bg-black ${isHovered ? 'cursor-none' : 'cursor-pointer'}`}
							>
								<div className='text-xs'>{ep.clusters2}</div>
								<div className='pt-4 grid grid-cols-4'>
									<div className='col-span-1 flex justify-between text-sm opacity-80 mb-2'>
										<span>
											{ep.data?.dia}-{mesParaNumero(ep.data?.mes)}-{ep.data?.ano} <br />
											{ep.horario?.inicio}
										</span>
									</div>
									<div className='col-span-3'>
										<h3 className='text-lg font-semibold'>{ep.titulo}</h3>

										<div className='mt-3 flex gap-4'>
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
											<PortableText value={ep.descricao} />
										</motion.div>
									)}
								</AnimatePresence>
							</li>
						);
					})}
				</ul>

				{/* Tooltip que segue o cursor */}
				{showTooltip && (
					<motion.div
						className='fixed z-50 pointer-events-none text-white text-sm px-3 py-1.5 bg-black/80 rounded-2xl'
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						style={{
							top: cursorPos.y + 0,
							left: cursorPos.x + 0,
						}}
						transition={{ type: 'spring', stiffness: 300, damping: 20 }}
					>
						Abrir
					</motion.div>
				)}
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
