import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

// Global Middleware
app.use(express.json()); // Body parser for JSON
app.use(cookieParser()); // Cookie parser for JWT storage
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true // Required to send cookies back and forth
}));

export default app;