import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateUserContactInfoTable1695324735090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_contact_info",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isGenerated: true,
            generationStrategy: "increment",
            isPrimary: true,
          }),
          new TableColumn({
            name: "email",
            type: "varchar",
            length: "128",
          }),

          new TableColumn({
            name: "contact_phone",
            type: "varchar",
            length: "128",
          }),

          new TableColumn({
            name: "user_id",
            type: "int",
            isNullable: false,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
