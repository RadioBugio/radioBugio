import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { DrawerModal } from './DrawerModal';


export function Arquivo({ arquivos }) {
	const [selectedEp, setSelectedEp] = useState(null);

	if (!arquivos || arquivos.length === 0) return null;

	return (
		<div className='text-[#eaebde] container-default relative'>
			<h2 className='text-2xl mb-8 font-bold '>Arquivo</h2>
			<div className='flex flex-col items-center'>
				<ul className='grid grid-cols-4 gap-4 w-2/3'>
					{arquivos.map(ep => (
						<li
							key={ep._id}
							onClick={() => setSelectedEp(ep)}
							className='border-[.5px] border-[#484848] hover:opacity-50 rounded-2xl p-3 transition duration-500 cursor-pointer h-[400px] flex flex-col gap-3'
						>
							<img src={urlFor(ep.thumbnail).url()} alt={ep.titulo} className='rounded-xl w-full h-[200px] object-cover' />
							<div className='mx-2 flex flex-col flex-grow'>
								<div className='flex justify-between text-xs opacity-80'>
									<span>
										{ep.data?.dia}/{mesParaNumero(ep.data?.mes)}/{ep.data?.ano}, {ep.horario?.inicio}
									</span>
									{ep.duracao} min
								</div>
								<h3 className='text-[1.1rem] font-semibold mt-2 leading-[1.3] '>{ep.titulo}</h3>
								<div className='flex flex-col gap-1 mt-4 flex-grow content-end-safe  place-content-end-safe  '>
									<div>{ep.clusters2 && <div className='inline-block bg-[#88888856] px-3 py-1 text-[0.7rem] opacity-80 rounded-full border-[.5px] border-[#484848]'>{ep.clusters2}</div>}</div>
									<div className='flex flex-wrap gap-1 '>
										{Array.isArray(ep.clusters) &&
											ep.clusters.map((c, i) => (
												<span key={i} className='inline-block bg-[#88888856] px-3 py-1 text-[0.7rem] opacity-80 rounded-full border-[.5px] border-[#484848]'>
													{c}
												</span>
											))}
									</div>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>

			<DrawerModal isOpen={!!selectedEp} onClose={() => setSelectedEp(null)} episode={selectedEp} />
		</div>
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
