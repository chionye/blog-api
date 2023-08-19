import mysql from "mysql2";
import { config } from "./config";

const configVar = config();
export const db = mysql.createConnection({
  host: configVar?.host,
  user: configVar?.user,
  password: configVar?.password,
  database: configVar?.database,
});