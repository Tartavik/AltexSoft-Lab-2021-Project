const containerHeaderMenu = document.getElementsByClassName('containerHeaderMenu')[0];
const gamburgerContainer = document.getElementsByClassName('gamburgerContainer')[0];
const headerMenu = document.getElementsByClassName('headerMenu')[0];
console.log(headerMenu.children);

console.log(containerHeaderMenu);

gamburgerContainer.addEventListener('click',()=>{
    containerHeaderMenu.classList.toggle('none');
});


let acc = document.getElementsByClassName("accordion");
console.log(acc);
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
        });
      }
}


const anchors = document.querySelectorAll('a[href^="#head"');


for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href').substr(1)
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }