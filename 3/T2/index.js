const dominoUp = document.getElementById('domino-up');
const dominoDown = document.getElementById('domino-down');
const buttonStart = document.getElementById('start');
const buttonRandom = document.getElementById('random');
const dominoContainer = document.getElementsByClassName('domino-container')[0];
const resultEl = document.getElementsByClassName('result')[0];

let arrDominoUp = [];
let arrDominoDown = [];
let rangeNumbers = {
    min: 1,
    max: 6,
    maxLength: 6
};
startPreparation();

dominoUp.addEventListener('blur',(e) =>{
    if(+e.currentTarget.value.length === rangeNumbers.maxLength){
        arrDominoUp = Array.from(e.currentTarget.value);
        drawDomino(arrDominoUp,arrDominoDown);
    }else{
        alert('Please in domino must be by ' + rangeNumbers.maxLength)
    }
})

dominoDown.addEventListener('blur',(e) =>{
    if(+e.currentTarget.value.length === rangeNumbers.maxLength){
        arrDominoDown = Array.from(e.currentTarget.value);
        drawDomino(arrDominoUp,arrDominoDown);
    }else{
        alert('Please in domino must be by ' + rangeNumbers.maxLength)
    }
})


buttonStart.addEventListener('click',()=>{
    let appropriateNumbers = findAppropriateNumbers(dominoUp.value + dominoDown.value);
    let arrAppropriateDoableNumbers = сheckOnQuantityAppropriateNumbers(appropriateNumbers);
    if(arrAppropriateDoableNumbers.length > 0){
        let result = rotateSomeNumbers(arrAppropriateDoableNumbers);
        drawDomino(result.topArr,result.bottomArr);
        drawResult(result.line,result.change);
        resultEl.classList.remove('is-none');
    }
})

buttonRandom.addEventListener('click',()=>{
    dominoUp.value = getRandomNumbers();
    dominoDown.value = getRandomNumbers();
    arrDominoUp = Array.from(dominoUp.value);
    arrDominoDown = Array.from(dominoDown.value);
    drawDomino(arrDominoUp,arrDominoDown);
    resultEl.classList.add('is-none');
})

function addListener(){
    let dominos = document.getElementsByClassName('item');
    for(let i = 0;i< dominos.length;i++){
        dominos[i].addEventListener('click', changeDomino);
    }

}

function findAppropriateNumbers (str){
    let arrDomino = str.split('');
    let resultArrNumbers = [];
    for(let i = 1; i < arrDominoUp.length + 1; i++){
        let newArr = arrDomino.filter((elem)=>{
            return +elem === i;
        })
        if(newArr.length >= arrDominoUp.length){
            resultArrNumbers.push({number:newArr[0],quantity:newArr.length})
        }
    }
    return resultArrNumbers;
}

function сheckOnQuantityAppropriateNumbers(obj){
    let newArr = [];
    obj.forEach((elem,i) => {
        let resultQuantityAppropriate = 0;
        let rightAmount = elem.quantity - arrDominoUp.length;
       for(let i = 0; i < arrDominoUp.length; i++){
           console.log(+arrDominoUp[i],+arrDominoDown[i]);
           if(+arrDominoUp[i] === +arrDominoDown[i]){
            resultQuantityAppropriate++;
           }
       }
       if(resultQuantityAppropriate <= rightAmount){
            newArr.push(elem.number)
       }
    });
    return newArr;
}

function rotateSomeNumbers (arr) {
    let arrNumberLineDominoСhange = [];
    let quantityСhange = 0;
    let cloneArr = arrDominoUp.concat();
    cloneArr.forEach((num,i)=>{
        let numberArrDominoDown = arrDominoDown[i];
        if(!(+num === +arr[0])){
            arrDominoUp[i] = numberArrDominoDown;
            arrDominoDown[i] = num;
            arrNumberLineDominoСhange.push(i+1);
            quantityСhange++;
        }
    })
    if(quantityСhange > arrDominoUp.length / 2){
        let arrAllNumbers = createArr(rangeNumbers.max);
        arrNumberLineDominoСhange = arrAllNumbers.filter(el => !arrNumberLineDominoСhange.includes(el));
        quantityСhange = arrDominoUp.length - quantityСhange;
        return {
            topArr: arrDominoDown,
            bottomArr: arrDominoUp,
            line: arrNumberLineDominoСhange,
            change: quantityСhange
        }
    }
    return {
        topArr: arrDominoUp,
        bottomArr: arrDominoDown,
        line: arrNumberLineDominoСhange,
        change: quantityСhange
    }
}

function drawDomino (arrt,arrb) {
    dominoContainer.innerHTML = '';
    let arrTop = document.createElement('ul');
    let arrBottom = document.createElement('ul');
    arrTop.classList.add('list');
    arrBottom.classList.add('list');
    for(let i = 0; i < arrt.length;i++){
        let liTop = document.createElement('li');
        let liBottom = document.createElement('li');
        liTop.innerText = +arrt[i];
        liBottom.innerText = +arrb[i];
        liTop.classList.add('item');
        liBottom.classList.add('item');
        liTop.setAttribute('id',i+1);
        liBottom.setAttribute('id',i+1);
        arrTop.appendChild(liTop);
        arrBottom.appendChild(liBottom);
    }
    dominoContainer.appendChild(arrTop);
    dominoContainer.appendChild(arrBottom);
    addListener();
}

function drawResult (line,change) {
    let changeEl = document.getElementsByClassName('change')[0];
    let lineEl = document.getElementsByClassName('line')[0];
    let strLine = line.join(',');

    changeEl.innerText = 'Total changes made ' + change;
    lineEl.innerText = "Have been changed " + strLine + ' line';
}

function changeDomino (el) {
    let currentElementT = arrDominoUp[+el.currentTarget.id-1];
    let currentElementB = arrDominoDown[+el.currentTarget.id-1];
    console.log(arrDominoUp[0],el.currentTarget.id,arrDominoUp[+el.currentTarget.id-1],arrDominoUp);
    arrDominoUp[el.currentTarget.id-1] = currentElementB;
    arrDominoDown[el.currentTarget.id-1] = currentElementT;
    dominoUp.value = arrDominoUp.join('');
    dominoDown.value = arrDominoDown.join('');;
    drawDomino(arrDominoUp,arrDominoDown);
}

function startPreparation (){
    dominoUp.value = getRandomNumbers();
    dominoDown.value = getRandomNumbers();
    arrDominoUp = Array.from(dominoUp.value);
    arrDominoDown = Array.from(dominoDown.value);
    drawDomino(arrDominoUp,arrDominoDown);
}

function getRandomNumbers(){
    let newStrArray = '';
    for(let i = 0;i < 6;i++){
        newStrArray += Math.floor(rangeNumbers.min + Math.random() * (rangeNumbers.max - rangeNumbers.min + 1))
    }
    return newStrArray;
}

function createArr (max){
    let arr = [];
    for(let i = 1;i <= max;i++){
        arr.push(i);
    }
    return arr;
}
