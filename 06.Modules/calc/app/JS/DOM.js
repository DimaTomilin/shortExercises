import {addFunction, subFunction, multiplyFunction, divideFunction, equalsFucntion, percentFunction, printNumber, deleteAll, sqrtFunction} from "./eventFunctions"


const numbersButtons = document.getElementsByClassName("number")
for(const button of numbersButtons){
    button.addEventListener("click", printNumber)
}

const deleteButton = document.getElementById("delete")
deleteButton.addEventListener("click", deleteAll)

const addButton = document.getElementById("add");
addButton.addEventListener("click", addFunction)

const subButton = document.getElementById("sub");
subButton.addEventListener("click", subFunction)

const devideButton = document.getElementById("divide");
devideButton.addEventListener("click", divideFunction)

const multiplyButton = document.getElementById("multiply");
multiplyButton.addEventListener("click", multiplyFunction)

const percentButton = document.getElementById("percent");
percentButton.addEventListener("click", percentFunction)

const sqrtButton = document.getElementById("sqrt")
sqrtButton.addEventListener("click", sqrtFunction)

const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", equalsFucntion)














