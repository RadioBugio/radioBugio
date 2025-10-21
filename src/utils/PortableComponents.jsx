import { Paragraph } from '../components/Paragraph.jsx';

export const PortableComponents = {
	block: {
		normal: Paragraph,
		h2: ({ children }) => <h2 className='text-xl font-semibold mt-4 mb-2'>{children}</h2>,
		h3: ({ children }) => <h3 className='text-lg font-semibold mt-3 mb-1'>{children}</h3>,
		blockquote: ({ children }) => <blockquote className='border-l pl-3 italic opacity-80 my-2'>{children}</blockquote>,
	},
	list: {
		bullet: ({ children }) => <ul className='list-disc pl-5 space-y-1 my-2'>{children}</ul>,
		number: ({ children }) => <ol className='list-decimal pl-5 space-y-1 my-2'>{children}</ol>,
	},
	listItem: {
		bullet: ({ children }) => <li className='leading-relaxed'>{children}</li>,
		number: ({ children }) => <li className='leading-relaxed'>{children}</li>,
	},
	marks: {
		strong: ({ children }) => <strong className='font-semibold'>{children}</strong>,
		em: ({ children }) => <em className='italic'>{children}</em>,
		link: ({ children, value }) => {
			const href = value?.href || '#';
			const external = /^https?:\/\//i.test(href);
			return (
				<a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className='underline underline-offset-2 hover:opacity-80 transition'>
					{children}
				</a>
			);
		},
	},
};


