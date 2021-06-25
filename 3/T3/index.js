const buttonConfirm = document.getElementsByClassName("atm-form-button")[0];
const buttonGet = document.getElementsByClassName("atm-form-getting-button")[0];
const buttonPut = document.getElementsByClassName("atm-form-put-button")[0];
const getValue = document.getElementsByClassName("atm-form-getting-item")[0];
const resultInfo = document.getElementsByClassName("result")[0];
const resultWrapper = document.getElementsByClassName("result-wrapper")[0];
const generalSum = document.getElementsByClassName("generalSum")[0];
const money = document.getElementsByClassName("money")[0];
const atmForm = document.getElementsByClassName("atm-form")[0];
const atmFormGetting = document.getElementsByClassName("atm-form-getting")[0];
let atm = new Map();
let issuedMoney = new Map();
let values = document.getElementsByClassName("atm-form-item-value");
Array.from(values).forEach((el) => {
  atm.set(el.name, +el.value);
  issuedMoney.set(el.name, +el.value);
});

buttonConfirm.addEventListener("click", () => {
  if (checkPositiveNumber()) {
    Array.from(values).forEach((el) => {
      atm.set(el.name, atm.get(el.name) + +el.value);
    });
    money.innerText = howMuchMoney();
    console.log(money.innerText);
    atmForm.classList.add("is-hide");
    atmFormGetting.classList.remove("is-hide");
  } else {
    alert("Please write only numbers > 0");
  }
  resetInputValues();
});

buttonPut.addEventListener("click", () => {
  atmForm.classList.remove("is-hide");
  atmFormGetting.classList.add("is-hide");
});

buttonGet.addEventListener("click", () => {
  getMoney(getValue.value);
});

function getMoney(sum) {
  let amountRequested = sum;
  for (let entry of atm) {
    if (entry[1] !== 0) {
      let result = Math.floor(amountRequested / +entry[0]);
      if (result > entry[1]) {
        result = entry[1];
      }
      if (result > 0) {
        atm.set(entry[0], entry[1] - result);
        amountRequested -= +entry[0] * result;
        issuedMoney.set(entry[0], result);
      }
    }
  }
  if (amountRequested > 0) {
    alert("Sorry but in atm do not money");
    returnMoney();
  } else {
    showYouMoney(sum);
    money.innerText = howMuchMoney();
    resetMap();
    atmFormGetting.classList.add("is-hide");
    resultInfo.classList.remove("is-hide");
    getValue.value = "";
  }
  console.log(atm);
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
  resultWrapper.innerHTML = "";
  let button = document.createElement("button");
  button.classList.add("button");
  button.classList.add("back");
  button.innerText = "Back";
  generalSum.innerText = "Total amount " + sum;
  for (let entry of issuedMoney) {
    if (entry[1] > 0) {
      let span = document.createElement("span");
      span.innerText = entry[1] + " banknote, denomination " + entry[0];
      resultWrapper.appendChild(span);
    }
  }
  resultWrapper.appendChild(button);
  button.addEventListener("click", () => {
    atmFormGetting.classList.remove("is-hide");
    resultInfo.classList.add("is-hide");
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
  return Array.from(values).every((el) => {
    return +el.value >= 0;
  });
}

function resetInputValues() {
  Array.from(values).forEach((el) => {
    el.value = "";
  });
}
