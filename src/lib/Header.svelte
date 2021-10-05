<script lang="ts">
  import { Button } from "attractions";
  import { CircleIcon, GithubIcon } from "svelte-feather-icons";
</script>

<header class="padded">
  <a href="/" class="logo">
    <CircleIcon size="24" />
    <span class="hide-on-less-tb">Yams</span>
  </a>
  <div class="clickables">
    <Button round href="https://github.com/mtoohey31/yams">
      <GithubIcon size="24" />
    </Button>
  </div>
</header>

<style src="../../css/header.scss">
</style>
