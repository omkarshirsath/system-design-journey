# NoSQL vs SQL

## Quick Difference

| SQL | NoSQL |
|-----|-------|
| Structured | Flexible |
| ACID | Eventual consistency possible |
| Joins | Denormalized |
| Fixed schema | Dynamic schema |

## Choose NoSQL When
- Huge scale
- Flexible schema
- High write throughput
- Event data
- Logs

**Examples:** MongoDB, Cassandra, DynamoDB

## Choose SQL When
- Transactions matter
- Financial systems
- Relationships matter
- Strong consistency needed

**Examples:** PostgreSQL, MySQL

## Horizontal vs Vertical Scaling

### Vertical Scaling
4 CPU → 16 CPU (Upgrade machine)

**Pros:** Simple
**Cons:** Hardware limit

### Horizontal Scaling
Server1, Server2, Server3 (Add more servers)

**Pros:** Almost unlimited scale
**Cons:** Distributed complexity

## Interview One-Liner
✅ "Vertical scaling increases server capacity, while horizontal scaling adds more servers to distribute load."