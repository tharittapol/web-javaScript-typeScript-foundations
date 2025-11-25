// -------------------- let and const --------------------

// Use const when don't want to reassign the variable
const pi = 3.14159;
// pi = 3.14; // ❌ Error: Assignment to constant variable.

// Use let when the value will change
let counter = 0;
counter = counter + 1;  // ✅ OK
counter++;              // ✅ OK

// Block scope example
if (true) {
    let x = 10;   // x exists only inside this if-block
    const y = 20; // y also exists only inside this block
    console.log(x, y); // 10 20
}
// console.log(x, y); // ❌ Error: x is not defined

/*
Rule of thumb:
- Default to const
- Use let only when you know it will change.
*/

// --------- Functions and Arrow Functions --------------------
// Function declaration
function add(a, b) {
    return a + b;
}

console.log(add(2, 3)); // 5

// Function as a value (Function expression)
const multiply = function(a, b) {
    return a * b;
};

console.log(multiply(2, 5)); // 10

// Basic arrow function
const subtract = (a, b) => {
    return a - b;
};

console.log(subtract(10, 4)); // 6

// If the function has just ONE expression, can omit {} and return
const square = x => x * x;

console.log(square(5)); // 25

// No parameters → use ()
const sayHello = () => console.log("Hello!");
sayHello(); // "Hello!"

/*
 Normal function and arrow function = similar, just different syntax.
*/

// ------------------ Array Methods: map, filter, reduce ------------------
const numbers = [1, 2, 3, 4, 5];

// Create a new array with each number * 2
const doubled = numbers.map(n => n * 2);

console.log(doubled); // [2, 4, 6, 8, 10]

// Keep only even numbers
const evens = numbers.filter(n => n % 2 === 0);

console.log(evens); // [2, 4]

// Sum all numbers in the array
const sum = numbers.reduce((accumulator, current) => {
    // accumulator = value we carry
    // current = current element from array
    return accumulator + current;
}, 0); // 0 is the initial value of accumulator

console.log(sum); // 15

// ------------------- Objects and JSON ------------------
// Define an object with properties
const person = {
    name: "Big",
    age: 27,
    isDeveloper: true
};

// Access values using dot notation
console.log(person.name); // "Big"
console.log(person.age);  // 27

// Add new property
person.country = "Thailand";

// Update property
person.age = 28;

console.log(person); 
// { name: 'Big', age: 28, isDeveloper: true, country: 'Thailand' }

const user = {
    username: "big",
    score: 100
};

// Convert JS object to JSON string
const jsonString = JSON.stringify(user);
console.log(jsonString); 
// '{"username":"big","score":100}'

const json = '{"username":"big","score":100}';

// Parse JSON string into JS object
const parsed = JSON.parse(json);
console.log(parsed.username); // "big"
console.log(parsed.score);    // 100

// ------------------- Practice 1: Filter odd/even numbers ------------------
/**
 * Filter even numbers from an array.
 * @param {number[]} arr - input array of numbers
 * @returns {number[]} new array containing only even numbers
 */
function filterEven(arr) {
    const result = []; // new array for even numbers

    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];

        if (value % 2 === 0) {
            result.push(value); // add even number to result array
        }
    }

    return result;
}

/**
 * Filter odd numbers from an array.
 */
function filterOdd(arr) {
    const result = [];

    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];

        if (value % 2 !== 0) {
            result.push(value);
        }
    }

    return result;
}

// Test
const numbers_array = [1, 2, 3, 4, 5, 6, 7];

console.log("Even:", filterEven(numbers_array)); // [2, 4, 6]
console.log("Odd:", filterOdd(numbers_array));   // [1, 3, 5, 7]

// Filter even numbers: keep numbers where n % 2 === 0
const evenNumbers = numbers_array.filter(n => n % 2 === 0);

// Filter odd numbers: keep numbers where n % 2 !== 0
const oddNumbers = numbers_array.filter(n => n % 2 !== 0);

console.log("Even:", evenNumbers); // [2, 4, 6]
console.log("Odd:", oddNumbers);   // [1, 3, 5, 7]

// ------------------- Practice 2: Summary function (min, max, sum) ------------------
/**
 * Calculate min, max, and sum of an array of numbers.
 * @param {number[]} arr - input array
 * @returns {{ min: number, max: number, sum: number }}
 */
function summarizeArray(arr) {
    if (arr.length === 0) {
        // If array is empty, return null or some default
        return null;
    }

    let min = arr[0];
    let max = arr[0];
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        const value = arr[i];

        // Update min
        if (value < min) {
            min = value;
        }

        // Update max
        if (value > max) {
            max = value;
        }

        // Add to sum
        sum += value;
    }

    return { min, max, sum }; 
    // This creates an object: { min: min, max: max, sum: sum }
}

// Test
const data = [3, 7, 2, 9, 4];

const summary = summarizeArray(data);
console.log(summary);
// { min: 2, max: 9, sum: 25 }

/**
 * Same logic, but with reduce.
 */
function summarizeArrayReduce(arr) {
    if (arr.length === 0) {
        return null;
    }

    const initial = {
        min: arr[0],
        max: arr[0],
        sum: 0
    };

    const result = arr.reduce((acc, value) => {
        // Update min
        if (value < acc.min) {
            acc.min = value;
        }

        // Update max
        if (value > acc.max) {
            acc.max = value;
        }

        // Add to sum
        acc.sum += value;

        return acc; // always return the accumulator
    }, initial);

    return result;
}

// Test
const data2 = [10, 5, 8, 1, 12];
console.log(summarizeArrayReduce(data2));
// { min: 1, max: 12, sum: 36 }

// ------------------- sum of squares of even numbers ------------------
const nums = [1, 2, 3, 4, 5, 6];

// Filter even numbers → square them → reduce to sum
const total = nums
    .filter(n => n % 2 === 0) // keep even
    .map(n => n * n)          // square
    .reduce((acc, n) => acc + n, 0); // sum

console.log(total);

// ------------------ Implement ------------------
const initial = {
    even: [],
    odd: [],
    sum: 0,
    avg: 0,
    length: 0
}

const array_input = [1,2,3,4,5,6,7,8,9,10];

const result = array_input.reduce((acc, value) => {
    if (value % 2 === 0) {
        acc.even.push(value);
    } else {
        acc.odd.push(value);
    }
    acc.sum += value;
    acc.length += 1;
    return acc;
}, initial);

if (result.length > 0) {
    result.avg = result.sum / result.length;
} else {
    result.avg = 0;
}

console.log(result);

// ------------------ shorter ------------------
const array_input2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result2 = array_input.reduce((acc, value) => {
    (value % 2 === 0 ? acc.even : acc.odd).push(value);
    acc.sum += value;
    acc.length++;
    return acc;
}, { even: [], odd: [], sum: 0, avg: 0, length: 0 });

result.avg = result.length ? result.sum / result.length : 0;

console.log(result);
