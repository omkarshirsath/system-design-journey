# Cross Site Scripting (XSS)

## What Is XSS?

Cross Site Scripting is a vulnerability where attackers inject malicious
JavaScript scripts into web pages viewed by other users.

---

## Real World Example

Suppose a comment box accepts user input without sanitization:

`<script>alert('Hacked')</script>`

When another user views the comment, the script executes in their browser.

---

## Impact

- Session cookie theft
- Account hijacking
- Keylogging
- Phishing attacks

---

## Prevention

- Output encoding
- Content Security Policy (CSP)
- Input sanitization
- HttpOnly cookie flag

---

## Common Technologies Affected

- React
- Angular
- Vue.js
- jQuery
- Plain HTML/JS

---

## Modern Protection Techniques

- CSP headers
- XSS auditor (legacy browsers)
- DOMpurify library