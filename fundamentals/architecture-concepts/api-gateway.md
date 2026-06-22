# ✅ API Gateway

### 🔹 Short Definition

An API Gateway is a single entry point for all client requests that routes them to appropriate backend services, handles cross-cutting concerns like authentication, rate limiting, logging, and transforms responses.

---

## 🔹 Why API Gateway?

### Without API Gateway

```text
Client
    │
    ├──► /users    → User Service
    ├──► /orders   → Order Service
    ├──► /payments → Payment Service
    ├──► /auth     → Auth Service
    └──► /reports  → Report Service
Problems:

Client knows all service URLs

Each service handles auth separately

No centralized logging

CORS issues

Hard to monitor

No rate limiting

With API Gateway
text
           ┌─────────────────────┐
           │     API Gateway     │
           │     (Single Entry)   │
           └──────────┬──────────┘
                      │
    ┌─────────────────┼─────────────────┐
    ▼                 ▼                 ▼
┌────────┐      ┌────────┐      ┌────────┐
│ User   │      │ Order  │      │Payment │
│Service │      │Service │      │Service │
└────────┘      └────────┘      └────────┘
Benefits:

Single entry point

Centralized authentication

Rate limiting

Logging & monitoring

Request transformation

Service discovery

🔹 Core Responsibilities
Responsibility	Description
Routing	Route requests to appropriate services
Authentication	Validate JWT/OAuth tokens
Rate Limiting	Enforce request limits per user/IP
Logging	Centralized request/response logging
Caching	Cache frequent responses
Load Balancing	Distribute traffic to service instances
SSL Termination	Handle HTTPS encryption
Request/Response Transformation	Modify request/response formats
Circuit Breaking	Stop requests to failing services
Service Discovery	Find available service instances
🔹 Architecture
text
                ┌──────────────────────────────┐
                │          Client              │
                │   (Web/Mobile/Third-party)    │
                └──────────────┬───────────────┘
                               │
                               ▼
                ┌──────────────────────────────┐
                │       API Gateway            │
                │                              │
                │  ┌────────────────────────┐  │
                │  │   Middleware Pipeline  │  │
                │  │                        │  │
                │  │ 1. Auth                │  │
                │  │ 2. Rate Limiter        │  │
                │  │ 3. Logging             │  │
                │  │ 4. Routing             │  │
                │  └────────────────────────┘  │
                └──────────────┬───────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│   User API    │    │  Order API    │    │ Payment API   │
│   Service     │    │   Service     │    │   Service     │
└───────────────┘    └───────────────┘    └───────────────┘
🔹 Popular API Gateway Tools
Tool	Type	Use Case
Kong	Open Source	Enterprise, Plugins
NGINX	Open Source	High performance, Reverse proxy
AWS API Gateway	Managed Cloud	AWS ecosystem
Azure API Management	Managed Cloud	Azure ecosystem
Spring Cloud Gateway	Framework	Java microservices
Express Gateway	Open Source	Node.js microservices
Traefik	Open Source	Kubernetes, Docker
Apollo GraphQL	Open Source	GraphQL federation
🔹 NGINX as API Gateway Example
Configuration
nginx
# nginx.conf
http {
    upstream user_service {
        server user-service-1:8080;
        server user-service-2:8080;
    }

    upstream order_service {
        server order-service-1:8081;
        server order-service-2:8081;
    }

    server {
        listen 80;

        location /api/users {
            proxy_pass http://user_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }

        location /api/orders {
            proxy_pass http://order_service;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
🔹 Request Flow in API Gateway
text
1. Client sends request
        │
        ▼
2. SSL Termination (HTTPS → HTTP)
        │
        ▼
3. Authentication (JWT Validation)
        │
        ▼
4. Rate Limiting Check
        │
        ▼
5. Request Transformation (if needed)
        │
        ▼
6. Route to Service
        │
        ▼
7. Response Transformation (if needed)
        │
        ▼
8. Logging & Monitoring
        │
        ▼
9. Response to Client
🔹 Authentication Flow
text
Client
    │
    │ Request + JWT Token
    ▼
API Gateway
    │
    ▼
┌─────────────────────────────────────┐
│  JWT Validation                     │
│  ├── Verify Signature               │
│  ├── Check Expiry                   │
│  ├── Validate Audience              │
│  └── Extract User Info              │
└─────────────────────────────────────┘
    │
    ▼
Route to Service with user context
    │
    ▼
Backend Service
🔹 Rate Limiting at Gateway
text
Client
    │
    ▼
API Gateway
    │
    ▼
┌─────────────────────────────────────┐
│  Rate Limiter                       │
│  ├── Check Redis Counter            │
│  ├── If Limit Exceeded → 429        │
│  └── If Allowed → Increment         │
└─────────────────────────────────────┘
    │
    ▼
Route to Service
🔹 Error Handling in API Gateway
Common Errors
Error Code	Scenario	Response
400	Invalid request	Validation error details
401	Missing/Invalid JWT	Unauthorized
403	Insufficient permissions	Forbidden
404	Route not found	Service unavailable
429	Rate limit exceeded	Too many requests
500	Backend service error	Internal server error
503	Service unavailable	Circuit breaker tripped
🔹 Circuit Breaker Pattern
text
        ┌─────────────────────────────────────┐
        │         Circuit Breaker              │
        │                                      │
        │   ┌─────────┐                        │
        │   │ CLOSED  │───► Failures ──►      │
        │   └─────────┘                        │
        │        │                             │
        │        ▼                             │
        │   ┌─────────┐                        │
        │   │  OPEN   │───► Timeout ──►       │
        │   └─────────┘                        │
        │        │                             │
        │        ▼                             │
        │   ┌─────────┐                        │
        │   │  HALF   │───► Success ──► CLOSED │
        │   │  OPEN   │───► Failure ──► OPEN   │
        │   └─────────┘                        │
        └─────────────────────────────────────┘
🔹 API Gateway Pattern Comparison
1. Single API Gateway
text
Client → API Gateway → All Services
Pros: Simple, easy to manage
Cons: Single point of failure

2. Gateway per Service Group
text
Client → Auth Gateway → Auth Services
Client → API Gateway → Business Services
Client → Report Gateway → Report Services
Pros: Better isolation, smaller failure domain
Cons: More complex to manage

3. Federation (GraphQL)
text
Client → GraphQL Gateway → Multiple Services
Pros: Single API, client-friendly
Cons: Complex, caching challenges

🔹 Monitoring and Observability
Metrics to Track
text
┌─────────────────────────────────────────────┐
│          API Gateway Metrics                 │
├─────────────────────────────────────────────┤
│ • Requests/second                           │
│ • Response time (p50, p95, p99)            │
│ • Error rate                                │
│ • Rate limit hits                           │
│ • Service health status                     │
│ • Authentication failures                   │
│ • Active connections                        │
└─────────────────────────────────────────────┘
🔹 Logging Implementation
Structured Logging
json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "trace_id": "abc-123-def",
  "user_id": "user123",
  "method": "POST",
  "path": "/api/orders",
  "status": 200,
  "latency_ms": 45,
  "upstream_service": "order-service",
  "client_ip": "192.168.1.1"
}
🔹 Real Production Example
AWS API Gateway + Lambda
text
Client
    │
    ▼
┌─────────────────────────────────────────────┐
│         AWS API Gateway                      │
├─────────────────────────────────────────────┤
│ • Rate Limiting: 10,000 req/sec             │
│ • Authentication: Cognito                    │
│ • Caching: 5 min TTL                        │
│ • Logging: CloudWatch                       │
│ • Monitoring: CloudWatch Metrics            │
└─────────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────────┐
│         AWS Lambda Functions                │
├─────────────────────────────────────────────┤
│ • CreateOrder Lambda                        │
│ • GetOrder Lambda                           │
│ • UpdateOrder Lambda                        │
└─────────────────────────────────────────────┘
🔹 Security Best Practices
Practice	Description
TLS 1.3	Encrypt all traffic
JWT Validation	Validate on every request
Rate Limiting	Per user/IP/API
CORS Configuration	Restrict allowed origins
Request Validation	Validate schemas
Logging	Log all requests/responses
Secrets Management	Use vault/secrets manager
WAF	Web Application Firewall

🔹 Implementation Example (Express)
javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const httpProxy = require('http-proxy-middleware');

const app = express();

// 1. Logging
app.use(morgan('combined'));

// 2. Authentication Middleware
app.use(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
});

// 3. Rate Limiting
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    keyGenerator: (req) => req.user.id
});
app.use('/api', limiter);

// 4. Routes
app.use('/api/users', httpProxy({
    target: 'http://user-service:8080',
    changeOrigin: true
}));

app.use('/api/orders', httpProxy({
    target: 'http://order-service:8081',
    changeOrigin: true
}));

// 5. Error Handler
app.use((err, req, res, next) => {
    console.error('API Gateway Error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});
🔹 Advantages and Disadvantages
✅ Advantages
Single entry point

Centralized security

Simplified client

Cross-cutting concerns

Service abstraction

Better monitoring

Load balancing

❌ Disadvantages
Single point of failure

Performance overhead

Complexity in routing

Potential bottleneck

Additional latency

🔹 When to Use API Gateway
✅ Use API Gateway When
Multiple microservices

Multiple client types

Need centralized auth

Need rate limiting

Need logging

Enterprise applications

❌ Don't Use When
Single monolithic app

Simple CRUD app

No multiple services

Small team/project

🎯 Interview Golden Line
"API Gateway provides a single, secure entry point for all client requests, handling cross-cutting concerns like authentication, rate limiting, logging, and routing while abstracting underlying service complexity from clients."