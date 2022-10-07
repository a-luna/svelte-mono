module.exports = {
	content: [
		'./src/**/*.svelte',
		// may also want to include HTML files
		'./src/**/*.html'
	],
	darkMode: 'class',
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-invert-code': 'var(--code-text-color1)',
						// these customizations are explained here https://youtu.be/-FzemNMcOGs
						blockquote: {
							borderLeft: '3px solid red',
							fontSize: 'inherit',
							fontStyle: 'inherit',
							fontWeight: 'medium'
						},
						'blockquote p:first-of-type::before': {
							content: ''
						},
						'blockquote p:last-of-type::after': {
							content: ''
						},

						'code::before': false,
						'code::after': false,
						code: {
							fontSize: '.8em',
							fontWeight: 400,
							color: 'var(--code-text-color1)',
							background: 'var(--black-tint2)',
							border: '1 px solid var(--dark-gray-shade2)',
							'border-radius': '4px',
							fontStyle: 'normal',
							padding: '1px 3px'
						},
						'a:hover': {
							color: 'var(--accent-color-dim)',
							textDecoration: 'none'
						},
						a: {
							color: 'var(--accent-color)',
							textDecoration: 'none'
						},
						'a code': {
							color: 'unset'
						},
						'li, ul, ol': {
							margin: 0
						},
						'li > img': {
							margin: 0,
							display: 'inline'
						},
						'ol > li::marker': {
							color: 'var(--tw-prose-body)'
						},
						'ul > li::marker': {
							color: 'var(--tw-prose-body)'
						}
					}
				}
			}
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')]
};
