const containerHeaderMenu = document.querySelector('.header-menu');
const hamburger = document.querySelector('.hamburger-icon');
const headerMenu = document.querySelector('.header-menu-list');
hamburger.addEventListener('click', () => {
  containerHeaderMenu.classList.toggle('is-show-menu');
  hamburger.classList.toggle('open-menu');
  document.body.classList.toggle('is-hide');
});

window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 1440px)').matches) {
      document.body.classList.remove('is-hide');
    } 
  },false);

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
const buttonAboutSkout = document.querySelector('.about-skout-buttons');
const aboutSkoutContainer = document.querySelector('.about-skout-container');
let currentPageYOffset = window.pageYOffset;

  if (window.matchMedia('(max-width: 768px)').matches) { 
    skoutSA.style.opacity = 1;
    aboutSkout.style.opacity = 1;
    buttonAboutSkout.style.opacity = 1;
  } 

  window.addEventListener('scroll', () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      if (window.pageYOffset >= aboutSkoutContainer.offsetTop - window.screen.height / 3) {
        skoutSA.style.opacity = 1;
        setTimeout(() => {
          aboutSkout.style.opacity = 1;
          buttonAboutSkout.style.opacity = 1;
        }, 700);
      }
      let nextCurrentPageYOffset = window.pageYOffset;
      const headerInner = document.getElementsByClassName('header-inner')[0];
      const header = document.querySelector('.header');
      let stickyMain = headerInner.offsetTop;

      if (currentPageYOffset > nextCurrentPageYOffset) {
        if (window.pageYOffset >= stickyMain + 10 && window.innerWidth >= 1440) {
          headerInner.classList.add('sticky-main');
          header.classList.add('added-empty-field');
        } else {
          headerInner.classList.remove('sticky-main');
          header.classList.remove('added-empty-field');
        }  
      } else {
        headerInner.classList.remove('sticky-main');
        header.classList.remove('added-empty-field');
      }
      currentPageYOffset = nextCurrentPageYOffset;
    } 
  });


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
    centerMode: true,
    responsive: [
      {
        breakpoint: 1439,
        settings: {
          variableWidth: false,
          slidesToShow: 4
        }
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
        breakpoint: 767,
        settings: {
          slidesToShow: 5,
          centerMode: true,
        }
      },
      {  
        breakpoint: 1439,
        settings: {
          slidesToShow: 5,
          centerMode: true,
        }
      },
    ],
  });
});

