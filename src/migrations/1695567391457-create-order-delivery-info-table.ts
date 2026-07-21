import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm"

export class CreateOrderDeliveryInfoTable1695567391457 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "order_delivery_info",
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
                        name: "order_id",
                        type: "int",
                    })
                ],
            }),
        );

        await queryRunner.createForeignKey(
            "order_delivery_info",
            new TableForeignKey({
                columnNames: ["order_id"],
                referencedTableName: "order",
                onDelete: "CASCADE",
                referencedColumnNames: ["id"],
            }),
        );

        await queryRunner.createForeignKey(
            "order_delivery_info",
            new TableForeignKey({
                columnNames: ["city_id"],
                referencedTableName: "city",
                onDelete: "CASCADE",
                referencedColumnNames: ["id"],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
