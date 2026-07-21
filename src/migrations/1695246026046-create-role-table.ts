import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";
import { RoleName } from "../models/role/enums/role-name.enum";

export class CreateRoleTable1695246026046 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "role",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            generationStrategy: "increment",
            isPrimary: true,
            isGenerated:true,
            isNullable: false,
          }),

          new TableColumn({
            name: "role",
            type: "enum",
            enum: Object.values(RoleName),
            isNullable: false,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
