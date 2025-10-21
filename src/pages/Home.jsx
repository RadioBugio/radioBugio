import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate,  } from 'react-router-dom';
import sanityClient from '../SanityClient.js';
import { Schedule } from '../components/Schedule';
import { About } from '../components/About.jsx';
import { Video } from '../components/Video.jsx';
import { Hero } from '../components/Hero.jsx';
import { Footer } from '../components/Footer';


export function Home() {
	const [entrevistas, setEntrevistas] = useState([]);
	 const location = useLocation();
		const navigate = useNavigate();

	 useEffect(() => {
			// Só rola se houver hash (#programacao ou #sobre)
			const hash = location.hash;
			if (!hash) return;

			const targetId = hash.replace(/^#/, '');
			let attempts = 0;
			const maxAttempts = 20; // tenta mais vezes para garantir que About já montou
			const stepMs = 50;

			const tryScroll = () => {
				const el = document.getElementById(targetId);
				if (el) {
					el.scrollIntoView({ behavior: 'smooth', block: 'start' });
					// Limpa o state se tiver vindo com algum (evita re-triggers)
					if (location.state) {
						navigate(`#${targetId}`, { replace: true, state: null });
					}
					return;
				}
				if (attempts < maxAttempts) {
					attempts += 1;
					setTimeout(tryScroll, stepMs);
				}
			};

			// tenta logo após montar/atualizar
			tryScroll();
			// Também tenta no próximo frame, útil para lazy mounts
			const raf = requestAnimationFrame(tryScroll);

			return () => cancelAnimationFrame(raf);
		}, [location.hash, location.state, navigate]);

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
