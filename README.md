# Tracker Application

A full-stack application with AI-powered features.

## Project Structure

```
Tracker/
├── client/          # Frontend application (Next.js)
├── server/          # Backend API server (Express + TypeScript)
└── ai/              # AI services (Express + TypeScript)
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account (for PostgreSQL database) - [Sign up free](https://supabase.com)

### Installation

1. **Install all dependencies:**

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Install AI service dependencies
cd ../ai
npm install
```

2. **Configure environment variables:**

```bash
# Server
cd server
cp .env.example .env
# Edit .env with your Supabase credentials
# Get your keys from: https://supabase.com/dashboard → Your Project → Settings → API

# AI Service
cd ../ai
cp .env.example .env
# Edit .env with your API keys
```

**Getting Supabase Keys:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create/select a project
3. Navigate to **Settings** → **API**
4. Copy:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_ANON_KEY`

3. **Run the applications:**

```bash
# Terminal 1 - Run client (port 3000)
cd client
npm run dev

# Terminal 2 - Run server (port 5000)
cd server
npm run dev

# Terminal 3 - Run AI service (port 5001)
cd ai
npm run dev
```

## Architecture

- **Client**: Next.js 15 with React, TypeScript, and Tailwind CSS
- **Server**: Express.js with TypeScript, Supabase (PostgreSQL)
- **AI**: Express.js with TypeScript, OpenAI integration

## Development

Each service runs independently and communicates via REST APIs:

- Client: `http://localhost:3000`
- Server: `http://localhost:5000`
- AI Service: `http://localhost:5001`

## License

ISC

