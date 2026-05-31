
---

**database-scaling.md**

```markdown
# Database Scaling: Read Replicas & Sharding

## The Problem

One database has limits:
- CPU
- Memory
- Disk I/O
- Connection limits
- Storage space

## Strategy 1: Read Replicas

Separate read traffic from write traffic.

```text
         App Server
              │
              ▼
      ┌───────────────┐
      │  Primary DB   │  ← Writes (INSERT/UPDATE/DELETE)
      │   (Master)    │
      └───────┬───────┘
              │
    ┌─────────┼─────────┐
    ▼         ▼         ▼
┌───────┐ ┌───────┐ ┌───────┐
│Replica│ │Replica│ │Replica│  ← Reads (SELECT)
│  #1   │ │  #2   │ │  #3   │
└───────┘ └───────┘ └───────┘

Replication Lag
Replicas are async (slight delay from Primary)

Can cause stale reads (user updates profile, sees old version for 1-2 seconds)

Strategy 2: Sharding (Horizontal Partitioning)
Split data across multiple databases. Each shard holds a subset.

Sharding Key (Critical Decision)
Example: UserID as shard key

text
UserID 1-1M     → Shard 1
UserID 1M-2M    → Shard 2
UserID 2M-3M    → Shard 3
Request Flow with Shard Router
text
App: Get user 1,500,000
  │
  ▼
Shard Router: 1.5M is between 1M-2M → Shard 2
  │
  ▼
Shard 2: Returns data
Common Sharding Problems
Resharding: When a shard gets too big, you must split it.

Join Queries: You can't JOIN across shards easily.

Hotspots: If one shard key is very popular (e.g., celeb users).

Re-shard balancing: Uneven data distribution.

Real-World Example
Instagram: Sharded by user_id
Uber: Sharded by city_id
Amazon: Orders sharded by customer_id

Final Architecture (Combined)
text
              App
               │
          Shard Router
               │
    ┌──────────┼──────────┐
    ▼          ▼          ▼
  Shard 1    Shard 2    Shard 3
    │          │          │
    ▼          ▼          ▼
  Replicas   Replicas   Replicas
Strategy 3: NoSQL (When to skip relational DB)
Consider DynamoDB, Cassandra, MongoDB when:

You have billions of records

Schema is flexible

Joins are minimal

You need extreme horizontal scaling

But you lose ACID transactions and complex queries.