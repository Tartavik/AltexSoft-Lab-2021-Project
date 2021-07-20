const dominoUp = document.getElementById('domino-up'),
dominoDown = document.getElementById('domino-down'),
buttonStart = document.getElementById('start'),
buttonRandom = document.getElementById('random'),
dominoContainer = document.getElementById('domino-container'),
resultEl = document.getElementsByClassName('result')[0],
rangeNumbers = {
  min: 1,
  max: 6,
  maxLength: 6,
};
let arrDominoUp = [];
let arrDominoDown = [];
startPreparation();

dominoUp.addEventListener('blur', e => {
  if (dominoUp.value.length === rangeNumbers.maxLength) {
    arrDominoUp = e.currentTarget.value.split('');
    drawDomino(arrDominoUp, arrDominoDown);
  } else {
    alert('Please in domino must be by ' + rangeNumbers.maxLength);
  }
});

dominoDown.addEventListener('blur', e => {
  if (dominoDown.value.length === rangeNumbers.maxLength) {
    arrDominoDown = e.currentTarget.value.split('');
    drawDomino(arrDominoUp, arrDominoDown);
  } else {
    alert('Please in domino must be by ' + rangeNumbers.maxLength);
  }
});

buttonStart.addEventListener('click', () => {
  const appropriateNumber = findAppropriateNumber(dominoUp.value + dominoDown.value);
  if (appropriateNumber.number > 0) {
    const appropriateDoableNumber = сheckOnQuantityAppropriateNumber(appropriateNumber);
    if (appropriateDoableNumber > 0) {
      const result = rotateSomeNumbers(appropriateDoableNumber);
      drawDomino(result.topArr, result.bottomArr);
      drawResult(result.line, result.change);
      resultEl.classList.remove('is-none');
    } else {
      alert('Sorry, but this sequence is not suitable for sorting dominoes');
    }
  } else {
    alert('Sorry, but this sequence is not suitable for sorting dominoes');
  }
});

buttonRandom.addEventListener('click', () => {
  dominoUp.value = getRandomNumbers();
  dominoDown.value = getRandomNumbers();
  arrDominoUp = dominoUp.value.split('');
  arrDominoDown = dominoDown.value.split('');
  drawDomino(arrDominoUp, arrDominoDown);
  resultEl.classList.add('is-none');
});

function addListener() {
  const dominos = document.getElementsByClassName('item');
  for (let i = 0; i < dominos.length; i++) {
    dominos[i].addEventListener('click', changeDomino);
  }
}

function findAppropriateNumber(str) {
  // Here I find the number of numbers that are greater than or equal to rangeNumbers.maxLength
  const arrDomino = str.split('');
  for (let i = 1; i < arrDominoUp.length + 1; i++) {
    const newArr = arrDomino.filter((elem) => {
      return +elem === i;
    });
    if (newArr.length >= arrDominoUp.length) {
      return { number: newArr[0], quantity: newArr.length };
    }
  }
  return { number: 0, quantity: 0 };
}

function сheckOnQuantityAppropriateNumber(obj) {
  //Here I am looking for the number of equal numbers of dominoes top and bottom, example 3/3
  let number = 0;
  let resultQuantityAppropriate = 0;
  const rightAmount = obj.quantity - arrDominoUp.length;
  for (let i = 0; i < arrDominoUp.length; i++) {
    if (+arrDominoUp[i] === +arrDominoDown[i]) {
      resultQuantityAppropriate++;
    }
  }
  if (resultQuantityAppropriate <= rightAmount) {
    number = obj.number;
  }
  return number;
}

function rotateSomeNumbers(number) {
  const objChange = findChange(number);
  if (objChange.quantityСhange > arrDominoUp.length / 2) {
    const arrAllNumbers = createArr(rangeNumbers.max);
    objChange.arrNumberLineDominoСhange = arrAllNumbers.filter( el => !objChange.arrNumberLineDominoСhange.includes(el));
    objChange.quantityСhange = arrDominoUp.length - objChange.quantityСhange;
    return {
      topArr: arrDominoDown,
      bottomArr: arrDominoUp,
      line: objChange.arrNumberLineDominoСhange,
      change: objChange.quantityСhange,
    };
  }
  return {
    topArr: arrDominoUp,
    bottomArr: arrDominoDown,
    line: objChange.arrNumberLineDominoСhange,
    change: objChange.quantityСhange,
  };
}

function findChange(number) {
  const arrNumberLineDominoСhange = [];
  let quantityСhange = 0;
  let cloneArr = arrDominoUp.concat();
  cloneArr.forEach((num, i) => {
    const numberArrDominoDown = arrDominoDown[i];
    if (!(+num === +number)) {
      arrDominoUp[i] = numberArrDominoDown;
      arrDominoDown[i] = num;
      arrNumberLineDominoСhange.push(i + 1);
      quantityСhange++;
    }
  });
  return {
    arrNumberLineDominoСhange: arrNumberLineDominoСhange, 
    quantityСhange: quantityСhange
  };
}

function drawDomino(arrt, arrb) {
  dominoContainer.innerHTML = '';
  const arrTop = document.createElement('ul');
  const arrBottom = document.createElement('ul');
  arrTop.classList.add('list');
  arrBottom.classList.add('list');
  for (let i = 0; i < arrt.length; i++) {
    const liTop = document.createElement('li');
    const liBottom = document.createElement('li');
    liTop.innerText = +arrt[i];
    liBottom.innerText = +arrb[i];
    liTop.classList.add('item');
    liBottom.classList.add('item');
    liTop.setAttribute('id', i + 1);
    liBottom.setAttribute('id', i + 1);
    arrTop.appendChild(liTop);
    arrBottom.appendChild(liBottom);
  }
  dominoContainer.appendChild(arrTop);
  dominoContainer.appendChild(arrBottom);
  addListener();
}

function drawResult(line, change) {
  const changeEl = document.getElementById('change');
  const lineEl = document.getElementById('line');
  const strLine = line.join(',');
  changeEl.innerText = 'Total changes made ' + change;
  lineEl.innerText = 'Have been changed ' + strLine + ' line';
}

function changeDomino(el) {
  const currentElementT = arrDominoUp[+el.currentTarget.id - 1];
  const currentElementB = arrDominoDown[+el.currentTarget.id - 1];
  arrDominoUp[el.currentTarget.id - 1] = currentElementB;
  arrDominoDown[el.currentTarget.id - 1] = currentElementT;
  dominoUp.value = arrDominoUp.join('');
  dominoDown.value = arrDominoDown.join('');
  drawDomino(arrDominoUp, arrDominoDown);
}

function startPreparation() {
  dominoUp.value = getRandomNumbers();
  dominoDown.value = getRandomNumbers();
  arrDominoUp = dominoUp.value.split('');
  arrDominoDown = dominoDown.value.split('');
  drawDomino(arrDominoUp, arrDominoDown);
}

function getRandomNumbers() {
  let newStrArray = '';
  for (let i = 0; i < 6; i++) {
    newStrArray += Math.floor(
      rangeNumbers.min +
        Math.random() * (rangeNumbers.max - rangeNumbers.min + 1)
    );
  }
  return newStrArray;
}

function createArr(max) {
  const arr = [];
  for (let i = 1; i <= max; i++) {
    arr.push(i);
  }
  return arr;
}