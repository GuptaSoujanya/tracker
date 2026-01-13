# Tracker API Server

Backend API server for the Tracker application using Supabase (PostgreSQL).

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. **Configure Supabase:**
   
   You need to get your Supabase credentials from your project dashboard:
   
   **Where to find your Supabase keys:**
   
   1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   2. Sign in or create an account
   3. Create a new project (or select an existing one)
   4. Wait for the project to finish setting up (takes ~2 minutes)
   5. Once ready, go to **Settings** → **API**
   6. You'll find:
      - **Project URL**: Copy the "Project URL" value → use as `SUPABASE_URL`
      - **Anon Key**: Copy the "anon" or "public" key → use as `SUPABASE_ANON_KEY`
      - **Service Role Key** (optional): Copy the "service_role" key → use as `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
   
   **Example .env file:**
   ```env
   PORT=5000
   SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. Update the `.env` file with your Supabase credentials.

5. Run the development server:
```bash
npm run dev
```

## Database

This server uses **Supabase** (PostgreSQL) instead of MongoDB. Supabase provides:
- PostgreSQL database
- Real-time subscriptions
- Authentication
- Storage
- Auto-generated REST APIs

The Supabase client is initialized automatically when the server starts.

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests

## API Endpoints

- `GET /` - API information
- `GET /health` - Health check endpoint

## Folder Structure

```
server/
├── src/
│   ├── index.ts          # Entry point
│   ├── routes/           # API routes
│   ├── controllers/      # Request handlers
│   ├── models/           # Database models
│   ├── middleware/       # Custom middleware
│   └── utils/            # Utility functions
├── dist/                 # Compiled output
└── package.json
```

