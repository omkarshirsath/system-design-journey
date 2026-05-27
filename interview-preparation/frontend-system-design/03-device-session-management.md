# 3. Device Identification Across Multiple Login Devices

## Problem Statement

Application supports login from mobile, tablet,
desktop, and laptop. Need to identify which
device user is currently logged in from.

---

## Centralized Architecture Approach

Capture device fingerprint during login using
HTTP headers and browser properties. Store
active sessions with device information.

Examples:
- User-Agent parsing
- Device fingerprinting libraries
- Session management table

Instead of just tracking "user is logged in",
you track each unique device session separately.

How it works:
1. User logs in from iPhone → capture device info
2. User logs in from Windows Laptop → capture device info
3. Store both sessions in database with device details
4. Create "Active Sessions" page showing all devices
5. Allow remote logout from any device

---

## Recommended Flow

1. User sends login request
2. Backend reads User-Agent header
3. Parse device type (mobile/tablet/desktop)
4. Generate unique device ID
5. Store session with device info
6. Return device list to frontend

---

## Device Identification Parameters

- User-Agent string
- IP address
- Screen resolution
- Browser language
- Timezone
- Touch support detection
- OS name and version

---

## Scaling Considerations

- Limit active sessions per user
- Session expiry per device
- Device remember me option
- Notify on new device login

---

## Real World Example

**Gmail:** Shows "You are logged in on 3 devices: iPhone, Windows Laptop, iPad"
**WhatsApp Web:** Shows "WhatsApp is open on Chrome (Windows)"
**Netflix:** Shows "Recently used devices" with device names and locations

---