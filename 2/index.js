const containerHeaderMenu = document.getElementsByClassName(
  "container-header-menu"
)[0];
const hamburgerContainer = document.getElementsByClassName(
  "hamburger-container"
)[0];
const hamburger = document.getElementsByClassName("hamburger-icon")[0];
const headerMenu = document.getElementsByClassName("header-menu")[0];
hamburgerContainer.addEventListener("click", () => {
  containerHeaderMenu.classList.toggle("none");
  hamburger.classList.toggle("hamburger-icon");
  hamburger.classList.toggle("back-icon");
  document.body.classList.toggle("is-hide");
});

for (let i = 0; i < headerMenu.children.length; i++) {
  headerMenu.children[i].addEventListener("click", (e) => {
    for (let j = 0; j < headerMenu.children.length; j++) {
      headerMenu.children[j].classList.remove("active-link");
    }
    e.currentTarget.classList.add("active-link");
  });
}

const skoutSA = document.getElementsByClassName("skout-sa")[0];
const aboutSkout = document.getElementsByClassName("about-skout")[0];
const buttonAboutSkout = document.getElementsByClassName(
  "buttons-about-skout"
)[0];
const aboutSkoutContainer = document.getElementsByClassName(
  "about-skout-container"
)[0];

if (window.screen.width >= 768) {
  window.onscroll = () => {
    if (
      window.pageYOffset >=
      aboutSkoutContainer.offsetTop - window.screen.height / 3
    ) {
      skoutSA.style.opacity = 1;
      setTimeout(() => {
        aboutSkout.style.opacity = 1;
        buttonAboutSkout.style.opacity = 1;
      }, 700);
    }

    let nextCurrentPageYOffset = window.pageYOffset;
    if (currentPageYOffset > nextCurrentPageYOffset) {
      showHeaderInnerStickyMenu();
    } else {
      headerInner.classList.remove("sticky-main");
    }

    currentPageYOffset = nextCurrentPageYOffset;
  };
} else {
  skoutSA.style.opacity = 1;
  aboutSkout.style.opacity = 1;
  buttonAboutSkout.style.opacity = 1;
}

$(document).ready(function () {
  $(".big-slider").slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 30000,
    mobileFirst: true,
    appendDots: $(".container-dots"),
  });
  $(".cards-slider").slick({
    arrows: false,
    infinite: true,
    variableWidth: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          variableWidth: false,
          slidesToShow: 4,
        },
      },
    ],
  });
  $(".main-double-slaider").slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 15000,
    asNavFor: ".secondary-double-slaider",
  });
  $(".secondary-double-slaider").slick({
    arrows: false,
    slidesToShow: 3,
    centerPadding: '0px',
    mobileFirst: true,
    asNavFor: ".main-double-slaider",
    dots: false,
    focusOnSelect: true,
    touchMove: false,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          slidesToShow: 5,
          centerMode: true,
        },

        breakpoint: 767,
        settings: {
          slidesToShow: 5,
          centerMode: true,
        },
      },
    ],
  });
});

const headerInner = document.getElementsByClassName("header-inner")[0];
const emptyElement = document.getElementsByClassName("empty-element")[0];
const container = document.getElementsByClassName('container')[0];
let stickyMain = headerInner.offsetTop;
let currentPageYOffset = window.pageYOffset;

function showHeaderInnerStickyMenu() {
  if (window.pageYOffset >= stickyMain + 10 && window.screen.width >= 1440) {
    headerInner.classList.add("sticky-main");
    container.style.paddingTop = '78px';
    emptyElement.classList.remove("none");
  } else {
    headerInner.classList.remove("sticky-main");
    emptyElement.classList.add("none");
  }
}
