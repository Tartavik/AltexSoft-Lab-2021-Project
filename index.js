const containerHeaderMenu = document.getElementsByClassName('containerHeaderMenu')[0];
const gamburgerContainer = document.getElementsByClassName('gamburgerContainer')[0];
const gamburger = document.getElementsByClassName('gamburger')[0]
const headerMenu = document.getElementsByClassName('headerMenu')[0];
const anchors = document.querySelectorAll('a[href^="#head"');
const tabs = document.getElementsByClassName("tabs")[0];
const headAccordion = document.getElementsByClassName('headAccordion')[0];
const number = document.getElementById('number');
const accordText = document.getElementById('accordText');
const accordion = document.getElementById('accordion');

let sticky = tabs.offsetTop;

gamburgerContainer.addEventListener('click',()=>{
    containerHeaderMenu.classList.toggle('none');
    gamburger.classList.toggle('gamburgerIcon');
    gamburger.classList.toggle('backIcon');
    document.body.classList.toggle('overflow');
});


let acc = document.getElementsByClassName("accordion");
createAccordion(acc);
function createAccordion(acc){
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click",(e) =>{
          e.currentTarget.classList.toggle("active");
          let panel = e.currentTarget.parentNode.nextElementSibling;
          if (panel.style.maxHeight){
            panel.style.maxHeight = null;
          } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
          }
         
           
          e.currentTarget.parentNode.children[0].classList.toggle('none');
           
        });
      }
}


for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      console.log(anchor.getAttribute('href'));
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        alignToTop: false
      })
    })
  }




  for(let i = 0;i < headerMenu.children.length;i++){
    headerMenu.children[i].addEventListener('click',(e)=>{
      for(let j = 0;j < headerMenu.children.length;j++){  
        headerMenu.children[j].classList.remove('currentLink');
      }
      e.currentTarget.classList.add('currentLink');
    })
  }


window.onscroll = () => {myFunction()};

function myFunction() {
  if (window.pageYOffset >= sticky) {
    tabs.classList.add("sticky")
  } else {
    tabs.classList.remove("sticky");
  }
}