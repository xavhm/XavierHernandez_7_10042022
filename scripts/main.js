import API from "./api/api.js";

async function init() {
  const api = new API("../scripts/data/data.json");
  const recipes = await api.getRecipes();
  console.log(recipes);
}

init();
