# Denial of Service (DoS)

## What Is DoS?

Denial of Service is an attack where a single attacker floods a server
with excessive requests to make it unavailable to legitimate users.

---

## Real World Example

Attacker sends 10,000 requests per second to a login endpoint:

POST /login HTTP/1.1
Host: example.com

The server runs out of CPU or memory and crashes.

---

## Impact

- Service downtime
- Resource exhaustion
- Revenue loss
- Reputation damage

---

## Prevention

- Rate limiting
- Request throttling
- Auto-scaling
- Timeout configuration

---

## Common Technologies Affected

- Web servers (Nginx, Apache)
- APIs
- Databases
- Any public endpoint

---

## Modern Protection Techniques

- Load balancers
- Caching layers (Redis)
- Circuit breakers