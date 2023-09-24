import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateProductTable1695488983589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),
          new TableColumn({
            name: "name",
            type: "varchar",
            length: "128",
            isNullable: false,
            isUnique: true,
          }),
          new TableColumn({
            name: "price",
            type: "double",
            isNullable: false,
          }),

          new TableColumn({
            name: "quantity",
            type: "double",
            isNullable: false,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
