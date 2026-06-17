# ✅ Design Rate Limiter

### 🔹 Short Definition

A Rate Limiter controls how many requests a user can make within a specific time period.

Example:

```text
100 requests per minute per user
If the limit is exceeded:

text
HTTP 429 - Too Many Requests
🔹 Main Goal
Prevent abuse

Prevent DDoS attacks

Protect backend services

Ensure fair usage

✅ STEP 1 — Requirements
Functional
Limit requests per user

Limit requests per IP

Limit requests per API

Return HTTP 429 when limit exceeded

Non-Functional
Low latency

Highly scalable

Distributed

Accurate

🧱 STEP 2 — High-Level Design
text
                ┌──────────┐
                │  Client  │
                └─────┬────┘
                      │
                      ▼
             ┌────────────────┐
             │ Rate Limiter    │
             │ Middleware      │
             └───────┬────────┘
                     │
            Allowed? │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼
   Forward Request         Return 429
         │
         ▼
   API Server
         │
         ▼
      Database


             ┌──────────────┐
             │ Redis Cache  │
             └──────────────┘
🔄 FLOW
Request Allowed
text
Client
 ↓
Rate Limiter
 ↓
Check Counter
 ↓
Limit Not Reached
 ↓
Allow Request
Request Blocked
text
Client
 ↓
Rate Limiter
 ↓
Check Counter
 ↓
Limit Exceeded
 ↓
HTTP 429
👤 USER JOURNEY
Example
Limit:

text
100 requests/minute
Request 1
User sends request.

Redis:

text
user123 = 1
Allowed.

Request 50
Redis:

text
user123 = 50
Allowed.

Request 100
Redis:

text
user123 = 100
Allowed.

Request 101
Redis:

text
user123 = 101
Blocked.

Response:

text
429 Too Many Requests
🗄️ STEP 3 — Database Design
Normally we do NOT use database.

Use Redis.

Example:

text
Key: user123
Value: 50
TTL: 60 seconds
After 60 sec:

text
Counter resets automatically
SQL vs NoSQL
SQL
Slow for every request

Too many writes

Not ideal

NoSQL (Redis)
Extremely fast

In-memory

Supports TTL

Perfect for counters

✅ Final Recommendation
👉 Use Redis

Reason:

Rate limiter requires:

fast reads

fast writes

automatic expiration

🔹 Redis Implementation
text
Key: rate:user123
Value: 75
TTL: 60 sec
When request arrives:

text
INCR rate:user123
Redis:

text
75 → 76
If:

text
76 < 100
Allow.

Else:

text
429 Too Many Requests
🔹 Why Redis Used?
Because:

text
1 million requests/sec
cannot hit database.

Redis:

in-memory

microsecond operations

TTL support

🔹 Example: 1 Million Active Users
Suppose:

text
1M users
Each:

text
10 requests/min
Total:

text
10 million requests/min
Redis can handle this efficiently.

🔹 Example: 100 API Servers
All servers use same Redis.

text
API 1
API 2
API 3
...
API 100
      ↓
    Redis
All share same counters.

This keeps limits consistent.

🚀 STEP 5 — Scaling
Redis Cluster → distribute counters across nodes

Load Balancer → distribute incoming traffic

Token Bucket Algorithm → handle bursts smoothly

Distributed Redis → avoid single point of failure

Local Cache → reduce Redis calls for hot users

⚠️ STEP 6 — Bottlenecks
Redis overload

Hot users generating huge traffic

Redis node failure

Network latency

Counter synchronization issues

⚡ STEP 7 — Optimizations
Redis clustering

Use token bucket algorithm

Batch counter updates

Local in-memory cache

Separate limits per API type

🧩 STEP 8 — What to Build
Minimum
Express Middleware

Redis Counter

HTTP 429 Response

Optional
Token Bucket

Sliding Window

Per-user limits

Per-IP limits

Admin dashboard

🔥 FINAL MODEL
text
Incoming Request
        ↓
Check Redis Counter
        ↓
Limit Available?
    ↙         ↘
  YES          NO
   ↓            ↓
Allow       HTTP 429
   ↓
Process API
🎯 Interview Golden Line
"For production systems, I prefer Redis-based Token Bucket rate limiting because it supports distributed environments, handles traffic bursts gracefully, and scales efficiently across multiple API servers."