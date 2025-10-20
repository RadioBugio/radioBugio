import React, { useEffect, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { Schedule } from '../components/Schedule';
import { About } from '../components/About.jsx';
import { Video } from '../components/Video.jsx';
import { Hero } from '../components/Hero.jsx';
import { Footer } from '../components/Footer';


export function Home() {
	const [entrevistas, setEntrevistas] = useState([]);

	useEffect(() => {
		const fetchEntrevistas = async () => {
			try {
				const data = await sanityClient.fetch(`*[_type == "programacao"] | order(programa asc) {
					_id,
					programa,
					data,
					horario,
					horarioEN,
					titulo,
					tituloEN,
					descricao,
					descricaoEN,
					clusters,
					clustersEN,
					clusters2,
					clusters2_EN,
					duracao,
					imagens[] 
				}`);
				setEntrevistas(data);
			} catch (error) {
				console.error('Erro ao buscar entrevistas:', error.message);
			}
		};

		fetchEntrevistas();
	}, []);

	return (
		<div>
			<Hero />
			<div id='programacao'>
				<Schedule entrevistas={entrevistas} />
			</div>
			<div>
				<Video />
			</div>

			<div id='sobre'>
				<About />
			</div>
			<Footer />
		</div>
	);
}
