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
  viewBox="0 0 512 512"
  {width}
  {height}
  {fill}
  {strokeWidth}
  {padding}
  {title}
>
  <path
    d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z"
  />
</IconBase>
