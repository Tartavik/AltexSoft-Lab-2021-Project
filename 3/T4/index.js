const min = document.getElementById('min');
const max = document.getElementById('max');
const buttonFindFriendlyNumbers = document.getElementById('find');

buttonFindFriendlyNumbers.addEventListener('click',() =>{
    if(+min.value < +max.value){
        if(+min.value >0&&+max.value >0){
            findFriendlyNumbers(+min.value,+max.value);
        }else{
            alert('The numbers should be > 0');
            min.value = '';
            max.value = '';
        }
    }else{
        alert('The beginning of the range cannot be smaller than the end');
        min.value = '';
        max.value = '';
    }
})

function findFriendlyNumbers (min,max) {
    let arrFriendlyNumbers = [];
    for (let i = min; i <= max; i++){
        let arrDividerFirst = getDividerNumber(i);
        let sumArrDividerF = getSumArrDivider(arrDividerFirst);
        if(sumArrDividerF < max){
            let arrDividerSecond = getDividerNumber(sumArrDividerF);
            let sumArrDividerS = getSumArrDivider(arrDividerSecond);
            if(i === sumArrDividerS&&sumArrDividerF > sumArrDividerS?true:false){
                arrFriendlyNumbers.push([i,sumArrDividerF])
            }
        }
    }
    console.log(arrFriendlyNumbers);
}

function isInteger (num) {
 return (num ^ 0) === num;
}

function getDividerNumber (num) {
    let arr = [1];
    let lastNumb = num;
    for (j = 2; j < lastNumb; j++){
        let result = num / j;
        if(isInteger(result)){
            arr.push(result);
            arr.push(j);
            lastNumb = result;
        }
    }
    return arr;
}

function getSumArrDivider (arr) {
    return arr.reduce((cur,prev) => {
        return cur += prev;
    },0)
}