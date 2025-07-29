import React from 'react';
import { Player } from './Player';
export function Hero() {
	return (
		<div className=' h-[75vh] flex justify-end container-default '>
			<div className=' flex flex-col  w-1/2 justify-center  pr-8'>
				<Player />
				<div className='pt-12 text-lg'>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, esse laudantium sed amet aspernatur debitis ea quod dolore corrupti doloribus?Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Omnis asperiores at perspiciatis debitis fuga aliquam culpa, optio consequatur mollitia reiciendis eligendi distinctio similique assumenda quidem. Numquam atque eius nisi
					tenetur.
				</div>
			</div>
		</div>
	);
}
