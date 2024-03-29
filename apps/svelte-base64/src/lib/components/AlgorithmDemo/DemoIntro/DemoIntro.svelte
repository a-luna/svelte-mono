<script lang="ts">
	import OpenHelpDocsButton from '$lib/components/AlgorithmDemo/Buttons/OpenHelpDocsButton.svelte';
	import DetailsSummary from '$lib/components/AlgorithmDemo/DemoIntro/DetailsSummary.svelte';
	import ArrowKey from '$lib/components/Icons/KeyboardIcons/ArrowKey.svelte';
	import { getDemoAppContext } from '$lib/stores/context';
	import { slide } from 'svelte/transition';

	let arrowSize: 'sm' | 'md' | 'lg';
	let welcomeDetailsElement: HTMLDetailsElement;
	let encodingDetailsElement: HTMLDetailsElement;
	let appNavDetailsElement: HTMLDetailsElement;
	let openSection: 'none' | 'welcome' | 'settings' | 'navigation' = 'welcome';
	const { demoState } = getDemoAppContext();

	$: arrowSize = $demoState.isMobileDisplay ? 'sm' : 'sm';

	const getInactive_WelcomeDemoText = (): string[] => [
		'If necessary, update the <strong>Text Encoding</strong> setting (ASCII, hex or binary) based on the type of data your string contains.',
		'The <strong>Output Encoding</strong> setting controls which Base64 alphabet is used to generate the encoded data: either the standard Base64 alphabet (<code>base64</code>) or the URL-safe variant (<code>base64url</code>).',
	];

	const getInactive_AppNavDemoText = (): string[] => [
		'If you are only interested in the final Base64-encoded value, at any time you can jump to the end of the demonstration using the <strong>Last Step</strong> button.',
		'Both <strong>First Step</strong> and <strong>Reset</strong> buttons return to the first step of the demo, the only difference being that <strong>Reset</strong> also changes the form values back to their initial state.',
		'If you would rather watch the demo proceed automatically step-by-step, press the <strong>Start Autoplay</strong> button.',
		'You can stop autoplaying and return to manually stepping through the demo with the <strong>Stop Autoplay</strong> button (You can also start/stop autoplay using the <kbd>Space</kbd> bar).',
	];

	const getSections = () => ({
		welcome: welcomeDetailsElement,
		settings: encodingDetailsElement,
		navigation: appNavDetailsElement,
	});

	const allSectionsCollapsed = (): boolean => Object.values(getSections()).every((section) => !section?.open);

	function toggle(section: 'welcome' | 'settings' | 'navigation') {
		const sections = getSections();
		if (sections[section].open) {
			Object.entries(sections).forEach(([sectionName, sectionElement]) => {
				if (sectionName !== section) {
					sectionElement.open = false;
				}
			});
			openSection = section;
		} else if (allSectionsCollapsed()) {
			openSection = 'none';
		}
	}
</script>

<details bind:this={welcomeDetailsElement} on:toggle={() => toggle('welcome')} open>
	<DetailsSummary sectionName={'Welcome!'} thisSection={'welcome'} {openSection} />
	{#if welcomeDetailsElement?.open}
		<div transition:slide class="details-content">
			<p>
				<strong>Welcome to the Base64 Algorithm Demo app!</strong> Enter a string value in the text box above to get started.
			</p>
			<p>
				<strong>If you are unfamiliar with any of the following concepts,</strong> click the link to view documentation for
				that topic:
			</p>
			<ul>
				<li>
					<OpenHelpDocsButton label={'Base64 encoding'} helpTopic={'what-is-base64'} on:openHelpModal />
				</li>
				<li>
					<OpenHelpDocsButton label={'ASCII'} helpTopic={'text-encoding-ascii'} on:openHelpModal /> and
					<OpenHelpDocsButton label={'UTF-8 encoding'} helpTopic={'text-encoding-utf8'} on:openHelpModal />
				</li>
				<li>
					<OpenHelpDocsButton label={'Hexadecimal'} helpTopic={'text-encoding-hex'} on:openHelpModal /> and <OpenHelpDocsButton
						label={'binary values'}
						helpTopic={'text-encoding-bin'}
						on:openHelpModal
					/>
				</li>
				<li>
					<OpenHelpDocsButton label={'Standard'} helpTopic={'base64-alphabet'} on:openHelpModal /> vs.
					<OpenHelpDocsButton label={'URL-safe Base64 alphabet'} helpTopic={'base64url-alphabet'} on:openHelpModal />
				</li>
			</ul>
			<p>
				<OpenHelpDocsButton
					label={'You can access the full list of help topics by clicking here.'}
					helpTopicsExpanded={true}
					on:openHelpModal
				/>
			</p>
		</div>
	{/if}
</details>
<details bind:this={encodingDetailsElement} on:toggle={() => toggle('settings')}>
	<DetailsSummary sectionName={'Settings'} thisSection={'settings'} {openSection} />
	{#if encodingDetailsElement?.open}
		<div transition:slide class="details-content">
			{#each getInactive_WelcomeDemoText() as text}
				<p>{@html text}</p>
			{/each}
			<p>
				When ready, click the <strong>Next Step</strong> button (or press the <ArrowKey
					arrow="right"
					size={arrowSize}
				/> arrow key).
			</p>
		</div>
	{/if}
</details>
<details bind:this={appNavDetailsElement} on:toggle={() => toggle('navigation')}>
	<DetailsSummary sectionName={'Navigation'} thisSection={'navigation'} {openSection} />
	{#if appNavDetailsElement?.open}
		<div transition:slide class="details-content">
			<p>
				You can proceed through the encoding process step-by-step (forward or backward) using the
				<strong>Prev. Step</strong> and <strong>Next Step</strong> buttons (<ArrowKey arrow="left" size={arrowSize} />
				and <ArrowKey arrow="right" size={arrowSize} /> arrow keys will perform the same function).
			</p>
			{#each getInactive_AppNavDemoText() as text}
				<p>{@html text}</p>
			{/each}
		</div>
	{/if}
</details>

<style lang="postcss">
	details {
		width: 100%;
		font-family: 'Roboto Mono', menlo, monospace;
	}

	details:not(:last-child):not(:only-child) {
		margin: 0 0 1rem 0;
	}

	.details-content {
		display: flex;
		flex-flow: column nowrap;
		gap: 0.75rem;
		margin: 0.75rem 0 0 0.25rem;
	}
	ul {
		margin: 0;
		line-height: 1.7;
	}

	@media screen and (min-width: 764px) {
		.details-content {
			margin: 1.25rem 0 0 0.75rem;
		}
	}
</style>
