export function About() {
	return (
		<>
			<div className='relative overflow-hidden'>
				<video className='absolute top-0 left-0 w-full h-full object-cover -z-10 pointer-events-none opacity-30' autoPlay loop muted playsInline>
					<source src='/IMG_9958 2-1.mp4' type='video/mp4' />
					Your browser does not support the video tag.
				</video>

				<div className='container-default py-20 z-10 relative text-[#eaebde]'>
					<h2 className='text-2xl mb-4 font-bold'>SOBRE</h2>

					<div className='w-2/3'>
						<i>Rádio Bugio</i> é uma plataforma de escuta situada no estuário do Tejo, junto ao farol do Bugio – uma estação sonora que emerge entre a ciência cidadã, a prática artística e a ecologia
						especulativa. <br />
						Transmitimos registos, composições e conversas que acompanham os ciclos da maré, as alterações na qualidade da água, e os ritmos das espécies mais invisíveis que habitam ou atravessam esta
						zona fronteiriça entre o rio e o mar. Aqui, o som é sensor, testemunho e ficção. <br />
						Colaboramos com cientistas, artistas, activistas, comunidades locais e seres não-humanos. A <i>Rádio Bugio</i> escuta os estados mutantes do estuário – a sua salinidade, os seus ritmos, os
						seus sedimentos e sinais. <br />
						Cada emissão é um momento poroso: parte arquivo, parte chamada, parte resposta. Começamos a partir do farol do Bugio, mas as correntes estendem-se – mergulhamos no desconhecido, em direção
						a histórias e futuros especulativos. O nosso foco está na escuta colectiva e na inteligência subtil dos ecossistemas. <br />A <i>Rádio Bugio</i> é parte de uma experiência em curso – um
						exercício de imaginação ecológica, produção partilhada de conhecimento e cuidado do estuário do Tejo.
					</div>
				</div>
			</div>
		</>
	);
}
