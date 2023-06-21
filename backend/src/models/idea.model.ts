import { RowDataPacket } from "mysql2";
import { getDBConnection } from "../config/database";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

const findAll = async (): Promise<RowDataPacket[] | undefined> => {
  let connection;
  try {
    connection = await getDBConnection();
    const [response] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM ideas"
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
      "SELECT * FROM ideas WHERE id = ?",
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

const findByFilter = async (
  filterQuery: IdeaFilterQuery
): Promise<RowDataPacket[] | undefined> => {
  console.info(filterQuery);

  let connection;
  try {
    connection = await getDBConnection();
    const [response] = await connection.query<RowDataPacket[]>(
      `SELECT * FROM ideas`
    );

    if (response) {
      return response;
    }
    return undefined;
  } finally {
    connection?.release();
  }
};

export { findAll, findById, findByFilter };
