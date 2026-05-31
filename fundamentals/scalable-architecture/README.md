# System Design Learning Journey

This repository documents the step-by-step evolution of a large-scale system, from a simple startup architecture to a billion-request handling machine.

## Why This Guide?

Most system design resources just list components like Load Balancers, Caching, and Kafka. They rarely explain **WHY** each component is added at a specific stage of growth.

This guide follows the natural progression of a company like Amazon as it scales from 100 users to millions.

## The Core Journey (Mental Model)

When designing for massive scale (e.g., 500 crore requests), your brain should automatically sequence these steps:

1.  **Startup Phase:** Single server & database.
2.  **Horizontal Scaling:** Adding more app servers.
3.  **Load Balancer:** Distributing traffic across servers.
4.  **Caching (Redis):** Reducing database load for repeated reads.
5.  **Database Scaling:**
    - Read Replicas (separating read/write traffic)
    - Sharding (splitting data across multiple DBs)
6.  **Message Queue (Kafka):** Handling traffic spikes asynchronously.
7.  **CDN:** Accelerating global content delivery.
8.  **Rate Limiting:** Protecting the system from abuse.

## Files in this Repo

- `high-traffic-system-design.md`: The complete architectural journey.
- `scaling-patterns.md`: Deep dive into horizontal vs vertical scaling.
- `caching-strategies.md`: Redis patterns and best practices.
- `database-scaling.md`: Read replicas, sharding, and strategies.
- `architecture-diagrams.drawio`: Editable diagrams (draw.io format).

Use this as your interview cheat sheet and system design playbook.