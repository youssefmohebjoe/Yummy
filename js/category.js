
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

getCategory()

async function getCategory() {
    let rsponse = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    let data = await rsponse.json();
    displayCategory(data)
}
let meals;
let check = false;
let mealName
let cartona = ``
function displayCategory(data) {

    for (let i = 0; i < data.categories.length; i++) {
        cartona += `
         <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2">
                <img src=${data.categories[i].strCategoryThumb} class="w-100" alt="meal"/>
                <div class="meal-layer position-absolute text-black text-center p-2">
                    <h3>${data.categories[i].strCategory}</h3>
                    <p>${data.categories[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
        `
    }
    document.getElementById("rowData").innerHTML = cartona;
    meals = document.querySelectorAll(".meal")
    if (document.getElementById("rowData").innerHTML !== '') {
        check = true
    }
}

async function init() {
    await getCategory();
    if (check) {
        for (let j = 0; j < meals.length; j++) {
            meals[j].addEventListener("click", function (e) {
                mealName = this.querySelector("h3").innerHTML;
                filterCategory(mealName);

            });
        }
    }
}
init();

async function filterCategory(Mealname) {
    document.querySelector("#rowData").innerHTML = `
      <div class="vh-100 d-flex justify-content-center align-items-center">
            <span class="loader"></span>
        </div>
    `
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Mealname}`)
    let data = await response.json()
    displayFilter(data)
}
function displayFilter(data) {
    let box = ``
    for (let i = 0; i < data.meals.length; i++) {
        box += `
     <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2">
                <img src=${data.meals[i].strMealThumb} class="w-100" alt="meal"/>
                <div class="meal-layer position-absolute text-black d-flex align-items-center p-2">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
    `
        document.querySelector("#rowData").innerHTML = box
        let meals = document.querySelectorAll("#rowData .col-md-3");
        for (let i = 0; i < meals.length; i++) {
            meals[i].addEventListener("click", async function () {
                let id = data.meals[i].idMeal;
                getDetails(id);
            })
        }
    }
}
async function getDetails(id) {
    document.querySelector("#rowData").innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-center">
          <span class="loader"></span>
      </div>
  `
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        showDetails(data);
    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}
function showDetails(data) {

    let meal = data.meals[0];
    let cartona = `
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
                ${meal.strMeasure1 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure1} ${meal.strIngredient1}</li>` : ''}
                ${meal.strMeasure2 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure2} ${meal.strIngredient2}</li>` : ''}
                ${meal.strMeasure3 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure3} ${meal.strIngredient3}</li>` : ''}
                ${meal.strMeasure4 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure4} ${meal.strIngredient4}</li>` : ''}
                ${meal.strMeasure5 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure5} ${meal.strIngredient5}</li>` : ''}
                ${meal.strMeasure6 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure6} ${meal.strIngredient6}</li>` : ''}
                ${meal.strMeasure7 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure7} ${meal.strIngredient7}</li>` : ''}
                ${meal.strMeasure8 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure8} ${meal.strIngredient8}</li>` : ''}
                ${meal.strMeasure9 ? `<li class="alert alert-info m-2 p-1">${meal.strMeasure9} ${meal.strIngredient9}</li>` : ''}
            </ul>
            <h3>Tags :</h3>
             <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${meal.strArea}</li>
                </ul>
            <a target="_blank" href=${meal.strSource} class="btn btn-success">Source</a>
            <a target="_blank" href=${meal.strYoutube} class="btn btn-danger">Youtube</a>
        </div>
    `;
    document.querySelector("#rowData").innerHTML = cartona;
}