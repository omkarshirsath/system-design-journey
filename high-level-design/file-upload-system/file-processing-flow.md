
---

## File: `file-processing-flow.md`

```markdown
# File Processing Flow

## User Journey - Upload File

### Step 1: User Action

User selects PDF/Image from device

### Step 2: Frontend Request

Frontend sends request to backend for upload URL

`POST /upload-url`

### Step 3: Backend Validation

Backend validates:
- File size
- File type
- User permissions

### Step 4: Generate Pre-Signed URL

Backend generates S3 pre-signed URL:

`https://s3.aws.com/upload/abc123`

### Step 5: Return URL

Backend returns URL to frontend

### Step 6: Direct Upload

Frontend uploads file directly to S3 using pre-signed URL

### Step 7: Upload Notification

After upload completes, frontend notifies backend:

`POST /upload-complete`

### Step 8: Metadata Storage

Backend stores metadata in database:

- file_id
- file_name
- file_type
- file_size
- uploaded_by
- storage_path
- created_at

### Step 9: Async Processing

Kafka event triggered for:

- Virus scanning
- Thumbnail generation
- Hash generation
- Zip bomb check

### Step 10: Return Response

File URL returned to user

---

## User Journey - Download File

### Step 1: User Action

User clicks on file name

### Step 2: Backend Request

Frontend requests file metadata:

`GET /files/{file_id}`

### Step 3: Metadata Retrieval

Backend retrieves metadata from PostgreSQL

### Step 4: Generate Download URL

Backend generates pre-signed download URL (expires in 5 minutes)

### Step 5: Return URL

Backend returns URL to frontend

### Step 6: Direct Download

User downloads file directly from S3

---

## Async Processing Flow

```text
Upload Complete
      │
      ▼
Kafka Topic: file.uploaded
      │
      ▼
┌─────────────────────────────────────┐
│           Scan Worker               │
├─────────────────────────────────────┤
│ 1. MIME Validation                  │
│ 2. Magic Byte Check                 │
│ 3. Malware Scan (ClamAV)            │
│ 4. Zip Bomb Detection               │
│ 5. Nested Archive Check             │
│ 6. SHA256 Hash Generation           │
└─────────────────────────────────────┘
      │
      ▼
If Safe → Move to Safe Bucket
If Malicious → Quarantine + Alert
      │
      ▼
Update Metadata DB


Large File Flow (Multipart Upload)
text
1. Initiate Upload
   Frontend → Backend: POST /multipart-upload
   Backend → Frontend: uploadId

2. Upload Parts (Parallel)
   Part 1 → S3
   Part 2 → S3
   Part 3 → S3
   Part 4 → S3
   Part 5 → S3

3. Complete Upload
   Frontend → Backend: POST /multipart-complete
   Backend → S3: Complete multipart request
   S3 → Backend: File assembled

4. Failed Part Retry
   Resend only failed chunk, not entire file
State Transitions
State	Description
PENDING	Upload initiated, not complete
UPLOADING	File chunks being uploaded
UPLOADED	File uploaded, pending scan
SCANNING	Virus scan in progress
SAFE	Scan passed, file available
QUARANTINED	Malware detected, blocked
DELETED	File removed
FAILED	Upload or scan failed
Error Handling
Error	Recovery
Network failure	Retry with exponential backoff
Upload timeout	Resume from last chunk
Virus scan timeout	Retry with different worker
S3 outage	Fallback to secondary region
DB connection lost	Queue requests, retry later