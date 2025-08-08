import React from 'react';
import { SmallPlayer } from '../components/SmallPlayer';
import logoOeiras from '/logos/oeiras.png';
import logoBauhaus from '/logos/bauhaus.png';
import logoEuropa from '/logos/europa.png';
import logoCAM from '/logos/cam.png';
import logoMarinha from '/logos/autoridade.png';
import logoITI from '/logos/iti.png';
import logoITQB from '/logos/itqb.png';
import { translations } from '../Lang/translation.js';
import { useLanguage } from '../context/LanguageContext';


export function Footer() {
	const { lang } = useLanguage();

	
	return (
		<>
			<SmallPlayer />
			<hr className='border-[#484848]' />

			<footer className='container-default  '>
				<div className='text-xs lg:w-2/3 lg:text-center mx-auto leading-[1.4]'>
					<span dangerouslySetInnerHTML={{ __html: translations[lang].footer }} />
				</div>
				<div className='max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-8 py-8'>
					<img src={logoOeiras} alt='Município de Oeiras' className='h-7 lg:h-10 object-contain pointer-events-none' />
					<img src={logoBauhaus} alt='Bauhaus of the Seas Sails' className='h-7 lg:h-10 object-contain pointer-events-none' />
					<img src={logoEuropa} alt='Horizonte Europa' className='h-7 lg:h-10 object-contain pointer-events-none' />
					<img src={logoCAM} alt='CAM Gulbenkian' className='h-7 lg:h-10 object-contain pointer-events-none' />
					<img src={logoITI} alt='ITI IST' className='h-7 lg:h-10 object-contain pointer-events-none' />
					<img src={logoMarinha} alt='Autoridade Marítima' className='h-7 lg:h-10 object-contain pointer-events-none' />
					<img src={logoITQB} alt='ITQB Nova' className='h-7 lg:h-10 object-contain pointer-events-none' />
				</div>
				<div className='text-xs lg:w-2/3 text-center mx-auto leading-[1.4]'>
					This website was designed and developed by{' '}
					<a href='www.diogobrito.xyz' target='_blank'>
						<u>Diogo Brito</u>
					</a>
					. All Sound, Text and Images are copyright of Rádio-Estação Bugio and the respective authors.
				</div>
			</footer>
		</>
	);
}
