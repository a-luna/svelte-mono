<script lang="ts">
  import Arrow from "../Icons/Arrow.svelte";
</script>

<div class="project-card-link">
  <div class="icon">
    <Arrow width={"24px"} height={"24px"} />
  </div>
</div>

<style lang="postcss">
  .project-card-link {
    display: flex;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    color: var(--gray-shade5);
    background-color: var(--black-tint3);

    grid-column: 4 / span 1;
    grid-row: 1 / span 2;
  }

  .icon {
    width: 24px;
    height: 24px;
    transform: rotate(45deg);
  }
</style>
