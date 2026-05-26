# Cross Site Request Forgery (CSRF)

## What Is CSRF?

Cross Site Request Forgery is an attack where a logged-in user is tricked
into performing unintended actions on a web application.

---

## Real World Example

User is logged into `bank.com`. Attacker sends a malicious email with:

`<img src="https://bank.com/transfer?to=attacker&amount=1000">`

Browser automatically includes the session cookie.

---

## Impact

- Unauthorized money transfers
- Password changes
- Account settings modification
- Data deletion

---

## Prevention

- CSRF tokens
- SameSite cookie attribute
- Referer header validation
- Re-authentication for sensitive actions

---

## Common Technologies Affected

- Traditional web apps (forms)
- REST APIs
- State-changing endpoints

---

## Modern Protection Techniques

- Anti-CSRF tokens (per session/per request)
- Double-submit cookies
- Modern SPA frameworks (often built-in)