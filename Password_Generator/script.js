const inputSlider = document.querySelector("[data-lengthSlider]");
const lenghtDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelector("input[typecheckbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password = "";
let passwordLenght = 10;
let checkCount = 0;
handleSlider();

//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLenght;
    lenghtDisplay.innerText = passwordLenght;
}

//set Indicator
function setIndicator(color) {
    indicator.style.backgroundColor = color;

}

//Random Intiger
function getRndInteger(min,max) {
  return Math.floor(Math.random() * (max- min)) + min;
}


function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
        return String.fromCharCode(getRndInteger(97,123))
}

function generateUpperCase() {
    return String.fromCharCode(getRndInteger(65,91))
}

function generateSymbol() {
    const randNum = getRndInteger(0, symbols.length);
    return symbols.charAt(randNum);
}

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (uppercaseCheck.checked) hasNum = true;
    if (uppercaseCheck.checked) hasSym = true;


    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLenght >= 8){
        setIndicator("#0f0");
    } else if (
        (hasLower || hasUpper) &&
        (hasNum || hasSym) &&
        passwordLenght >= 6
    ) {
        setIndicator("#ff0");
    } else {
        setIndicator("#f00");
    }
}


async function copyContent() {
    try{
       await navigator.clipboard.writeText(passwordDisplay.value);
       copyMsg.innerText = "copied";
    }

    catch (e) {
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout( ()=> {
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange() {
    checkCount = 0;
    allCheckBox.forEach( (checkbox) => {
        if(checkbox.checked)
        checkCount++;
    });

    //special condition
    if(passwordLenght < checkCount){
        passwordLenght = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLenght = e.target.value;
    handleSlider();
} )


copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
    copyContent();
})

generateBtn.addEventListener('click', () =>{
 //checkbox not selected
  if(checkCount ==  0) return;

  if(passwordLenght < checkCount){
    passwordLenght = checkCount;
    handleSlider();
}
//remove past password
password = "";


let funArr = [];

 if(uppercaseCheck.checked)
 funArr.push(generateUpperCase);

 if(lowercaseCheck.checked)
 funArr.push(generateLowerCase);

 if(numbersCheck.checked)
 funArr.push(generateRandomNumber);

 if(symbolsCheck.checked)
 funArr.push(generateSymbol);

 //copulsory addition
 for(let i=0; i<funArr.length; i++) {
    password += funArr[i]();
 }

//  remaining addition 
for(let i=0; i<passwordLenght-funArr.length; i++){
    let randIndex = getRndInteger(0, funArr.length);
    password += funArr[randIndex]();
}

//shaffle password
password = shufflePassword(Array.from(password));

// show in UI 
passwordDisplay.value = password;
calcStrength();


});
