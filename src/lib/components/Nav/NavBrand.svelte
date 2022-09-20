<script lang="ts">
	import NavIcon from '$lib/components/Nav/NavIcon.svelte';
</script>

<a href="/">
	<div class="nav-brand">
		<div class="icon">
			<NavIcon />
		</div>
		<span>Aaron Luna</span>
	</div>
</a>

<style lang="postcss">
	.nav-brand {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		width: 172px;
		padding: 0.25rem;
		font-size: 22px;
		font-weight: 500;
		line-height: 1;
		color: var(--black);
		background-color: var(--white);
		box-shadow: 7px 7px 0px -1px var(--page-bg-color), 7px 7px 0px 0px var(--accent-color);
		gap: 0.5rem;
		white-space: nowrap;
	}
	.icon {
		width: 32px;
		align-self: flex-start;
	}
</style>
