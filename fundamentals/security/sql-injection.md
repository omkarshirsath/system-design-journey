# SQL Injection (SQLi)

## What Is SQL Injection?

SQL Injection is a vulnerability where attackers manipulate SQL queries
by injecting malicious input into application fields.

---

## Real World Example

Suppose a login query is written like this:

SELECT * FROM users
WHERE email = '${email}'
AND password = '${password}'

Attacker input:

email: admin@test.com
password: ' OR '1'='1

This may bypass authentication.

---

## Impact

- Unauthorized access
- Data leakage
- Database manipulation
- Account takeover

---

## Prevention

- Prepared statements
- Parameterized queries
- ORM usage
- Input validation
- Least privilege database access

---

## Common Technologies Affected

- Node.js
- PHP
- Java
- Python
- .NET

---

## Modern Protection Techniques

- WAF (Web Application Firewall)
- Query sanitization
- Database monitoring