import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/auth', authRoutes);

export default app;
