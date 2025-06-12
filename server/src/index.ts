import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import {connectToDB} from './config';
import {logger} from './config';
import { connectRedis } from './config/redis';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectToDB();
  await connectRedis();

  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
