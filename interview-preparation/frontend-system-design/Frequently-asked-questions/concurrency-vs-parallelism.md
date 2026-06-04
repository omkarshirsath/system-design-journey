# Concurrency vs Parallelism

## Difference

| Concurrency | Parallelism |
|-------------|-------------|
| Multiple tasks in progress | Multiple tasks executing simultaneously |
| Can use single CPU | Requires multiple cores |

### Example

**Concurrency:**
Task A → Task B → Task A → Task B

text

**Parallelism:**
Core1 → Task A
Core2 → Task B

text
(Same time)

## Handling Concurrency Issues

### Common Problems
- Race conditions
- Deadlocks
- Data inconsistency

### Solutions
- Mutex/Locks
- Atomic operations
- Transactions
- Optimistic locking

## Example

**Bank Account**

Two users withdraw ₹1000 simultaneously.

Without locking: Balance = Negative

Use transaction/lock.
