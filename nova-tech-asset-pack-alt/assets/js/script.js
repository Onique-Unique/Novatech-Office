'use strict';

// Cookie Settings
document.cookie = "AC-C=ac-c;expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/;SameSite=None;Secure";

/** * add event on element */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/** * navbar toggle */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/** * header active */

// const header = document.querySelector("[data-header]");

// const activeHeader = function () {
//   if (window.scrollY > 300) {
//     header.classList.add("active");
//   } else {
//     header.classList.remove("active");
//   }
// }

// addEventOnElem(window, "scroll", activeHeader);

/** * toggle active on add to fav */

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);

/** * scroll revreal effect */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);

const shareBtn = document.getElementById("share-btn");
function shareList() {
    if (navigator.canShare) {
        navigator.share({
            title: "NOVATECH OFFICE",
            text: "Novatech Office is the easiest and fastest way to keep your investments on track to make your money grow.",
            url: window.location.href,
        });
    } else {
        // Desktop Functionality
    }
};

shareBtn.addEventListener("click", () => {
    shareList();
});

// Forex Widget Inject
window.addEventListener("load", () => {
  const forexWidget = document.createElement("script");
  forexWidget.type = "text/javascript";
  forexWidget.async = true;
  forexWidget.src = "https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js";
  forexWidget.innerHTML = `{ "width": "100%", "height": "550", "currencies": [ "EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD", "CNY" ], "isTransparent": false, "colorTheme": "light", "locale": "en" }`;
  document.querySelector(".tradingview-widget-container").appendChild(forexWidget);
});