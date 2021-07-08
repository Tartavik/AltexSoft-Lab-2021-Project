const howManyCoins = document.getElementById('coins'),
buttonStart = document.getElementById('start'),
buttonClean = document.getElementById('clean'),
tree = document.getElementById('tree'),
numberOfLines = document.getElementById('number-of-lines'),
outputSymbol = '*';

buttonStart.addEventListener('click', () => {
  numberCheck();
});

buttonClean.addEventListener('click', () => {
  tree.innerHTML = '';
  numberOfLines.classList.add('is-hide');
});

function numberCheck() {
  if (isFinite(howManyCoins.value)) {
    createCoinTree(+howManyCoins.value);
    howManyCoins.value = '';
    numberOfLines.classList.remove('is-hide');
  } else {
    alert('This is not are number');
  }
}

function createCoinTree(number) {
  let quantityLine = 0;
  let lastLineQuantitySymbols = 0;
  for (let i = 1; lastLineQuantitySymbols < number; i++) {
    lastLineQuantitySymbols += i;
    if (lastLineQuantitySymbols <= number) {
      quantityLine++;
    } else {
      lastLineQuantitySymbols -= i;
      break;
    }
  }
  lastLineQuantitySymbols = number - lastLineQuantitySymbols;
  renderCoin(quantityLine, lastLineQuantitySymbols);
}

function renderCoin(qLine, lLine) {
  let quantityCoins = outputSymbol;
  for (let i = 0; i < qLine; i++) {
    createElement(quantityCoins);
    quantityCoins += outputSymbol;
  }
  numberOfLines.innerText = qLine;
  if (lLine > 0) {
    // Here I create an incomplete line, if there is one.
    quantityCoins = convert(lLine);
    createElement(quantityCoins);
  }
}

function convert(number) {
  let result = outputSymbol;
  for (let i = 1; i < number; i++) {
    result += outputSymbol;
  }
  return result;
}

function createElement(quantityCoins) {
  const p = document.createElement('p');
  p.classList.add('outputSymbol');
  p.innerText = quantityCoins;
  tree.appendChild(p);
  return p;
}