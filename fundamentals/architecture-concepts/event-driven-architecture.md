# ✅ Event-Driven Architecture

### 🔹 Short Definition

Event-Driven Architecture is a software design pattern where services communicate by producing and consuming events. Services are loosely coupled and react to events asynchronously.

---

## 🔹 Why Event-Driven Architecture?

### Problem with Traditional Request-Response

```text
┌─────────────────────────────────────────────────────┐
│                     Monolithic                       │
│                                                      │
│  Payment → Update Order → Send Email → Generate     │
│  Request    Inventory      Invoice                   │
│                                                      │
│  ❌ Tightly coupled                                   │
│  ❌ Synchronous (waiting for each step)             │
│  ❌ One failure breaks everything                   │
│  ❌ Hard to scale                                   │
└─────────────────────────────────────────────────────┘

Solution: Event-Driven
text
┌─────────┐      ┌─────────┐      ┌─────────┐
│Payment  │─────►│ Event   │─────►│ Order   │
│Service  │      │ Broker  │      │ Service │
└─────────┘      └─────────┘      └─────────┘
                     │                  │
                     │                  │
              ┌──────┴──────┐           │
              ▼             ▼           │
        ┌─────────┐   ┌─────────┐      │
        │ Email   │   │Invoice  │◄─────┘
        │ Service │   │ Service │
        └─────────┘   └─────────┘

✅ Loosely coupled
✅ Asynchronous
✅ Fault tolerant
✅ Scalable
🔹 Core Concepts
1. Event
Something that happened in the system.

text
Event Types:
- Order Created
- Payment Completed
- User Registered
- Inventory Updated
- Shipment Dispatched
- Invoice Generated
Event Structure
json
{
  "event_id": "evt_123456",
  "event_type": "payment.completed",
  "timestamp": "2024-01-15T10:30:00Z",
  "source": "payment-service",
  "data": {
    "transaction_id": "txn_789",
    "user_id": "user_456",
    "amount": 1000,
    "currency": "INR"
  },
  "metadata": {
    "trace_id": "trace_abc",
    "version": "1.0"
  }
}
2. Producer
Service that creates/publishes events.

text
Payment Service (Producer)
        │
        ▼
┌─────────────────────────────────────┐
│ "Payment Completed" Event Created   │
└─────────────────────────────────────┘
        │
        ▼
    Event Broker
3. Consumer
Service that listens to and processes events.

text
    Event Broker
        │
        ▼
┌─────────────────────────────────────┐
│ Consumer: Email Service             │
│ Listens to: Payment Completed       │
│ Action: Send confirmation email     │
└─────────────────────────────────────┘
        │
        ▼
    Email Sent
4. Event Broker
Message queue that routes events between services.

text
        ┌─────────────────────────────────────┐
        │         Event Broker                │
        │         (Kafka/RabbitMQ)            │
        ├─────────────────────────────────────┤
        │                                     │
        │  Topic: payment.events              │
        │  ├── Partition 0                    │
        │  ├── Partition 1                    │
        │  └── Partition 2                    │
        │                                     │
        │  Topic: order.events               │
        │  ├── Partition 0                    │
        │  └── Partition 1                    │
        └─────────────────────────────────────┘
🔹 Architecture Diagram
text
                    ┌─────────────────────────────────┐
                    │         Client Request          │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │         API Gateway             │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │       Producer Service          │
                    │    (Order/Payment Service)      │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
                    ┌─────────────────────────────────┐
                    │           Event Broker          │
                    │         (Kafka/RabbitMQ)        │
                    └───────────────┬─────────────────┘
                                    │
            ┌───────────────────────┼───────────────────────┐
            ▼                       ▼                       ▼
┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
│   Consumer 1      │   │   Consumer 2      │   │   Consumer 3      │
│   Email Service   │   │  Notification     │   │   Analytics       │
│                   │   │   Service         │   │   Service         │
└───────────────────┘   └───────────────────┘   └───────────────────┘
🔹 Event Flow Example: Order Processing
Step 1: Order Created
text
┌─────────────────────────────────────────────────────────────┐
│ Producer: Order Service                                     │
│                                                             │
│ Event: order.created                                        │
│ Data: { order_id, user_id, items, amount }                 │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌─────────────────────┐
              │   Event Broker      │
              │   Topic: orders     │
              └─────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Consumer 1  │   │ Consumer 2  │   │ Consumer 3  │
│ Inventory   │   │ Payment     │   │ Notification│
│ Service     │   │ Service     │   │ Service     │
└─────────────┘   └─────────────┘   └─────────────┘
Step 2: Payment Completed
text
┌─────────────────────────────────────────────────────────────┐
│ Producer: Payment Service                                   │
│                                                             │
│ Event: payment.completed                                    │
│ Data: { transaction_id, order_id, amount, status }         │
└─────────────────────────────────────────────────────────────┘
                          │
                          ▼
              ┌─────────────────────┐
              │   Event Broker      │
              │   Topic: payments   │
              └─────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
┌─────────────┐   ┌─────────────┐   ┌─────────────┐
│ Consumer 1  │   │ Consumer 2  │   │ Consumer 3  │
│ Order       │   │ Email       │   │ Analytics   │
│ Service     │   │ Service     │   │ Service     │
└─────────────┘   └─────────────┘   └─────────────┘
🔹 Event Types
1. Domain Events
Events that happen in the business domain.

text
Order Placed
Payment Received
Item Shipped
Invoice Generated
Customer Notified
2. System Events
Events generated by the system infrastructure.

text
Service Started
Service Crashed
Disk Full
Connection Lost
Cache Evicted
3. Integration Events
Events for integrating with external systems.

text
Third-party API Call Completed
Webhook Received
File Uploaded
Data Synced
🔹 Event Delivery Guarantees
Guarantee	Description	Best For
At most once	Event may be lost	Non-critical logs
At least once	Event delivered one or more times	Most business events
Exactly once	Event delivered exactly once	Financial transactions

 Event Sourcing Pattern
Concept
Instead of storing current state, store all events.

text
┌─────────────────────────────────────────────────────────────┐
│                   Event Store                               │
│                                                             │
│ Event 1: Account Created (Balance: ₹0)                    │
│ Event 2: ₹5000 Deposited (Balance: ₹5000)                 │
│ Event 3: ₹2000 Withdrawn (Balance: ₹3000)                 │
│ Event 4: ₹1000 Deposited (Balance: ₹4000)                 │
│                                                             │
│ Current Balance = ₹4000 (reconstructed from events)        │
└─────────────────────────────────────────────────────────────┘
Benefits
✅ Complete audit trail
✅ Time travel (rebuild state at any point)
✅ Debugging capabilities
✅ Historical analysis

🔹 CQRS (Command Query Responsibility Segregation)
Concept
Separate write and read models.

text
┌─────────────────────────────────────────────────────────────┐
│                     CQRS Architecture                       │
│                                                             │
│  ┌─────────────┐                    ┌─────────────────┐   │
│  │    Write    │                    │     Read        │   │
│  │    Model    │                    │     Model       │   │
│  │             │                    │                 │   │
│  │  Commands   │─────► Events ─────►│  Queries        │   │
│  │  (Create)   │                    │  (Select)       │   │
│  └─────────────┘                    └─────────────────┘   │
│         │                                    │             │
│         ▼                                    ▼             │
│  ┌─────────────┐                    ┌─────────────────┐   │
│  │  Write DB   │                    │   Read DB       │   │
│  │  (Normalized)│                    │  (Denormalized) │   │
│  └─────────────┘                    └─────────────────┘   │
└─────────────────────────────────────────────────────────────┘
🔹 Event-Driven vs Request-Response
Feature	Request-Response	Event-Driven
Coupling	Tightly coupled	Loosely coupled
Communication	Synchronous	Asynchronous
Scalability	Limited	Highly scalable
Fault Tolerance	Low	High
Complexity	Low	High
Latency	Low	Medium
Audit Trail	Manual	Automatic (events)
Real-time	Yes	Yes/Near real-time
🔹 Advantages and Disadvantages
✅ Advantages
Loose coupling between services

Scalable and resilient

Asynchronous processing

Excellent for microservices

Complete audit trail

Event replay capabilities

Real-time processing

❌ Disadvantages
Complex to implement

Eventual consistency

Message ordering challenges

Debugging is harder

Additional infrastructure needed

Learning curve

🔹 When to Use Event-Driven Architecture
✅ Use When
Multiple services need to react to changes

Asynchronous processing is acceptable

Need audit trail

High scalability required

Microservices architecture

Real-time analytics

❌ Don't Use When
Simple CRUD application

Strict consistency required

Small team/project

Low complexity requirements

🔹 Failure Handling
Dead Letter Queue (DLQ)
text
┌─────────────────────────────────────────────────────────────┐
│           Failed Events (DLQ)                               │
│                                                             │
│ Event 1: Payment Failed (Invalid card)                     │
│ Event 2: Order Failed (Inventory unavailable)              │
│ Event 3: Email Failed (SMTP timeout)                       │
│                                                             │
│ Action: Manual review or retry later                       │
└─────────────────────────────────────────────────────────────┘
Retry Strategy
text
Failed Event
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│ Retry with Exponential Backoff                             │
│                                                             │
│ Attempt 1: Wait 1 second                                   │
│ Attempt 2: Wait 2 seconds                                  │
│ Attempt 3: Wait 4 seconds                                  │
│ Attempt 4: Wait 8 seconds                                  │
│ Attempt 5: Move to DLQ                                     │
└─────────────────────────────────────────────────────────────┘
🔹 Monitoring and Observability
text
┌─────────────────────────────────────────────────────────────┐
│                   Monitoring Dashboard                      │
├─────────────────────────────────────────────────────────────┤
│ • Events per second                                        │
│ • Consumers lag                                            │
│ • Event processing time                                    │
│ • Error rate                                               │
│ • DLQ size                                                 │
│ • Topic/Queue size                                         │
│ • Producer/Consumer health                                 │
└─────────────────────────────────────────────────────────────┘
🔹 Event Versioning
text
┌─────────────────────────────────────────────────────────────┐
│                   Event Versioning                          │
│                                                             │
│ Version 1.0:                                               │
│ {                                                          │
│   "order_id": "123",                                       │
│   "amount": 1000                                           │
│ }                                                          │
│                                                             │
│ Version 2.0:                                               │
│ {                                                          │
│   "order_id": "123",                                       │
│   "amount": 1000,                                          │
│   "currency": "INR",      // New field                     │
│   "discount": 100          // New field                    │
│ }                                                          │
│                                                             │
│ Strategy: Handle both versions in consumer                 │
└─────────────────────────────────────────────────────────────┘
🔹 Real-World Examples
Example 1: E-commerce
text
Order Placed
    │
    ▼
Event Broker
    │
    ├──► Inventory Service (Reduce stock)
    ├──► Payment Service (Process payment)
    ├──► Notification Service (Send confirmation)
    └──► Analytics Service (Track order)
Example 2: Banking
text
Transaction Completed
    │
    ▼
Event Broker
    │
    ├──► Balance Service (Update balance)
    ├──► Audit Service (Log transaction)
    ├──► Fraud Detection (Check for fraud)
    └──► Notification (Alert user)
Example 3: IoT
text
Device Data Received
    │
    ▼
Event Broker
    │
    ├──► Storage Service (Save data)
    ├──► Alert Service (Check thresholds)
    ├──► Analytics Service (Real-time processing)
    └──► Dashboard Service (Update UI)
