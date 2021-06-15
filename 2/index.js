const containerHeaderMenu = document.querySelector('.container-header-menu');
const hamburger = document.querySelector('.hamburger-icon');
const headerMenu = document.querySelector('.header-menu');
hamburger.addEventListener('click', () => {
  containerHeaderMenu.classList.toggle('none');
  hamburger.classList.toggle('open-menu');
  document.body.classList.toggle('is-hide');
});

for (let i = 0; i < headerMenu.children.length; i++) {
  headerMenu.children[i].children[0].addEventListener('click', e => {
    for (let j = 0; j < headerMenu.children.length; j++) {
      headerMenu.children[j].children[0].classList.remove('active-link');
    }
    e.currentTarget.classList.add('active-link');
  })
}

const skoutSA = document.querySelector('.skout-sa');
const aboutSkout = document.querySelector('.about-skout');
const buttonAboutSkout = document.querySelector('.buttons-about-skout');
const aboutSkoutContainer = document.querySelector('.about-skout-container');

if (window.matchMedia("(min-width: 768px)").matches) {
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
      headerInner.classList.remove('sticky-main');
    }

    currentPageYOffset = nextCurrentPageYOffset;
  };
} else {
  skoutSA.style.opacity = 1;
  aboutSkout.style.opacity = 1;
  buttonAboutSkout.style.opacity = 1;
}

$(document).ready(function () {
  $('.big-slider').slick({
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 30000,
    mobileFirst: true,
    appendDots: $('.container-dots'),
  });
  $('.cards-slider').slick({
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
  $('.main-double-slaider').slick({
    arrows: false,
    autoplay: true,
    autoplaySpeed: 15000,
    asNavFor: '.wrapper-secondary-double-slaider',
  });
  $('.wrapper-secondary-double-slaider').slick({
    arrows: false,
    slidesToShow: 3,
    centerPadding: '0px',
    mobileFirst: true,
    asNavFor: '.main-double-slaider',
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

const headerInner = document.getElementsByClassName('header-inner')[0];
const container = document.getElementsByClassName('container')[0];
let stickyMain = headerInner.offsetTop;
let currentPageYOffset = window.pageYOffset;

function showHeaderInnerStickyMenu() {
  if (window.pageYOffset >= stickyMain + 10 && window.screen.width >= 1440) {
    headerInner.classList.add('sticky-main');
    container.classList.add('added-empty-field');
  } else {
    headerInner.classList.remove('sticky-main');
    container.classList.remove('added-empty-field');
  }
}
