import { useState, useEffect } from 'react'
import  sanityClient from '../SanityClient.js'
import { PortableText } from '@portabletext/react'
import { Player } from './Player';

export function Hero ()  {
   const [heroData, setHeroData] = useState(null);

		// Função que busca o hero atual (cujo dataHoraInicio já passou)
		const fetchCurrentHero = async () => {
			const data = await sanityClient.fetch(`*[_type == "hero"]{
      _id,
      programa,
      titulo,
      clusters,
      clusters2,
      descricaoMini,
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

		// Função que busca o próximo evento futuro (para agendar update)
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
		<div className=' h-[75vh] flex justify-center container-default bg-amber-400'>
			<div className=' flex flex-col  justify-center items-center '>
				<Player />
				{heroData && (
					<div className='pt-12 text-lg w-1/2'>
						<div className='text-sm opacity-70 mb-2'>
							{new Date(heroData.dataHoraInicio).toLocaleTimeString('pt-PT', {
								hour: '2-digit',
								minute: '2-digit',
								timeZone: 'Europe/Lisbon',
							})}
						</div>
						<h2 className='text-xl font-semibold mb-2'>{heroData.titulo}</h2>
						<div className='mb-2'>
							<strong>Clusters:</strong> {heroData.clusters?.join(', ')}
						</div>
						<div className='mb-2'>
							<strong>Tipo:</strong> {heroData.clusters2}
						</div>
						<PortableText value={heroData.descricaoMini} />
					</div>
				)}
			</div>
		</div>
	);
}
