import {addFunction, subFunction, multiplyFunction, divideFunction, equalsFucntion, percentFunction, printNumber, deleteAll} from "./eventFunctions"


const addButton = document.getElementById("add");
const subButton = document.getElementById("sub");
const devideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const equalsButton = document.getElementById("equals");
const percentButton = document.getElementById("percent");
const numbersButtons = document.getElementsByClassName("number")
const deleteButton = document.getElementById("delete")


addButton.addEventListener("click", addFunction)
equalsButton.addEventListener("click", equalsFucntion)
subButton.addEventListener("click", subFunction)
multiplyButton.addEventListener("click", multiplyFunction)
devideButton.addEventListener("click", divideFunction)
percentButton.addEventListener("click", percentFunction)
for(const button of numbersButtons){
    button.addEventListener("click", printNumber)
}
deleteButton.addEventListener("click", deleteAll)
