document.addEventListener("DOMContentLoaded", function () {
    fetch("../pages/header.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);
        })
        .catch(error => console.error("Error loading header:", error));
});

function toggleMenu() {
    var navMenu = document.getElementById("nav-menu");
    var hamburger = document.querySelector(".hamburger-menu");
    var overlay = document.querySelector(".menu-overlay");

    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
}
