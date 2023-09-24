import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateOrderProductTable1695489214001
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_products",
        columns: [
          { name: "product_id", type: "int", isNullable: false },
          { name: "order_id", type: "int", isNullable: false },
          { name: "quantity", type: "int", isNullable: false },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "order_products",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedTableName: "product",
        referencedColumnNames: ["id"],
      }),
    );

    await queryRunner.createForeignKey(
      "order_products",
      new TableForeignKey({
        columnNames: ["order_id"],
        referencedTableName: "order",
        referencedColumnNames: ["id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
