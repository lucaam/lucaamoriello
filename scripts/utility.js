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


$("#buttonProExperience").click(function() {
    $("#experience").addClass("d-none")
    $("#pro-experience").removeClass("d-none")
    $("#buttonExperience").removeClass("disable-pointer")
    $("#buttonProExperience").addClass("disable-pointer")

});
$("#buttonExperience").click(function() {
    $("#pro-experience").addClass("d-none")
    $("#experience").removeClass("d-none")
    $("#buttonProExperience").removeClass("disable-pointer")
    $("#buttonExperience").addClass("disable-pointer")


});