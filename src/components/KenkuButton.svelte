<script lang="ts">
    import type { KenkuButtonParams } from "../main";
    export let config: KenkuButtonParams;

    

</script>

<div class="flex flex-row justify-center">
    <p>{config.title}</p>
    <button class="mr-2">Play</button>
    <button class="ml-2">Pause</button>
</div>
  


