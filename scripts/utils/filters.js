import { generateFiltersLists, displayRecipes } from "../main.js";
import { removeTags, displayTags } from "../utils/tags.js";
import { searchBar } from "./searchBar.js";

function init(recipesList) {
  displayRecipes(recipesList);
  searchBar(recipesList);
  generateFiltersLists(recipesList);
  displayListsInit();
  searchOnFiltersList(recipesList, generateFiltersLists);
  removeTags(recipesList);
}

// Générer les listes de filtres
function createFiltersLists(recipesList, ingredientsList, appliancesList, ustensilsList) {
  const ingredientsContainer = document.querySelector(".ingredients-content");
  ingredientsContainer.innerHTML = "";
  filtersListPattern(ingredientsList, ingredientsContainer);

  const appliancesContainer = document.querySelector(".appliances-content");
  appliancesContainer.innerHTML = "";
  filtersListPattern(appliancesList, appliancesContainer);

  const ustensilsContainer = document.querySelector(".ustensils-content");
  ustensilsContainer.innerHTML = "";
  filtersListPattern(ustensilsList, ustensilsContainer);

  displayTags(recipesList);
}

// Afficher les listes de filtres
function filtersListPattern(ElementList, ElementListcontent) {
  ElementList.forEach((element) => {
    const createListsDOM = document.createElement("li");
    createListsDOM.innerHTML = element;
    createListsDOM.classList.add("list-item");
    ElementListcontent.appendChild(createListsDOM);
  });
}

// Recherche et Update des listes de filtres
function searchOnFiltersList(recipesList, generateFiltersLists) {
  const filtersItems = generateFiltersLists(recipesList);
  const filtersInput = document.querySelectorAll(".filter-input");

  filtersInput.forEach((input) => {
    input.addEventListener("keyup", function (e) {
      const targetFilter = e.target.className;
      if (targetFilter.includes("ingredients")) {
        const searchInput = e.target.value;
        const filteredIngredients = filtersItems.ingredientsList.filter((ingredient) => {
          return ingredient.includes(searchInput);
        });

        createFiltersLists(
          recipesList,
          filteredIngredients,
          filtersItems.appliancesList,
          filtersItems.ustensilsList
        );
      }
      if (targetFilter.includes("appliances")) {
        const searchInput = e.target.value;
        const filteredAppliances = filtersItems.appliancesList.filter((appliance) => {
          return appliance.includes(searchInput);
        });

        createFiltersLists(
          recipesList,
          filtersItems.ingredientsList,
          filteredAppliances,
          filtersItems.ustensilsList
        );
      }
      if (targetFilter.includes("ustensils")) {
        const searchInput = e.target.value;
        const filteredUstensils = filtersItems.ustensilsList.filter((ustensil) => {
          return ustensil.includes(searchInput);
        });

        createFiltersLists(
          recipesList,
          filtersItems.ingredientsList,
          filtersItems.appliancesList,
          filteredUstensils
        );
      }
    });
  });
}

// Gérer l'affichage des selectMenus pour les filtres
function displayLists(obj, objlist, item, targetFilter) {
  if (targetFilter.includes(item) && obj.isFilterOpen == false) {
    for (let o of objlist) {
      o.content.style.display = "none";
      o.input.style.width = "170px";
      o.isFilterOpen = false;
    }

    obj.content.style.display = "grid";
    obj.input.style.width = "710px";
    obj.isFilterOpen = true;
  } else if (targetFilter.includes(item) && obj.isFilterOpen == true) {
    obj.content.style.display = "none";
    obj.input.style.width = "170px";
    obj.isFilterOpen = false;
  }
}

function displayListsInit() {
  const filtersButton = document.querySelectorAll("#filters .filter-button");
  let ingredientobj = {};
  let applianceobj = {};
  let ustensilobj = {};
  ingredientobj.isFilterOpen = false;
  applianceobj.isFilterOpen = false;
  ustensilobj.isFilterOpen = false;

  filtersButton.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const targetFilter = e.target.className;

      ingredientobj.content = document.querySelector(".ingredients-content");
      ingredientobj.input = document.querySelector(".ingredients-input");

      applianceobj.content = document.querySelector(".appliances-content");
      applianceobj.input = document.querySelector(".appliances-input");

      ustensilobj.content = document.querySelector(".ustensils-content");
      ustensilobj.input = document.querySelector(".ustensils-input");

      displayLists(
        ingredientobj,
        [ingredientobj, applianceobj, ustensilobj],
        "ingredients",
        targetFilter
      );

      displayLists(
        applianceobj,
        [ingredientobj, applianceobj, ustensilobj],
        "appliances",
        targetFilter
      );
      displayLists(
        ustensilobj,
        [ingredientobj, applianceobj, ustensilobj],
        "ustensils",
        targetFilter
      );
    });
  });
}

export { init, createFiltersLists, searchOnFiltersList };
