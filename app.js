const search = document.querySelector("#search");
const searchBar = document.querySelector(".search-bar");
var api_url = "";
const notifier = document.querySelector(".notifier");
const crossBtn = document.querySelector(".cross-btn");
const personalizeBtn = document.querySelector(".personalize-btn");
const recipeList = document.querySelector(".recipe-list");
const recipeItemDesc = document.querySelectorAll(".recipe-item-desc");
const popup = document.querySelector(".popup");
const popupCloseBtn = document.querySelector(".popup-cross-btn");
// const recipeItem = document.querySelectorAll(".recipe-item");
const popupTitle = document.querySelector(".popup-title");
const popupDesc = document.querySelector(".popup-desc");
const categoryItem = document.querySelectorAll(".category-item");

search.addEventListener("click", (e) => {
  searchBar.classList.toggle("visible");
});

crossBtn.addEventListener("click", () => {
  notifier.style.display = "none";
});

personalizeBtn.addEventListener("click", () => {
  console.log("Redirecting...");
  window.location.href = "https://youtube.com";
});

const getDetail = async () => {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data.meals);
  if (data.meals === null) {
    alert("Not found");
    return;
  }
  const meal = data.meals[0];
  console.log(meal);

  let randint = Math.ceil(Math.random() * 50) / 10;
  console.log(randint);

  recipeList.innerHTML = `<li class="recipe-item">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="recipe-item-desc">
                        <h3>${meal.strMeal}</h3>
                        <div class="rating">
                            <i class="fa-solid fa-star"></i>
                            <h4>${randint}</h4>
                        </div>
                    </div>
                </li>`;

  // const mobileContainer = document.querySelector('.mobile-container')

  // mobileContainer.appendChild

  const recipeItemDesc = document.querySelector(".recipe-item-desc");

  recipeItemDesc.addEventListener("click", () => {
    console.log("clicked");
    popup.style.zIndex = 10;
    popup.style.display = "unset";
  });

  popupCloseBtn.addEventListener("click", () => {
    popup.style.display = "none";
    popup.style.zIndex = -10;
  });

  popupTitle.innerHTML = meal.strMeal;
  popupDesc.innerHTML = meal.strInstructions;
};

const searchFunction = () => {
  searchBar.addEventListener("input", (e) => {
    console.log(e.target.value);
    api_url =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + e.target.value;
    console.log(api_url);
    getDetail();
  });
};

categoryItem.forEach((item) => {
  item.addEventListener("click", () => {
    console.log(item.innerText);
    api_url =
      "https://www.themealdb.com/api/json/v1/1/search.php?s=" + item.innerText;
    getDetail();
  });
});

searchFunction();
