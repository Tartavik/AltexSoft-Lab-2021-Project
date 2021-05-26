import {arrSliderText} from './sliderText'
const containerHeaderMenu = document.getElementsByClassName(
  "containerHeaderMenu"
)[0];
const gamburgerContainer =
  document.getElementsByClassName("gamburgerContainer")[0];
const gamburger = document.getElementsByClassName("gamburger")[0];
const headerMenu = document.getElementsByClassName("headerMenu")[0];
const anchors = document.querySelectorAll('a[href^="#head"');
const tabs = document.getElementsByClassName("tabs")[0];
const accordContainer = document.getElementsByClassName("accordContainer");
const number = document.getElementById("number");
const accordText = document.getElementById("accordText");
const accordion = document.getElementById("accordion");
const headAccordionFaqs = document.getElementsByClassName("headAccordionFaqs");
let sticky = tabs.offsetTop;
let linkPageYOffset = {
  headTips: document.getElementById("headTips").offsetTop,
  headGlossary: document.getElementById("headGlossary").offsetTop,
  headFAQs: document.getElementById("headFAQs").offsetTop,
};
console.log('arrSliderText');

gamburgerContainer.addEventListener("click", () => {
  containerHeaderMenu.classList.toggle("none");
  gamburger.classList.toggle("gamburgerIcon");
  gamburger.classList.toggle("backIcon");
  document.body.classList.toggle("overflow");
});

createAccordionTop(accordContainer);
createAccordionBottom(headAccordionFaqs);

function createAccordionTop(acc) {
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", (e) => {
      let panel = e.currentTarget.children[1];
      e.currentTarget.children[0].children[2].classList.toggle(
        "accordionActive"
      );
      e.currentTarget.children[0].children[2].classList.toggle("accordion");
      e.currentTarget.children[0].children[0].classList.toggle("none");
      e.currentTarget.children[0].children[1].classList.toggle(
        "accordTextActive"
      );
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

function createAccordionBottom(acc) {
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", (e) => {
      let panel = e.currentTarget.nextElementSibling;
      e.currentTarget.children[2].classList.toggle("rotate");
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    for (let link of anchors) {
      link.classList.remove("currentTabsLink");
    }
    e.currentTarget.classList.add("currentTabsLink");

    const blockID = anchor.getAttribute("href").substr(1);
    console.log(anchor.getAttribute("href"));
    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
      alignToTop: false,
    });
  });
}

for (let i = 0; i < headerMenu.children.length; i++) {
  headerMenu.children[i].addEventListener("click", (e) => {
    for (let j = 0; j < headerMenu.children.length; j++) {
      headerMenu.children[j].classList.remove("currentLink");
    }
    e.currentTarget.classList.add("currentLink");
  });
}

window.onscroll = () => {
  myFunction();
  currentTabsLink();
};

function myFunction() {
  if (window.pageYOffset >= sticky) {
    tabs.classList.add("sticky");
  } else {
    tabs.classList.remove("sticky");
  }
}

function currentTabsLink() {
  let pageYOffset = window.pageYOffset;
  let currentLink;
  if (pageYOffset < linkPageYOffset.headGlossary - 30) {
    currentLink = headTips.id;
  } else if (pageYOffset < linkPageYOffset.headFAQs - 30) {
    currentLink = headGlossary.id;
  } else if (pageYOffset > linkPageYOffset.headFAQs - 30) {
    currentLink = headFAQs.id;
  }
  for (let link of anchors) {
    if (currentLink === link.classList[0]) {
      link.classList.add("currentTabsLink");
    } else {
      link.classList.remove("currentTabsLink");
    }
  }
}
