function changeBackgroundColor(time, color, callback, reject){
    setTimeout(() => {
        let randomNumber = Math.floor(Math.random()*10)
        if(randomNumber > 0) {
            document.body.style.backgroundColor = color;
            callback();
        } else {
            reject()
        }
    },time)
}

changeBackgroundColor(1000, "green", ()=>{
    changeBackgroundColor(1000, "yellow", ()=>{
        changeBackgroundColor(1000, "blue", ()=>{
            changeBackgroundColor(1000, "red", ()=>{
                changeBackgroundColor(1000, "gray", ()=>{
                    changeBackgroundColor(1000, "aqua", ()=>{
                        changeBackgroundColor(1000, "orange", ()=>{
                        }, ()=>{console.log('your seventh request was rejected ☹')})
                    }, ()=>{console.log('your sixth request was rejected ☹')})
                }, ()=>{console.log('your fifth request was rejected ☹')})
            }, ()=>{console.log('your fourth request was rejected ☹')})
        }, ()=>{console.log('your third request was rejected ☹')})
    }, ()=>{console.log('your second request was rejected ☹')})
}, ()=>{console.log('your first request was rejected ☹')})