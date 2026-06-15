# ✅ Design Payment System

### 🔹 Short Definition

A Payment System handles secure money transactions between users, merchants, and payment providers while ensuring **no duplicate payments, data consistency, and reliable transaction processing**.

### 🔹 Main Goal

* Secure payments
* No duplicate charges
* Transaction reliability
* High availability
* Auditability

---

# ✅ STEP 1 — Requirements

## Functional

* User can make payment
* Support multiple payment methods:

  * Credit/Debit Card
  * UPI
  * Wallet
  * Net Banking
* Check payment status
* Refund payment
* Transaction history
* Payment confirmation

---

## Non-Functional

* High security
* Strong consistency
* Fault tolerant
* Highly available
* Low latency
* Audit logs

---

# 🧱 STEP 2 — High-Level Design

```text
                    ┌───────────┐
                    │   User    │
                    └─────┬─────┘
                          │
                          │ Payment Request
                          ▼
                 ┌────────────────┐
                 │  API Gateway    │
                 └───────┬────────┘
                         │
                         ▼
              ┌────────────────────┐
              │ Payment Service     │
              └────────┬───────────┘
                       │
          ┌────────────▼────────────┐
          │ Transaction Service      │
          └────────────┬────────────┘
                       │
              ┌────────▼────────┐
              │ Payment Gateway │
              │ Razorpay/Stripe │
              └────────┬────────┘
                       │
          ┌────────────▼────────────┐
          │ Bank / External Provider │
          └─────────────────────────┘


              ┌────────────────┐
              │ Message Queue   │
              │ Kafka/RabbitMQ  │
              └───────┬────────┘
                      │
              ┌───────▼────────┐
              │ Notification    │
              │ Service         │
              └────────────────┘


              ┌────────────────┐
              │ Database       │
              │ Transactions   │
              └────────────────┘

            
🔄 FLOW
Payment Flow
text
User
 ↓
Payment API
 ↓
Payment Service
 ↓
Payment Gateway
 ↓
Bank
 ↓
Payment Response
 ↓
Update Transaction DB
 ↓
Send Notification
👤 USER JOURNEY
When User Makes Payment
Example:

User buys product worth ₹1000.

Step 1
User clicks:

text
Pay Now
Frontend sends:

json
{
"userId":123,
"amount":1000,
"orderId":"ORD123"
}
Step 2
Backend creates payment request.

Creates transaction:

text
transaction_id = TXN001
status = PENDING
Step 3
Payment Service sends request to gateway.

Example:

text
Backend
   |
   ↓
Razorpay/Stripe
   |
   ↓
Bank
Step 4
Bank processes payment.

Possible responses:

text
SUCCESS
FAILED
PENDING
Step 5
Backend updates transaction:

text
TXN001

status = SUCCESS
Step 6
Event published:

text
Payment Completed
into Kafka.

Other services consume:

Order service

Email service

Notification service           