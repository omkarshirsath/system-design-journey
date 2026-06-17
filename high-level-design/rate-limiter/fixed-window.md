# 1️⃣ Fixed Window Counter Algorithm

## 🔹 Short Definition

Fixed Window Counter divides time into fixed windows (e.g., 1 minute) and counts requests in each window. When the window expires, the counter resets.

---

## 🔹 How It Works

```text
Time Window: 12:00:00 → 12:01:00
Limit: 100 requests/minute
Example Flow
text
12:00:00 ────────────────────── 12:01:00
     │                              │
     ▼                              ▼
  Request 1                    Request 100
  Counter = 1                  Counter = 100
     │                              │
     ▼                              ▼
  Allowed                       Allowed
🔹 Implementation with Redis
text
Key: rate:user123:12:00
Value: 75
TTL: 60 seconds
When request arrives:

text
INCR rate:user123:12:00
If:

text
75 < 100
Allow.

Else:

text
429 Too Many Requests
🔹 Pros
Simple to implement

Memory efficient

Easy to understand

🔹 Cons
❌ Traffic spikes at window boundaries

Problem Example
text
12:00:59 → 100th request (Allowed)
12:01:00 → Counter resets
12:01:01 → 100 more requests (Allowed)

Total: 200 requests in 2 seconds
🔹 Visual Representation
text
Request Count
    │
100 │    ┌─────────────┐
    │    │             │
 50 │    │             │    ┌─────────────┐
    │    │             │    │             │
  0 └────┴─────────────┴────┴─────────────┴──► Time
        12:00            12:01           12:02

        Window 1         Window 2       Window 3
        (Reset)          (Reset)
🔹 When to Use
Simple applications

Less strict rate limiting requirements

When traffic spikes are acceptable

🔹 Interview One-Liner
"Fixed Window Counter limits requests per fixed time window but suffers from traffic bursts at window boundaries."

