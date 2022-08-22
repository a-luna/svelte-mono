<script lang="ts">
  import AndroidMask from "$lib/components/Icons/NavIcons/AndroidMask.svelte";
  import AudioCassette from "$lib/components/Icons/NavIcons/AudioCassette.svelte";
  import CyberEye from "$lib/components/Icons/NavIcons/CyberEye.svelte";
  import DustCloud from "$lib/components/Icons/NavIcons/DustCloud.svelte";
  import FireSilhouette from "$lib/components/Icons/NavIcons/FireSilhouette.svelte";
  import HighFive from "$lib/components/Icons/NavIcons/HighFive.svelte";
  import MoebiusStar from "$lib/components/Icons/NavIcons/MoebiusStar.svelte";
  import Stairs3D from "$lib/components/Icons/NavIcons/Stairs3D.svelte";
  import SverdIFjell from "$lib/components/Icons/NavIcons/SverdIFjell.svelte";
  import Teleport from "$lib/components/Icons/NavIcons/Teleport.svelte";
  import { getRandomArrayItem } from "$lib/util";

  const icons = {
    AndroidMask: AndroidMask,
    AudioCassette: AudioCassette,
    CyberEye: CyberEye,
    DustCloud: DustCloud,
    FireSilhouette: FireSilhouette,
    HighFive: HighFive,
    MoebiusStar: MoebiusStar,
    Stairs3D: Stairs3D,
    SverdIFjell: SverdIFjell,
    Teleport: Teleport,
  };

  $: randomIconName = getRandomArrayItem<string>(Object.keys(icons));
</script>

<svelte:component this={icons[randomIconName]} />
