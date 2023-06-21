import { RowDataPacket } from "mysql2";
import { getDBConnection } from "../config/database";
import { User } from "../interfaces/users.interface";

const findAll = async (): Promise<User[] | undefined> => {
  let connection;
  try {
    connection = await getDBConnection();
    const [response] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users"
    );

    if (response) {
      return response as User[];
    }
    return undefined;
  } finally {
    connection?.release();
  }
};

const findById = async (id: number): Promise<User[] | undefined> => {
  let connection;
  try {
    connection = await getDBConnection();
    const [response] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (response) {
      return response as User[];
    }
    return undefined;
  } finally {
    connection?.release();
  }
};

export { findAll, findById };
