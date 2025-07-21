import React from 'react';
import { Player } from './Player';
export function Hero() {
	return (
		<div className=' h-[calc(100vh-5.5rem)] grid grid-cols-2 container-default '>
			<div className=''>
				<Player />
			</div>
			<div className=' flex  items-end p-12'>
				<div >
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, esse laudantium sed amet aspernatur debitis ea quod dolore corrupti doloribus?Lorem ipsum dolor sit amet consectetur
					adipisicing elit. Omnis asperiores at perspiciatis debitis fuga aliquam culpa, optio consequatur mollitia reiciendis eligendi distinctio similique assumenda quidem. Numquam atque eius nisi
					tenetur.
				</div>
			</div>
		</div>
	);
}
