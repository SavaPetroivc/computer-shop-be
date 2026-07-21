import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPriceToOrderProducts1695567600000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "order_products",
      new TableColumn({
        name: "price",
        type: "double",
        precision: 22,
        isNullable: false,
        default: 0,
      }),
    );

    // Postojece stavke dobijaju trenutnu cenu proizvoda - najbolja moguca procena
    // za porudzbine napravljene pre uvodjenja snapshot-a.
    await queryRunner.query(
      `update order_products op
         join product p on p.id = op.product_id
        set op.price = p.price`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("order_products", "price");
  }
}
