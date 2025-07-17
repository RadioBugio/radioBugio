import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

export function ModalContent({ isOpen, onClose, data }) {
	useEffect(() => {
		const handleEsc = e => e.key === 'Escape' && onClose();
		document.addEventListener('keydown', handleEsc);

		if (isOpen) {
			document.body.style.overflow = 'hidden'; // Bloqueia scroll
		}

		return () => {
			document.removeEventListener('keydown', handleEsc);
			document.body.style.overflow = 'auto'; // Restaura scroll
		};
	}, [isOpen, onClose]);

	if (!data) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className='fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-4'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
				>
					<motion.div
						className='bg-white text-black p-6 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative'
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.9, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 25 }}
						onClick={e => e.stopPropagation()}
					>
						<button className='absolute top-4 right-4 text-gray-700 hover:text-black text-xl' onClick={onClose}>
							&times;
						</button>

						{data.thumbnail && <img src={data.thumbnail} alt={data.titulo} className='w-full max-h-72 object-cover rounded-xl mb-4' />}

						<h2 className='text-2xl font-bold mb-2'>{data.titulo}</h2>
						<p className='text-sm text-gray-500 mb-2'>{data.dataFull}</p>
						<p className='text-base leading-relaxed whitespace-pre-line'>{data.textoLongo}</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
