# 🔹 Idempotency (VERY IMPORTANT)

### Definition:

Idempotency means:

> The same payment request executed multiple times should create only one successful transaction.

---

## Why Needed?

Imagine:

User clicks Pay button.

Request:
Pay ₹1000

text

Network issue happens.

Frontend retries.

Now:
Request 1 → Payment ₹1000
Request 2 → Payment ₹1000

text

Without protection:

❌ User charged ₹2000

---

# Solution: Idempotency Key

Frontend sends:

```json
{
"idempotency_key":"abc123",
"amount":1000
}
Backend stores:

text
abc123 → SUCCESS
If same request comes again:

Backend checks:

text
Already processed
Returns old response.

🔹 Transaction State Machine
Payment should not directly jump:

text
START → SUCCESS
Instead:

text
          ┌─────────┐
          │ CREATED │
          └────┬────┘
               │
               ▼
          ┌─────────┐
          │ PENDING │
          └────┬────┘
               │
       ┌───────┴────────┐
       ▼                ▼
  ┌────────┐       ┌────────┐
  │SUCCESS │       │FAILED  │
  └────────┘       └────────┘
🔹 Why Queue Used?
Payment completion triggers:

Email

Invoice generation

Order confirmation

Do not do:

text
Payment API
 |
 Email
 |
 Invoice
because it increases latency.

Instead:

text
Payment Service
      |
      ▼
 Kafka
      |
      ▼
Other Services
🔹 Handling Payment Failure
Example:

Bank response:

text
TIMEOUT
System should:

Keep status:

text
PENDING
Retry verification

Ask gateway:

text
What is final status?
🔹 Example: 1 Million Payments
If:

text
1 million users pay simultaneously
System uses:

Multiple payment servers

Load balancer

Database replication

Queue for async tasks

Partitioned transaction processing