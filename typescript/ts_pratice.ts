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
let username: string = "Big";   // string type
let age: number = 26;           // number type
let isDeveloper: boolean = true; // boolean type

// You can also let TypeScript infer types (no annotation):
let city = "Bangkok"; // inferred as string
// city = 123; // ❌ Error: Type 'number' is not assignable to type 'string'


// 2) FUNCTION TYPE ANNOTATIONS
// --------------------------------------

// Function with parameter and return types
function add(a: number, b: number): number {
    return a + b;
}

// Arrow function with types
const multiply = (a: number, b: number): number => {
    return a * b;
};

// Function that returns nothing → use 'void'
function logMessage(message: string): void {
    console.log("LOG:", message);
}



// 3) INTERFACE vs TYPE (basic usage)
// ---------------------------------------

// interface: usually used to describe the shape of an OBJECT
// Can be extended and merged.
interface Point {
    x: number;
    y: number;
}

// type: more general alias, can represent unions, primitives, etc.
type PointAlias = {
    x: number;
    y: number;
};

// Example of using them:
const p1: Point = { x: 10, y: 20 };
const p2: PointAlias = { x: 5, y: 15 };

// extending interface
// --------------------------------------
interface Person {
  id: number;
}
interface AdminPerson extends Person {
  role: string;
}
const Person1: Person = { id: 1 };
console.log("Person1 :", Person1);
// const Person2: AdminPerson = { id: 2 }; // ❌ Error: Property 'role' is missing
// console.log(Person2);
const Person3: AdminPerson = { id: 3, role: "superadmin" };
console.log("Person3 extended :", Person3);

// Merging interfaces
// --------------------------------------
interface Member {
    id: number;
}
interface Member {
    name: string;
}
// ❌ type cannot do this.
// If you write type Member = ... twice, it’s an error.

// const Member1: Member = {
//     id: 1
// };
// console.log("Member1 :", Member1); // ❌ Error: Property 'name' is missing
const Member2: Member = {
    id: 2,
    name: "Big"
};
console.log("Member2 merged :", Member2);

// Another example: add methods in a separate declaration
interface MemberGreet {
    id: number;
}
interface MemberGreet {
    name: string;
}
interface MemberGreet {
    // add methods in another merge block
    greet(): void;
}

// Implement greet on an object
const Member3: MemberGreet = {
    id: 3,
    name: "Bigky",
    greet() {
        console.log(`Hello, I'm ${this.name}`);
    }
};
Member3.greet();
console.log("-------------------------------------------");

// union type
type StringOrNumberOrNull = string | number | null;
let value1: StringOrNumberOrNull = "Hello";
console.log("value1:", value1);
value1 = 42;
console.log("value1:", value1);
value1 = null;
console.log("value1:", value1);
// value1 = true; // ❌ Error: Type 'boolean' is not assignable to type 'StringOrNumberOrNull'

// union with literal types
type Status = "pending" | "success" | "error";
let currentStatus: Status = "pending";
console.log("currentStatus:", currentStatus);
currentStatus = "success";
console.log("currentStatus:", currentStatus);
// currentStatus = "done"; // ❌ Error: "done" not assignable to Status

// type aliases for primitives
type UserId = number;
type Email = string;
type Age = number;

// type alias for object shape
// Similar to interface, but using type
type Account = {
    id: UserId;
    name: string;
    email: Email;
    age?: Age; // optional property
};

const userA: Account = {
    id: 1,
    name: "Big",
    email: "big@example.com",
    // age is optional
};
console.log("userA:", userA);

const userB: Account = {
    id: 2,
    name: "Bigky",
    email: "bigky@example.com",
    age: 26
};
console.log("userB:", userB);

// function using union types
type Score = number;
type ScoreInput = Score | string; // e.g. 100 or "100"

