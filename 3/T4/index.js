const min = document.getElementById('min'),
max = document.getElementById('max'),
buttonFindFriendlyNumbers = document.getElementById('find');

buttonFindFriendlyNumbers.addEventListener('click',() =>{
    numberCheck();
})

addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        numberCheck();
    }
})

function numberCheck () {
    if (+min.value < +max.value) {
        if (+min.value > 0&&+max.value > 0) {
            findFriendlyNumbers(Math.floor(+min.value), Math.floor(+max.value));
        }else{
            alert('The numbers should be > 0');
            min.value = '';
            max.value = '';
        }
    }else{
        alert('The beginning of the range cannot be smaller than the end');
        const flag = min.value;
        min.value = max.value;
        max.value = flag;
    }
}

function findFriendlyNumbers (min, max) {
    const arrFriendlyNumbers = [];
    for (let i = min; i <= max; i++){
        const arrDividerFirst = getDividerNumber(i);
        const sumArrDividerF = getSumArrDivider(arrDividerFirst);
        if (sumArrDividerF <= max) {
            const arrDividerSecond = getDividerNumber(sumArrDividerF);
            const sumArrDividerS = getSumArrDivider(arrDividerSecond);
            if (i === sumArrDividerS&&sumArrDividerF > sumArrDividerS) {
                arrFriendlyNumbers.push([i,sumArrDividerF])
            }
        }
    }
    alert(arrFriendlyNumbers);
}

function isInteger (num) {
 return (num ^ 0) === num;
}

function getDividerNumber (num) {
    const arr = [1];
    let lastNumb = num;
    for (j = 2; j < lastNumb; j++) {
        const result = num / j;
        if (isInteger(result)) {
            arr.push(result);
            arr.push(j);
            lastNumb = result;
        }
    }
    return arr;
}

function getSumArrDivider (arr) {
    return arr.reduce((cur,prev) => cur += prev, 0)
}