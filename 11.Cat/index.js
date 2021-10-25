function numberConverter(number){
 if(number<1) return "isn`t"
 else if (number<3) return "no so"
 else if (number<6) return "is"
 else return "is VERY"
}

const cat = {
    name:"Rick",
    tiredness: 2,
    hunger: 0,
    lonliness: 1,
    happiness: 4,
    run(time){
        const random = Math.random()
        if(random>0.4){
            this.tiredness+=time;
            this.hunger+=time;
            this.happiness-=time;
        } else {
            console.log(`${cat.name} don't want to run`)
        }
        return this
    },
    eat(time){
        const random = Math.random()
        if(random>0.2){
            this.hunger = 0;
            this.happiness+=time;
            this.lonliness+=time;
            this.tiredness+=time;
        } else {
            console.log(`${cat.name} don't want to eat`)
        }
        return this
    },
    pet(time){
        const random = Math.random()
        if(random>0.6){
            this.tiredness-=time;
            this.hunger+=time;
            this.happiness+=time;
            this.lonliness = 0;
        } else {
            console.log(`${cat.name} don't want to be petted`)
        }
        return this
    },
    sleep(time){
        const random = Math.random()
        if(random>0.1){
            this.tiredness = 0;
            this.hunger+=time;
            this.happiness-=time;
            this.lonliness+=time;
        } else {
            console.log(`${cat.name} don't want to sleep`)
        }
        return this
    },
    status(){
        console.log(`${this.name} `+numberConverter(this.happiness)+" happy. He "+numberConverter(this.hunger)+" hungry and "+numberConverter(this.tiredness)+" tired. Also cat "+numberConverter(this.lonliness)+" lonely")
    }
}