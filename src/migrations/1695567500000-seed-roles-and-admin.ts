import { MigrationInterface, QueryRunner } from "typeorm";
import { RoleName } from "../models/role/enums/role-name.enum";

const ADMIN_USERNAME = "admin";
const ADMIN_EMAIL = "mail@example.com";
// bcrypt hash of the default admin password
const ADMIN_PASSWORD_HASH =
  "$2b$10$qYOh/FacyAjlFRkir6khC.zrf9fd664gtO91DTpES7CW1eoFiWlkW";

export class SeedRolesAndAdmin1695567500000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const role of Object.values(RoleName)) {
      await queryRunner.query(`insert into role(role) values (?)`, [role]);
    }

    await queryRunner.query(
      `insert into user_contact_info(email, contact_phone) values (?, ?)`,
      [ADMIN_EMAIL, "+38169432432"],
    );

    await queryRunner.query(
      `insert into user(username, password, first_name, last_name, activated, user_contact_info_id, role_id)
       values (?, ?, ?, ?, true,
               (select id from user_contact_info where email = ?),
               (select id from role where role = ?))`,
      [
        ADMIN_USERNAME,
        ADMIN_PASSWORD_HASH,
        "Sava",
        "Petrovic",
        ADMIN_EMAIL,
        RoleName.ADMINISTRATOR,
      ],
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`delete from user where username = ?`, [
      ADMIN_USERNAME,
    ]);
    await queryRunner.query(`delete from user_contact_info where email = ?`, [
      ADMIN_EMAIL,
    ]);
    await queryRunner.query(`delete from role`);
  }
}
