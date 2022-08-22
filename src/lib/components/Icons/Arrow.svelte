<script lang="ts">
  import IconBase from "$lib/components/Icons/IconBase.svelte";

  export let fill: string = "currentColor";
  export let width: string = null;
  export let height: string = null;
  export let title: string = null;
  export let strokeWidth = "0";
  export let padding = "0";
</script>

<IconBase
  viewBox="0 0 24 24"
  {width}
  {height}
  {fill}
  {strokeWidth}
  {padding}
  {title}
>
  <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
</IconBase>
