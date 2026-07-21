import { Configuration } from "./model/configuration.model";
import * as process from "process";

export default (): Configuration => ({
  port: Number.parseInt(process.env.PORT),
  database: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    port: Number.parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
  },
  jwtSecret: process.env.JWT_SECRET,
});
