
---

### File 3: `caching-strategy.md`

```markdown
# Caching Strategy

## Why Cache?

Reduce:
- Database load
- Response time
- Infrastructure cost

## In-Memory Cache

**Examples:** Redis, Memcached

**Best For:**
- Session data
- Frequently accessed records

### Flow
User → Cache → (miss) → Database

text

## CDN Cache

**Examples:** Images, JS, CSS, Videos

**Best For:** Static content

## Interview Answer

### My Approach
1. Identify hot endpoints
2. Measure DB load
3. Add Redis
4. Add cache invalidation
5. Add CDN for static assets
6. Monitor hit ratio

## Don't Say
❌ "Cache everything."

## Say
✅ "Cache frequently read, rarely changing data."