# Performance Bottleneck Debugging

## My Approach

### Step 1: Identify problem
- API slow?
- DB slow?
- CPU high?

### Step 2: Collect metrics
- Response time
- CPU
- Memory
- Queries

### Step 3: Find bottleneck
Check:
- Slow queries
- N+1 queries
- Memory leaks
- External APIs

### Step 4: Optimize
- Add indexes
- Cache
- Async processing
- Query optimization

### Step 5: Validate
Compare before/after metrics.

## Interview One-Liner
✅ "I rely on metrics and profiling first rather than guessing."