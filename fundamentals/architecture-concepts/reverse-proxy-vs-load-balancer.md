# Reverse Proxy vs Load Balancer

This is a **very common System Design interview question**.

Many people think:

```text
Reverse Proxy = Load Balancer
But that's not true.

A Load Balancer can act as a Reverse Proxy, but a Reverse Proxy doesn't necessarily load balance.

🚀 Simple Definition
Reverse Proxy
Sits in front of servers and hides backend servers from clients.

text
Client
  │
  ▼
Reverse Proxy
  │
  ▼
Backend Server
Think:

text
Receptionist
User never talks directly to employees.

Load Balancer
Distributes requests among multiple servers.

text
Client
  │
  ▼
Load Balancer
 │  │  │
 ▼  ▼  ▼
S1 S2 S3
Think:

text
Traffic Police
Directs cars to less busy roads.

Example 1 — Reverse Proxy
Suppose:

text
Frontend Server
Backend Server
Auth Server
You don't want users seeing:

text
10.0.0.1
10.0.0.2
10.0.0.3
Use Nginx.

text
User
 │
 ▼

Nginx

 ├─ /api → Backend
 ├─ /auth → Auth
 └─ / → Frontend
User only sees:

text
myapp.com
Example 2 — Load Balancer
Suppose:

text
100,000 users
One server can't handle.

Add:

text
App1
App2
App3
Now:

text
User
 │
 ▼

Load Balancer

 │
 ├── App1
 ├── App2
 └── App3
Requests distributed.

Main Difference
Feature	Reverse Proxy	Load Balancer
Hide Backend	✅	✅
Route Requests	✅	✅
Distribute Traffic	❌ Not primary purpose	✅ Main purpose
SSL Termination	✅	✅
Caching	✅	Sometimes
Security Layer	✅	Limited
Multiple Servers	Optional	Required
Real Nginx Reverse Proxy
text
User
 │
 ▼

Nginx

 ├─ /api
 ├─ /auth
 └─ /files
Purpose:

text
Hide internal services
Real Load Balancer
text
                 Users
                    │
                    ▼

             Load Balancer

       ┌────────┼────────┐
       ▼        ▼        ▼

     App1     App2     App3
Purpose:

text
Distribute traffic
Real Production Architecture
Usually BOTH exist.

text
Users
  │
  ▼

Load Balancer
  │
  ▼

Reverse Proxy (Nginx)

 ├─ API Service
 ├─ Auth Service
 └─ Upload Service
HRMS Example
Suppose your HRMS has:

text
Leave Service
Payroll Service
Auth Service
Nginx:

text
/leave/*
/payroll/*
/auth/*
routes requests.

That's Reverse Proxy.

If suddenly:

text
1 Million Users
Then:

text
AWS ALB
distributes traffic across:

text
Auth1 Auth2 Auth3

Payroll1 Payroll2 Payroll3

Leave1 Leave2 Leave3
That's Load Balancing.

Interview One-Liner
Reverse Proxy
text
A reverse proxy sits in front of backend servers and forwards client requests while hiding internal infrastructure.
Load Balancer
text
A load balancer distributes incoming traffic across multiple servers to improve scalability and availability.
Easy Memory Trick
text
Reverse Proxy
=
"Where should this request go?"

Load Balancer
=
"Which server should handle this request?"
That's the simplest and most interview-friendly way to remember it.