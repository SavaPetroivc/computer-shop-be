import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateOrderTable1695489003083 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),
          new TableColumn({
            name: "date",
            type: "date",
            default: "CURRENT_DATE()",
            isNullable: false,
          }),
          new TableColumn({
            name: "total",
            type: "double",
            isNullable: false,
          }),

          new TableColumn({
            name: "quantity",
            type: "int",
            isNullable: false,
          }),
          new TableColumn({
            name: "user_id",
            type: "int",
            isNullable: false,
          }),
        ],
      }),
    );
    await queryRunner.createForeignKey(
      "order",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
        referencedColumnNames: ["id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
