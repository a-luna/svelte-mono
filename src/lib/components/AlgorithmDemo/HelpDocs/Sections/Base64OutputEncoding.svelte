<script lang="ts">
	import { base64OutputEncoding } from '$lib/components/AlgorithmDemo/HelpDocs/Sections/_helpText';
	import SelectBase64Encoding from '$lib/components/AlgorithmDemo/InputForm/SelectBase64Encoding.svelte';
</script>

<div class="settings-help help-module">
	<div class="encoding-wrapper">
		<div class="b64-encoding">
			<span class="form-label">Text Encoding</span>
			<SelectBase64Encoding />
			<div
				class="dropdown"
				role="menu"
				aria-orientation="vertical"
				aria-labelledby="select-base64-encoding-open-list-button"
				tabindex="-1"
				style="width: 116px"
			>
				<div
					class="menu-item active"
					data-value="base64"
					role="menuitem"
					tabindex="-1"
					id="select-base64-encoding-option-1"
					data-testid="select-base64-encoding-option-1"
					style="font-size: 0.875rem;"
				>
					base64
				</div>
				<!--<Option>-->
				<div
					class="menu-item"
					data-value="base64url"
					role="menuitem"
					tabindex="-1"
					id="select-base64-encoding-option-2"
					data-testid="select-base64-encoding-option-2"
					style="font-size: 0.875rem;"
				>
					base64url
				</div>
				<!--<Option>-->
			</div>
		</div>
		<div class="encoding-description">
			{#each base64OutputEncoding as paragraph}
				<p>{@html paragraph}</p>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.encoding-wrapper {
		min-height: 164px;
		display: flex;
		flex-flow: row nowrap;
		gap: 1rem;
	}
	.b64-encoding {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		gap: 0.5rem;
		padding: 0 0.5rem;
		pointer-events: none;
	}
	.dropdown {
		background-color: var(--dropdown-bg-color, var(--white2));
		color: var(--dropdown-text-color, var(--black2));
		border: 1px solid var(--dropdown-border-color, var(--light-gray2));
		transform-origin: top right;
		width: 100%;
		border-radius: 0.375rem;
		box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
	}
	.menu-item {
		display: block;
		color: var(--select-text-color);
		line-height: 1.25rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	.menu-item:first-child {
		border-top-right-radius: 4px;
		border-top-left-radius: 4px;
	}
	.menu-item.active {
		background-color: var(--selected-item-bg-color);
	}
	.encoding-description {
		display: flex;
		flex: 1;
		flex-flow: column nowrap;
		gap: 0.5rem;
	}
</style>
