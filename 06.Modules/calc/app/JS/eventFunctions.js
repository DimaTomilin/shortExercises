import {add, sub, divide, multiply, percent, equals} from "../helpers/math.js"

const input = document.getElementById("input")
let n1 = undefined;
let n2 = undefined;
let callback;

export function printNumber(event){
    const number = event.target.value
    input.value += number;
}

export function addFunction(){
    if(n1 === undefined){
        n1 = parseFloat(input.value);
    } else {
        n1 += parseFloat(input.value);
    }
    callback = add;
    input.value = "";
}

export function subFunction(){
    if(n1 === undefined){
        n1 = parseFloat(input.value);
    } else {
        n1 -= parseFloat(input.value);
    }
    callback = sub;
    input.value = "";
}

export function multiplyFunction(){
    if(n1 === undefined){
        n1 = parseFloat(input.value);
    } else {
        n1 *= parseFloat(input.value);
    }
    callback = multiply;
    input.value = "";
}

export function divideFunction(){
    if(n1 === undefined){
        n1 = parseFloat(input.value);
    } else {
        n1 /= parseFloat(input.value);
    }
    callback = divide;
    input.value = "";
}

export function percentFunction(){
    if(n1 === undefined){
        n1 = parseFloat(input.value);
    } else {
        n1 %= parseFloat(input.value);
    }
    callback = percent;
    input.value = "";
}

export function sqrtFunction(){
    input.value = Math.sqrt(input.value);
}

export function equalsFucntion(){
    n2 =  parseFloat(input.value);
    input.value = equals(n1, n2, callback)
    n1 = undefined;
}

export function deleteAll(){
    n1 = undefined;
    n2 = undefined;
    input.value = "";
    callback = undefined;
}
