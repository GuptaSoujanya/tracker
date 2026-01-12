import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Tracker AI Service is running!' });
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// AI endpoint example
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    
    // TODO: Implement AI analysis logic here
    res.json({ 
      message: 'AI analysis endpoint',
      received: data 
    });
  } catch (error) {
    res.status(500).json({ error: 'AI service error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`🤖[ai]: AI Service is running at http://localhost:${port}`);
});

export default app;

