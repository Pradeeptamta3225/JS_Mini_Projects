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
const symbols = `!@#$%^&*()_|<_,>/[}]{?~`;


let password = "";
let passwordLenght = 10;
let checkCount = 1;
handleSlider();

//set passwordLength
function handleSlider() {
    inputSlider.value = passwordLenght;
    lenghtDisplay.innerText = passwordLenght;
}

//set Indicator
function setIndicator(color) {
    indicator.computedStyleMap.backgroundcolor = color;

}

//Random Intiger
function getRndInteger(min,max) {
  Math.floor(Math.random()  * (max- min)) + min;
}


function generateRandomNumber() {
    return getRndInteger(0,9);
}

function generateLowerCase() {
        return String.fromCharCode(getRndInteger(97,123))
}

function generateLowerCase() {
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

    catch{
        copyMsg.innerText = "Failed";
    }
    copyMsg.classList.add("active");

    setTimeout( ()=> {
        copyMsg.classList.remove("active");
    },2000);

}