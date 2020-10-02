function writeAge() {

    yearOfBirth = 1997
    actualYear = new Date().getFullYear()

    actualAge = actualYear - yearOfBirth

    document.getElementById("age").innerHTML = actualAge
}

window.addEventListener('load', function() {
    writeAge();
})


/**
 *
 *	Sticky navbar on scroll.
 *
 */
var navbar = $("#navbar");
var navbarContainer = $("#navbar-container");

var header = $("#navbar").offset().top;
var about = $("#about-me").offset().top;

$(window).scroll(function() {
    if ($(this).scrollTop() > header) {
        navbar.addClass("static-top fixed-top container p-2 ");

    } else {
        navbar.removeClass("static-top fixed-top container p-2");
    }

    if ($(this).scrollTop() > about) {
        navbarContainer.addClass("container-fluid bg-secondary");

    } else {
        navbarContainer.removeClass("container-fluid bg-secondary");
    }
});

/*
 *
 *	Url rewrite when clicking an anchor.
 *
 */
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(() => {
            history.pushState('', document.title, window.location.pathname);
        }, 100);
    });
});


$("#buttonProExperience").on("click", function() {
    $("#experience").addClass("d-none")
    $("#pro-experience").removeClass("d-none")

    $("#buttonProExperience").removeClass("title-tab")
    $("#buttonProExperience").addClass("title-tab-active")

    $("#buttonExperience").addClass("title-tab")
    $("#buttonExperience").removeClass("title-tab-active")
    $("#refreshExp").attr("showing", "pro")
    $("#refreshExp").prop('checked', false)




});
$("#buttonExperience").on("click", function() {
    $("#pro-experience").addClass("d-none")
    $("#experience").removeClass("d-none")
    $("#buttonExperience").removeClass("title-tab")
    $("#buttonExperience").addClass("title-tab-active")

    $("#buttonProExperience").addClass("title-tab")
    $("#buttonProExperience").removeClass("title-tab-active")
    $("#refreshExp").attr("showing", "personal")
    $("#refreshExp").prop('checked', true)


});


$("#refreshExp").on("change", function() {
    if (this.getAttribute("showing") == "pro") {
        $("#pro-experience").addClass("d-none")
        $("#experience").removeClass("d-none")

        $("#buttonExperience").removeClass("title-tab")
        $("#buttonExperience").addClass("title-tab-active")
        $("#buttonProExperience").addClass("title-tab")
        $("#buttonProExperience").removeClass("title-tab-active")


        $("#refreshExp").attr("showing", "personal")
        console.log(this)

    } else {
        $("#pro-experience").removeClass("d-none")
        $("#experience").addClass("d-none")

        $("#buttonProExperience").removeClass("title-tab")
        $("#buttonProExperience").addClass("title-tab-active")
        $("#buttonExperience").addClass("title-tab")
        $("#buttonExperience").removeClass("title-tab-active")

        $("#refreshExp").attr("showing", "pro")
        console.log(this)
    }


});