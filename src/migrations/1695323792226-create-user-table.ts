import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateUserTable1695323792226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          }),
          new TableColumn({
            name: "username",
            type: "varchar",
            length: "128",
            isNullable: false,
            isUnique: true,
          }),

          new TableColumn({
            name: "password",
            type: "varchar",
            length: "128",
            isNullable: false,
          }),
          new TableColumn({
            name: "first_name",
            type: "varchar",
            length: "128",
            isNullable: false,
          }),
          new TableColumn({
            name: "last_name",
            type: "varchar",
            length: "128",
            isNullable: false,
          }),
          new TableColumn({
            name: "activated",
            type: "boolean",
            isNullable: false,
          }),
          new TableColumn({
            name: "user_contact_info_id",
            type: "int",
            length: "128",
          }),
          new TableColumn({
            name: "role_id",
            type: "int",
            isNullable: false,
          }),
        ],
      }),
    );
    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["role_id"],
        referencedTableName: "role",
        referencedColumnNames: ["id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
