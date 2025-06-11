import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { performanceLogger } from './middlewares/performanceLogger';
import { errorHandler } from './middlewares/errorHandler';
import { CLIENT_ORIGIN } from './config';

const app = express();

app.use(
    cors({
      origin: CLIENT_ORIGIN,
      credentials: true, // allow cookies (like accessToken)
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
); 

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);
app.use(errorHandler); // global error middleware
app.use(performanceLogger);

export default app;
