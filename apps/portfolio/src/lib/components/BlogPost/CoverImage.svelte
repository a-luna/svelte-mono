<script lang="ts">
	import Post1 from '/src/images/blog/add-copy-button-to-code-blocks-hugo-chroma.jpg?w=300;500;800;1200;1500&srcset';
	import Post2 from '/src/images/blog/add-search-to-static-site-lunrjs-hugo-vanillajs.jpg?w=300;500;800;1200;1500&srcset';
	import Post3 from '/src/images/blog/aws-free-usage-tier.jpg?w=300;500;800;1200;1500&srcset';
	import Post4 from '/src/images/blog/aws-hosting-cost-examples-linux-windows-ec2-rds.jpg?w=300;500;800;1200;1500&srcset';
	import Post5 from '/src/images/blog/casting-type-conversion-best-practices-c-sharp.jpg?w=300;500;800;1200;1500&srcset';
	import Post6 from '/src/images/blog/continuously-deploy-heroku-azure-devops.jpg?w=300;500;800;1200;1500&srcset';
	import Post7 from '/src/images/blog/csharp-parse-ip-address-check-cidr-range.jpg?w=300;500;800;1200;1500&srcset';
	import Post8 from '/src/images/blog/csharp-retrieve-local-public-ip-address.jpg?w=300;500;800;1200;1500&srcset';
	import Post9 from '/src/images/blog/csharp-tpl-socket-methods.jpg?w=300;500;800;1200;1500&srcset';
	import Post10 from '/src/images/blog/error-handling-python-result-class.jpg?w=300;500;800;1200;1500&srcset';
	import Post11 from '/src/images/blog/functional-techniques-python-result-class.jpg?w=300;500;800;1200;1500&srcset';
	import Post12 from '/src/images/blog/how-to-monitor-aws-free-tier-usage.jpg?w=300;500;800;1200;1500&srcset';
	import Post13 from '/src/images/blog/install-nginx-source-code-shell-script.jpg?w=300;500;800;1200;1500&srcset';
	import Post14 from '/src/images/blog/intro-to-python-decorators.jpg?w=300;500;800;1200;1500&srcset';
	import Post15 from '/src/images/blog/optimize-vm-performance-windows10-visual-studio-vmware-fusion.jpg?w=300;500;800;1200;1500&srcset';
	import Post16 from '/src/images/blog/packer-template-aws-ec2-ubuntu-nginx.jpg?w=300;500;800;1200;1500&srcset';
	import Post17 from '/src/images/blog/parallel-async-csharp-best-practices-tpl.jpg?w=300;500;800;1200;1500&srcset';
	import Post18 from '/src/images/blog/periodic-table-of-devops-tools.jpg?w=300;500;800;1200;1500&srcset';

	export let slug: string;
	export let caption = '';

	const coverImages: { [k: string]: string } = {
		'add-copy-button-to-code-blocks-hugo-chroma': Post1,
		'add-search-to-static-site-lunrjs-hugo-vanillajs': Post2,
		'aws-free-usage-tier': Post3,
		'aws-hosting-cost-examples-linux-windows-ec2-rds': Post4,
		'casting-type-conversion-best-practices-c-sharp': Post5,
		'continuously-deploy-heroku-azure-devops': Post6,
		'csharp-parse-ip-address-check-cidr-range': Post7,
		'csharp-retrieve-local-public-ip-address': Post8,
		'csharp-tpl-socket-methods': Post9,
		'error-handling-python-result-class': Post10,
		'functional-techniques-python-result-class': Post11,
		'how-to-monitor-aws-free-tier-usage': Post12,
		'install-nginx-source-code-shell-script': Post13,
		'intro-to-python-decorators': Post14,
		'optimize-vm-performance-windows10-visual-studio-vmware-fusion': Post15,
		'packer-template-aws-ec2-ubuntu-nginx': Post16,
		'parallel-async-csharp-best-practices-tpl': Post17,
		'periodic-table-of-devops-tools': Post18,
	};
</script>

<div class="post-image">
	<figure>
		<img srcset={coverImages[slug]} alt={caption} />
		<figcaption><p>{caption}</p></figcaption>
	</figure>
</div>

<style lang="postcss">
	.post-image {
		margin: 0;
	}
	figcaption {
		color: var(--body-text-color);
		font-size: 0.95em;
		text-align: center;
		font-weight: 400;
		font-style: italic;
		margin: 10px 0 0;
	}
</style>
