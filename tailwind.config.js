module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				cursor: {
					'0%': {
						opacity: 0,
					},
					'100%': {
						opacity: 1,
					},
				},
			},
			animation: {
				cursor: 'cursor 0.4s linear infinite alternate',
			},
		},
		fontFamily: {
			sans: ['Fuzzy Bubbles', 'sans-serif'],
			thin: ['Amatic SC', 'sans-serif'],
			mono: ['Courier', 'sans-serif'],
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#fe0000',
					'primary-content': '#000000',

					secondary: '#FEE73B',

					accent: '#1FB2A6',

					neutral: '#000000',

					'base-100': '#000000',

					info: '#3ABFF8',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#F87272',
				},
			},
		],
	},
	plugins: [require('daisyui')],
};
