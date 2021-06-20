const howManyCoins = document.getElementById('coins');
const buttonStart = document.getElementById('start');
const buttonClean = document.getElementById('clean');
const tree = document.getElementsByClassName('tree')[0];
const numberOfLines = document.getElementById('number-of-lines');
let sumbol = '*';

buttonStart.addEventListener('click',() => {
    if(isFinite(howManyCoins.value)){
        coin(howManyCoins.value);
        howManyCoins.value = '';
    }else{
        alert('This is not are number')
    }
})

buttonClean.addEventListener('click',()=>{
    tree.innerHTML = '';
})

function coin (number){
    let line = 0;
    let lastNumber = 0;
    for(let i = 1; lastNumber < number;i++){
            lastNumber += i;
            if(lastNumber <= number){
                line++;
            }else{
                lastNumber -= i;
                break;
            }
    }
    renderCoin(line,lastNumber,number);
}

function renderCoin (line,lNum,num){   
    let remainder = num - lNum;
    console.log(remainder);
    let quantityCoins = sumbol;
    for(let i = 0; i < line; i++){
        console.log('1');
        let p = document.createElement('p');
        p.innerText = quantityCoins;
        tree.appendChild(p);
        quantityCoins += sumbol;
    }
    numberOfLines.innerText = line;
    if(remainder > 0){
        quantityCoins = convert(remainder);
        let p = document.createElement('p');
        p.innerText = quantityCoins;
        tree.appendChild(p);
    }

    
    
}

function convert (number){
    let result = sumbol;
    for(let i = 1; i < number;i++){
        result += sumbol;
    }
    return result;
}

