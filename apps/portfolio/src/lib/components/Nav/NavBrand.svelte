<script lang="ts">
	import NavIconRenderer from '$lib/components/Icons/NavIconRenderer.svelte';
</script>

<a href="/">
	<div class="nav-brand">
		<div class="icon">
			<NavIconRenderer />
		</div>
		<span class="name">Aaron Luna</span>
	</div>
</a>

<style lang="postcss">
	a {
		height: 47px;
		margin: 0 0.5rem 0 0;
	}
	.nav-brand {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		justify-content: flex-start;
		width: 180px;
		padding: 0.25rem 0.75rem 0.25rem 0.5rem;
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
	.name {
		flex: 1;
	}
</style>
