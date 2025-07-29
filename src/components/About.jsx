import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function About() {
	const [expanded, setExpanded] = useState(false);

	const toggle = () => setExpanded(prev => !prev);

	return (
		<>
			<hr className='border-[#484848]' />
			<div className='container-default text-white py-16'>
				<h2 className='text-2xl mb-8 font-bold'>SOBRE</h2>

				<div className='flex flex-col items-center'>
					<div className='w-2/3 text-lg space-y-4'>
						<p>
							<i>Rádio Bugio</i> é uma plataforma de escuta situada no estuário do Tejo, junto ao farol do Bugio – uma estação sonora que emerge entre a ciência cidadã, a prática artística e a
							ecologia especulativa.<br></br>
							Transmitimos registos, composições e conversas que acompanham os ciclos da maré, as alterações na qualidade da água, e os ritmos das espécies mais invisíveis que habitam ou atravessam
							esta zona fronteiriça entre o rio e o mar. Aqui, o som é sensor, testemunho e ficção.<br></br>
							Colaboramos com cientistas, artistas, activistas, comunidades locais e seres não-humanos. A <i>Rádio Bugio</i> escuta os estados mutantes do estuário – a sua salinidade, os seus ritmos,
							os seus sedimentos e sinais.<br></br>
							Cada emissão é um momento poroso: parte arquivo, parte chamada, parte resposta. Começamos a partir do farol do Bugio, mas as correntes estendem-se – mergulhamos no desconhecido, em
							direção a histórias e futuros especulativos. O nosso foco está na escuta colectiva e na inteligência subtil dos ecossistemas.<br></br> A <i>Rádio Bugio</i> é parte de uma experiência em
							curso – um exercício de imaginação ecológica, produção partilhada de conhecimento e cuidado do estuário do Tejo.
						</p>

						<AnimatePresence initial={false}>
							{expanded && (
								<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className='space-y-4 mt-12'>
									<div className='font-bold text-xl'>Contexto</div>
									<p>
										A <i>Rádio Bugio</i> nasce do encontro entre prática artística, investigação ecológica e ativação de conhecimento situado. Criada por Bernardo Gaeiras (artista e investigador) e
										Diana Policarpo (artista e compositora), esta estação desenvolve-se a partir de uma cartografia afetiva e ambiental do farol do Bugio e da sua envolvente submersa.<br></br>
										Localizado no ponto onde o Tejo se encontra com o Atlântico, o Bugio é, ao mesmo tempo, estrutura histórica, ruína ecológica e ponto estratégico de observação. A estação
										especulativa aí imaginada integra tanques flutuantes, sensores, dispositivos de escuta e plataformas de regeneração. <br></br>A <i>Rádio Bugio</i> é a dimensão sonora desta
										estação: um espaço para partilhar práticas de escuta, dados recolhidos, ficções sonoras e testemunhos das espécies em presença. O projeto dialoga com práticas de ciência cidadã,
										com investigações em biorremediação e com abordagens especulativas à regeneração ambiental. É também um espaço de imaginação ecossistémica, onde os limites entre dados, mitos e
										vozes se tornam permeáveis.
									</p>
									<p>
										The team at Apple Insider has laid out a potential Mac roadmap for 2025 and 2026. With 15 products on the list, it is a comprehensive look deep into 2026. That includes the highly
										anticipated M5 MacBook Pro and M5 MacBook Air.
									</p>
									<p>
										What the roadmap lacks is exact dates. For example, the M5 MacBook Pro release is listed as late 2025 and covers three models (presumably the MacBook Pro, MacBook Pro Max, and
										MacBook Pro Max). That could easily fit a mid-to-late October date that many felt Apple was using as the annual anchor. It could also coincide with a later launch in mid- to
										late-November, which would potentially result in only a handful of laptops being sold in December, with the bulk of retail devices arriving in January 2026.
									</p>
								</motion.div>
							)}
						</AnimatePresence>

						<div className='mt-4 '>
							<button onClick={toggle} className=' text-gray-300 hover:text-white transition duration-200 underline-offset-4'>
								{expanded ? 'Ler menos' : 'Ler mais'}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
