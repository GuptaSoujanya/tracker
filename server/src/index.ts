import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeSupabase, testSupabaseConnection } from './config/database';
import activityRoutes from './routes/activityRoutes';
import activityLogRoutes from './routes/activityLogRoutes';
import budgetRoutes from './routes/budgetRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

try {
  initializeSupabase();
} catch (error: any) {
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Tracker API Server is running!',
    version: '1.0.0',
    database: 'Supabase (PostgreSQL)',
    endpoints: {
      health: '/health',
      activities: '/api/activities',
      activityLogs: '/api/activity-logs',
      budgets: '/api/budgets',
    },
  });
});

app.get('/health', async (req: Request, res: Response) => {
  const connectionTest = await testSupabaseConnection();
  
  res.json({ 
    status: connectionTest.connected ? 'OK' : 'ERROR',
    timestamp: new Date().toISOString(),
    database: {
      type: 'Supabase (PostgreSQL)',
      connected: connectionTest.connected,
      ...(connectionTest.error && { error: connectionTest.error }),
      ...(connectionTest.details && { details: connectionTest.details }),
    },
  });
});

app.use('/api/activities', activityRoutes);
app.use('/api/activity-logs', activityLogRoutes);
app.use('/api/budgets', budgetRoutes);

app.listen(port, () => {
  // Server started
});

export default app;

