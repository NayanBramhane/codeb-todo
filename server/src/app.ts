import express, { type Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';
import todoRouter from './routes/todo.route.js';
import errorMiddleware from './middleware/error.js';

const app: Application = express();

// Global Middleware
app.use(express.json()); // Body parser for JSON
app.use(cookieParser()); // Cookie parser for JWT storage
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Required to send cookies back and forth
  }),
);

// Using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todos', todoRouter);

// error function from express used in controllers to show errors.
// Using error middleware
app.use(errorMiddleware);

export default app;
