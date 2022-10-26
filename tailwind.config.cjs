module.exports = {
	content: ['./src/**/*.svelte'],
	darkMode: 'class',
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						'--tw-prose-invert-body': 'var(--white-shade5)',
						'--tw-prose-invert-headings': 'var(--white-shade2)',
						'--tw-prose-invert-code': 'var(--code-text-color1)',
						'line-height': '1.6',
						'h2, h3, h4, h5, h6': {
							'font-family': 'raleway, sans-serif',
							fontWeight: '400'
						},
						blockquote: {
							fontSize: '.9rem',
							fontWeight: '400',
							fontStyle: 'italic',
							color: 'var(--accent-color)',
							background: 'var(--black-tint2)',
							'border-left': '2px solid var(--accent-color)',
							padding: '5px 10px',
							margin: '0 0 20px 1em'
						},
						'blockquote p': {
							margin: '0'
						},
						'blockquote ul': {
							padding: '0',
							margin: '0 0 0 20px'
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
							fontSize: '.75em',
							fontWeight: 400,
							color: '#0FF',
							background: 'var(--black-tint3)',
							border: 'none',
							'border-radius': '4px',
							fontStyle: 'normal',
							padding: '1px 3px'
						},
						'article a': {
							fontWeight: '400',
							color: 'var(--accent-color)',
							textDecoration: 'none',
							transition: 'all 350ms ease-out'
						},
						'article a:hover': {
							fontWeight: '400',
							color: 'var(--black-tint3)',
							'background-color': 'var(--accent-color)',
							textDecoration: 'none',
							'border-bottom': 'none',
							'box-shadow': 'none'
						},
						'article a code': {
							color: 'var(--code-text-color1)',
							border: 'none',
							'border-radius': '4px'
						},
						'article a:hover code': {
							color: 'var(--black-tint3)',
							'background-color': 'var(--accent-color)',
							transition: 'all 350ms ease-out'
						},
						'a code': {
							color: 'unset'
						},
						'article p strong': {
							color: 'var(--white-shade2)'
						},
						'article .alert strong, article .note strong, article .requirements strong, article  blockquote p strong':
							{
								color: 'currentColor'
							},
						'ul, ul.alert': {
							'list-style': 'square'
						},
						'li, ul, ol': {
							margin: 0
						},
						'article ul, article ol': {
							margin: '0 0 0 1.25em',
							padding: '0'
						},
						'article ul p, article ol p': {
							margin: '0.25rem 0 0.5rem 0'
						},
						'.code-details ul, .code-details ol': {
							fontSize: '0.95rem',
							margin: '0.25rem 0 0 1.25em',
							padding: '0'
						},
						'.code-details ul li': {
							margin: '0 0 15px',
							padding: '0'
						},
						'.code-details ul li strong': {
							color: 'var(--white)',
							fontSize: '1.05em',
							'text-transform': 'uppercase'
						},
						'li > img': {
							margin: 0,
							display: 'inline'
						},
						'ol > li::marker': {
							color: 'inherit'
						},
						'ul > li::marker': {
							color: 'inherit'
						}
					}
				}
			}
		}
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')]
};
