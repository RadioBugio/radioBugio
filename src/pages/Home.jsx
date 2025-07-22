import React, { useEffect, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { Player } from '../components/Player';
import { Schedule } from '../components/Schedule';
import { About } from '../components/About.jsx';
import { Arquivo } from '../components/Arquivo.jsx';
import { Hero } from '../components/Hero.jsx';

export function Home() {
	const [entrevistas, setEntrevistas] = useState([]);

	useEffect(() => {
		const fetchEntrevistas = async () => {
			try {
				const data = await sanityClient.fetch(`*[_type == "entrevista"]| order(programa asc){
				_id,
				programa,
				data,
				horario,
				titulo,
				thumbnail,
				descricao,
				clusters,
				duracao,
				clusters2
			}`);
				setEntrevistas(data);
			} catch (error) {
				console.error('Erro ao buscar do Sanity:', error.message);
			}
		};

		fetchEntrevistas();
	}, []);

	return (
		
			<div className='home'>
				<div className='home-overlay '>
					<div>
						<Hero />
						<div id='programacao'>
							<Schedule entrevistas={entrevistas} />
						</div>
						<div id='sobre'>
							<About />
						</div>
						<div id='arquivo'>
							<Arquivo entrevistas={entrevistas} />
						</div>
					</div>
				</div>
			</div>
		
	);
}
