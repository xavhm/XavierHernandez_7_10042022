import API from "./api/api.js";
import { RecipesCard } from "./utils/cards.js";
import { searchBar } from "./utils/searchBar.js";
import { init, createFiltersLists } from "./utils/filters.js";

let recipes;

async function fetch() {
  const api = new API(
    "https://xavhernandez.github.io/XavierHernandez_7_10042022//scripts/data/data.json"
  );
  recipes = await api.getRecipes();
  data();
}

function data() {
  const searchInput = document.getElementById("site-search");
  let recipesList = recipes;
  if (searchInput.value.length >= 3) {
    recipesList = searchBar(recipesList);
  }
  init(recipesList);
  return recipesList;
}

// Afficher les recettes
function displayRecipes(recipesList) {
  const recipesSection = document.getElementById("recipes");
  recipesSection.innerHTML = "";
  recipesList.forEach((recipe) => {
    recipesSection.appendChild(new RecipesCard(recipe).buildCard());
  });
}

// Générer la liste des filtres
function generateFiltersLists(recipesList, ingredientsList, appliancesList, ustensilsList) {
  let ingredients = [];
  let appliances = [];
  let ustensils = [];

  recipesList.forEach((recipe) => {
    recipe.ingredients.map((element) => ingredients.push(element.ingredient));
    appliances.push(recipe.appliance);
    recipe.ustensils.map((element) => ustensils.push(element));
  });

  ingredientsList = [...new Set(ingredients)].sort();
  appliancesList = [...new Set(appliances)].sort();
  ustensilsList = [...new Set(ustensils)].sort();

  createFiltersLists(recipesList, ingredientsList, appliancesList, ustensilsList);

  return { ingredientsList, appliancesList, ustensilsList };
}

// Initialiser l'app
fetch();

export { displayRecipes, generateFiltersLists, recipes };
