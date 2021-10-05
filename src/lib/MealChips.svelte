<script lang="ts">
  import { Chip } from "attractions";

  export let meals: ("snack" | "breakfast" | "lunch" | "dinner")[];
  const mealsOrder = ["snack", "breakfast", "lunch", "dinner"];
</script>

<span style="display: flex; align-items: center; gap: 1em;"
  >{#each meals.sort((a, b) => {
    return mealsOrder.indexOf(a) - mealsOrder.indexOf(b);
  }) as meal}<Chip>{meal}</Chip>{/each}</span
>
