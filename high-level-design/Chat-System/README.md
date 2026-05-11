# Production-Grade 1:1 Chat System

A scalable, secure, and real-time 1:1 messaging platform built with React, Node.js, Socket.io, MongoDB, and Redis.

## 🚀 Features
- **Real-time Messaging**: Instant message delivery using WebSockets.
- **Presence Tracking**: Live "Online Now" status using Redis.
- **Chat History**: Persistent message storage and retrieval via MongoDB.
- **Scalable Architecture**: Horizontal scaling support with Redis adapter.
- **Resilient Fallback**: In-memory failover for session tracking if Redis is unavailable.
- **Premium UI**: Modern dark-mode interface with smooth animations.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, TypeScript, Socket.io-client, Lucide Icons.
- **Backend**: Node.js, Express, TypeScript, Socket.io, Mongoose, IORedis.
- **Infrastructure**: MongoDB (Persistence), Redis (Status & Scaling).

## 📦 Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Chat-System
```

### 2. Backend Setup
1. Navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Configure `.env`:
   ```env
   PORT=4000
   MONGODB_URI=your_mongodb_uri
   REDIS_URL=your_redis_url
   ```
4. Start development server: `npm run dev`

### 3. Frontend Setup
1. Navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Configure `.env`:
   ```env
   VITE_SOCKET_URL=http://localhost:4000
   ```
4. Start development server: `npm run dev`

## 🛡️ Security
- Input validation via Zod.
- Security headers with Helmet.
- CORS protection.
- Environment-based configuration (No secrets exposed).
