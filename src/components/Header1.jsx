import React from 'react';
import { Link } from 'react-router-dom';


export function Header1() {
	const scrollToSection = id => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<>
			<div className='fixed top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0f0f0f]/100 to-transparent z-40 pointer-events-none'></div>

			<div className='fixed top-0 left-0 right-0 uppercase z-50   '>
				<div className='mx-8 mt-8 flex justify-between items-baseline uppercase'>
					<div>
						<Link to='/'>
							<img src='/logos/logoBugio.png' alt='Rádio Bugio Logo' className='w-32 max-w-full h-auto' />
						</Link>
						<div className='pt-4 flex flex-col items-start '>
							<button onClick={() => scrollToSection('programacao')} className='hover:underline uppercase'>
								PROGRAMAÇÃO
							</button>
							<button onClick={() => scrollToSection('arquivo')} className='hover:underline uppercase'>
								Arquivo
							</button>
							<button onClick={() => scrollToSection('sobre')} className='hover:underline uppercase'>
								Sobre
							</button>
						</div>
					</div>
					<div>PT /ENG</div>
				</div>
			</div>
		</>
	);
}
