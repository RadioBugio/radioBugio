/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				'max-md': { max: '1024px' },
				iphone: { max: '768px' },
			},
		},
	},
	plugins: [],
};
