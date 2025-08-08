import { useState, useEffect } from 'react';
import sanityClient from '../SanityClient.js';
import { PortableText } from '@portabletext/react';
import { Player } from './Player';
import { Paragraph } from './Paragraph.jsx';

export function Hero() {
	const [heroData, setHeroData] = useState(null);

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
		<div className=' h-[100vh] flex justify-center  '>
			<div className='flex items-center pt-[5rem] lg:pt-0 px-5 lg:px-0 lg:grid lg:grid-cols-3 justify-center lg:items-center  w-full  '>
				<div className='col-span-1 '></div>
				<div className='col-span-1 '>
					<Player />
					{heroData && (
						<div className='mt-12 flex flex-col'>
							<div>
								<div>
									<h2 className='text-xl font-semibold mb-2 '>{heroData.titulo}</h2>
									<div className='flex flex-col '>
										<div>{heroData.clusters2 && <div className='inline-block bg-[#92929256] px-3 py-1 text-xs opacity-80 rounded-full'>{heroData.clusters2}</div>}</div>
										<div>
											{Array.isArray(heroData.clusters) &&
												heroData.clusters.map((cluster, index) => (
													<div key={index} className='inline-block bg-[#92929256] px-3 py-1 mt-1 text-[0.7rem] opacity-80 rounded-full mr-1'>
														{cluster}
													</div>
												))}
										</div>
									</div>
								</div>
							</div>
							<div className='mt-6 text-sm lg:text-base'>
								<PortableText
									value={heroData.descricaoMini}
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
				<div className='col-span-1 '></div>
			</div>
		</div>
	);
}
