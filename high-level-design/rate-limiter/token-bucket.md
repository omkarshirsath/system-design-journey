# 3️⃣ Token Bucket Algorithm (Most Popular)

## 🔹 Short Definition

Token Bucket uses a bucket filled with tokens at a fixed rate. Each request consumes one token. If the bucket is empty, the request is rejected.

---

## 🔹 How It Works

### Bucket Properties

```text
Capacity = 100 tokens
Refill Rate = 10 tokens/second
Flow
text
        ┌─────────────────────┐
        │   Token Bucket       │
        │   Capacity: 100      │
        │   Current: 75        │
        │                      │
        │   Tokens refill at   │
        │   10 tokens/second   │
        └─────────────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
         ▼                     ▼
    Request Arrives      Token Available?
         │                     │
         ▼                     ▼
    Consume 1 Token        YES ──► Allow
    Bucket = 74               │
                              ▼
                            NO ──► Reject (429)
🔹 Implementation with Redis
Using Lua Script (Atomic)
lua
-- Token Bucket Lua Script
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local tokens_per_request = tonumber(ARGV[3])
local current_time = tonumber(ARGV[4])

local bucket = redis.call('hmget', key, 'tokens', 'last_refill')
local tokens = tonumber(bucket[1]) or capacity
local last_refill = tonumber(bucket[2]) or current_time

-- Calculate tokens to add
local time_passed = current_time - last_refill
local tokens_to_add = math.floor(time_passed * refill_rate)

-- Update tokens
tokens = math.min(capacity, tokens + tokens_to_add)

-- Check if enough tokens
if tokens >= tokens_per_request then
    tokens = tokens - tokens_per_request
    redis.call('hmset', key, 'tokens', tokens, 'last_refill', current_time)
    redis.call('expire', key, 60)
    return 1  -- Allow
else
    return 0  -- Reject
end
Usage
text
redis-cli --eval token_bucket.lua rate:user123 , 100 10 1 <current_time>
🔹 Pros
✅ Handles traffic bursts
✅ Smooth traffic distribution
✅ Simple to understand
✅ Widely used (AWS API Gateway, NGINX, Cloudflare)

🔹 Cons
❌ Requires atomic operations (Lua script)
❌ More complex than fixed window
❌ Need to handle time synchronization

🔹 Visual Representation
text
Tokens
  │
100│ ████████████████████  ──────────
  │ ████████████████████   │ Refill  │
 50│ ████████████████      │ Rate    │
  │ ████████████           │         │
  0└──────────────────────────────► Time
    │                         │
    ▼                         ▼
  Request arrives        Tokens refill
  Consumes token         at 10/sec
🔹 Real-World Examples
AWS API Gateway
text
Default: 10,000 requests/second per region
Burst capacity available
NGINX
text
limit_req_zone $binary_remote_addr zone=mylimit:10m rate=10r/s;
Cloudflare
text
Rate limiting rules with burst and period
🔹 When to Use
Most production systems

API gateways

Microservices

When bursts are expected

🔹 Interview One-Liner
"Token Bucket algorithm places tokens in a bucket at a fixed rate, allowing requests to consume tokens and handle bursts efficiently."