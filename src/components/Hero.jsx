import React from 'react';
import { Player } from './Player';
export function Hero() {
	return (
		<div className=' h-[75vh] flex justify-end container-default '>
			<div className=' flex flex-col  justify-center items-center '>
				<Player />
				<div className='pt-12 text-lg w-1/2 '>
					Joaquim Boiça, historiador e antigo habitante do Farol do Bugio, partilha memórias afetivas e sensoriais da vida entre faróis. Esta conversa revela uma paisagem invisível feita de sons,
					correntes e histórias esquecidas, convidando-nos a imaginar o Bugio como um território onde os tempos humanos e não humanos se entrelaçam.
				</div>
			</div>
		</div>
	);
}
