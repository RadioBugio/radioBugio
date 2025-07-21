import React from 'react';
import { Player } from './Player';
export function Hero() {
	return (
		<div className=' h-[calc(100vh-5.5rem)] grid grid-rows-2'>
			<div className=' justify-center flex items-center'>
				<Player />
			</div>
			<div className=' flex justify-center items-end p-12'>
				<div className='w-1/2 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, esse laudantium sed amet aspernatur debitis ea quod dolore corrupti doloribus?Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis asperiores at perspiciatis debitis fuga aliquam culpa, optio consequatur mollitia reiciendis eligendi distinctio similique assumenda quidem. Numquam atque eius nisi tenetur.</div>
			</div>
		</div>
	);
}
