import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateUserDeliveryAddressTable1695325266521
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_delivery_address",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          }),
          new TableColumn({
            name: "city_id",
            type: "int",
            length: "128",
          }),

          new TableColumn({
            name: "zip",
            type: "varchar",
            length: "128",
          }),

          new TableColumn({
            name: "street",
            type: "varchar",
            length: "128",
          }),

          new TableColumn({
            name: "number",
            type: "varchar",
            length: "128",
          }),
          new TableColumn({
            name: "user_id",
            type: "int",
          })
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "user_delivery_address",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
        referencedColumnNames: ["id"],
      }),
    );

    await queryRunner.createForeignKey(
      "user_delivery_address",
      new TableForeignKey({
        columnNames: ["city_id"],
        referencedTableName: "city",
        onDelete: "CASCADE",
        referencedColumnNames: ["id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
