# 5️⃣ Distributed Rate Limiting

## 🔹 Short Definition

Distributed Rate Limiting enforces rate limits across multiple servers or services, maintaining a single global counter using a shared storage system.

---

## 🔹 The Problem

```text
        ┌─────────────────────────────────────┐
        │          Load Balancer               │
        └─────────────────┬───────────────────┘
                          │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │ Server 1  │ │ Server 2  │ │ Server 3  │
    │ Counter:  │ │ Counter:  │ │ Counter:  │
    │   40      │ │   35      │ │   25      │
    └───────────┘ └───────────┘ └───────────┘

    Total = 100 requests (across 3 servers)
    Each server thinks limit not reached!
    ❌ Inconsistent state
🔹 Solution Architecture
text
        ┌─────────────────────────────────────┐
        │          Load Balancer               │
        └─────────────────┬───────────────────┘
                          │
           ┌─────────────┼─────────────┐
           ▼             ▼             ▼
    ┌───────────┐ ┌───────────┐ ┌───────────┐
    │ Server 1  │ │ Server 2  │ │ Server 3  │
    │           │ │           │ │           │
    └───────────┘ └───────────┘ └───────────┘
           │             │             │
           └─────────────┼─────────────┘
                         │
                         ▼
              ┌────────────────────┐
              │   Redis Cluster     │
              │   (Shared Counter)  │
              │                     │
              │   rate:user123 = 75 │
              └────────────────────┘
🔹 Implementation Options
Option 1: Redis (Most Popular)
text
All servers share the same Redis instance/cluster.

Key: rate:user123
Value: 75
TTL: 60 seconds
Pros:

Fast (in-memory)

Atomic operations

Built-in TTL

Supports Lua scripts

Cons:

Network latency

Redis as single point of failure

Requires cluster setup

Option 2: Distributed Cache (Memcached)
text
Similar to Redis but simpler.

Key: rate:user123
Value: 75
Expiry: 60 seconds
Pros:

Very fast

Simple API

Cons:

No atomic operations

No Lua scripts

Less features

Option 3: Database (Not Recommended)
text
                ┌─────────────────────┐
                │  PostgreSQL / MySQL  │
                │  Update counter      │
                │  WHERE user_id = 123 │
                └─────────────────────┘
Pros:

Strong consistency

ACID transactions

Cons:

❌ Slow (disk I/O)

❌ Too many writes

❌ Not scalable

🔹 Redis Cluster Architecture
text
                    ┌─────────────────────┐
                    │   Redis Cluster      │
                    │   [Master-Slave]     │
                    ├─────────────────────┤
                    │                     │
                    │   Master (Write)    │
                    │   rate:user123=75   │
                    │         │           │
                    │    ┌────┼────┐      │
                    │    ▼    ▼    ▼      │
                    │ Slave Slave Slave   │
                    │ (Read) (Read) (Read)│
                    └─────────────────────┘
🔹 Sharding Strategy
text
User ID Range      Redis Node
─────────────────────────────
user_001-500   →   Node 1
user_501-1000  →   Node 2
user_1001-1500 →   Node 3
🔹 Consistency Models
Strong Consistency (Recommended)
text
All servers see the same counter value.
Uses: Redis with WAIT command
Eventual Consistency
text
Different servers may see slightly different values.
Uses: Redis async replication
🔹 Failure Handling
Redis Node Down
text
1. Detect failure
2. Failover to replica
3. Continue rate limiting
4. Alert operations team
Network Partition
text
1. Continue with local counter
2. Sync when partition heals
3. Accept slight over-limit during partition
🔹 Optimizations
Local Cache
text
┌─────────────────────────────────────────┐
│ Server 1                                │
│                                         │
│ Local Cache (User → Rate Limit)         │
│   user123 → 75 (cached for 1 second)    │
│   user456 → 32 (cached for 1 second)    │
│                                         │
│ Check local cache first                 │
│ If not found → Redis                    │
└─────────────────────────────────────────┘
Batch Updates
text
Instead of:
    INCR rate:user123  (per request)

Do:
    Pipeline: INCR rate:user1, INCR rate:user2, ...
🔹 Monitoring
text
┌─────────────────────────────────────────┐
│           Monitoring Dashboard           │
├─────────────────────────────────────────┤
│ • Total requests/minute                  │
│ • Requests blocked/minute                │
│ • Redis latency (p99)                    │
│ • Top 10 users by request count          │
│ • Redis memory usage                     │
│ • Rate limit hits per endpoint           │
└─────────────────────────────────────────┘
🔹 Interview One-Liner
"Distributed rate limiting uses a shared Redis cluster to maintain a single global counter, ensuring consistent rate limits across all servers with atomic operations and automatic TTL expiration."