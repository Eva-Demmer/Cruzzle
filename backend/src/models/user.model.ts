import { RowDataPacket } from "mysql2";
import { getDBConnection } from "../config/database";
// import { User } from "../interfaces/users.interface"; <-- POST PUT will be typed with interface

const findAll = async (): Promise<RowDataPacket[] | undefined> => {
  let connection;
  try {
    connection = await getDBConnection();
    const [response] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users"
    );

    if (response) {
      return response;
    }
    return undefined;
  } finally {
    connection?.release();
  }
};

const findById = async (id: number): Promise<RowDataPacket[] | undefined> => {
  let connection;
  try {
    connection = await getDBConnection();
    const [response] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );

    if (response) {
      return response;
    }
    return undefined;
  } finally {
    connection?.release();
  }
};

export { findAll, findById };
