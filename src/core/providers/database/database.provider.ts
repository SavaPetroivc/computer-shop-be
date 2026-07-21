import { Provider } from "@nestjs/common";
import { DATABASE_PROVIDER } from "../index";
import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { DatabaseConfig } from "../../configuration/model/database-config.model";
import configuration from "../../configuration/configuration";
import { config } from "dotenv";

config({ path: "src/environments/.env" });

export const databaseProvider: Provider = {
  provide: DATABASE_PROVIDER,
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const { database, host, port, password, username }: DatabaseConfig =
      config.getOrThrow("database");

    return new DataSource({
      database,
      host,
      port,
      password,
      username,
      type: "mariadb",
      migrationsRun: true,
      entities: ["dist/models/**/*.entity.js"],
      migrations: ["dist/migrations/**.js"],
      migrationsTransactionMode: "all",
    });
  },
};

export default databaseProvider.useFactory(new ConfigService(configuration()));
