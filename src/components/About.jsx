import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CirclePlus, CircleMinus } from 'lucide-react';


export function About() {
	const [expanded, setExpanded] = useState(false);

	const toggle = () => setExpanded(prev => !prev);

	return (
		<>
			<hr className='border-[#484848]' />
			<div className='container-default text-white py-16'>
				<h2 className='text-2xl mb-8 font-bold'>Sobre</h2>

				<div className='flex flex-col items-center'>
					<div className='w-2/3 text-[1rem] space-y-4'>
						<p>
							<i>A Rádio-Estação do Bugio</i> é uma estação de rádio experimental e especulativa de conservação e monitorização marinha e atmosférica, situada na confluência entre o Rio Tejo e o
							oceano Atlântico, situada no concelho de Oeiras. Este projeto é uma proposta dos artistas Diana Policarpo e Bernardo Gaeiras que a partir do imaginário distante do Farol do Bugio,
							constrói uma infraestrutura sonora dedicada à transmissão das dinâmicas ecológicas, físicas e sociais deste território liminar, com especial atenção às formas de vida invisíveis que o
							habitam, como os microrganismos marinhos e outras presenças imperceptíveis.<br></br>
							<br></br>
							Entre Agosto e Setembro de 2025, a <i>A Rádio-Estação do Bugio</i> transmite quatro dias de emissões constituídas por paisagens sonoras ao vivo e entrevistas pré-gravadas no Farol do
							Bugio e em laboratórios de investigação. Através da sua plataforma online reúne contributos de cientistas, artistas, ativistas e historiadores envolvidos no cuidado e observação deste
							território marinho. As emissões ao vivo combinam depoimentos científicos com paisagens sonoras originais compostas por gravações de campo, frequências subaquáticas, pulsações
							atmosféricas, vibrações minerais e composições bioacústicas criadas por Diana Policarpo e Bernardo Gaeiras. Estes conteúdos dão a conhecer um pouco da ecologia profunda do estuário,
							convocando vozes humanas e não humanas num mesmo plano de escuta.
						</p>

						<AnimatePresence initial={false}>
							{expanded && (
								<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className='space-y-4 mt-6'>
									<p>
										Os episódios organizam-se em torno de cinco núcleos temáticos que atravessam diferentes escalas e formas de conhecimento: a infraestrutura e a paisagem cultural do território; as
										forças climáticas e atmosféricas que o moldam; as dinâmicas políticas e cívicas ligadas à sua conservação; os dispositivos de percepção que nos conectam aos seus ritmos biológicos
										e geológicos; e a rede densa de relações microscópicas que sustenta a vida neste ecossistema em contínua mutação.<br></br>
										<br></br>
										Estes núcleos funcionam como zonas de escuta e contaminação mútua entre disciplinas, vozes e escalas, propondo uma rádio que é também estação sensorial, arquivo vivo e ferramenta
										de imaginação coletiva. <br></br>
										<br></br>
										As entrevistas permitem aprofundar o conhecimento sobre este ecossistema em transformação, com especial foco nas espécies microscópicas que o sustentam, como fungos, leveduras
										marinhas, microalgas, bactérias e partículas em suspensão. Mais do que momentos de partilha de estórias e várias formas de conhecimento, estas conversas funcionam como sessões de
										co-design sonoro e conceptual, envolvendo cientistas e ativistas cuja prática poderia ser enraizada a partir da futura estação de conservação do Farol do Bugio. <br></br>
										<br></br>
										Para além de se apresentar como um projeto de arte sonora, a <i>A Rádio-Estação do Bugio</i> é uma prática de escuta ativa - um gesto contínuo de cuidado e atenção - que ensaia
										novas formas de habitar e imaginar territórios estuarinos e costeiros em transição. Através da escuta situada, ciência-cidadã e da experimentação artística, emerge uma visão de uma
										estação ecológica marinha para um futuro de coabitação no município de Oeiras: uma infraestrutura imaginada a partir do som, das correntes, dos ciclos biológicos e das espécies que
										muitas vezes escapam à nossa atenção. Esta rádio torna audível a confluência entre arte, ciência, ecologia, ficção e investigação ambiental impulsionando a literacia do oceano.
									</p>
									<h1 className='text-2xl mt-12'>Biografias</h1>

									<div className='grid grid-cols-2 gap-12 mt-6'>
										<div>
											<div className='font-bold'>Diana Policarpo</div>
											(PT) Diana Policarpo (Lisboa, 1986) vive e trabalha entre Lisboa e Londres. É artista visual e compositora, actualmente a desenvolver a sua actividade artística entre as artes
											visuais, música electroacústica e a performance multimédia. O seu trabalho investiga cultura popular, saúde, política de género e relações interespécies, justapondo a
											estruturação rítmica do som como um material tátil dentro da construção social da ideologia esotérica. Exposições individuais e screenings recentes incluem Thyssen-Bornemisza
											National Museum, Madrid (ES), CAM - Gulbenkian, Lisboa (PT), Rialto 6, Lisboa (PT), Manifesta 15, Barcelona (ES), McaM Xangai (CH), Biennale Gherdëina, Val Gardena (IT),
											Kunsthall Aarhus (DK), Helsinki Biennial (FI), Fondazione Sandretto Re Rebaudengo, Turim (IT), RADIUS CCA, Delft (NL), CRAC Occitanie, Sète (FR), Ocean Space, Veneza (IT),
											Kunsthall Trondheim (NO), MAAT, Lisboa (PT), Kunsthall Oslo (NO), Kunstverein Leipzig (DE), Kunsthall Baden-Baden (DE), Whitechapel Gallery, ICA e LUX - Moving Image em Londres
											(UK). Foi vencedora do Prémio Novos Artistas Fundação EDP 2019 e Prémio illy Present Future 2021.
										</div>
										<div>
											<div className='font-bold'>Bernardo Gaeiras</div>
											Bernardo Gaeiras (Lisboa, 1982) é designer de artefactos e artista multimédia, desenvolvendo uma prática situada na confluência entre tecnologia, ecologia e políticas
											descentralizadas. Atualmente investigador no programa doutoral em Medias Digitais no Interactive Technologies Institute, em Lisboa, a sua investigação percorre os modos como os
											métodos do design — entre a especulação material e a escuta bioacústica — podem mediar relações sociotécnicas complexas com entidades mais-que-humanas. Fundador e primeiro
											diretor do FabLab Lisboa, esteve envolvido na criação e implementação de várias iniciativas dedicadas ao fomento da criatividade local. O seu trabalho tem sido apresentado em
											diversos contextos expositivos nacionais e internacionais, incluindo o MAC/CCB (PT), MUDAM Luxembourg (LU), Stedelijk Museum (NL) e Xuzhou Museum (CH).
										</div>
									</div>
								</motion.div>
							)}
						</AnimatePresence>

						<div className='mt-4 '>
							<button onClick={toggle} className='  hover:underline transition duration-200 underline-offset-4'>
								{expanded ? <CircleMinus strokeWidth={1} color='#484848' /> : <CirclePlus strokeWidth={1} color='#484848' />}
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
