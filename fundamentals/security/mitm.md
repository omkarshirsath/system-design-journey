# Man In The Middle (MITM)

## What Is MITM?

Man In The Middle is an attack where an attacker secretly intercepts and
potentially alters communication between two parties.

---

## Real World Example

User connects to fake public WiFi "Free Airport WiFi". Attacker intercepts
HTTP traffic and steals login credentials sent in plain text.

---

## Impact

- Credential theft
- Data modification
- Session hijacking
- Eavesdropping

---

## Prevention

- HTTPS/TLS everywhere
- HSTS (HTTP Strict Transport Security)
- Certificate pinning
- Avoid public WiFi for sensitive actions

---

## Common Technologies Affected

- HTTP connections
- Unencrypted APIs
- Email protocols (IMAP/POP without TLS)
- Legacy systems

---

## Modern Protection Techniques

- TLS 1.3
- Mutual TLS (mTLS)
- VPN for sensitive traffic