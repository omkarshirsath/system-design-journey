# Notification System Design

## Problem Statement

Design a scalable notification system capable of sending:
- Push notifications
- Email notifications
- SMS notifications
- In-app notifications

---

## Functional Requirements

- Send notifications to users
- Retry failed notifications
- Support multiple channels
- User notification preferences

---

## Non Functional Requirements

- High availability
- Retry mechanisms
- Horizontal scalability
- Fault tolerance
- Low latency delivery

---

## High Level Architecture

- API Gateway
- Notification Service
- Kafka/RabbitMQ
- Worker Services
- Redis
- Database

---

## Event Flow

1. User triggers event
2. Event pushed to queue
3. Worker consumes message
4. Channel service processes notification
5. Delivery status updated

---

## Scaling Considerations

- Queue partitioning
- Retry queues
- Dead letter queues
- Idempotency
- Batch processing

---

## Real World Technologies

- Kafka
- Redis Pub/Sub
- Firebase FCM
- SES
- Twilio
- WebSockets

## High-Level Design

```text
┌─────────────┐
│   Clients   │
│  (Mobile/   │
│   Web/API)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  API Gateway│
│  + Socket.IO│
│   Servers   │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│    Kafka    │
│   (Events)  │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│      Worker Pool            │
├──────────┬──────────┬───────┤
│ Email    │  SMS     │ Push  │
│ Workers  │ Workers  │Notify │
└──────────┴──────────┴───────┘
       │         │         │
       ▼         ▼         ▼
┌──────────┐┌────────┐┌──────────┐
│ SendGrid ││ Twilio ││ Firebase │
│   SES    ││        ││   APNS   │
└──────────┘└────────┘└──────────┘

# Core Components

## 1. Socket.IO Layer

**Purpose**: Real-time bidirectional communication

**Use Cases**: 
- Live chat
- Typing indicators
- Online status

**Limitations**: 
- Cannot store messages
- Requires active connection

---

## 2. Kafka Layer

**Purpose**: Durable event storage and distribution

**Use Cases**: 
- Async processing
- Retries
- Buffering

**Advantages**: 
- High throughput
- Fault tolerance
- Replay capability

---

## 3. Worker Pool

**Purpose**: Process events from Kafka

**Scaling**: Horizontal scaling based on queue depth

**Retry Logic**: Exponential backoff with dead letter queue

---

# Data Flow

## Real-time Message

```text
User A → Socket.IO → Server → Socket.IO → User B
Async Notification
Order Service → API → Kafka → Workers → Providers

Database Schema
sql
-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    email VARCHAR,
    phone VARCHAR,
    fcm_token VARCHAR,
    apns_token VARCHAR,
    online_status BOOLEAN,
    last_seen TIMESTAMP
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID,
    type VARCHAR,        -- email/sms/push
    status VARCHAR,      -- pending/sent/failed
    payload JSONB,
    created_at TIMESTAMP,
    retry_count INT,
    delivered_at TIMESTAMP
);