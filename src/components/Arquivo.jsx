import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { DrawerModal } from './DrawerModal';
import { PortableText } from '@portabletext/react';


export function Arquivo({ entrevistas }) {
	const [selectedEp, setSelectedEp] = useState(null);

	if (!entrevistas || entrevistas.length === 0) return null;

	return (
		<div className='text-[#eaebde] container-default relative'>
			<h2 className='text-2xl mb-8 font-bold uppercase'>ARQUIVO</h2>
			<div className='flex flex-col items-center'>
				<ul className='grid grid-cols-4 gap-4 w-2/3'>
					{entrevistas.map(ep => (
						<li key={ep._id} onClick={() => setSelectedEp(ep)} className='relative border-[.5px] border-[#484848] hover:opacity-50 rounded-2xl p-2 transition duration-500 cursor-pointer'>
							<img src={urlFor(ep.thumbnail).url()} alt={ep.titulo} className='rounded-xl w-full h-[220px] object-cover' />
							<div className='mt-3 mx-2'>
								<div className='flex justify-between text-sm opacity-80'>
									<span>
										{ep.data?.dia}/{mesParaNumero(ep.data?.mes)}/{ep.data?.ano}, {ep.horario?.inicio}
									</span>
									{ep.duracao} min
								</div>
								<h3 className='text-lg font-semibold pt-1'>{ep.titulo}</h3>
								<div className='flex flex-col gap-1 pt-4  '>
									<div>{ep.clusters2 && <div className='inline-block bg-[#88888856] px-2 py-1 text-[0.7rem] opacity-80 rounded-full'>{ep.clusters2}</div>}</div>
									<div className='flex flex-wrap gap-1'>
										{Array.isArray(ep.clusters) &&
											ep.clusters.map((c, i) => (
												<span key={i} className='inline-block bg-[#88888856] px-2 py-1 text-[0.7rem] opacity-80 rounded-full'>
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

			<DrawerModal isOpen={!!selectedEp} onClose={() => setSelectedEp(null)}>
				{selectedEp && (
					<div>
						<h2 className='text-xl font-bold mb-2'>{selectedEp.titulo}</h2>

						<PortableText value={selectedEp.descricao} />
					</div>
				)}
			</DrawerModal>
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
