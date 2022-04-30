import { lowerCaseNormalize, displayRecipes, generateFiltersLists } from "../main.js";

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

// prevent redisplaying the entire array list
function resetTags() {
  document.querySelectorAll(".tag-item").forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

// create tags from tag pattern
function addTags() {
  resetTags();
  const researchTag = document.querySelector(".research-tag");
  tagsArray.forEach(function (tag) {
    const input = createTag(tag);
    researchTag.appendChild(input);
  });
}

// display tags, launch function to filter recipes display
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

// remove tags on click
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

// displays the recipes containing the displayed tags
function displayByTagSearch(recipesList) {
  const recipesSection = document.getElementById("recipes");
  const tags = document.querySelectorAll(".tag-item");
  const filters = Array.from(tags);
  const filteredFilters = recipesList.filter((recipe) => {
    return filters.every((item) => {
      const formatedItem = lowerCaseNormalize(item.textContent);
      return (
        recipe.ingredients.some((i) => {
          return lowerCaseNormalize(i.ingredient).includes(formatedItem);
        }) ||
        lowerCaseNormalize(recipe.appliance).includes(formatedItem) ||
        recipe.ustensils.some((ustensil) => {
          return lowerCaseNormalize(ustensil) === formatedItem;
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

export { displayTags, removeTags };
