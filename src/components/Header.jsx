import React from 'react';

export function Header() {
	const scrollToSection = id => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<div className='fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none'></div>

			<div className='fixed top-0 left-0 right-0 flex flex-col uppercase z-50  p-3 text-lg '>
				<button className='text-left'>
					Rádio Estação 
					do Bugio
				</button>
				<div className='pt-3 flex flex-col text-sm items-start'>
					<button onClick={() => scrollToSection('programacao')} className='hover:underline'>
						PROGRAMAÇÃO
					</button>
					<button onClick={() => scrollToSection('arquivo')} className='hover:underline'>
						Arquivo
					</button>
					<button onClick={() => scrollToSection('sobre')} className='hover:underline'>
						Sobre
					</button>
				</div>
			</div>

		</>
	);
}
