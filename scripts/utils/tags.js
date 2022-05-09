import { displayRecipes, generateFiltersLists } from "../main.js";

let tagsArray = [];

function createTag(item) {
  const tag = document.createElement("div");
  tag.className = "tag-item";
  const text = document.createElement("span");
  text.className = "text";
  text.innerHTML = item;
  const closeBtn = document.createElement("img");
  closeBtn.className = "closebtn";
  closeBtn.src = "./images/close.svg";
  closeBtn.setAttribute("data-item", item);

  tag.appendChild(text);
  tag.appendChild(closeBtn);
  return tag;
}

function resetTags() {
  document.querySelectorAll(".tag-item").forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

// Afficher la liste des Tags
function addTags() {
  resetTags();
  const researchTag = document.querySelector(".research-tag");
  tagsArray.forEach(function (tag) {
    const input = createTag(tag);
    researchTag.appendChild(input);
  });
}

// Afficher la séléction des Tags
function displayTags(recipesList) {
  let listItems = document.querySelectorAll(".list-item");
  listItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      const selectItem = e.target.innerHTML;
      if (!tagsArray.includes(selectItem)) {
        tagsArray.push(selectItem);
      }
      addTags();
      displayByTagSearch(recipesList);
    });
  });
}

// Supprimer un Tag
function removeTags(recipesList) {
  document.addEventListener("click", function (e) {
    if (e.target.className === "closebtn") {
      const value = e.target.getAttribute("data-item");
      const index = tagsArray.indexOf(value);
      tagsArray = [...tagsArray.slice(0, index), ...tagsArray.slice(index + 1)];
      addTags();
      displayByTagSearch(recipesList);
    }
  });
}

// Filter les recettes par Tags
function displayByTagSearch(recipesList) {
  const recipesSection = document.getElementById("recipes");
  const tags = document.querySelectorAll(".tag-item");
  const filters = Array.from(tags);
  const filteredFilters = recipesList.filter((recipe) => {
    return filters.every((item) => {
      const formatedItem = item.textContent;
      return (
        recipe.ingredients.some((i) => {
          return i.ingredient.includes(formatedItem);
        }) ||
        recipe.appliance.includes(formatedItem) ||
        recipe.ustensils.some((ustensil) => {
          return ustensil === formatedItem;
        })
      );
    });
  });
  if (filteredFilters.length) {
    recipesSection.innerHTML = "";
    displayRecipes(filteredFilters);
    generateFiltersLists(filteredFilters);
  }
}

export { displayTags, removeTags, resetTags };
