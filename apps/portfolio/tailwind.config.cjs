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
							'font-family': 'Roboto, sans-serif',
							fontWeight: '400',
							letterSpacing: '1px',
						},
						blockquote: {
							fontSize: '.95rem',
							fontWeight: '400',
							fontStyle: 'italic',
							color: 'hsl(76 100% 50%)',
							color: 'oklch(92.22% 0.244 126.84)',
							background: 'var(--black-tint2)',
							'border-left': '2px solid hsl(76 100% 50%)',
							background: 'var(--black-tint2)',
							'border-left': '2px solid oklch(92.22% 0.244 126.84)',
							padding: '5px 10px',
							margin: '0 0 20px 1em',
						},
						'blockquote p': {
							margin: '0',
						},
						'blockquote code': {
							color: 'var(--tw-prose-body)',
							background: 'var(--black-tint2);',
						},
						'blockquote ul': {
							padding: '0',
							margin: '0 0 0 20px',
						},
						'blockquote p:first-of-type::before': {
							content: '',
						},
						'blockquote p:last-of-type::after': {
							content: '',
						},
						'code::before': false,
						'code::after': false,
						'pre code, code': {
							fontFamily: "Hack, 'Roboto Mono', menlo, monospace",
						},
						code: {
							fontWeight: 400,
							color: '#0FF',
							background: 'var(--black-tint3)',
							border: 'none',
							'border-radius': '4px',
							fontStyle: 'normal',
							padding: '0 2px',
						},
						'.section a, article a': {
							fontWeight: '400',
							color: 'hsl(76 100% 50%)',
							color: 'oklch(92.22% 0.244 126.84)',
							textDecoration: 'none',
							transition: 'all 350ms ease-out',
						},
						'.section a:hover, article a:hover': {
							fontWeight: '400',
							color: 'var(--black-tint3)',
							'background-color': 'hsl(76 100% 50%)',
							'background-color': 'oklch(92.22% 0.244 126.84)',
							textDecoration: 'none',
							'border-bottom': 'none',
							'box-shadow': 'none',
						},
						'article a code': {
							color: 'var(--body-text)',
							'background-color': 'var(--black-tint3)',
							border: 'none',
							'border-radius': '4px',
						},
						'article a:hover code': {
							color: 'var(--black-tint3)',
							'background-color': 'hsl(76 100% 50%)',
							'background-color': 'oklch(92.22% 0.244 126.84)',
							transition: 'all 350ms ease-out',
						},
						'a code': {
							color: 'unset',
						},
						'article p strong': {
							marginTop: '0',
							marginRight: 'auto',
							marginBottom: '0',
							marginLeft: 'auto',
							color: 'var(--white-shade2)',
						},
						'article .custom-block strong, article .requirements strong, article blockquote p strong': {
							color: 'currentColor',
						},
						'article figure p': {
							margin: '0',
						},
						'article figure img': {
							marginTop: '0',
							marginBottom: '0',
						},
						'ul, ul.custom-block': {
							'list-style': 'square',
						},
						'li, ul, ol': {
							margin: 0,
						},
						'article ul, article ol': {
							margin: '0 0 0 1.25em',
							padding: '0',
						},
						'article ul p, article ol p': {
							margin: '0.25rem 0 0.5rem 0',
						},
						'.code-details ul, .code-details ol': {
							fontSize: '0.95rem',
							margin: '0.25rem 0 0 1.25em',
							padding: '0',
						},
						'.code-details ul li': {
							margin: '0 0 15px',
							padding: '0',
						},
						'.code-details ul li strong': {
							color: 'var(--white)',
							fontSize: '1.05em',
							'text-transform': 'uppercase',
						},
						'li > img': {
							margin: 0,
							display: 'inline',
						},
						'ol > li::marker': {
							color: 'inherit',
						},
						'ul > li::marker': {
							color: 'inherit',
						},
						'table tfoot td p': {
							margin: '0 0 3px 9px',
						},
					},
				},
			},
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/typography')],
};
