<script lang="ts">
    import { derived } from "svelte/store";
    import { isKenkuConnected } from "../../stores/kenkuStore";
    import { RefreshCw } from "lucide-svelte";
    import ErrorCard from "../ErrorCard.svelte";
    import * as kenkuConnector from "../../kenku/kenkuConnector";
    const isConnected = derived(isKenkuConnected, ($connected) => {
        return $connected;
    });
</script>

{#if $isConnected}
    {#key $isConnected}
        <slot />
    {/key}
{:else}
    <ErrorCard label="KenkuFM Integration: Couldn't connect to Kenku FM">
        <button
            slot="button"
            class="ml-auto rounded-md transition attempt-to-connect"
            style=""
            on:click={async () => {
                await kenkuConnector.connect();
            }}
        >
            <RefreshCw />
        </button>
    </ErrorCard>
{/if}

<style>
    .attempt-to-connect {
        background-color: rgba(var(--callout-error), 0.4);
    }

    .attempt-to-connect:hover {
        background-color: rgba(var(--callout-error), 0.2);
    }
</style>
