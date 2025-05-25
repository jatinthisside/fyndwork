import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares';

const app = express();
app.use(express.json());
app.use(errorHandler);

app.use('/api/v1', routes);

export default app;