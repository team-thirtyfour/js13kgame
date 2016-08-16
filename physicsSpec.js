//Tests cases rapido presto (en attendant jasmine)

//A & B should collide
//C should collide with no one
let objA = new Entity(0, 0, 50, 50);
let objB = new Entity(10, 10, 5, 5);
let objC = new Entity(200, 200, 20, 20);

console.log('Should be true:', Physics.checkCollision(objA, objB));
console.log('Should be false:', Physics.checkCollision(objA, objC));
console.log('Should be false:', Physics.checkCollision(objB, objC));

//Let's apply gravity
Physics.applyGravity(objA);
Physics.applyGravity(objB, 8);
Physics.applyGravity(objC, -2);

console.log('Should be 5:', objA.y);
console.log('Should be 18:', objB.y);
console.log('Should be 198:', objC.y);
