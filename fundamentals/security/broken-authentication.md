# Broken Authentication

## What Is Broken Authentication?

Broken Authentication refers to weaknesses in session management or
credential handling that allow attackers to impersonate users.

---

## Real World Example

A JWT token uses weak secret `"secret123"`. Attacker brute forces the secret,
forges a token, and becomes any user.

---

## Impact

- Account takeover
- Session hijacking
- Credential replay
- Privilege escalation

---

## Prevention

- Strong JWT secrets (env variables)
- Short session expiry
- Multi-factor authentication (MFA)
- Secure password hashing (bcrypt/argon2)

---

## Common Technologies Affected

- JWT-based auth
- Session cookies
- OAuth implementations
- Password reset flows

---

## Modern Protection Techniques

- MFA/2FA
- Biometric authentication
- Passwordless login (WebAuthn)