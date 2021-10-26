class Guitar {
    #id;
    constructor(_manufactureYear, _brand, _price, _numberOfString = 6, _id){
        this._manufactureYear = _manufactureYear;
        this._brand = _brand;
        this._price = _price;
        this._numberOfString = _numberOfString;
        this._used = false;
        this.#id = _id;
    }

    usedGuitar(){
        this._used = true;
        this._price = this._price*0.9;
        return this
    }

    play(){
        console.log("🎶🎶🎶")
        this.usedGuitar();
    }

    get currentPrice(){
        return this._price
    }

    set currentPrice(value){
        if(typeof(value) === "number"){
            this._price = value;
        } else return  
    }

    get manufactureYear(){
        return this._manufactureYear
    }

    get brand(){
        return this._brand
    }

    get id(){
        return this.#id
    }

    static detectSound(sound){
        if(sound === "🎸"){
            return "ElectricGuitar"
        }
        if (sound === "🔊"){
            return "BassGuitar"
        }
    }
}

class ElectricGuitar extends Guitar {
    #id
    constructor(_manufactureYear, _brand, _price, _numberOfString, _id, _longNeck){
        super(_manufactureYear, _brand, _price, _numberOfString);
        this._longNeck = _longNeck;
        this._used = false;
        this.#id = _id;
    }

    play(){
        console.log("🎸🎸🎸")
        this.usedGuitar();
    }
}

class BassGuitar extends Guitar {
    #id
    constructor(_manufactureYear, _brand, _price, _id){
        super(_manufactureYear, _brand, _price);
        this._numberOfString = 4;
        this._used = false;
        this.#id = _id;
    }

    play(){
        console.log("🔊🔊🔊")
        this.usedGuitar();
    }

    playSolo(seconds){
        console.log(this.#randomEmoje(seconds))
        this.usedGuitar();
    }

    #randomEmoje(time){
        let string = "";
        for (let i = 0; i < time; i++){
            const number = Math.random()
            if(number<0.15){
                string += "💥"
            } else if(number<0.3){
                string += "🤘"
            } else if(number<0.45){
                string += "🎵"
            }else if(number<0.6){
                string += "📢"
            }else if(number<0.75){
                string += "💢"
            } else {
                string += "🕺"
            }
        }
        return string
    }
}