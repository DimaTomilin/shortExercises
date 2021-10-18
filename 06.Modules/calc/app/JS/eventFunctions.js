import {calc} from "../helpers/math";

const input = document.querySelector(".result")
const buttons = document.querySelectorAll("input[type='button']")

for(const button of buttons){
    button.addEventListener("click", printSymbol)
}

function printSymbol(event){
    const value = event.target.value;
    if (value === "=") equelsClicked();
    else if (value === "Del") deleteClicked();
    else input.value += value;
}
    
function equelsClicked() {
  const str = input.value;
  input.value = calc(str)
}

function deleteClicked() {
  input.value = ""
}