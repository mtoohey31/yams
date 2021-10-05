<script lang="ts" context="module">
  export const prerender = true;

  export async function load({ page, fetch }) {
    const url = `/recipe/${page.params.slug}.json`;
    const res = await fetch(url);

    if (res.ok) {
      return {
        props: {
          recipe: await res.json(),
        },
      };
    }

    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script lang="ts">
  import { FormField, TextField } from "attractions";
  import type {
    Recipe as SchemaType,
    Ingredient,
    Step,
  } from "$lib/schema-type";

  import MealChips from "$lib/MealChips.svelte";

  export let recipe: SchemaType;

  const defaultServings = recipe.servings ? recipe.servings : 1;
  let servings = defaultServings;
  let servingsText: string = String(servings);
  let servingsErrorText: string;

  // @ts-ignore
  let ingredients = recipe.steps.reduce((ingredientsSoFar, curr) => {
    // @ts-ignore
    if (curr.ingredients) {
      // @ts-ignore
      return ingredientsSoFar.concat(curr.ingredients);
    }
    return ingredientsSoFar;
  }, []);

  // TODO: Handle alternate units, mins, and maxes here
  let prepTime = recipe.steps.reduce(
    // @ts-ignore
    (sumSoFar, curr) => (curr.time ? curr.time + sumSoFar : sumSoFar),
    0
  );

  function getIngredientString(ingredient: string | Ingredient): string {
    if (typeof ingredient === "string") {
      return ingredient;
    } else {
      let ingredientPartsSoFar = [];
      let plural = false;
      if (ingredient.amount) {
        let amount = ingredient.amount * (servings / defaultServings);
        ingredientPartsSoFar.push(amount);
        plural = amount !== 1;
      }
      if (ingredient.unit) {
        if (typeof ingredient.unit === "string") {
          ingredientPartsSoFar.push(ingredient.unit);
        } else {
          ingredientPartsSoFar.push(
            (plural ? ingredient.unit.plural : ingredient.unit.singular) + " of"
          );
        }
      }
      if (ingredient.name) {
        if (typeof ingredient.name === "string") {
          ingredientPartsSoFar.push(ingredient.name);
        } else {
          ingredientPartsSoFar.push(
            plural ? ingredient.name.plural : ingredient.name.singular
          );
        }
      }
      if (ingredient.note) {
        ingredientPartsSoFar.push(`(${ingredient.note})`);
      }
      return ingredientPartsSoFar.join(" ");
    }
  }
</script>

<div style="display: flex; justify-content: space-between;">
  <span>
    <div style="display: flex; gap: 1em; align-items: center;">
      <h1 style="margin-bottom: 0;">{recipe.name}</h1>
      <MealChips meals={recipe.meals} />
    </div>
    <br />
    <table>
      <tr>
        <td>Servings</td>
        <td><TextField type="number" bind:value={servings} /></td>
      </tr>
      {#if prepTime !== 0}
        <tr>
          <td>Prep Time</td>
          <td>{prepTime}</td>
        </tr>
      {/if}
      <!-- TODO: Handle alternate units, mins, and maxes here -->
      {#if recipe.wait_time}
        <tr>
          <td>Wait Time</td>
          <td>{recipe.wait_time}</td>
        </tr>
      {/if}
    </table>
  </span>
  {#if recipe.image}
    <img alt={`${recipe.name} Picture`} src={recipe.image} style="" />
  {/if}
</div>
<hr />
<div style="display: flex; flex-wrap: wrap;">
  {#if ingredients}
    <div style="min-width: 20em;">
      <h2>Ingredients</h2>
      <ul>
        {#key servings}
          {#each ingredients as ingredient}
            <li>
              {getIngredientString(ingredient)}
            </li>
          {/each}
        {/key}
      </ul>
    </div>
  {/if}
  <div style="min-width: 20em;">
    <h2>Steps</h2>
    <ol>
      {#each recipe.steps as step}
        <li>
          {#if typeof step === "string"}
            {step}
          {:else}
            {#if step.optional}<span style="opacity: 75%;"
                >(Optional)
              </span>{/if}{step.text}
          {/if}
        </li>
      {/each}
    </ol>
  </div>
</div>

<style lang="scss">
  @use 'sass:color';
  @use "theme" as vars;

  img {
    max-width: 40vw;
    border-radius: 20px;
    border: 2px solid color.adjust(vars.$main, $alpha: -0.75);
    background-color: color.adjust(vars.$main, $alpha: -0.75);
  }
</style>
