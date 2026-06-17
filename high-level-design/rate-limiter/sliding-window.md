# 2️⃣ Sliding Window Algorithm (Recommended)

## 🔹 Short Definition

Sliding Window tracks requests in the last N seconds (e.g., last 60 seconds) rather than fixed time windows. This provides more accurate rate limiting.

---

## 🔹 How It Works

Instead of fixed minutes:

System always checks last 60 seconds.

### Example

```text
Current Time = 12:01:00
Checks:

text
12:00:00 → 12:01:00
Only.

🔹 Implementation with Redis
Approach 1: Sorted Set
text
Key: rate:user123
Members: Timestamps of requests
When request arrives:

text
ZADD rate:user123 <timestamp>
ZREMRANGEBYSCORE rate:user123 0 <current_time - 60>
COUNT = ZCARD rate:user123
If:

text
COUNT < 100
Allow.

Else:

text
429 Too Many Requests
Approach 2: Sliding Log
text
Requests in last 60 seconds:
[12:00:01, 12:00:05, 12:00:10, ..., 12:00:59]
Count = 100

If request at 12:01:00:

Check requests from 12:00:00 to 12:01:00

If count < 100:

text
Allow
🔹 Visual Representation
text
Fixed Window (Problem)
Request Count
    │
100 │    ┌─────────────┐
    │    │             │  ┌─────────────┐
    │    │             │  │             │
  0 └────┴─────────────┴──┴─────────────┴──► Time
        12:00           12:01          12:02
        (Spike at boundary!)


Sliding Window (Solution)
Request Count
    │
100 │    ──────────────
    │    │            │
 50 │    │            │
    │    │            │
  0 └────┴────────────┴──────────────► Time
        12:00        12:01        12:02
        (Smooth traffic!)
🔹 Pros
✅ More accurate than fixed window
✅ Smoother traffic distribution
✅ No boundary spikes

🔹 Cons
❌ Higher memory usage (stores timestamps)
❌ More complex implementation
❌ Slightly higher latency

🔹 Memory Optimization
Instead of storing all timestamps, use:

text
Sliding Window Counter (Hybrid)
Example:

text
Previous Window: 12:00:00 → 12:00:59
Current Window: 12:01:00 → 12:01:59
Weighted formula:

text
Rate = (prev_window_count * weight) + current_count
🔹 When to Use
Production systems

Strict rate limiting requirements

API gateways

🔹 Interview One-Liner
"Sliding Window maintains a rolling window of last N seconds, eliminating traffic spikes at boundaries but requiring more memory for timestamp storage."