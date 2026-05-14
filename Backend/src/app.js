// Cargar crypto lo primero para evitar problemas con jsonwebtoken y mongoose
import crypto from 'crypto';
import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import postRoutes from './routes/post.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/posts', postRoutes);

// Error Middleware (DEBE estar al final)
app.use(errorMiddleware);

export default app;
