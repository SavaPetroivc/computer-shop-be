import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateFkUserAndUserContactInfo1695324921405
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      "user",
      new TableForeignKey({
        columnNames: ["user_contact_info_id"],
        referencedTableName: "user_contact_info",
        onDelete: "CASCADE",
        referencedColumnNames: ["id"],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
