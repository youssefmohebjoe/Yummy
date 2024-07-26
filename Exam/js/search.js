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
let byLrtter = document.querySelector(".Byletter");
let box = ``
async function getDataByLetter(letter) {
    document.querySelector("#searchData").innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-centers">
            <span class="loader"></span>
        </div>
    `
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    let data = await response.json();
    displayDataByLetter(data);
}

function displayDataByLetter(data) {
    for (let i = 0; i < data.meals.length; i++) {
        box += `
            <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${data.meals[i].strMealThumb}" alt="meal">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${data.meals[i].strMeal}</h3>
                    </div>
                </div>
            </div>
            `;
    }
    document.querySelector("#searchData").innerHTML = box;
    let meals = document.querySelectorAll("#searchData .col-md-3");
    for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
            let id = data.meals[i].idMeal;
            getSearchMealDetails(id)
        })
    }
}
async function getSearchMealDetails(id) {
    document.querySelector("#searchData").innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-center">
          <span class="loader"></span>
      </div>
  `
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await response.json();
        showSearchMealDetails(data)

    } catch (error) {
        console.error('Error fetching meal details:', error);
    }
}
function showSearchMealDetails(data) {

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
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${meal.strArea}</li>
                </ul>
            <a target="_blank" href=${meal.strSource} class="btn btn-success">Source</a>
            <a target="_blank" href=${meal.strYoutube} class="btn btn-danger">Youtube</a>
        </div>
    `;
    document.querySelector("#searchData").innerHTML = content;
}
byLrtter.addEventListener("keypress", function (e) {
    getDataByLetter(e.key);
})
let byName = document.querySelector(".ByName")
async function getDataByName(Name) {
    document.querySelector("#searchData").innerHTML = `
    <div class="vh-100 d-flex justify-content-center align-items-centers">
            <span class="loader"></span>
        </div>
    `
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
    let data = await response.json();
    displayDataByName(data);
}
function displayDataByName(data) {
    let zer = ``
    for (let i = 0; i < data.meals.length; i++) {
        zer += `
        <div class="col-md-3">
            <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${data.meals[i].strMealThumb}" alt="meal">
                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                    <h3>${data.meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `;
    }
    document.querySelector("#searchData").innerHTML = zer;
    let meals = document.querySelectorAll("#searchData .col-md-3");
    for (let i = 0; i < meals.length; i++) {
        meals[i].addEventListener("click", async function () {
            let id = data.meals[i].idMeal;
            getSearchMealDetails(id)
        })
    }
}
byName.addEventListener("input", function (e) {
    let Name = e.target.value;
    getDataByName(Name)
})



