<script lang="ts">
  let svelteUrl = "https://svelte.dev/";
  let tailwindcssUrl = "https://tailwindcss.com/";
  let input: string = "";
</script>



<div class="break-words">
  <h1 class="">Example View</h1>
  <p>
    This is an example of an Obsidian View made with <a href={svelteUrl}
      >Svelte</a
    >
    and <a href={tailwindcssUrl}>Tailwindcss</a>.
  </p>



  <h2>Reactivity</h2>
  <h3>Input</h3>
  <input
    type="text"
    placeholder="Write here"
    maxlength="115"
    bind:value={input}
  />
  <button class="mod-cta" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="6 3 20 12 6 21 6 3"/></svg>Hello World</button>

  <p>Input: {input}</p>
</div>
