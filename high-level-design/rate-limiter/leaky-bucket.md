4️⃣ Leaky Bucket Algorithm

## 🔹 Short Definition

Leaky Bucket is like a bucket with a small hole at the bottom. Water (requests) enters from the top and leaks out at a constant rate. If the bucket overflows, requests are rejected.

---

## 🔹 How It Works

```text
          ┌─────────────────────┐
          │    ┌─────────────┐  │
    ──────│───►│   Bucket    │  │
    Requests │   │   (Queue)   │  │
    Arrive   │   └─────────────┘  │
          │        │              │
          │        ▼              │
          │   Leak Rate          │
          │   Constant Rate      │
          └─────────────────────┘
                    │
                    ▼
              Process Request
🔹 Key Properties
text
Bucket Capacity: 100 requests
Leak Rate: 10 requests/second
Flow
text
Request Arrives
        │
        ▼
┌─────────────────┐
│ Check Bucket    │
│ Capacity        │
└─────────────────┘
        │
    ┌───┴───┐
    │       │
    ▼       ▼
 Has    Is Full?
 Space      │
    │       ▼
    ▼    Reject (429)
 Add to
 Queue
    │
    ▼
Process at
Leak Rate
🔹 Implementation with Redis + Queue
python
import redis
import time

class LeakyBucket:
    def __init__(self, capacity, leak_rate):
        self.capacity = capacity
        self.leak_rate = leak_rate
        self.redis = redis.Redis()
        self.key = "leaky_bucket"

    def allow_request(self):
        now = time.time()
        # Get current bucket size
        bucket_size = self.redis.llen(self.key)
        # Calculate leaks
        last_leak = float(self.redis.get(f"{self.key}_last") or now)
        leaks = int((now - last_leak) * self.leak_rate)

        if leaks > 0:
            # Remove leaked requests from queue
            self.redis.lpop(self.key, leaks)
            self.redis.set(f"{self.key}_last", now)

        bucket_size = self.redis.llen(self.key)

        if bucket_size < self.capacity:
            # Add request to queue
            self.redis.rpush(self.key, now)
            return True
        return False
🔹 Pros
✅ Constant output rate
✅ No traffic bursts
✅ Smooth processing
✅ Predictable load

🔹 Cons
❌ Cannot handle bursts
❌ Lower throughput
❌ May drop traffic unnecessarily
❌ More complex implementation

🔹 Visual Representation
text
Request Rate
    │
  ┌─┐
  │ │ ┌───┐
  │ │ │   │   ┌─────┐
  │ │ │   │   │     │
  │ │ │   │   │     │
  └─┴─┴───┴───┴─────┴─────► Time

     Input: Bursty requests


    ┌────────────────────┐
    │                    │
    │   ─────────────    │
    │  ──────────────    │
    │ ──────────────     │
    └────────────────────┘

    Output: Smooth, constant rate
🔹 Comparison: Token vs Leaky
Feature	Token Bucket	Leaky Bucket
Burst Handling	✅ Yes	❌ No
Smooth Output	✅ Yes	✅ Yes
Implementation	Moderate	Complex
Popularity	High	Low
Use Cases	API Gateways	Traffic shaping
🔹 When to Use
Network traffic shaping

When constant output rate is required

Video streaming

IoT device communication

🔹 Interview One-Liner
"Leaky Bucket processes requests at a constant rate, smoothing out traffic bursts but rejecting requests when the bucket overflows."