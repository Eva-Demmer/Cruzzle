import { PoolConnection } from "mysql2/promise";
import { User } from "../interfaces/users.interface";

const getAllUsers = async (connection: PoolConnection): Promise<User[]> => {
  const queryResult = await connection.query("SELECT * FROM users");
  const data = queryResult[0] as User[];
  return data;
};

const getUserById = async (
  connection: PoolConnection,
  id: number
): Promise<User | null> => {
  const queryResult = await connection.query(
    "SELECT * FROM users WHERE id = ?",
    [id]
  );
  const data = queryResult[0] as User[];
  return data ? data[0] : null;
};

export { getAllUsers, getUserById };
