import { MigrationInterface, QueryRunner } from "typeorm"

export class EnterDataForCity1695471729313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into city(name) value ('Niš')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
