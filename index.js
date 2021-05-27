import { arrSliderText } from "./sliderText.js";
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
const headAccordionFaqs = document.getElementsByClassName("headAccordionFaqs");
const sliderP = document.getElementsByClassName("sliderP")[0];
const sliderSpan = document.getElementsByClassName("sliderSpan")[0];
const sliderButton = document.getElementsByClassName("sliderButton");
const headerInner = document.getElementsByClassName('headerInner')[0];
let sliderHead = document.getElementsByClassName("sliderHead")[0];
let newArrSliderText =
  screen.width >= 1440 ? arrSliderText.slice() : arrSliderText.slice(0, 5);
let sticky = tabs.offsetTop;
let stickyMain = headerInner.offsetTop;
let currentSlider = 0;
let previousPageYOffset = 0;
let linkPageYOffset = {
  headTips: document.getElementById("headTips").offsetTop,
  headGlossary: document.getElementById("headGlossary").offsetTop,
  headFAQs: document.getElementById("headFAQs").offsetTop,
};
createAccordionTop(accordContainer);
createAccordionBottom(headAccordionFaqs);
createSliderClick(newArrSliderText);

function createSliderClick(arr) {
  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement("div");
    let span = document.createElement("span");
    span.innerText = arr[i].name;
    div.classList.add("sliderItem");
    div.appendChild(span);
    sliderHead.appendChild(div);
    div.addEventListener("click", changeSliderText);
    if (i === currentSlider) {
      div.classList.add("activeSliderLink");
    }
  }
}

function changeSliderText() {
  Array.from(sliderHead.children).forEach((slider) => {
    slider.classList.remove("activeSliderLink");
  });
  newArrSliderText.forEach((slider, i) => {
    if (this.children[0].innerText === slider.name) {
      sliderHead.children[i].classList.add("activeSliderLink");
      currentSlider = i;
      console.log(currentSlider);
      sliderP.innerText = slider.name;
      sliderSpan.innerText = slider.text;
    }
  });
}

function changeSliderTextArrow() {
  let nextNumber = this.value === "right" ? 1 : -1;
  currentSlider += nextNumber;
  if (currentSlider + nextNumber > newArrSliderText.length) {
    currentSlider = 0;
  }
  if (currentSlider === -1) {
    currentSlider = newArrSliderText.length - 1;
  }
  sliderP.innerText = newArrSliderText[currentSlider].name;
  sliderSpan.innerText = newArrSliderText[currentSlider].text;
  Array.from(sliderHead.children).forEach((slider) => {
    slider.classList.remove("activeSliderLink");
  });
  sliderHead.children[currentSlider].classList.add("activeSliderLink");
}

for (let i = 0; i < sliderButton.length; i++) {
  sliderButton[i].addEventListener("click", changeSliderTextArrow);
}

gamburgerContainer.addEventListener("click", () => {
  containerHeaderMenu.classList.toggle("none");
  gamburger.classList.toggle("gamburgerIcon");
  gamburger.classList.toggle("backIcon");
  document.body.classList.toggle("overflow");
});

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
  let currentPageYOffset = window.pageYOffset;
  if (currentPageYOffset < previousPageYOffset) {
    showTabsStickyMenu();
    showHeaderInnerStickyMenu();
  } else {
    tabs.classList.remove("sticky");
    headerInner.classList.remove("stickyMain");
  }
  previousPageYOffset = currentPageYOffset;
  currentTabsLink();
};

function showTabsStickyMenu() {
  if (window.pageYOffset >= sticky) {
    tabs.classList.add("sticky");
  } else {
    tabs.classList.remove("sticky");
  }
}

function showHeaderInnerStickyMenu(){
  if (window.pageYOffset >= stickyMain + 10) {
    headerInner.classList.add("stickyMain");
  } else {
    headerInner.classList.remove("stickyMain");
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
