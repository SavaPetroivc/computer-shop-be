import { DatabaseConfig } from "./database-config.model";

export interface Configuration {
  port: number;
  database: DatabaseConfig;
  jwtSecret: string;
}
