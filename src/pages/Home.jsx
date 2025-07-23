import React, { useEffect, useState, useRef } from 'react';
import sanityClient from '../SanityClient.js';
import { Player } from '../components/Player';
import { Schedule } from '../components/Schedule';
import { About } from '../components/About.jsx';
import { Arquivo } from '../components/Arquivo.jsx';
import { Hero } from '../components/Hero.jsx';

export function Home() {
	const [entrevistas, setEntrevistas] = useState([]);
	const videoRef = useRef(null); 

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

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.playbackRate = 0.5;
		}
	}, []);

	return (
		<>
			<video ref={videoRef} autoPlay loop muted playsInline className='fixed top-0 left-0 w-full h-full object-cover z-[-1000]'>
				<source src='/fundo.mp4' type='video/mp4' />
				Seu navegador não suporta vídeos em HTML5.
			</video>

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
		</>
	);
}
