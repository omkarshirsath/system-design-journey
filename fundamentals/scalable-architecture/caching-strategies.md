
---

**caching-strategies.md**

```markdown
# Caching Strategies (Redis)

## Why Cache?

- DRAM is fast (nanoseconds) vs Disk (milliseconds)
- Reduce database load by 80-90%
- Handle repeated reads of the same data

## Basic Flow

```text
App
 │
 ▼
Check Cache
 │
 ├── HIT ──→ Return data
 │
 └── MISS
      │
      ▼
   Query Database
      │
      ▼
   Store in Cache (with TTL)
      │
      ▼
   Return data

   Common Strategies
1. Cache-Aside (Lazy Loading)
Application code explicitly checks cache first.

Best for: Read-heavy workloads

Risk: Cache miss storms (many requests hit DB simultaneously)

2. Write-Through
Application writes to cache AND database simultaneously.

Best for: Write-heavy, needs consistency

Risk: Higher write latency

3. Write-Behind (Write-Back)
Application writes to cache, cache asynchronously writes to DB.

Best for: Very high write throughput

Risk: Data loss if cache dies before flush

4. TTL (Time-To-Live)
Data automatically expires after a set time.

Typical TTLs:

Product catalog: 1 hour

User session: 24 hours

Stock levels: 5 seconds

Eviction Policies (When cache is full)
LRU (Least Recently Used) - Most common

LFU (Least Frequently Used)

FIFO (First In First Out)

TTL-based

Real-World Example: Product Page
text
Request: GET /product/iphone-17

1. Redis GET product:iphone-17
2. Cache MISS → MySQL SELECT * FROM products WHERE id = 'iphone-17'
3. Redis SETEX product:iphone-17 3600 "{json_data}"
4. Return product

Next 10,000 requests: All CACHE HITS. DB does nothing.
Red Flags (When NOT to cache)
Frequently changing data (stock levels, live scores)

Data that must be 100% accurate always (financial balances)

Very large data that doesn't fit in memory

Write-heavy workloads