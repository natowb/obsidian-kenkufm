<script lang="ts">
    import { CirclePlay } from "lucide-svelte";
    import CollapsibleCard from "../CollapsibleCard.svelte";
    import ConnectionWrapper from "../ConnectionWrapper/ConnectionWrapper.svelte";

    export let config: {
        title: string;
        sounds: { title: string; id: string }[];
    };

    function handlePlay(id: string) {
        console.log(`Playing sound with id: ${id}`);
    }
</script>

<ConnectionWrapper>
    <CollapsibleCard title={config.title}>
        <div class="flex flex-wrap gap-2">
            {#each config.sounds as sound}
                <div
                    class="flex flex-col items-center gap-2 p-2 rounded-sm shadow"
                    style="background-color: var(--background-primary);"
                >
                    <div
                        class="text-sm font-semibold"
                        style="color: var(--text-normal);"
                    >
                        {sound.title}
                    </div>
                    <button
                        class="rounded-md transition"
                        on:click={() => handlePlay(sound.id)}
                    >
                        <CirclePlay />
                    </button>
                </div>
            {/each}
        </div>
    </CollapsibleCard>
</ConnectionWrapper>
