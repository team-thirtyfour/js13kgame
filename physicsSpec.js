//Tests cases rapido presto (en attendant jasmine)

//A & B should collide
//C should collide with no one
let objA = new Entity(0, 0, 50, 50);
let objB = new Entity(10, 10, 5, 5);
let objC = new Entity(200, 200, 20, 20);

console.log('Should be true:', Physics.checkCollision(objA, objB));
console.log('Should be false:', Physics.checkCollision(objA, objC));
console.log('Should be false:', Physics.checkCollision(objB, objC));
