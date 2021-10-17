import {add, divide, multiply, equals, sub} from "../helpers/math.js"

const input = document.getElementById("input")
let n1 = 0;
let n2 = 0;
let callback;


export function addFunction(){
    //if(n1 === "null"){
        n1 = parseFloat(input.value);
        callback = add;
        input.value = "";
    //}
}

export function equalsFucntion(){
    n2 =  parseFloat(input.value);
    input.value = equals(n1, n2, callback)
}

export function subFunction(){
    n1 = parseFloat(input.value);
    callback = sub;
    input.value = "";
}

export function multiplyFunction(){
    n1 = parseFloat(input.value);
    callback = multiply;
    input.value = "";
}

export function divideFunction(){
    n1 = parseFloat(input.value);
    callback = divide;
    input.value = "";
}

export function percentFunction(){
    n2 = parseFloat(input.value)/100;
    console.log(n2)
    input.value = equals(n1, n2, callback)
}

export function printNumber(event){
    const number = event.target.value
    input.value += number;
}

export function deleteAll(){
    n1 = 0;
    input.value = "";
    callback = null;
}
