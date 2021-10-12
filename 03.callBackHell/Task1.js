function checkRightAngle(a, b, c){
    if((sqr(a)+sqr(b))===sqr(c)){
        return true;
    } else {return false}
}

function sqr(a){
    return multiplication(a, a)
}

function multiplication(a, b){
    return a*b
}

console.log(checkRightAngle(3,4,5))