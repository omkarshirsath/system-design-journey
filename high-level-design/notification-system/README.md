
---

# readme.md

```markdown
# Notification System

## Overview

Real-time notification system handling both WebSocket live updates and async message delivery (Email, SMS, Push).

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Kafka 3.0+
- Redis 7.0+

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/notification-system
cd notification-system

# Start infrastructure
docker-compose up -d

# Install dependencies
npm install

# Configure providers
cp .env.example .env
# Add API keys for SendGrid, Twilio, Firebase

# Start services
npm run start:api
npm run start:socket
npm run start:workers