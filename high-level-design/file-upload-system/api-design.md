
---

## File: `api-design.md`

```markdown
# API Design for File Upload System

## Base URL

`https://api.yourdomain.com/v1`

---

## Endpoints

### 1. Request Upload URL

**Endpoint:** `POST /upload-url`

**Request Body:**
```json
{
  "file_name": "document.pdf",
  "file_size": 2048000,
  "file_type": "application/pdf"
}
2. Notify Upload Complete
Endpoint: POST /upload-complete

Request Body:

json
{
  "file_id": "fld_123456789",
  "etag": "abc123def456"
}
Response:

json
{
  "status": "processing",
  "message": "File uploaded successfully. Virus scan in progress."
}
3. Get File Metadata
Endpoint: GET /files/{file_id}

Response:

json
{
  "file_id": "fld_123456789",
  "file_name": "document.pdf",
  "file_type": "application/pdf",
  "file_size": 2048000,
  "uploaded_by": "user_456",
  "uploaded_at": "2024-01-15T10:30:00Z",
  "status": "safe",
  "download_url": "https://s3.aws.com/download/document.pdf?token=xyz"
}
4. List User Files
Endpoint: GET /files

Query Parameters:

Parameter	Type	Description
page	int	Page number (default: 1)
limit	int	Items per page (default: 20, max: 100)
sort	string	Sort by: created_at, file_name, file_size
order	string	asc or desc
type	string	Filter by file type (PDF, image, video)
Response:

json
{
  "data": [
    {
      "file_id": "fld_123",
      "file_name": "report.pdf",
      "file_size": 1024000,
      "uploaded_at": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8
  }
}
5. Delete File
Endpoint: DELETE /files/{file_id}

Response:

json
{
  "status": "deleted",
  "message": "File deleted successfully"
}
6. Initiate Multipart Upload
Endpoint: POST /multipart-upload

Request Body:

json
{
  "file_name": "video.mp4",
  "file_size": 5368709120,
  "file_type": "video/mp4",
  "parts": 5
}
Response:

json
{
  "upload_id": "upload_abc123",
  "parts_urls": [
    "https://s3.aws.com/part1?token=xyz",
    "https://s3.aws.com/part2?token=xyz",
    "https://s3.aws.com/part3?token=xyz"
  ],
  "expires_in": 3600
}
7. Complete Multipart Upload
Endpoint: POST /multipart-complete

Request Body:

json
{
  "upload_id": "upload_abc123",
  "parts": [
    { "part_number": 1, "etag": "etag_1" },
    { "part_number": 2, "etag": "etag_2" },
    { "part_number": 3, "etag": "etag_3" }
  ]
}
Response:

json
{
  "file_id": "fld_789",
  "status": "processing",
  "message": "Multipart upload completed"
}
8. Resume Upload (Failed Part)
Endpoint: GET /upload-status/{upload_id}

Response:

json
{
  "upload_id": "upload_abc123",
  "status": "in_progress",
  "completed_parts": [1, 2],
  "failed_parts": [3],
  "pending_parts": [4, 5]
}
Status Codes
Code	Meaning
200	Success
201	Created
400	Bad request (invalid file type/size)
401	Unauthorized (invalid token)
403	Forbidden (no permission)
404	File not found
413	Payload too large
429	Too many requests (rate limited)
500	Internal server error
503	Service unavailable
Rate Limiting
Endpoint	Limit
POST /upload-url	100 requests per minute
POST /upload-complete	100 requests per minute
GET /files	200 requests per minute
DELETE /files	50 requests per minute
Rate Limit Headers:

text
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
Error Response Format
json
{
  "error": {
    "code": "FILE_TOO_LARGE",
    "message": "File size exceeds maximum limit of 100MB",
    "details": {
      "max_allowed": 104857600,
      "received": 209715200
    },
    "timestamp": "2024-01-15T10:30:00Z"
  }
}