class Person {
    #id;
    constructor(_firstName, _surName, _salary, _age , _id){
        this.firstName = _firstName;
        this.surName = _surName;
        this.salary = _salary;
        this.age = _age;
        this.#id = _id;
    }

    get FullName(){
        return `${this.firstName} ${this.surName}`
    }

    get hisSalary(){
        return this.salary 
    }

    set hisSalary(value){
        if(typeof(value) === "number"){
            this.salary = value;
        } else return 
    }

    get hisAge(){
        return this.age
    }

    ageing(years){
        this.age += years
        this.salary = this.salary*(1-0.03*years)
        return this
    }
}

class Player extends Person {
    #id;
    constructor(_firstName, _surName, _salary, _age , _strongLeg, _position, _celebrationSentence, _id){
        super(_firstName, _surName, _salary, _age);
        this.strongLeg = _strongLeg;
        this.position = _position;
        this.celebrationSentence = _celebrationSentence;
        this.#id = _id;
    }

    goalClebration(){
        console.log(this.celebrationSentence);
        this.salary = this.salary*(1.025)
        return this
    }

    introducePlayer(){
        console.log(`${this.FullName} is a player of our team. He is ${this.age} years old. He plays as ${this.position}.`)
    }

    get hisStrongLeg(){
        return this.strongLeg
    }

    get hisPosition(){
        return this.position
    }

    get hisCelebrationSentence(){
        return this.celebrationSentence
    }

    set hisCelebrationSentence(value){
        this.celebrationSentence = value
        return this
    }
}

class GoalKeepr extends Person {
    #id = 0;
    constructor(_firstName, _surName, _salary, _age ,_isLeftHanded,  _id, _lastGoalConceded = Date()){
        super(_firstName, _surName, _salary, _age);
        this.isLeftHanded = _isLeftHanded;
        this.lastGoalConceded = _lastGoalConceded;
        this.#id = _id;
    }

    concededAGoal(){
        console.log("Ooooy No");
        this.lastGoalConceded = Date()
        this.salary = this.salary*0.975
        return this
    }

    introducePlayer(){
        console.log(`${this.FullName} is a player of our team. He is ${this.age} years old. He plays as goalkeepr`)
    }

    get hisLastConcededGoal(){
        return this.lastGoalConceded
    }
}