document.addEventListener("DOMContentLoaded", function () {
    fetch("/pages/preloader.html")
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML("afterbegin", data);

            setTimeout(function () {
                document.getElementById("preloader").style.display = "none";
            }, 1800);
        })
        .catch(error => console.error("Error loading preloader:", error));
});
