import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./core/configuration/configuration";
import { RoleModule } from "./models/role/role.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./core/configuration/model/database-config.model";
import { UserModule } from "./models/user/user.module";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "src/environments/.env",
      load: [configuration],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const { database, host, port, password, username }: DatabaseConfig =
          config.getOrThrow("database");

        return {
          database,
          host,
          port,
          password,
          username,
          type: "mariadb",
          migrationsRun: true,
          entities: ["dist/models/**/*.entity.js"],
          migrations: ["dist/migrations/**.ts"],
        };
      },
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get("jwtSecret"),
          signOptions: { expiresIn: "3600s" },
        };
      },
      global: true,
    }),
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
