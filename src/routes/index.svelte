<script lang="ts" context="module">
  export async function load({ fetch }) {
    const url = "/index.json";
    const res = await fetch(url);

    if (res.ok) {
      let recipes = {};

      for (let recipe of await res.json()) {
        const url = `/recipe/${recipe}.json`;
        const res = await fetch(url);

        if (res.ok) {
          recipes[recipe] = await res.json();
        } else {
          return {
            props: {
              recipes: recipes,
            },
          };
        }
      }

      return {
        props: {
          recipes: recipes,
        },
      };
    } else {
      return {
        status: res.status,
        error: new Error(`Could not load ${url}`),
      };
    }
  }
</script>

<script lang="ts">
  import { Button, TextField } from "attractions";
  import { SearchIcon } from "svelte-feather-icons";
  import type { Recipe } from "$lib/schema-type";
  import RecipeCard from "$lib/RecipeCard.svelte";
  export let recipes: Array<Recipe>;

  let searchString: string;
  $: filteredRecipeList = searchString
    ? Object.entries(recipes).filter(
        ([_, recipe]) =>
          recipe.name.toLowerCase().indexOf(searchString.toLowerCase()) !==
            -1 ||
          (recipe.description
            ? recipe.description
                .toLowerCase()
                .indexOf(searchString.toLowerCase()) !== -1
            : false)
      )
    : Object.entries(recipes);
</script>

<div style="display: flex; justify-content: space-between; gap: 1em;">
  <span style="flex-grow: 1;"
    ><TextField outline label="Search" withItem bind:value={searchString}>
      <SearchIcon size="24" class="item" />
    </TextField></span
  ><Button style="margin-top: 0.65em;">Filter</Button>
</div>
{#key searchString}
  {#each filteredRecipeList as [route, recipe]}
    <RecipeCard bind:route bind:recipe />
  {/each}
{/key}
