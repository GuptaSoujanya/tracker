# Tracker API Server

Backend API server for the Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration.

4. Run the development server:
```bash
npm run dev
```

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

