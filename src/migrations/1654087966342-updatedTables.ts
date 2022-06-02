import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedTables1654087966342 implements MigrationInterface {
    name = 'updatedTables1654087966342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_a7216bc33b367f73f094fc077a4"`);
        await queryRunner.query(`CREATE TABLE "cart_dvds_dvds" ("cartId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_4b8ad07f60482adcf25346f5f4b" PRIMARY KEY ("cartId", "dvdsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_67f28f9f6c3ba2fd86118048fc" ON "cart_dvds_dvds" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5b5356c9db1290e341dfddfb9" ON "cart_dvds_dvds" ("dvdsId") `);
        await queryRunner.query(`ALTER TABLE "cart" DROP COLUMN "dvdsId"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "UQ_d1e620c0f75aa0d8341f2c768ac" UNIQUE ("stockId")`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" ADD CONSTRAINT "FK_67f28f9f6c3ba2fd86118048fcb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" ADD CONSTRAINT "FK_e5b5356c9db1290e341dfddfb97" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" DROP CONSTRAINT "FK_e5b5356c9db1290e341dfddfb97"`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" DROP CONSTRAINT "FK_67f28f9f6c3ba2fd86118048fcb"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "UQ_d1e620c0f75aa0d8341f2c768ac"`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_d1e620c0f75aa0d8341f2c768ac" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart" ADD "dvdsId" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5b5356c9db1290e341dfddfb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67f28f9f6c3ba2fd86118048fc"`);
        await queryRunner.query(`DROP TABLE "cart_dvds_dvds"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_a7216bc33b367f73f094fc077a4" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
