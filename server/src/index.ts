import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectToDB } from './config/database';
import {serverLoggers} from './utils';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      serverLoggers.logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    serverLoggers.logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
