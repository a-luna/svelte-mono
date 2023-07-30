<script lang="ts">
	import { BasicIconRenderer } from '@a-luna/shared-ui';
</script>

<div class="button-wrapper">
	<button type="button" class="btn-close" aria-label="Close" title="Close Help Docs" on:click>
		<BasicIconRenderer icon={'close'} />
	</button>
</div>

<style lang="postcss">
	.button-wrapper,
	button,
	button:hover,
	button:active,
	button:focus,
	button:active:focus {
		background-color: transparent;
	}

	.button-wrapper {
		padding: 0;
		border-top-left-radius: 0px;
	}
	button {
		color: var(--black2);
		width: 0.8rem;
		height: 0.8rem;
		border: none;
		padding: 0;
		align-self: flex-start;
	}

	@media screen and (min-width: 764px) {
		button {
			color: var(--light-gray4);
		}
		button:hover,
		button:active,
		button:focus,
		button:active:focus {
			color: var(--nav-button-avtive-bg-color);
		}
	}
</style>
