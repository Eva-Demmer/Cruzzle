import { createPool, Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
};

let pool: Pool;

async function createDBConnection(): Promise<void> {
  pool = createPool(dbConfig);
}

async function getDBConnection() {
  return pool.getConnection();
}

export { createDBConnection, getDBConnection };
