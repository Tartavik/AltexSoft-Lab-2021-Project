import { arrSliderText } from './sliderText.js';

const containerHeaderMenu = document.querySelector('.container-header-menu');
const hamburgerContainer = document.querySelector('.hamburger-container');
const hamburger = document.querySelector('.hamburger-icon');
const headerMenu = document.querySelector('.header-menu');
const anchors = document.querySelectorAll('a[href^="#head"');
const tabs = document.querySelector('.tabs');
const accordContainer = document.getElementsByClassName('accord-container');
const headAccordion = document.getElementsByClassName('head-accordion');
const headAccordionFaqs = document.getElementsByClassName('head-accordion-Faqs');
const container = document.querySelector('.container');
const sliderTitle = document.querySelector('.slider-title');
const sliderSpan = document.querySelector('.slider-span');
const sliderButton = document.getElementsByClassName('slider-button');
const headerInner = document.querySelector('.header-inner');
let sliderHead = document.querySelector('.slider-head');
let newArrSliderText;
let sticky = tabs.offsetTop;
let stickyMain = headerInner.offsetTop;
let currentSlider = 0;
let linkPageYOffset = {
  headTips: document.getElementById('head-tips'),
  headGlossary: document.getElementById('head-glossary'),
  headFAQs: document.getElementById('head-FAQs'),
};
createAccordionTop(headAccordion);
createAccordionBottom(headAccordionFaqs);
createSliderClick(arrSliderText);

window.addEventListener(`resize`,(event) => {
    sticky = tabs.offsetTop;
    createSliderClick(arrSliderText);
  },
  false
);

function createSliderClick(arr) {
  newArrSliderText = screen.width >= 1440 ? arr.slice() : arr.slice(0, 5);
  sliderHead.innerHTML = '';
  for (let i = 0; i < newArrSliderText.length; i++) {
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = newArrSliderText[i].name;
    div.classList.add('slider-item');
    span.classList.add('slider-item-text');
    div.appendChild(span);
    sliderHead.appendChild(div);
    div.addEventListener('click', changeSliderText);
    if (i === currentSlider) {
      div.classList.add('active-slider-link');
    }
  }
}

function changeSliderText() {
  Array.from(sliderHead.children).forEach((slider) => {
    slider.classList.remove('active-slider-link');
  });
  newArrSliderText.forEach((slider, i) => {
    if (this.children[0].innerText === slider.name) {
      sliderHead.children[i].classList.add('active-slider-link');
      currentSlider = i;
      sliderTitle.innerText = slider.name;
      sliderSpan.innerText = slider.text;
    }
  });
}

function changeSliderTextArrow() {
  let nextNumber = this.value === 'right' ? 1 : -1;
  currentSlider += nextNumber;
  if (currentSlider + nextNumber > newArrSliderText.length) {
    currentSlider = 0;
  }
  if (currentSlider === -1) {
    currentSlider = newArrSliderText.length - 1;
  }
  sliderTitle.innerText = newArrSliderText[currentSlider].name;
  sliderSpan.innerText = newArrSliderText[currentSlider].text;
  Array.from(sliderHead.children).forEach((slider) => {
    slider.classList.remove('active-slider-link');
  });
  sliderHead.children[currentSlider].classList.add('active-slider-link');
}

for (let i = 0; i < sliderButton.length; i++) {
  sliderButton[i].addEventListener('click', changeSliderTextArrow);
}

hamburgerContainer.addEventListener('click', () => {
  containerHeaderMenu.classList.toggle('is-none');
  hamburger.classList.toggle('hamburger-icon');
  hamburger.classList.toggle('back-icon');
  document.body.classList.toggle('is-hidden');
});

function createAccordionTop(acc) {
  for (let i = 0; i < accordContainer.length; i++) {
    acc[i].addEventListener('click', (e) => {
      console.log(e.currentTarget.nextElementSibling);
      let panel = e.currentTarget.nextElementSibling;
      e.currentTarget.children[2].classList.toggle('accordion-active');
      e.currentTarget.children[2].classList.toggle('accordion-button');
      e.currentTarget.children[0].classList.toggle('is-none');
      e.currentTarget.children[1].classList.toggle('accord-text-active');
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = 800 + 'px';
      }
    });
  }
}

function createAccordionBottom(acc) {
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', (e) => {
      let panel = e.currentTarget.nextElementSibling;
      console.log(e.currentTarget.children[2]);
      e.currentTarget.children[2].classList.toggle('rotate');
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  }
}

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    for (let link of anchors) {
      link.classList.remove('current-tabs-link');
    }
    e.currentTarget.classList.add('current-tabs-link');

    const blockID = anchor.getAttribute('href').substr(1);
    console.log(anchor.getAttribute('href'));
    document.getElementById(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      alignToTop: false,
    });
  });
}

for (let i = 0; i < headerMenu.children.length; i++) {
  headerMenu.children[i].addEventListener('click', (e) => {
    for (let j = 0; j < headerMenu.children.length; j++) {
      headerMenu.children[j].classList.remove('active-link');
    }
    e.currentTarget.classList.add('active-link');
  });
}

window.onscroll = () => {
  showTabsStickyMenu();
  showheaderInnerStickyMenu();
  currentTabsLink();
};

function showTabsStickyMenu() {
  if (window.pageYOffset >= sticky - 75) {
    tabs.classList.add('sticky');
  } else {
    tabs.classList.remove('sticky');
  }
}
function showheaderInnerStickyMenu() {
  if (window.pageYOffset >= stickyMain + 10 && window.screen.width >= 1200) {
    headerInner.classList.add('sticky-main');
    container.classList.add('added-empty-field');
  } else {
    headerInner.classList.remove('sticky-main');
    container.classList.remove('added-empty-field');
  }
}

function currentTabsLink() {
  let pageYOffset = window.pageYOffset;
  let currentLink;
  if (pageYOffset < linkPageYOffset.headGlossary.offsetTop - 30) {
    currentLink = linkPageYOffset.headTips.id;
  } else if (pageYOffset < linkPageYOffset.headFAQs.offsetTop - 30) {
    currentLink = linkPageYOffset.headGlossary.id;
  } else if (pageYOffset > linkPageYOffset.headFAQs.offsetTop - 30) {
    currentLink = linkPageYOffset.headFAQs.id;
  }
  for (let link of anchors) {
    if (currentLink === link.getAttribute('href').substr(1)) {
      link.classList.add('current-tabs-link');
    } else {
      link.classList.remove('current-tabs-link');
    }
  }
}
