<script>
  import { page } from "$app/stores";
  import Header from "../lib/Header.svelte";
  import "../../css/theme.scss";
</script>

<Header />
<main class="padded extra">
  <article>
    <slot />
  </article>
</main>

<style src="../../css/_layout.scss">
</style>
