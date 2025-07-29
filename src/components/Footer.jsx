import React from 'react';
import { SmallPlayer } from '../components/SmallPlayer';
import logoOeiras from '/logos/oeiras.png';
import logoBauhaus from '/logos/bauhaus.png';
import logoEuropa from '/logos/europa.png';
import logoCAM from '/logos/cam.png';
import logoMarinha from '/logos/autoridade.png';
import logoITI from '/logos/iti.png';
import logoITQB from '/logos/itqb.png';


export function Footer() {

	
	return (
		<>
			<SmallPlayer />
			<hr className='border-[#484848]' />

			<footer className=' py-20 px-4'>
				<div className='max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8'>
					<img src={logoOeiras} alt='Município de Oeiras' className='h-10 object-contain' />
					<img src={logoBauhaus} alt='Bauhaus of the Seas Sails' className='h-10 object-contain' />
					<img src={logoEuropa} alt='Horizonte Europa' className='h-10 object-contain' />
					<img src={logoCAM} alt='CAM Gulbenkian' className='h-10 object-contain' />
					<img src={logoITI} alt='ITI IST' className='h-10 object-contain' />
					<img src={logoMarinha} alt='Autoridade Marítima' className='h-10 object-contain' />
					<img src={logoITQB} alt='ITQB Nova' className='h-10 object-contain' />
				</div>
			</footer>
		</>
	);
}
