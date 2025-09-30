import React, { useEffect, useState } from 'react';
import sanityClient from '../SanityClient.js';
import { Schedule } from '../components/Schedule';
import { About } from '../components/About.jsx';
import { Video } from '../components/Video.jsx';
import { Arquivo } from '../components/Arquivo.jsx';
import { Hero } from '../components/Hero.jsx';

export function Home() {
	const [entrevistas, setEntrevistas] = useState([]);
	const [arquivos, setArquivos] = useState([]);

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

		const fetchArquivos = async () => {
			try {
				const data = await sanityClient.fetch(`*[_type == "arquivo"] | order(programa desc) {
					_id,
					programa,
					data,
					horario,
					ano,
					titulo,
					tituloEN,
					descricao,
					descricaoEN,
					clusters,
					clustersEN,
					clusters2,
					clusters2_EN,
					duracao,
					thumbnail,
					imagens[],
					archiveAudioUrl
				}`);
				setArquivos(data);
			} catch (error) {
				console.error('Erro ao buscar arquivos:', error.message);
			}
		};

		fetchEntrevistas();
		fetchArquivos();
	}, []);

	return (
		<div >
			
			
			<Hero />
			<div id='programacao'>
				<Schedule entrevistas={entrevistas} />
			</div>
			<div>
				<Video />
			</div>
			<div id='arquivo'>
				<Arquivo arquivos={arquivos} />
			</div>
			<div id='sobre'>
				<About />
			</div>
		</div>
	);
}
