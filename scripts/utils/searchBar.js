import { displayRecipes, generateFiltersLists } from "../main.js";
import { searchOnFiltersList } from "./filters.js";
import { resetTags } from "./tags.js";
import { recipes } from "../main.js";

// Barre de recherche
function searchBar(recipesList) {
  const searchInput = document.getElementById("site-search");
  const recipesSection = document.getElementById("recipes");

  // EventListener sur la barre de recherche
  searchInput.addEventListener("keyup", (e) => {
    const input = e.target.value;

    if (input.length < 3) {
      resetTags();
      recipesList = recipes;
      displayRecipes(recipesList);
      generateFiltersLists(recipesList);
      searchOnFiltersList(recipesList, generateFiltersLists);
      return;
    }

    // Filtrer les recettes selon recherche
    let filteredRecipies = [];
    for (const recipe of recipesList) {
      let totalIngredientsList = [];
      const recipeIngredients = recipe.ingredients;
      for (const ingredient of recipeIngredients) {
        totalIngredientsList.push(ingredient.ingredient);
      }
      if (
        recipe.name.includes(input) ||
        recipe.description.includes(input) ||
        totalIngredientsList.includes(input)
      ) {
        filteredRecipies.push(recipe);
      }
    }

    // Affichage conditionnel des recettes
    if (filteredRecipies.length > 0) {
      resetTags();
      recipesList = filteredRecipies;
      displayRecipes(recipesList);
      generateFiltersLists(recipesList);
      searchOnFiltersList(recipesList, generateFiltersLists);
    } else {
      resetTags();
      recipesSection.innerHTML =
        "<div class='missing'>Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>";
      generateFiltersLists(recipesList);
      searchOnFiltersList(recipesList, generateFiltersLists);
    }
  });
}

export { searchBar };
