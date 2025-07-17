<script lang="ts">
    import { Disc3 } from "lucide-svelte";
    export let title = "Soundboard";
    let open = true;
</script>

<div
    class="flex flex-col p-4 rounded-sm shadow"
    style="background-color: var(--background-primary-alt);"
>
    <div
        class="flex items-center justify-between gap-2 pb-4"
        style="border-bottom: 2px solid var(--background-primary);"
    >
        <div class="flex items-center gap-2">
            <Disc3 />
            <div
                class="text-sm font-semibold"
                style="color: var(--text-normal);"
            >
                {title}
            </div>
        </div>

        <button
            class="w-6 h-6 rounded-sm flex items-center justify-center text-xs"
            style="
				background-color: var(--background-modifier-hover);
				color: var(--text-muted);
			"
            on:click={() => (open = !open)}
            aria-label={open ? "Collapse section" : "Expand section"}
            aria-expanded={open}
        >
            {open ? "-" : "+"}
        </button>
    </div>

    {#if open}
        <div class="pt-2">
            <slot />
        </div>
    {/if}
</div>
