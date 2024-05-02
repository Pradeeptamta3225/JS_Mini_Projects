const countValue = document.querySelector("#count");
// logic 
const increment = () => {
    // get update 
    let value = parseInt(countValue.innerText);
    // what the update 
    value = value + 1;
    // value what the display 
    countValue.innerText = value;
}

const decrement = () => {
   // get update 
   let value = parseInt(countValue.innerText);
   // what the update 
   value = value - 1;
   // value what the display 
   countValue.innerText = value;
}


const reset = () =>{
     value = 0;
     countValue.innerText = value;
}


//Hello