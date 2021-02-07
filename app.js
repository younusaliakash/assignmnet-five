function getResult() {
  const searchMeal = document.getElementById("search-input").value;
  document.getElementById("search-result").innerHTML = " ";
  document.getElementById("food-details").innerHTML = " ";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals === null) {
        const alert = document.getElementById("alert");
        alert.style.display = "block";
      } else {
        const alert = document.getElementById("alert");
        alert.style.display = "none";
        mealsName(data);
      }
    });
}

const mealsName = (mealNamelist) => {
  const showResult = document.getElementById("search-result");
  const mealNames = mealNamelist.meals;
  mealNames.forEach((foodinfo) => {
    const foodName = foodinfo.strMeal;
    const foodPicture = foodinfo.strMealThumb;
    const foodTitle = document.createElement("div");
    foodTitle.className = "food-view-card";
    foodTitle.innerHTML = `<div onclick="getDetail('${foodName}')">
            <div class="food-image">
                <img src="${foodPicture}"/>
            </div>
            <h5>${foodName}</h5>
        </div>`;
    showResult.appendChild(foodTitle);
  });
};

const getDetail = (name) => {
  document.getElementById("food-details").innerHTML = " ";
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      foodDetails(data);
    });
};

const foodDetails = (food) => {
  const singleFood = food.meals[0];
  const foodDetails = document.getElementById("food-details");
  const detalisCard = document.createElement("div");
  detalisCard.className = "food-detalis-card";
  detalisCard.innerHTML = `
    <div class="detail-img">
        <img src="${singleFood.strMealThumb}"/>
    </div>
    <h3>${singleFood.strMeal}</h3>
    <h4>Ingredient</h4>
    <ul class="Ingredient-item">
        <li class="ingredient"> <i class="fas fa-check-square ckeck"></i>
        ${singleFood.strMeasure1} ${singleFood.strIngredient1}
        </li>
        <li class="ingredient"> <i class="fas fa-check-square ckeck"></i>
        ${singleFood.strMeasure2} ${singleFood.strIngredient2}
        </li>
        <li class="ingredient"> <i class="fas fa-check-square ckeck"></i>
        ${singleFood.strMeasure3} ${singleFood.strIngredient3}
        </li>
        <li class="ingredient"> <i class="fas fa-check-square ckeck"></i>
        ${singleFood.strMeasure4} ${singleFood.strIngredient4}
        </li>
        <li class="ingredient"> <i class="fas fa-check-square ckeck"></i>
        ${singleFood.strMeasure5} ${singleFood.strIngredient5}
        </li>
    </ul`;
  foodDetails.appendChild(detalisCard);
};

