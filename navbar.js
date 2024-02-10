document.addEventListener('DOMContentLoaded', function () {
    var menuIcon = document.querySelector('.menu-icon');
    var navbarLinks = document.querySelector('.navbar-links');

    menuIcon.addEventListener('click', function () {
        navbarLinks.style.display = 'block'
    });
    const exitMenu = document.querySelector(".exit-menu")
    exitMenu.addEventListener("click", () => {
        navbarLinks.style.display = "none"
    })


    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';
});
