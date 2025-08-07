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
				const data = await sanityClient.fetch(`*[_type == "entrevista"] | order(programa asc) {
					_id,
					programa,
					data,
					horario,
					titulo,
					descricao,
					clusters,
					clusters2,
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
				const data = await sanityClient.fetch(`*[_type == "arquivo"] | order(programa asc) {
					_id,
					programa,
					data,
					horario,
					ano,
					titulo,
					descricao,
					clusters,
					clusters2,
					duracao,
					thumbnail,
					imagens[]
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
