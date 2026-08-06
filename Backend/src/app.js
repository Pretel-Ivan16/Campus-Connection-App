// Cargar crypto lo primero para evitar problemas con jsonwebtoken y mongoose
import crypto from 'crypto';
import express from 'express';
import cors from 'cors';
import { ENVIRONMENT } from './config/environment.config.js';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import facultyRoutes from './routes/faculty.routes.js';
import postRoutes from './routes/post.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

const allowedOrigins = [
	ENVIRONMENT.frontendUrl,
	'http://localhost:5173',
	'http://localhost:3000',
	'https://campus-connection-app-1.vercel.app',
].filter(Boolean);

const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
			return;
		}

		callback(new Error(`CORS blocked for origin: ${origin}`));
	},
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/faculties', facultyRoutes);
app.use('/api/posts', postRoutes);

// Error Middleware (DEBE estar al final)
app.use(errorMiddleware);

export default app;
