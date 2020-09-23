function writeAge() {

    yearOfBirth = 1997
    actualYear = new Date().getFullYear()

    actualAge = actualYear - yearOfBirth

    document.getElementById("age").innerHTML = actualAge
}

window.addEventListener('load', function() {
    writeAge();
})