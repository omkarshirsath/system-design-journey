This is a very good backend interview topic.

First remember:

```text id="5k12kq"
Authentication
=
Who are you?

Authorization
=
What are you allowed to do?
```

Example:

```text id="u8fvyz"
Login with Email + Password
```

Authentication ✅

```text id="3mwcq5"
Can delete users?
Can approve leave?
```

Authorization ✅

---

# 1. Session-Based Authentication

Oldest and still widely used.

### Flow

```text id="fiz5kh"
User Login
↓
Server Verifies
↓
Creates Session
↓
Stores Session In DB/Memory
↓
Returns Session ID
```

---

### Request Flow

```text id="9q6kk6"
Browser
↓
Cookie(Session ID)
↓
Server
↓
Fetch Session
↓
Allow
```

---

### Pros

```text id="ch4lyx"
Easy
Secure
Can Logout Easily
```

---

### Cons

```text id="ixw5x0"
Server stores sessions
Harder to scale
```

---

# 2. JWT Authentication

Most common in modern MERN apps.

### Flow

```text id="0d81n6"
Login
↓
Generate JWT
↓
Return JWT
↓
Frontend Stores JWT
```

---

### Request

```text id="9h07j4"
Authorization:
Bearer JWT
```

---

### Pros

```text id="gqapoe"
Stateless
Scalable
Microservice Friendly
```

---

### Cons

```text id="mck9qa"
Logout is harder
Token revocation is harder
```

---

# 3. OAuth 2.0

Login using:

```text id="2u04f4"
Google
GitHub
Facebook
LinkedIn
```

---

### Example

```text id="w1eyjg"
Login with Google
```

Flow:

```text id="pxvz2s"
User
↓
Google
↓
Permission
↓
Access Token
↓
Application
```

---

### Pros

```text id="afn0a7"
No password management
Industry standard
```

---

### Cons

```text id="quxxaq"
More complex
```

---

# 4. OpenID Connect (OIDC)

Built on OAuth.

OAuth tells:

```text id="7ix8ia"
What can user access?
```

OIDC tells:

```text id="tn7tup"
Who is the user?
```

---

Used by:

```text id="n0v6t5"
Google Login
Microsoft Login
Auth0
Okta
```

---

# 5. API Key Authentication

Common for APIs.

Example:

```text id="yghc2m"
OpenAI API
Stripe API
Razorpay API
```

---

Flow

```text id="m61vbe"
Request
↓
API Key
↓
Validate
↓
Allow
```

---

### Example

```http id="5e0frd"
x-api-key:
abc123xyz
```

---

### Pros

```text id="r0x3vw"
Simple
Fast
```

---

### Cons

```text id="e5n3n4"
Less secure than OAuth
```

---

# 6. Basic Authentication

Old style.

```http id="u7qcfq"
Authorization:
Basic base64(username:password)
```

---

Example

```text id="9d9mow"
admin:password123
```

encoded.

---

### Cons

```text id="09i93j"
Credentials sent every request
```

Mostly internal systems.

---

# 7. Multi-Factor Authentication (MFA)

Requires multiple proofs.

Example:

```text id="6hy3f2"
Password
+
OTP
```

or

```text id="41x89q"
Password
+
Authenticator App
```

---

### Flow

```text id="iww0z6"
Password
↓
OTP
↓
Login
```

---

### Pros

```text id="5xoqv8"
Much safer
```

---

# 8. Magic Link Authentication

Popular nowadays.

Example:

```text id="v7czk0"
Notion
Slack
```

---

Flow

```text id="6n0xg8"
Enter Email
↓
Receive Link
↓
Click
↓
Logged In
```

---

No password.

---

# 9. Biometric Authentication

Uses:

```text id="9mh8tu"
Fingerprint
Face ID
Retina
```

---

Common in:

```text id="6nnhfq"
Mobile Banking
UPI Apps
```

---

# 10. SSO (Single Sign-On)

One login.

Multiple applications.

---

Example

```text id="0kbh0s"
Microsoft Account
↓
Teams
Outlook
Azure
```

Single login.

---

# Real-World Usage

| System              | Authentication      |
| ------------------- | ------------------- |
| Traditional Web App | Session             |
| MERN Application    | JWT                 |
| Google Login        | OAuth + OIDC        |
| Internal API        | API Key             |
| Banking App         | JWT + MFA           |
| Enterprise HRMS     | SSO + JWT           |
| Mobile App          | JWT + Refresh Token |
| SaaS Product        | OAuth + JWT         |

---

# What You Should Know for Interviews

For your target (16-18 LPA):

Master these:

```text id="wvz7j7"
Session Authentication

JWT Authentication

Refresh Tokens

OAuth 2.0

SSO

MFA

API Keys
```

If an interviewer asks:

> Which authentication would you use for a modern MERN HRMS?

A strong answer is:

```text id="0v6pkz"
JWT Access Token (15 min)

Refresh Token (30 days)

RBAC for permissions

Optional MFA

Optional SSO (Google/Microsoft)
```

That's exactly the kind of answer expected from a mid-to-senior backend/full-stack engineer.
