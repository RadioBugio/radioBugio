import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { PortableText } from '@portabletext/react';
import { Player } from './Player';
import { Paragraph } from './Paragraph.jsx';
import { useLanguage } from '../context/LanguageContext';

export function Hero() {
	const [heroData, setHeroData] = useState(null);
	const { lang } = useLanguage();

	const fetchCurrentHero = async () => {
		const data = await sanityClient.fetch(`*[_type == "hero"]{
      _id,
      programa,
      titulo,
	  tituloEN,
      clusters,
	  clustersEN,
      clusters2,
	  clusters2_EN,
      descricaoMini,
	  descricaoMiniEN,
      "dataHoraInicio": dataHoraInicio
    }`);

		const agora = new Date();

		const herosValidos = data
			.map(item => ({
				...item,
				dataHoraInicio: new Date(item.dataHoraInicio),
			}))
			.filter(item => item.dataHoraInicio <= agora)
			.sort((a, b) => b.dataHoraInicio - a.dataHoraInicio);

		return herosValidos[0] || null;
	};

	const fetchNextHeroStart = async () => {
		const data = await sanityClient.fetch(`*[_type == "hero"]{
      "dataHoraInicio": dataHoraInicio
    }`);

		const agora = new Date();

		const futuros = data
			.map(item => new Date(item.dataHoraInicio))
			.filter(date => date > agora)
			.sort((a, b) => a - b);

		return futuros[0] || null;
	};

	useEffect(() => {
		let timeoutId;

		const setupHero = async () => {
			const currentHero = await fetchCurrentHero();
			setHeroData(currentHero);

			const nextStart = await fetchNextHeroStart();

			if (nextStart) {
				const delay = nextStart.getTime() - Date.now();

				console.log(`Agendado update para: ${nextStart.toLocaleString()}`);

				timeoutId = setTimeout(() => {
					setupHero();
				}, delay);
			}
		};

		setupHero();

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, []);

	return (
		<>
			<div className=' lg:h-[100vh] pt-[6rem] flex items-center justify-center'>
				<div className='flex flex-col items-center '>
					<div className=''>
						<Player />
					</div>
					<div className='lg:w-1/2 mx-4 lg:mx-0'>
						{heroData && (
							<div className='mt-12 flex flex-col'>
								<div>
									<div>
										<h1 className=' mb-2 '>{lang === 'pt' ? heroData.titulo : heroData.tituloEN}</h1>

										<div className='flex flex-wrap gap-1'>
											<div className=''>
												{(lang === 'pt' ? heroData.clusters2 : heroData.clusters2_EN) && (
													<div className='inline-block px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]'>
														{lang === 'pt' ? heroData.clusters2 : heroData.clusters2_EN}
													</div>
												)}
											</div>
											<div className='flex flex-wrap gap-1'>
												{Array.isArray(lang === 'pt' ? heroData.clusters : heroData.clustersEN) &&
													(lang === 'pt' ? heroData.clusters : heroData.clustersEN).map((cluster, index) => (
														<div key={index} className='inline-block px-2 py-[0.1rem] text-[0.8rem] text-[#cccccb] rounded-full border border-[#4c4c4b]'>
															{cluster}
														</div>
													))}
											</div>
										</div>
									</div>
								</div>
								<div className='mt-12 mb-12 lg:mb-0 '>
									<PortableText
										value={lang === 'pt' ? heroData.descricaoMini : heroData.descricaoMiniEN}
										components={{
											block: {
												normal: Paragraph,
											},
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
