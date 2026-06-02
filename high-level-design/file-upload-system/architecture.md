# File Upload System Architecture

## High-Level Design

```text
                User
                  │
                  ▼
         ┌────────────────┐
         │ Load Balancer  │
         └───────┬────────┘
                 │
                 ▼
         ┌────────────────┐
         │ Upload Service │
         └───────┬────────┘
                 │
                 ▼
         ┌────────────────┐
         │ Validation     │
         │ Virus Scan     │
         └───────┬────────┘
                 │
                 ▼
         ┌────────────────┐
         │ Object Storage │
         │ S3 / Blob      │
         └───────┬────────┘
                 │
                 ▼
         ┌────────────────┐
         │ Metadata DB    │
         └────────────────┘

         Upload Flow
text
User
↓
Upload API
↓
Validate
↓
Store File
↓
Store Metadata
↓
Return URL
Download Flow
text
User
↓
Get File URL
↓
Storage
↓
Download
Pre-Signed URL Pattern
❌ Bad Design
text
User → Backend → Storage
Problem: Backend becomes bottleneck. 10,000 users × 100MB = 1TB traffic through backend.

✅ Better Design
text
User → Backend (Get Upload URL) → Direct Upload to S3
Backend only generates URL. File never passes through backend.

Pre-Signed URL Flow
Frontend requests POST /upload-url

Backend generates S3 pre-signed URL

Backend returns URL to frontend

Frontend uploads directly to S3

Frontend notifies backend after upload

Backend saves metadata

Senior-Level Upload Pipeline
text
User
 │
 ▼
Pre-Signed URL
 │
 ▼
Upload Bucket
 │
 ▼
Kafka Event
 │
 ▼
Scan Worker
 │
 ├─ MIME Validation
 ├─ Magic Byte Check
 ├─ Malware Scan
 ├─ Zip Bomb Check
 ├─ Nested Zip Check
 ├─ Hash Generation
 │
 ▼
Safe Bucket
 │
 ▼
Metadata DB
Benefits of This Architecture
Benefit	Description
Less Backend Load	Files go direct to S3
Faster Upload	No middle layer
Cheaper	Less server bandwidth
Scales Easily	Handles millions of uploads