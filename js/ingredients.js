$(".toggleIcon i").on("click", function () {
    if ($(".toggleIcon i").attr("class") == "fa-solid open-close-icon fa-2x fa-align-justify") {
        $(".toggleIcon i").attr("class", "fa-solid open-close-icon fa-2x fa-x fa-align-justify")
        $(".side-nav-menu").css("left", "0")
        $(".side-nav-menu").css("transition", "left 0.5s ease-in")
        $(".links ul li a").animate({ top: "0" }, 1000)
    }
    else {
        $(".toggleIcon i").attr("class", "fa-solid open-close-icon fa-2x fa-align-justify")
        $(".side-nav-menu").css("left", "-256.562px")
        $(".links ul li a").animate({ top: "300px" }, 1000)
    }
})
async function getIngredients() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json()
    let newArr = data.meals.slice(0, 20)
    displayIngredients(newArr);
}
getIngredients()

function displayIngredients(data) {
    let cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `
          <div class="col-md-3 text-white mouse">
                <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `
    }
    document.getElementById("IngredientData").innerHTML = cartona;
    let meals = document.querySelectorAll("#IngredientData .col-md-3");
    for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
            let IngNam = data[i].strIngredient;
            getIngredientMeals(IngNam);

        })
    }
}
async function getIngredientMeals(IngName) {
    document.querySelector("#IngredientData").innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-center">
          <span class="loader"></span>
      </div>
  `
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${IngName}`)
    let data = await response.json()
    dislayAreasMeals(data)
}
function dislayAreasMeals(data) {
    let content = ``
    for (let i = 0; i < data.meals.length; i++) {
        content += `
      <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2">
                <img src=${data.meals[i].strMealThumb} class="w-100" alt="meal"/>
                <div class="meal-layer position-absolute text-black d-flex align-items-center p-2">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
    `
    }
    document.querySelector("#IngredientData").innerHTML = content;
    let meals = document.querySelectorAll("#IngredientData .col-md-3");
    for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
            let id = data.meals[i].idMeal;
            getAreaMealDetails(id)
        })
    }
}
async function getAreaMealDetails(id) {
    document.querySelector("#IngredientData").innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-center">
          <span class="loader"></span>
      </div>
  `
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        showIngMealDetails(data)

    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}
function showIngMealDetails(data) {

    let meal = data.meals[0];
    let content = `
        <div class="col-md-4">
            <img src="${meal.strMealThumb}" class="w-100" alt="details-meal" />
            <h3 class="text-white mt-2">${meal.strMeal}</h3>
        </div>
        <div class="col-md-8 text-white details-content">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
            <h2>Area: ${meal.strArea}</h2>
            <h2>Category: ${meal.strCategory}</h2>
            <h2>Recipes</h2>
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${meal.strMeasure1 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure1} ${meal.strIngredient1}</li>` : `<p> </p>`}
                ${meal.strMeasure2 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure2} ${meal.strIngredient2}</li>` : `<p> </p>`}
                ${meal.strMeasure3 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure3} ${meal.strIngredient3}</li>` : `<p> </p>`}
                ${meal.strMeasure4 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure4} ${meal.strIngredient4}</li>` : `<p> </p>`}
                ${meal.strMeasure5 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure5} ${meal.strIngredient5}</li>` : `<p> </p>`}
                ${meal.strMeasure6 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure6} ${meal.strIngredient6}</li>` : `<p> </p>`}
                ${meal.strMeasure7 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure7} ${meal.strIngredient7}</li>` : `<p> </p>`}
                ${meal.strMeasure8 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure8} ${meal.strIngredient8}</li>` : `<p> </p>`}
                ${meal.strMeasure9 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure9} ${meal.strIngredient9}</li>` : `<p> </p>`}
            </ul>
            <h3>Tags :</h3>
            <a target="_blank" href=${meal.strSource} class="btn btn-success">Source</a>
            <a target="_blank" href=${meal.strYoutube} class="btn btn-danger">Youtube</a>
        </div>
    `;
    document.querySelector("#IngredientData").innerHTML = content;
}