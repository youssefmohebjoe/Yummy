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
// $(document).ready(function() {
let nameInput = $("#nameInput");
let emailInput = $("#emailInput");
let phoneInput = $("#phoneInput");
let ageInput = $("#ageInput");
let passwordInput = $("#passwordInput");
let repasswordInput = $("#repasswordInput");
let repasswordAlert = $("#repasswordAlert");
let submitButton = $("#submitBtn");
let inputs = $("form input:not([id='repasswordInput'])");

const Regex = {
    nameInput: /^[a-z]{3,}$/,
    emailInput: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    phoneInput: /^(\+?2)?01[0125]\d{8}$/,
    ageInput: /^[0-9]{1,2}$/,
    passwordInput: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

function validateInput(input) {
    let id = input.attr('id');
    let isValid = Regex[id].test(input.val());

    if (input.val() !== '' && !isValid) {
        input.next().removeClass("d-none");
    } else {
        input.next().addClass("d-none");
    }
    return isValid;
}

function validateForm() {
    let allValid = true;
    inputs.each(function () {
        if (!validateInput($(this))) {
            allValid = false;
        }
    });
    repasswordInput.on('input', function () {
        if (passwordInput.val() !== repasswordInput.val()) {
            repasswordAlert.removeClass("d-none");
            allValid = false;
        }
        else if (repasswordInput.val() == '') {
            repasswordAlert.addClass("d-none");
        }
        else {
            repasswordAlert.addClass("d-none");
        }
    })

    submitButton.prop("disabled", !allValid);
}

inputs.on('input', function () {
    validateInput($(this));
    validateForm();
});

repasswordInput.on('input', function () {
    validateForm();
});

validateForm();

$("form").on("submit", function (e) {
    e.preventDefault();

});
