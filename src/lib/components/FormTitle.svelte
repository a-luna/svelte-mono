<script lang="ts">
	import PushableButton from '$lib/components/Buttons/PushableButton.svelte';
	import { state } from '$lib/state';
	import type { ButtonColor } from '$lib/types';

	let switchModeButtonColor: ButtonColor;

	$: formTitle = $state.mode === 'encode' ? 'Base64 Encoder' : 'Base64 Decoder';
	$: switchModeButtonColor = $state.mode === 'encode' ? 'teal' : 'green';

	// const toggleMode = () => ($state.mode = $state.mode === 'encode' ? 'decode' : 'encode');

	function toggleMode() {
		$state.mode = $state.mode === 'encode' ? 'decode' : 'encode';
		if ($state.mode === 'encode') {
			// state.setInputText('0x1a5c9905dd');
			// state.setInputEncoding('hex');
			state.setInputText('this is a test');
			state.setInputEncoding('ASCII');
			state.setOutputEncoding('base64');
			state.validateInput();
			state.execute();
		} else {
			state.setInputText('dGhpcyBpcyBhIHRlc3Q=');
			state.setInputEncoding('base64');
			state.validateInput();
			state.execute();
		}
	}
</script>

<div class="form-title-wrapper">
	<div class="form-title">
		{formTitle}
	</div>
	<div class="form-title-buttons">
		<PushableButton size={'xs'} color={switchModeButtonColor} on:click={() => toggleMode()}>Switch Mode</PushableButton>
		<PushableButton size={'xs'} color={'pink'} on:click={() => state.reset()}>Reset</PushableButton>
	</div>
</div>

<style lang="postcss">
	.form-title-wrapper {
		display: flex;
		flex-flow: row wrap;
		align-items: flex-start;
		margin: 0 auto;
		gap: 1.5rem;
	}
	.form-title {
		flex: 0 0 auto;
		color: var(--pri-color);
		font-size: 2.5rem;
		font-weight: 400;
		text-align: center;
		letter-spacing: 1px;
		cursor: pointer;
		margin: 0 5px 0 0;
		line-height: 1;
		text-shadow: 2px 2px var(--sec-color), 1.75px 1.75px var(--sec-color), 1.5px 1.5px var(--sec-color),
			1.25px 1.25px var(--sec-color), 1px 1px var(--sec-color), 0.75px 0.75px var(--sec-color),
			0.5px 0.5px var(--sec-color), 0.25px 0.25px var(--sec-color);
	}
	.form-title-buttons {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-end;
		gap: 0.5rem;
	}
	@media screen and (max-width: 670px) {
		.form-title-wrapper {
			flex-flow: row nowrap;
			justify-content: space-evenly;
			align-items: center;
			line-height: 30px;
			margin: 0 0 10px;
		}
		.form-title {
			font-size: 1.75rem;
			font-weight: 400;
			margin: 0 auto;
		}
		.form-title-buttons {
			margin: 0 auto;
		}
	}
	@media screen and (max-width: 600px) {
		.form-title-wrapper {
			flex-flow: column nowrap;
		}
		.form-title {
			margin: 0 auto 15px auto;
		}
	}
</style>
