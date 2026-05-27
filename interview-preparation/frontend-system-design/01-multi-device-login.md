# 1. External Network Login Across Multiple Portals

## Problem Statement

Users need to log in to the same application
from different portals while outside the
office network securely.

---

## Centralized Architecture Approach

Use a centralized Identity Provider (IdP) with
token-based authentication (JWT/OAuth/SAML).

Examples:
- Auth0
- Okta
- Keycloak
- AWS Cognito
- Azure AD

Instead of each portal managing its own database of credentials,
you decouple authentication entirely by using a centralized IdP.

How it works:
1. User visits portal-a.com or portal-b.com
2. Portal redirects to centralized login page (auth.yourcompany.com)
3. IdP authenticates user (supports MFA, device checks)
4. IdP generates signed JWT token and redirects back
5. Portal validates token signature to grant access

---

## Recommended Flow

1. User requests portal access
2. Portal redirects to central IdP
3. User authenticates (MFA optional)
4. IdP issues signed token
5. Portal validates token
6. Access granted across all portals

---

## Real-Time Technologies

- OAuth 2.0 / OIDC
- SAML 2.0
- JWT tokens
- Reverse proxy (Nginx)
- VPN / Zero Trust Network Access

---

## Scaling Considerations

- IdP high availability
- Token expiration and refresh
- Single logout across portals
- Session management at IdP level

---

## Real World Example

Google: One login works for Gmail, Drive, YouTube, Calendar
Microsoft: One login works for Outlook, Teams, SharePoint, OneDrive

---