import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { X } from 'lucide-react';


export function DrawerModal({ isOpen, onClose, children }) {
	useEffect(() => {
		if (isOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* BACKDROP */}
					<motion.div className='fixed inset-0 bg-black/60 z-40' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />

					{/* DRAWER */}
					<motion.div
						className='fixed bottom-0 left-0 right-0 h-[60vh] micro text-white z-50 rounded-t-2xl p-6 overflow-y-auto'
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{ y: '100%' }}
						transition={{ duration: 0.4 }}
					>
						<div className='flex justify-end mb-8'>
							<button onClick={onClose} className='text-white text-xl font-bold hover:text-red-400'>
								<X />
							</button>
						</div>
						{children}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