// Function that accepts score as number or string and returns number
function normalizeScore(input: ScoreInput): number {
    // If it's already a number, return directly
    if (typeof input === "number") {
        return input;
    }

    // If it's a string, try to parse
    const parsed = Number(input);
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

// discriminated unions

type Circle = {
    kind: "circle";
    radius: number;
};
type Rectangle = {
    kind: "rectangle";
    width: number;
    height: number;
};
type Shape = Circle | Rectangle;

// Function that calculates area for different shapes
function getArea(shape: Shape): number {
    // TS will narrow automatically based on shape.kind
    if (shape.kind === "circle") {
        return Math.PI * shape.radius * shape.radius;
    } else {
        // Here shape is Rectangle
        return shape.width * shape.height;
    }
}

const c: Circle = { kind: "circle", radius: 10 };
const r: Rectangle = { kind: "rectangle", width: 5, height: 4 };
console.log("Circle area:", getArea(c));
console.log("Rectangle area:", getArea(r));


// 4) PRACTICE: User interface and getEmails()
// -------------------------------------------

// Define interface User with id, name, email
interface User {
    id: number;
    name: string;
    email: string;
}

// Function that takes an array of User and returns an array of emails (string[])
function getEmails(users: User[]): string[] {
    // users: User[]  → array of objects that conform to User interface
    // Return only emails using map
    return users.map((user: User) => user.email);
}



// 5) EXAMPLE DATA + RUN FUNCTION
// -------------------------------------------

// Sample array of User objects
const users: User[] = [
    { id: 1, name: "Big",         email: "big@example.com" },
    { id: 2, name: "Bigky",       email: "bigky@example.com" },
    { id: 3, name: "Tharittapol", email: "tharittapol@example.com" }
];

// Use our getEmails function
const emails = getEmails(users);

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


// EXERCISE 1 — BASIC ALIASES & UNIONS
type Id = number ;
type IdOrUsername = Id | string ;

function identifyUser(input: IdOrUsername): string {
    if (typeof input === "number") {
        return `User ID: ${input}`;
    } else {
        return `Username: ${input}`;
    }
}
console.log(identifyUser(101));
console.log(identifyUser("BigUser"));

// EXERCISE 2 — STATUS UNION & FUNCTION
type OrderStatus = "created" | "paid" | "shipped" | "delivered" | "cancelled";

function canRefund(status: OrderStatus): boolean {
    return status === "paid" || status === "shipped";
}
console.log(canRefund("paid"));
console.log(canRefund("shipped"));
console.log(canRefund("cancelled"));

// EXERCISE 3 — RESULT TYPE (SUCCESS | ERROR)
// ok is a literal type here: exactly true
type SuccessResult = {
    ok: true;
    data: string;
};

// ok is exactly false here, and use 'error' instead of 'data'
type ErrorResult = {
    ok: false;
    error: string;
};

// Union of both
type ApiResult = SuccessResult | ErrorResult;

function printResult(result: ApiResult): void {
    if ("data" in result) {
        // Inside this branch, TS knows:
        // result: SuccessResult
        // so 'result.data' is available
        console.log("SUCCESS:", result.data);
    } else {
        // Here, TS knows:
        // result: ErrorResult
        // so result.error is available
        console.log("ERROR:", result.error);
    }
}

printResult({ ok: true, data: "Data loaded successfully." });
printResult({ ok: false, error: "Failed to load data." });

// EXERCISE 4 — DISCRIMINATED UNION: PAYMENT METHODS
type CashPayment = {
    type: "cash";
};
type CreditPayment = {
    type: "credit";
    cardNumber: string;
};
type PromptPayPayment = {
    type?: "promptpay";
    phone: string;
};
type Payment = CashPayment | CreditPayment | PromptPayPayment;

function describePayment(p: Payment): string {
    switch (p.type) {
        case "cash":
            return "Payment by cash";
        case "credit":
            return `Payment by credit card ****${p.cardNumber.slice(-4)}`; // last 4 digits
        case "promptpay":
            return `Payment by PromptPay (phone: ${p.phone})`;
        default: {
            const _exhaustive: never = p;
            return _exhaustive;
        }
    }
}

const pay1: CashPayment = { type: "cash" };
const pay2: CreditPayment = { type: "credit", cardNumber: "1234567812345678" };
const pay3: PromptPayPayment = { type: "promptpay", phone: "089-123-4567" };
const pay4: PromptPayPayment = { phone: "089-123-4567" };
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
