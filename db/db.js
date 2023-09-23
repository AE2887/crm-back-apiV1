import { createPool } from "mysql2/promise";
import {
  PORT,
  DB,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE
} from "../src/config.js";

export const pool = createPool({
  host: DB,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
});
