<script lang="ts">
  import { Card } from "attractions";
  import MealChips from "$lib/MealChips.svelte";
  import type { Recipe as SchemaType } from "$lib/schema-type";

  export let route: string;
  export let recipe: SchemaType;
</script>

<div style="margin-top: 1em;">
  <Card>
    <div style="display: flex; justify-content: space-between; gap: 1em;">
      <div>
        <span style="display: flex; align-items: center; gap: 1em;"
          ><h2 style="margin: 0;">
            <!-- TODO: Implement animations between pages -->
            <a href={`/recipe/${route}`}>{recipe.name}</a>
          </h2>
          <MealChips meals={recipe.meals} /></span
        >
        {#if recipe.description}
          <div style="margin-top: 1em;">
            {recipe.description}
          </div>
        {/if}
      </div>
      <!-- TODO: Compute time + wait time -->
      {#if recipe.image}
        <img
          alt={`${recipe.name} Picture`}
          src={recipe.image}
          style="max-height: 7em; border-radius: 20px;"
        />
      {/if}
    </div>
  </Card>
</div>

<style lang="scss">
  @use "theme" as vars;

  a:visited {
    color: vars.$main;
  }
</style>
