
---

**scaling-patterns.md**

```markdown
# Scaling Patterns: Vertical vs Horizontal

## Vertical Scaling (Scaling Up)

Buying a bigger, more powerful server.

```text
4 GB RAM → 8 GB → 16 GB → 64 GB → 512 GB

Pros:

Simple (no code changes)

No distributed system complexity

Cons:

Eventually hits a physical limit

Becomes exponentially expensive

Single point of failure

Horizontal Scaling (Scaling Out)
Adding more servers.

text
Server 1  ←  Server 2  ←  Server 3  ←  Server 4
Pros:

Almost unlimited scale

Cheaper per unit

Redundant (failure of one doesn't kill the system)

Cons:

Requires load balancer

Needs stateless apps (no user sessions stored locally)

More complex debugging

The Industry Standard
Modern large systems (Amazon, Netflix, Google) use Horizontal Scaling.

The journey:

Start with one server (vertical is fine)

First bottleneck → Add a second server (now you need a load balancer)

Make your app stateless (store sessions in Redis, not in app memory)

Keep adding servers horizontally from there