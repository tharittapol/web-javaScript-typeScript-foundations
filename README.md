# Web JavaScript & TypeScript Foundations 💻⚡

A small but mighty playground for practicing **modern JavaScript**, **TypeScript**, and **basic web fundamentals** (HTML + CSS).  
All files are heavily commented so future can come back and still understand everything. 😄

---

## 📚 What’s Inside?

### 🧱 1. Simple Static Webpage (`index.html` + `style.css`)
A clean, minimal web page to practice:

- Semantic **HTML5 structure** (`<header>`, `<main>`, `<section>`, `<footer>`)
- **Responsive basics** with `meta viewport`
- **Modern CSS**:
  - CSS reset / `box-sizing: border-box`
  - Layout with flexbox
  - Typography & spacing (`rem`, line-height, etc.)
  - Simple container card-style UI

➡️ **How to use:**  
Just open `index.html` directly in browser.

---

### 🧠 2. JavaScript Fundamentals (`basic_pratice.js`)

A "from-the-basics" JS file that walks through:

- `let` vs `const` and block scope
- Function declarations, function expressions, arrow functions
- Default parameters
- Array methods:
  - `.map()`, `.filter()`, `.reduce()`
- Loops & basic algorithms:
  - Filter even/odd numbers
  - Find min/max
  - Summarize arrays
- Basic **JSON** parsing with `JSON.parse(...)`

All with **console examples** and **step-by-step comments** so can read + run + tweak.

➡️ **How to run:**

Using Node:

```bash
node basic_pratice.js
```

---

### ⏳ 3. Async JavaScript & Fetch API (`async_pratice.js`)

Learn and practice **asynchronous JavaScript**:

- What is a **Promise** and its states (`pending / fulfilled / rejected`)
- `new Promise(...)` with `resolve` / `reject`
- Using `.then()`, `.catch()`, `.finally()`
- `async` / `await` syntax
- Error handling with `try { ... } catch (error) { ... }`
- Real-world style examples using the Fetch API with `https://jsonplaceholder.typicode.com`:
  - Fetch a single post by ID
  - Fetch multiple posts
  - Handle HTTP errors when `response.ok === false`

➡️ **How to run:**

```bash
node async_pratice.js
```

---

### 🧩 4. TypeScript Practice (`typescript/ts_pratice.ts`)

A hands-on intro to **TypeScript**:

- Basic types: `string`, `number`, `boolean`
- Type annotations for variables & functions
- Interfaces & type aliases:
  - `interface User { ... }`
  - Returning only emails from `User[]`
- Extending interfaces
- Interface merging
- Simple object examples and logs

This folder also includes a minimal **TypeScript setup** with `package.json` and local `typescript` dependency.

➡️ **How to run:**

```bash
# Install TypeScript locally (if not already installed)
npm install

# Compile TypeScript → JavaScript
npx tsc ts_pratice.ts

# Run the compiled JS
node ts_pratice.js
```

---

### 🎯 Why This Repo Exists
- Build solid **foundations for Fullstack / JS / TS work**
- Have a **personal notebook** of code examples with clear explanations
- Use as a base for future:
  - Web mini-projects