<script lang="ts">
	import Post1 from '../../../images/blog/add-copy-button-to-code-blocks-hugo-chroma.jpg?w=300&h=300';
	import Post2 from '../../../images/blog/add-search-to-static-site-lunrjs-hugo-vanillajs.jpg?w=300&h=300';
	import Post3 from '../../../images/blog/aws-free-usage-tier.jpg?w=300&h=300';
	import Post4 from '../../../images/blog/aws-hosting-cost-examples-linux-windows-ec2-rds.jpg?w=300&h=300';
	import Post5 from '../../../images/blog/casting-type-conversion-best-practices-c-sharp.jpg?w=300&h=300';
	import Post6 from '../../../images/blog/continuously-deploy-heroku-azure-devops.jpg?w=300&h=300';
	import Post7 from '../../../images/blog/csharp-parse-ip-address-check-cidr-range.jpg?w=300&h=300';
	import Post8 from '../../../images/blog/csharp-retrieve-local-public-ip-address.jpg?w=300&h=300';
	import Post9 from '../../../images/blog/csharp-tpl-socket-methods.jpg?w=300&h=300';
	import Post10 from '../../../images/blog/error-handling-python-result-class.jpg?w=300&h=300';
	import Post11 from '../../../images/blog/functional-techniques-python-result-class.jpg?w=300&h=300';
	import Post12 from '../../../images/blog/how-to-monitor-aws-free-tier-usage.jpg?w=300&h=300';
	import Post13 from '../../../images/blog/install-nginx-source-code-shell-script.jpg?w=300&h=300';
	import Post14 from '../../../images/blog/intro-to-python-decorators.jpg?w=300&h=300';
	import Post15 from '../../../images/blog/optimize-vm-performance-windows10-visual-studio-vmware-fusion.jpg?w=300&h=300';
	import Post16 from '../../../images/blog/packer-template-aws-ec2-ubuntu-nginx.jpg?w=300&h=300';
	import Post17 from '../../../images/blog/parallel-async-csharp-best-practices-tpl.jpg?w=300&h=300';
	import Post18 from '../../../images/blog/periodic-table-of-devops-tools.jpg?w=300&h=300';

	import Post1Mobile from '../../../images/blog/add-copy-button-to-code-blocks-hugo-chroma.jpg?w=707&h=200';
	import Post2Mobile from '../../../images/blog/add-search-to-static-site-lunrjs-hugo-vanillajs.jpg?w=707&h=200';
	import Post3Mobile from '../../../images/blog/aws-free-usage-tier.jpg?w=707&h=200';
	import Post4Mobile from '../../../images/blog/aws-hosting-cost-examples-linux-windows-ec2-rds.jpg?w=707&h=200';
	import Post5Mobile from '../../../images/blog/casting-type-conversion-best-practices-c-sharp.jpg?w=707&h=200';
	import Post6Mobile from '../../../images/blog/continuously-deploy-heroku-azure-devops.jpg?w=707&h=200';
	import Post7Mobile from '../../../images/blog/csharp-parse-ip-address-check-cidr-range.jpg?w=707&h=200';
	import Post8Mobile from '../../../images/blog/csharp-retrieve-local-public-ip-address.jpg?w=707&h=200';
	import Post9Mobile from '../../../images/blog/csharp-tpl-socket-methods.jpg?w=707&h=200';
	import Post10Mobile from '../../../images/blog/error-handling-python-result-class.jpg?w=707&h=200';
	import Post11Mobile from '../../../images/blog/functional-techniques-python-result-class.jpg?w=707&h=200';
	import Post12Mobile from '../../../images/blog/how-to-monitor-aws-free-tier-usage.jpg?w=707&h=200';
	import Post13Mobile from '../../../images/blog/install-nginx-source-code-shell-script.jpg?w=707&h=200';
	import Post14Mobile from '../../../images/blog/intro-to-python-decorators.jpg?w=707&h=200';
	import Post15Mobile from '../../../images/blog/optimize-vm-performance-windows10-visual-studio-vmware-fusion.jpg?w=707&h=200';
	import Post16Mobile from '../../../images/blog/packer-template-aws-ec2-ubuntu-nginx.jpg?w=707&h=200';
	import Post17Mobile from '../../../images/blog/parallel-async-csharp-best-practices-tpl.jpg?w=707&h=200';
	import Post18Mobile from '../../../images/blog/periodic-table-of-devops-tools.jpg?w=707&h=200';

	export let slug: string;
	let pageWidth: number;

	$: mobileDisplay = pageWidth < 640;
	$: src = mobileDisplay ? mobileImages?.[slug] : desktopImages?.[slug];

	const mobileImages: { [k: string]: string } = {
		'add-copy-button-to-code-blocks-hugo-chroma': Post1Mobile,
		'add-search-to-static-site-lunrjs-hugo-vanillajs': Post2Mobile,
		'aws-free-usage-tier': Post3Mobile,
		'aws-hosting-cost-examples-linux-windows-ec2-rds': Post4Mobile,
		'casting-type-conversion-best-practices-c-sharp': Post5Mobile,
		'continuously-deploy-heroku-azure-devops': Post6Mobile,
		'csharp-parse-ip-address-check-cidr-range': Post7Mobile,
		'csharp-retrieve-local-public-ip-address': Post8Mobile,
		'csharp-tpl-socket-methods': Post9Mobile,
		'error-handling-python-result-class': Post10Mobile,
		'functional-techniques-python-result-class': Post11Mobile,
		'how-to-monitor-aws-free-tier-usage': Post12Mobile,
		'install-nginx-source-code-shell-script': Post13Mobile,
		'intro-to-python-decorators': Post14Mobile,
		'optimize-vm-performance-windows10-visual-studio-vmware-fusion': Post15Mobile,
		'packer-template-aws-ec2-ubuntu-nginx': Post16Mobile,
		'parallel-async-csharp-best-practices-tpl': Post17Mobile,
		'periodic-table-of-devops-tools': Post18Mobile
	};

	const desktopImages: { [k: string]: string } = {
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
		'periodic-table-of-devops-tools': Post18
	};
</script>

<svelte:window bind:innerWidth={pageWidth} />

<img {src} type="image/jpeg" alt="Click to read the blog post" />
