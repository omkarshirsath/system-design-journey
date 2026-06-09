```markdown
# First: Why SOLID was created?

Imagine you join a company.

You see this code:

```ts
class UserService {
  createUser() {}
  sendEmail() {}
  saveToDatabase() {}
  generateReport() {}
  exportPDF() {}
}
```

After 2 years:

```ts
class UserService {
  // 5000 lines of code 😭
}
```

Now:

* Every change breaks something
* Testing becomes difficult
* Adding features is scary
* Developers hate touching the code

SOLID was created to solve these problems.

Think of SOLID as:

> "Rules for writing code that is easy to change, test, and maintain."

---

# S = Single Responsibility Principle (SRP)

## Baby Example

Imagine a person who is:

* Teacher
* Driver
* Cook
* Doctor
* Electrician

Can he do everything properly?

Probably not.

Each person should have **one responsibility**.

---

## Bad Example

```ts
class UserService {
  createUser() {
    console.log("User Created");
  }

  sendWelcomeEmail() {
    console.log("Email Sent");
  }

  generateReport() {
    console.log("Report Generated");
  }
}
```

Problems:

* User logic
* Email logic
* Report logic

All mixed together.

---

## Good Example

```ts
class UserService {
  createUser() {
    console.log("User Created");
  }
}

class EmailService {
  sendWelcomeEmail() {
    console.log("Email Sent");
  }
}

class ReportService {
  generateReport() {
    console.log("Report Generated");
  }
}
```

Now every class has one job.

### Interview One-Liner

> "A class should have only one reason to change."

---

# O = Open Closed Principle (OCP)

## Baby Example

Imagine a TV.

You can connect:

* Fire Stick
* Playstation
* Set Top Box

Without opening and modifying the TV.

TV is:

* Open for extension
* Closed for modification

---

## Bad Example

```ts
class PaymentService {
  processPayment(type: string) {
    if (type === "UPI") {
      console.log("UPI");
    }

    if (type === "CARD") {
      console.log("CARD");
    }
  }
}
```

Now company adds:

* PayPal
* Apple Pay
* Crypto

You keep modifying code.

Dangerous.

---

## Good Example

### Step 1

```ts
interface PaymentMethod {
  pay(): void;
}
```

---

### Step 2

```ts
class UpiPayment implements PaymentMethod {
  pay() {
    console.log("UPI Payment");
  }
}

class CardPayment implements PaymentMethod {
  pay() {
    console.log("Card Payment");
  }
}
```

---

### Step 3

```ts
class PaymentService {
  process(payment: PaymentMethod) {
    payment.pay();
  }
}
```

Usage:

```ts
const payment = new UpiPayment();

const service = new PaymentService();

service.process(payment);
```

Tomorrow:

```ts
class PaypalPayment implements PaymentMethod {
  pay() {
    console.log("Paypal");
  }
}
```

No existing code changed.

### Interview One-Liner

> "Software should be open for extension but closed for modification."

---

# L = Liskov Substitution Principle (LSP)

## Baby Example

Suppose:

Animal → Parent

Dog → Child

If I replace Animal with Dog, program should still work.

---

## Bad Example

```ts
class Bird {
  fly() {}
}
```

```ts
class Penguin extends Bird {
  fly() {
    throw new Error("Can't Fly");
  }
}
```

Problem:

Penguin is a Bird.

But cannot fly.

Code breaks.

---

## Good Example

```ts
class Bird {}
```

```ts
class FlyingBird extends Bird {
  fly() {}
}
```

```ts
class Sparrow extends FlyingBird {}
```

```ts
class Penguin extends Bird {}
```

Now everything makes sense.

### Interview One-Liner

> "Child classes should be replaceable for parent classes without breaking behavior."

---

# I = Interface Segregation Principle (ISP)

## Baby Example

Imagine a restaurant forcing everyone to order:

* Pizza
* Burger
* Pasta
* Ice Cream

Even if you only want pizza.

Bad experience.

---

## Bad Example

```ts
interface Worker {
  code(): void;
  test(): void;
  deploy(): void;
}
```

Frontend developer:

```ts
class FrontendDev implements Worker {
  code() {}
  test() {}
  deploy() {}
}
```

Forced to implement everything.

---

## Good Example

```ts
interface Coder {
  code(): void;
}
```

```ts
interface Tester {
  test(): void;
}
```

```ts
interface Deployer {
  deploy(): void;
}
```

Now:

```ts
class FrontendDev implements Coder {
  code() {
    console.log("Coding");
  }
}
```

Only what is needed.

### Interview One-Liner

> "Clients should not be forced to depend on methods they don't use."

---

# D = Dependency Inversion Principle (DIP)

This is the most asked SOLID principle in interviews.

---

## Baby Example

Imagine a phone charger.

Phone doesn't care if charger is:

* Samsung
* OnePlus
* Apple

Phone only cares:

> "Give me power."

That's an abstraction.

---

## Bad Example

```ts
class MySQLDatabase {
  save() {
    console.log("Saved in MySQL");
  }
}
```

```ts
class UserService {
  private db = new MySQLDatabase();

  createUser() {
    this.db.save();
  }
}
```

Problem:

UserService is tightly coupled to MySQL.

Tomorrow company says:

> Use MongoDB

Now modify UserService.

---

## Good Example

### Interface

```ts
interface Database {
  save(): void;
}
```

---

### MySQL

```ts
class MySQLDatabase implements Database {
  save() {
    console.log("Saved in MySQL");
  }
}
```

---

### MongoDB

```ts
class MongoDatabase implements Database {
  save() {
    console.log("Saved in MongoDB");
  }
}
```

---

### UserService

```ts
class UserService {
  constructor(private db: Database) {}

  createUser() {
    this.db.save();
  }
}
```

Usage:

```ts
const db = new MySQLDatabase();

const userService = new UserService(db);

userService.createUser();
```

Later:

```ts
const db = new MongoDatabase();

const userService = new UserService(db);
```

No code changes inside UserService.

### Interview One-Liner

> "High-level modules should depend on abstractions, not concrete implementations."

---

# How SOLID Looks in a Real Project

Suppose you're building an HRMS.

### Without SOLID

```text
EmployeeService

- Create Employee
- Send Email
- Generate PDF
- Save DB
- Upload File
- Calculate Salary
```

5000+ lines.

Everyone is afraid to modify it.

---

### With SOLID

```text
EmployeeService
     |
     ├── EmailService
     ├── SalaryService
     ├── ReportService
     ├── FileUploadService
     └── Database Interface
```

Benefits:

✅ Easier testing

✅ Easier maintenance

✅ Easier debugging

✅ Easier onboarding

✅ Easier feature addition

---

# Easiest Interview Answer

If interviewer asks:

**"Why do we use SOLID?"**

Answer:

> "SOLID principles help us write loosely coupled, maintainable, extensible, and testable code. They reduce code duplication, make future changes safer, and improve overall software design."

That's usually enough for a 4–5 YOE interview unless they ask for a deeper example.
```