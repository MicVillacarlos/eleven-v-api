import * as dotenv from 'dotenv';
dotenv.config();

export const projectConfig = {
  port: process.env.PORT,
  mongoDbConnect: process.env.MONGO_DB_CONNECT,
  mongoDbDatabaseName: process.env.MONGO_DB_DATABASE_NAME,
};
