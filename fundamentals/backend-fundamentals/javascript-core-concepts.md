These are **very common JavaScript interview questions** (especially for MERN/Node.js). I'll explain each in the same concise format.

---

# ✅ 1. Closure

### 🔹 Short Definition

A **closure** is a function that remembers and can access variables from its outer (parent) function even after the outer function has finished executing.

---

### Example

```javascript
function counter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}

const increment = counter();

increment(); // 1
increment(); // 2
increment(); // 3
```

---

### How it Works

```text
counter() executes
        │
Creates count = 0
        │
Returns inner function
        │
Outer function finishes
        │
Inner function still remembers count
```

---

### Use Cases

* Data privacy
* Counters
* Memoization
* Event handlers

---

### Interview Golden Line

> A closure allows a function to retain access to its lexical scope even after the outer function has completed execution.

---

# ✅ 2. Higher-Order Function (HOF)

### 🔹 Short Definition

A Higher-Order Function is a function that:

* takes another function as an argument, OR
* returns another function.

---

### Example 1

```javascript
function greet(name) {
    return "Hello " + name;
}

function process(fn) {
    console.log(fn("Omkar"));
}

process(greet);
```

---

### Example 2

```javascript
const numbers = [1, 2, 3];

const doubled = numbers.map(num => num * 2);
```

Here,

```javascript
map()
```

is a Higher-Order Function.

---

### Common HOFs

* map()
* filter()
* reduce()
* forEach()
* find()
* sort()

---

### Interview Golden Line

> A Higher-Order Function either accepts another function as an argument or returns a function.

---

# ✅ 3. Callback Function

### 🔹 Short Definition

A callback is a function passed into another function to be executed later.

---

### Example

```javascript
function greet(name) {
    console.log("Hello " + name);
}

function process(callback) {
    callback("Omkar");
}

process(greet);
```

---

### Async Example

```javascript
setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);
```

Here,

```javascript
() => {}
```

is the callback.

---

### Why Used?

* Async programming
* Event handling
* API calls

---

### Interview Golden Line

> A callback is a function passed as an argument to another function and executed later.

---

# ✅ 4. Garbage Collection

### 🔹 Short Definition

Garbage Collection is the automatic process of removing unused memory.

JavaScript automatically frees memory that is no longer reachable.

---

### Example

```javascript
let person = {
    name: "Omkar"
};

person = null;
```

Now,

```javascript
{
    name: "Omkar"
}
```

has no references.

Garbage Collector removes it.

---

### How it Works

```text
Create Object
      │
Reference Exists
      │
Reference Removed
      │
Garbage Collector Frees Memory
```

---

### JavaScript Uses

**Mark-and-Sweep Algorithm**

1. Start from global objects.
2. Mark all reachable objects.
3. Remove unreachable objects.

---

### Example

```javascript
let obj1 = {
    name: "Omkar"
};

let obj2 = obj1;

obj1 = null;
```

Object is **not** removed because:

```text
obj2
  │
  ▼
Object
```

Still reachable.

---

Now:

```javascript
obj2 = null;
```

No references remain.

Garbage Collector removes it.

---

### Interview Golden Line

> JavaScript uses automatic garbage collection (Mark-and-Sweep) to free memory occupied by objects that are no longer reachable.

---

# 🎯 Quick Comparison

| Concept               | Meaning                             | Example                         |
| --------------------- | ----------------------------------- | ------------------------------- |
| Closure               | Remembers outer variables           | Counter function                |
| Higher-Order Function | Takes or returns functions          | `map()`, `filter()`             |
| Callback Function     | Function passed to another function | `setTimeout()`, event listeners |
| Garbage Collection    | Automatically frees unused memory   | Object with no references       |

---

# 🏆 Frequently Asked JavaScript Interview Topics (After These)

Since you're preparing for **16–20 LPA**, these are the next topics I'd recommend:

1. ✅ Closures
2. ✅ Higher-Order Functions
3. ✅ Callbacks
4. ✅ Promises
5. ✅ Async/Await
6. ✅ Event Loop
7. ✅ Call Stack
8. ✅ Microtasks vs Macrotasks
9. ✅ `this` keyword
10. ✅ `call()`, `apply()`, `bind()`
11. ✅ Hoisting
12. ✅ Prototypal Inheritance
13. ✅ Memory Leaks
14. ✅ Debouncing & Throttling
15. ✅ Shallow Copy vs Deep Copy

These are asked very frequently in senior MERN and Node.js interviews.
