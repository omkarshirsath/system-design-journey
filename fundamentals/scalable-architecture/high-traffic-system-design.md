# High Traffic System Architecture

## Problem

How do applications like Amazon, Flipkart, Uber, Netflix, and Instagram handle hundreds of millions of users?

---

## Basic Architecture

Client
↓
Load Balancer
↓
Application Servers
↓
Cache Layer (Redis)
↓
Database
↓
Queue/Kafka
↓
Analytics/Background Workers

---

## Load Balancer

Purpose:
- Distribute traffic
- Prevent server overload
- Improve availability

Examples:
- Nginx
- HAProxy
- AWS ALB

---

## Horizontal Scaling

Instead of increasing server size:

1 Server → 10 Servers → 100 Servers

Benefits:
- High availability
- Better scalability
- Fault tolerance

---

## Redis Cache

Used for:
- Frequently accessed data
- Sessions
- Product catalog
- User profiles

Benefits:
- Reduce database load
- Faster response times

---

## Database Replication

Master
├── Read Replica
├── Read Replica
└── Read Replica

Purpose:
- Scale reads
- Improve performance

---

## Database Sharding

Users:
Shard 1 → User 1–1M
Shard 2 → User 1M–2M
Shard 3 → User 2M–3M

Purpose:
- Split large datasets
- Handle massive traffic

---

## Kafka / Message Queues

Used for:
- Notifications
- Order processing
- Analytics
- Event streaming

Benefits:
- Decoupling
- Reliability
- Scalability

---

## CDN

Examples:
- CloudFront
- Akamai
- Cloudflare

Purpose:
- Serve static content closer to users
- Reduce latency

---

## Rate Limiting

Purpose:
- Prevent abuse
- Protect backend services

Examples:
- Token Bucket
- Leaky Bucket

---

## Real World Request Flow

User
↓
CDN
↓
Load Balancer
↓
Application Servers
↓
Redis
↓
Database
↓
Kafka
↓
Background Workers

---

## Key Learnings

- Scale horizontally
- Cache aggressively
- Use queues
- Replicate databases
- Shard large datasets
- Use CDN
- Implement rate limiting