function globalWindow (){
  console.log('simple function call');
  console.log(this === window);
}

globalWindow();


// IMPLICIT CONTEXT

function introduceSelf(){
  return 'Hello, my name is ' + this.name;
}

introduceSelf();



let user = {
  name: 'henry',
  age: 35, 
  favoriteCOlor: 'pink',
  introduceSelf: introduceSelf,
  //// the key introduceSelf has a value of the GLOBAL FUNCTION introduceSelf
  sayAge: whatsMyAge
}

user.introduceSelf();

//// introduceSelf can be invoked globally or through the OBJECT user
//// introduceSelf() and user.introduceSelf()


function whatsMyAge(){
  console.log(this.age);
}
window.age = 99;
//// adds an age prop in the window object, NOT RECOMMENDED
whatsMyAge();
user.sayAge();


////   EXPLICIT CONTEXT
//// .call, .apply, .bind

let calculateTotal = function(tax, shipping){
  return this.price * (1 + tax) + shipping;
}

//// the this keyword makes the function more reusable with various OBJECTS

let product = {
  name: 'shoes',
  price: 27,
  age: 10
}


let totalWithCall = calculateTotal.call(product, 0.06, 5);
//// code above INVOKES IMMEDIATELY with the parameters passed in

//// also would work with spread operator
let arguments = [0.08, 8]
let totalWithSpreadOperator = calculateTotal.call(product, ...arguments);
//// evaluates to calculate.call(product, 0.08, 8)

let totalWithApply = calculateTotal.apply(product, [0.06, 5])
//// method.apply only takes in 2 params, the object and an array of parameters


user.sayAge.call(product)
//// explicitly telling the this keyword to evaluate to product, EVEN THOUGH that to the left of the sayAge method is user
//// explicit overrides implicit EVERYTIME


let calculateTotalBound = calculateTotal.bind(product)
//// bind DOES NOT IMMEDIATELY INVOKE it yet and returns a function that we can invoke later on

/// later on....
let totalWithBind = calculateTotalBound(...arguments);

//// bind DOES NOT make a specific method exclusive to a certain object

let product2 = {
  name: 'pants',
  price: 60,
  age: 100
}

let calculateTotalBound2 = calculateTotal.bind(product2);
let totalWithBind2 = calculateTotalBound(...arguments);

//// ^^ The code above also binds the function on ANOTHER OBJECT ^^     

let person = {
  name: 'steven',
  favoriteFood: 'mexican'
}

// let person2 = person;
let person2 = { ...person } 
//// both objects are referencing each other in memory
person2.favoriteFood = 'hawaiian';
console.log(person2)

//// person.favoriteFood is also equal to 'hawaiian'
//// what we could do is: let person2 = {...person}


//// Constructor function and Classes

function User (name, age, favoriteColor){
  this.name = name;
  this.age = age;
  this.favoriteColor = favoriteColor;
}

let user1 = new User('mark', 35, 'blue');
//// "new" keyword makes an new instance of an object
console.log(user1)

//// Classes are constructor functions
//// Classes are blueprints for creating Objects

class Person {
  constructor(name, age, favoriteColor){
    this.name = name;
    this.age = age;
    this.favoriteColor = favoriteColor;

    this.greeting = this.greeting.bind(this)
    //// greeting method above is included in the constructor
    //// will show up in every instance of object
  }

  //// greeting method is set in the prototype BELOW
  greeting(){
    //// return super.greeting() + ', and I play ' + this.sport;
    //// super is intended to be used only in the constructor function
    return 'Hi, my name is ' + this.name;
  }
}

let person1 = new Person('josh', '31', 'red');
console.log(person1);
//// ^^^ does not show the method greeting() ^^^
person1.greeting();
//// ^^^ greeting method could still be accessed in the prototype ^^^

class Athlete extends Person {
  constructor(name, age, favoriteColor, sport){
    //// extend DOES NOT AUTOMATICALLY EXTEND the properties you put in
    super(name, age, favoriteColor) 
    ////invokes the constructor function from the Person class
    this.sport = sport;
    this.injuries = [];
    //// sport and injuries is apart from the Person class so it needs to be set
  }

  greeting(){
    return super.greeting() + ', and I play ' + this.sport
  }

  addInjury(injury){
    this.injuries.push(injury)
    return this;
    //// will return the instance of the object
  }
}

let athlete1 = new Athlete('bob', 12, 'yellow', 'baseball');


console.log(athlete1);
console.log(athlete1.greeting());

athlete1.addInjury('broken leg');
athlete1.injuries

athlete1.addInjury('broken leg').greeting();
