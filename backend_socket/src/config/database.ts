import dotenv, { DotenvConfigOptions } from "dotenv";
import mysql, { Pool } from "mysql2/promise";

dotenv.config(<DotenvConfigOptions>{ silent: true });

const database: Pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// database.query("SELECT * FROM `notification_idea`", (err: Error, data: any) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.info(data);
// });

export default database;
