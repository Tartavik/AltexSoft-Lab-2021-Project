const buttonConfirm = document.getElementById('atm-form-button'),
buttonGet = document.getElementById('atm-form-getting-button'),
buttonPut = document.getElementById('atm-form-put-button'),
getValue = document.getElementById('atm-form-getting-item'),
resultInfo = document.getElementById('result'),
resultWrapper = document.getElementById('result-wrapper'),
generalSum = document.getElementById('generalSum'),
money = document.getElementById('money'),
atmForm = document.getElementById('atm-form'),
atmFormGetting = document.getElementById('atm-form-getting'),
atm = new Map(),
issuedMoney = new Map(),
values = document.getElementsByClassName('atm-form-item-value');

Array.from(values).forEach( el => {
  atm.set(el.name, +el.value);
  issuedMoney.set(el.name, +el.value);
});

buttonConfirm.addEventListener('click', () => {
  if (checkPositiveNumber()) {
    Array.from(values).forEach( el => {
      atm.set(el.name, atm.get(el.name) + +el.value);
    });
    money.innerText = howMuchMoney();
    atmForm.classList.add('is-hide');
    atmFormGetting.classList.remove('is-hide');
  } else {
    alert('Please write only numbers > 0');
  }
  resetInputValues();
});

buttonPut.addEventListener('click', () => {
  atmForm.classList.remove('is-hide');
  atmFormGetting.classList.add('is-hide');
});

buttonGet.addEventListener('click', () => {
  getMoney(getValue.value);
});

function getMoney(sum) {
  let amountRequested = sum;
  for (let entry of atm) {
    if (entry[1] !== 0) {
      let banknoteСount = Math.floor(amountRequested / +entry[0]);
      if (banknoteСount > entry[1]) {
        banknoteСount = entry[1];
      }
      if (banknoteСount > 0) {
        atm.set(entry[0], entry[1] - banknoteСount);
        amountRequested -= +entry[0] * banknoteСount;
        issuedMoney.set(entry[0], banknoteСount);
      }
    }
  }
  balanceCheck(amountRequested, sum);
}

function balanceCheck(remainder, sum) {
  if (remainder > 0) {
    alert('Sorry, but there is not enough money in the ATM');
    returnMoney();
  } else {
    showYouMoney(sum);
    money.innerText = howMuchMoney();
    resetMap();
    atmFormGetting.classList.add('is-hide');
    resultInfo.classList.remove('is-hide');
    getValue.value = '';
  }
}

function returnMoney() {
  for (let entry of issuedMoney) {
    atm.set(entry[0], atm.get(entry[0]) + entry[1]);
  }
  resetMap();
}

function resetMap() {
  for (let entry of issuedMoney.keys()) {
    issuedMoney.set(entry, 0);
  }
}

function showYouMoney(sum) {
  resultWrapper.innerHTML = '';
  const button = document.createElement('button');
  button.classList.add('button');
  button.classList.add('back');
  button.innerText = 'Back';
  generalSum.innerText = 'Total amount ' + sum;
  for (let entry of issuedMoney) {
    if (entry[1] > 0) {
      const span = document.createElement('span');
      span.innerText = entry[1] + ' banknote, denomination ' + entry[0];
      resultWrapper.appendChild(span);
    }
  }
  resultWrapper.appendChild(button);
  addButtonListener(button);
}

function addButtonListener(el) {
  el.addEventListener('click', () => {
    atmFormGetting.classList.remove('is-hide');
    resultInfo.classList.add('is-hide');
  });
}

function howMuchMoney() {
  let sum = 0;
  for (let entry of atm) {
    sum = sum + +entry[0] * entry[1];
  }
  return sum;
}

function checkPositiveNumber() {
  return Array.from(values).every( el => {
    return +el.value >= 0;
  });
}

function resetInputValues() {
  Array.from(values).forEach( el => {
    el.value = '';
  });
}
