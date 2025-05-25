import { Sequelize } from 'sequelize';
import { serverLoggers } from '../utils';
import dotenv from 'dotenv';
dotenv.config();

const DB_NAME = process.env.DB_NAME as string;
const DB_USER = process.env.DB_USER as string;
const DB_PASS = process.env.DB_PASS as string;
const DB_HOST = process.env.DB_HOST as string;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false,
});

export const connectToDB = async () => {
  try {
    await sequelize.authenticate();
    serverLoggers.logger.info('✅ PostgreSQL connection established successfully.');
  } catch (error) {
    serverLoggers.logger.error('❌ Unable to connect to the PostgreSQL database:', error);
    throw error;
  }
};

export default sequelize
