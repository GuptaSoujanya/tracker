# Tracker AI Service

AI-powered services for the Tracker application.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Add your OpenAI API key and other configurations to `.env`.

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

- `GET /` - Service information
- `GET /health` - Health check endpoint
- `POST /api/analyze` - AI analysis endpoint

## Folder Structure

```
ai/
├── src/
│   ├── index.ts          # Entry point
│   ├── services/         # AI service implementations
│   ├── models/           # AI model configurations
│   ├── utils/            # Utility functions
│   └── types/            # TypeScript types
├── dist/                 # Compiled output
└── package.json
```

## AI Services

This service can be used for:
- Predictive analytics
- Data analysis and insights
- Natural language processing
- Recommendations
- Automated reporting

