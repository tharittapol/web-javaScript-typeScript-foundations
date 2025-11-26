// -------------------------------------------------------
// TypeScript intro
// Topics:
//   - Basic types: string, number, boolean
//   - Type annotations for variables and functions
//   - Interfaces vs types
// Practice:
//   - Define interface User (id, name, email)
//   - Function that takes User[] and returns only emails
//   - Compile with tsc and run with Node
// -------------------------------------------------------
// 1) BASIC TYPES & VARIABLE ANNOTATIONS
// --------------------------------------
// Explicit type annotations for variables
var username = "Big"; // string type
var age = 26; // number type
var isDeveloper = true; // boolean type
// You can also let TypeScript infer types (no annotation):
var city = "Bangkok"; // inferred as string
// city = 123; // ❌ Error: Type 'number' is not assignable to type 'string'
// 2) FUNCTION TYPE ANNOTATIONS
// --------------------------------------
// Function with parameter and return types
function add(a, b) {
    return a + b;
}
// Arrow function with types
var multiply = function (a, b) {
    return a * b;
};
// Function that returns nothing → use 'void'
function logMessage(message) {
    console.log("LOG:", message);
}
// Example of using them:
var p1 = { x: 10, y: 20 };
var p2 = { x: 5, y: 15 };
var Person1 = { id: 1 };
console.log("Person1 :", Person1);
// const Person2: AdminPerson = { id: 2 }; // ❌ Error: Property 'role' is missing
// console.log(Person2);
var Person3 = { id: 3, role: "superadmin" };
console.log("Person3 extended :", Person3);
// ❌ type cannot do this.
// If you write type Member = ... twice, it’s an error.
// const Member1: Member = {
//     id: 1
// };
// console.log("Member1 :", Member1); // ❌ Error: Property 'name' is missing
var Member2 = {
    id: 2,
    name: "Big"
};
console.log("Member2 merged :", Member2);
// Implement greet on an object
var Member3 = {
    id: 3,
    name: "Bigky",
    greet: function () {
        console.log("Hello, I'm ".concat(this.name));
    }
};
Member3.greet();
console.log("-------------------------------------------");
var value1 = "Hello";
console.log("value1:", value1);
value1 = 42;
console.log("value1:", value1);
value1 = null;
console.log("value1:", value1);
var currentStatus = "pending";
console.log("currentStatus:", currentStatus);
currentStatus = "success";
console.log("currentStatus:", currentStatus);
var userA = {
    id: 1,
    name: "Big",
    email: "big@example.com",
    // age is optional
};
console.log("userA:", userA);
var userB = {
    id: 2,
    name: "Bigky",
    email: "bigky@example.com",
    age: 26
};
console.log("userB:", userB);
// Function that accepts score as number or string and returns number
function normalizeScore(input) {
    // If it's already a number, return directly
    if (typeof input === "number") {
        return input;
    }
    // If it's a string, try to parse
    var parsed = Number(input);
    if (isNaN(parsed)) {
        // Not a Number
        // If parsing fails, default to 0
        return 0;
    }
    return parsed;
}
console.log("normalizeScore(95):", normalizeScore(95));
console.log("normalizeScore('88'):", normalizeScore("88"));
console.log("normalizeScore('not a number'):", normalizeScore("not a number"));
// Function that calculates area for different shapes
function getArea(shape) {
    // TS will narrow automatically based on shape.kind
    if (shape.kind === "circle") {
        return Math.PI * shape.radius * shape.radius;
    }
    else {
        // Here shape is Rectangle
        return shape.width * shape.height;
    }
}
var c = { kind: "circle", radius: 10 };
var r = { kind: "rectangle", width: 5, height: 4 };
console.log("Circle area:", getArea(c));
console.log("Rectangle area:", getArea(r));
// Function that takes an array of User and returns an array of emails (string[])
function getEmails(users) {
    // users: User[]  → array of objects that conform to User interface
    // Return only emails using map
    return users.map(function (user) { return user.email; });
}
// 5) EXAMPLE DATA + RUN FUNCTION
// -------------------------------------------
// Sample array of User objects
var users = [
    { id: 1, name: "Big", email: "big@example.com" },
    { id: 2, name: "Bigky", email: "bigky@example.com" },
    { id: 3, name: "Tharittapol", email: "tharittapol@example.com" }
];
// Use our getEmails function
var emails = getEmails(users);
// Log results
console.log("-------------------------------------------");
console.log("Username:", username);
console.log("Age:", age);
console.log("Is developer:", isDeveloper);
console.log("Point p1:", p1);
console.log("Point p2:", p2);
console.log("All emails:", emails);
// You can also call the other functions:
console.log("add(2, 3) =", add(2, 3));
console.log("multiply(4, 5) =", multiply(4, 5));
logMessage("TypeScript is working! 😄");
console.log("-------------------------------------------");
function identifyUser(input) {
    if (typeof input === "number") {
        return "User ID: ".concat(input);
    }
    else {
        return "Username: ".concat(input);
    }
}
console.log(identifyUser(101));
console.log(identifyUser("BigUser"));
function canRefund(status) {
    return status === "paid" || status === "shipped";
}
console.log(canRefund("paid"));
console.log(canRefund("shipped"));
console.log(canRefund("cancelled"));
function printResult(result) {
    if ("data" in result) {
        // Inside this branch, TS knows:
        // result: SuccessResult
        // so 'result.data' is available
        console.log("SUCCESS:", result.data);
    }
    else {
        // Here, TS knows:
        // result: ErrorResult
        // so result.error is available
        console.log("ERROR:", result.error);
    }
}
printResult({ ok: true, data: "Data loaded successfully." });
printResult({ ok: false, error: "Failed to load data." });
function describePayment(p) {
    switch (p.type) {
        case "cash":
            return "Payment by cash";
        case "credit":
            return "Payment by credit card ****".concat(p.cardNumber.slice(-4)); // last 4 digits
        case "promptpay":
            return "Payment by PromptPay (phone: ".concat(p.phone, ")");
        default: {
            var _exhaustive = p;
            return _exhaustive;
        }
    }
}
var pay1 = { type: "cash" };
var pay2 = { type: "credit", cardNumber: "1234567812345678" };
var pay3 = { type: "promptpay", phone: "089-123-4567" };
var pay4 = { phone: "089-123-4567" };
console.log(describePayment(pay1));
console.log(describePayment(pay2));
console.log(describePayment(pay3));
console.log(describePayment(pay4));
/*
Summary table (mental model)

- Similarities
    - Both can describe object shapes
    - Both support:
        - optional ?
        - readonly
        - generics
        - extending / combining (with extends / &)
    - Classes can implement both

- type is better when:
    - You need unions:
        - type Status = "pending" | "success" | "error";
    - You need primitives or simple aliases:
        - type ID = number;
    - You need mapped / conditional types
    - You want to build complex composite types:
        - type ApiResult = Success | Error | Loading;

- interface is better when:
    - You’re defining object contracts for:
        - APIs
        - Class shapes
        - Data models
        - You need declaration merging or module augmentation
        - You are designing a library used by other people
*/
