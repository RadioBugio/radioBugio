import { useState } from 'react';
import { urlFor } from '../utils/imageUrlBuilder.js';
import { DrawerModal } from './DrawerModal';
import { translations } from '../Lang/translation.js';
import { useLanguage } from '../context/LanguageContext';

function horaParaEnFormat(horaStr) {
  if (!horaStr) return '';
  const parts = horaStr.replace('h', ':').split(':');
  let horas = parseInt(parts[0], 10);
  let minutos = parts[1] ? parts[1].padStart(2, '0') : '00';

  const ampm = horas >= 12 ? 'pm' : 'am';
  horas = horas % 12;
  if (horas === 0) horas = 12;

  return minutos === '00' ? `${horas} ${ampm}` : `${horas}:${minutos} ${ampm}`;
}

	
export function Arquivo({ arquivos }) {
	const [selectedEp, setSelectedEp] = useState(null);
	const { lang } = useLanguage();

	if (!arquivos || arquivos.length === 0) return null;

	return (
		<div className='text-[#eaebde] container-default relative '>
			<h2 className='text-2xl mb-8 font-bold lg:text-left text-center'>{translations[lang].arquivo}</h2>
			<div className='flex flex-col items-center'>
				<ul className='grid grid-cols-1 lg:grid-cols-3 gap-4 lg:w-2/3'>
					{arquivos.map(ep => (
						<li
							key={ep._id}
							onClick={() => setSelectedEp(ep)}
							className='border-[.5px] border-[#484848] hover:opacity-50 rounded-2xl p-3 transition duration-500 cursor-pointer h-[400px] flex flex-col gap-3'
						>
							<img src={urlFor(ep.thumbnail).url()} alt={lang === 'pt' ? ep.titulo : ep.tituloEN} className='rounded-xl w-full h-[200px] object-cover' />
							<div className='mx-2 flex flex-col flex-grow'>
								<div className='flex justify-between text-sm opacity-80'>
									<span>
										{ep.data?.dia}/{mesParaNumero(ep.data?.mes)}/{ep.data?.ano}, {lang === 'pt' ? ep.horario?.inicio : horaParaEnFormat(ep.horario?.inicio)}
									</span>
									{ep.duracao} min
								</div>
								<div className=' text-[#eaebde] text-[1.1rem] font-semibold mt-2 leading-[1.3] '> {lang === 'pt' ? ep.titulo : ep.tituloEN}</div>
								<div className='flex flex-col gap-1 mt-4 flex-grow content-end-safe  place-content-end-safe  '>
									<div>
										{(lang === 'pt' ? ep.clusters2 : ep.clusters2_EN) && (
											<div className='inline-block bg-[#88888856] px-3 py-1 text-[0.7rem]  text-[#eaebde] rounded-full border-[.5px] border-[#484848]'>
												{lang === 'pt' ? ep.clusters2 : ep.clusters2_EN}
											</div>
										)}
									</div>
									<div className='flex flex-wrap gap-1 '>
										{Array.isArray(lang === 'pt' ? ep.clusters : ep.clustersEN) &&
											(lang === 'pt' ? ep.clusters : ep.clustersEN).map((c, i) => (
												<span key={i} className='inline-block bg-[#88888856] px-3 py-1 text-[0.7rem]  text-[#eaebde] rounded-full border-[.5px] border-[#484848]'>
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
