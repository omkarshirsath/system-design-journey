# SOLID Principles

## Open-Closed Principle

**Meaning:** Open for extension, closed for modification.

### Bad
```python
if(payment=="card")
if(payment=="upi")
if(payment=="paypal")
Every new payment changes code.

Good
text
Payment Interface → Card Payment, UPI Payment, Paypal Payment
Add new class only.

Dependency Inversion Principle
Meaning: Depend on abstractions, not concrete implementations.

Example
Bad:

text
OrderService → MySQL
Good:

text
OrderService → Repository Interface
Can switch:

MySQL

PostgreSQL

MongoDB

Without changing business logic.

text

---

You can save each block as a separate `.md` file with the suggested filenames. Let me know if you want me to add more questions or expand any topic!