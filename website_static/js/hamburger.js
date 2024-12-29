function hamburger() {
    var nav = document.querySelector("nav");
    var btnToggleNav = document.querySelector(".hamburger-menu");

    if (event.type === 'click' ||(event.type === 'keydown' && event.keyCode === 13)){
        nav.classList.toggle("active");
        btnToggleNav.classList.toggle("active");
    }
}