import React, { useEffect, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { Player } from '../components/Player';
import { Schedule } from '../components/Schedule';

export function Home() {
	const [entrevistas, setEntrevistas] = useState([]);

	useEffect(() => {
		const fetchEntrevistas = async () => {
			try {
				const data = await sanityClient.fetch(`*[_type == "entrevista"]{
				_id,
				programa,
				data,
				horario,
				titulo,
				thumbnail,
				descricao,
				clusters
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
				<div className='container-default'>
					<div className='player-section'>
						<Player />
					</div>
					<Schedule entrevistas={entrevistas} />
				</div>
			</div>
		</div>
	);
}
