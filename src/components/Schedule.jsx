import React, { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { ModalContent } from './ModalContent.jsx';

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

export function Schedule({ entrevistas }) {
	const [selected, setSelected] = useState(null);

	if (!entrevistas || entrevistas.length === 0) {
		return <p className='text-white mt-6'>Nenhuma entrevista carregada.</p>;
	}

	return (
		<div className='text-white mt-6'>
			<h2 className='text-2xl mb-4 font-bold'>Schedules</h2>
			<ul className='grid grid-cols-4 gap-6'>
				{entrevistas.map(ep => (
					<li key={ep._id} onClick={() => setSelected(ep)} className='cursor-pointer'>
						<div className='schedule-item p-2  text-black relative'>
							{ep.thumbnail && <img src={urlFor(ep.thumbnail).width(800).height(600).fit('clip').auto('format').url()} alt={ep.titulo} className='w-full h-[200px] object-cover rounded-xl' />}

							<div className='pt-3 px-4'>
								<div className='flex justify-between text-sm'>
									<span>
										{ep.data?.dia}.{mesParaNumero(ep.data?.mes)}.25
									</span>
									<span>
										{ep.horario?.inicio} - {ep.horario?.fim}
									</span>
								</div>
								<div className='pt-2'>
									<h1 className='text-lg font-bold mb-1 uppercase'>
										{ep.programa}. {ep.titulo}
									</h1>
									
								</div>
							</div>
							<div className='border-1 px-2 py-.5 rounded-full inline-block absolute bottom-4 left-4'>
								<p className='text-xs '>{ep.clusters}</p>
							</div>
						</div>
					</li>
				))}
			</ul>

			<ModalContent
				isOpen={!!selected}
				onClose={() => setSelected(null)}
				data={
					selected && {
						...selected,
						thumbnail: selected.thumbnail && urlFor(selected.thumbnail).width(800).url(),
						dataFull: `${selected.data?.dia}/${mesParaNumero(selected.data?.mes)}`,
						textoLongo: selected.textoLongo || 'Conteúdo completo da entrevista em breve.',
					}
				}
			/>
		</div>
	);
}
