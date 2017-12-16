function* TestGenerator() {
    yield "First yield";
    yield* TestGenerator2();
    yield "Third yield";
}

function* TestGenerator2(param) {
    yield `another yield with ${param}`;
}

const gen = TestGenerator();

const gen1 = gen.next();
console.log(gen1.value);

const gen2 = gen.next("wagwan!");
console.log(gen2.value);

const gen3 = gen.next();
console.log(gen3.value);

const gen4 = gen.next();
console.log(gen4.value);