
---

## File: `security-considerations.md`

```markdown
# Security Considerations for File Upload

## Common Attacks & Defenses

---

## Attack 1: Malicious File Extension

### Attack

User uploads `invoice.pdf.exe` (looks like PDF, actually EXE)

### Defense

Don't trust filename or extension. Check:

- MIME Type
- Magic Bytes (file signatures)

Examples:
- PDF starts with `%PDF`
- PNG starts with PNG signature
- JPEG starts with `FF D8 FF`

---

## Attack 2: Zip Bomb (Decompression Bomb)

### Attack

42 KB zip file contains 100 GB extracted data

### Why Dangerous

Server sees 42 KB (looks safe)
Extraction causes:
- Disk full
- Memory full
- CPU high
- Server crash

### Defense

Before extraction, check:
- Compressed Size
- Expected Extracted Size
- Compression Ratio
- Maximum Nesting Level

**Rules:**
- Max Extracted Size = 100MB
- Max Nesting Depth = 5
- Compression Ratio < 100x

---

## Attack 3: Recursive Zip

### Attack

```text
zip
 └─ zip
     └─ zip
         └─ zip (1000 levels)

Problem
Infinite extraction → CPU exhausted

Defense
Track extraction depth. Reject beyond limit (Max Depth = 5)

Attack 4: Malware Upload
Attack
User uploads invoice.pdf containing malware

Defense
Add malware scan layer:

text
User → Upload → Quarantine Bucket → Virus Scan → Safe Bucket
Tools: ClamAV, CrowdStrike, Defender APIs

Attack 5: Duplicate File Upload
Attack
User uploads same file 100 times

Defense
Generate SHA256 hash. If hash exists, store reference only, not duplicate.

Attack 6: Executable Disguised as Image
Attack
cat.jpg.exe or fake.png containing executable code

Defense
Verify all must match:

Magic Bytes

MIME Type

Allowed Extensions

Security Checklist
Check	Action
File Extension	Validate against whitelist
MIME Type	Verify actual content type
Magic Bytes	Check file signatures
File Size	Enforce max limits
Virus Scan	Use ClamAV or similar
Zip Bomb	Check ratio and depth
Duplicate	Use SHA256 hashing
Async Scan	Queue-based processing