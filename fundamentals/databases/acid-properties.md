# ✅ ACID Properties

### 🔹 Short Definition

ACID is a set of rules that ensures database transactions are processed correctly, safely, and reliably.

ACID stands for:

A → Atomicity
C → Consistency
I → Isolation
D → Durability

Payment systems, banking systems, UPI, and order systems heavily depend on ACID.

---

## Example Scenario

Suppose:

Omkar Account = ₹10,000
Rahul Account = ₹5,000

Omkar transfers:

₹2,000

to Rahul.

Before Transfer:

Omkar = ₹10,000

Rahul = ₹5,000

After Transfer:

Omkar = ₹8,000

Rahul = ₹7,000

---

## 1️⃣ Atomicity

### Meaning

Either all operations happen or none happen.

Transfer consists of:

Step 1:
Deduct ₹2,000 from Omkar

Step 2:
Add ₹2,000 to Rahul

Suppose:

Step 1 completed

but

Step 2 failed

because database crashed.

Without Atomicity:

Omkar = ₹8,000

Rahul = ₹5,000

₹2,000 vanished ❌

With Atomicity:

Database rolls back.

Omkar = ₹10,000

Rahul = ₹5,000

Everything restored.

✅ Safe

---

## 2️⃣ Consistency

### Meaning

Database must always remain valid before and after transaction.

Example:

Total money:

₹10,000 + ₹5,000

= ₹15,000

After transfer:

₹8,000 + ₹7,000

= ₹15,000

Still valid.

✅ Consistent

Bad Example:

Omkar = ₹8,000

Rahul = ₹6,000

Total:

₹14,000

₹1,000 disappeared.

❌ Inconsistent

---

## 3️⃣ Isolation

### Meaning

Multiple transactions should not interfere with each other.

Example:

Current balance:

₹10,000

Two transactions happen simultaneously.

Transaction A
Withdraw ₹4,000
Transaction B
Withdraw ₹7,000

Without Isolation:

Both read:

Balance = ₹10,000

Both proceed.

Result:

₹11,000 withdrawn

from account having only ₹10,000.

❌ Wrong

With Isolation:

Database locks or manages transactions.

One transaction completes first.

Second transaction sees updated balance.

✅ Correct

---

## 4️⃣ Durability

### Meaning

Once transaction is committed, it stays forever.

Example:

Transfer successful.

Database says:

COMMIT

Immediately after:

Power failure
Server crash

After restart:

Omkar = ₹8,000

Rahul = ₹7,000

Still preserved.

✅ Durable

---

## Real SQL Transaction

```sql
BEGIN;

UPDATE accounts
SET balance = balance - 2000
WHERE user_id = 1;

UPDATE accounts
SET balance = balance + 2000
WHERE user_id = 2;

COMMIT;

If any step fails:

sql
ROLLBACK;
Database restores previous state.

Easy Interview Memory Trick
Think:

A = All or Nothing
C = Correct State
I = Independent Transactions
D = Data Never Lost

Why SQL is Preferred for Payments?
Because SQL databases like:

PostgreSQL
MySQL

provide strong ACID guarantees.

This is why payment systems, banking systems, and financial ledgers use SQL.

🎯 Interview Golden Line
ACID ensures that transactions are processed safely: Atomicity prevents partial updates, Consistency maintains valid data, Isolation prevents concurrent transaction conflicts, and Durability guarantees committed data survives failures.