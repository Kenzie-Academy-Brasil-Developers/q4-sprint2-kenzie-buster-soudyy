import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedTables31654126864935 implements MigrationInterface {
    name = 'updatedTables31654126864935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_756f53ab9466eb52a52619ee019"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "userId" TO "newUserId"`);
        await queryRunner.query(`CREATE TABLE "cart_dvd_dvds" ("cartId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_09aae92cdf55e09270cf357019e" PRIMARY KEY ("cartId", "dvdsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_8b205508e9623f97939f96cc78" ON "cart_dvd_dvds" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e7a74eaba83f3e4f732ee3c69a" ON "cart_dvd_dvds" ("dvdsId") `);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_223a396bd2af6e1c313ec6f055b" FOREIGN KEY ("newUserId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" ADD CONSTRAINT "FK_8b205508e9623f97939f96cc784" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" ADD CONSTRAINT "FK_e7a74eaba83f3e4f732ee3c69a7" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" DROP CONSTRAINT "FK_e7a74eaba83f3e4f732ee3c69a7"`);
        await queryRunner.query(`ALTER TABLE "cart_dvd_dvds" DROP CONSTRAINT "FK_8b205508e9623f97939f96cc784"`);
        await queryRunner.query(`ALTER TABLE "cart" DROP CONSTRAINT "FK_223a396bd2af6e1c313ec6f055b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7a74eaba83f3e4f732ee3c69a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8b205508e9623f97939f96cc78"`);
        await queryRunner.query(`DROP TABLE "cart_dvd_dvds"`);
        await queryRunner.query(`ALTER TABLE "cart" RENAME COLUMN "newUserId" TO "userId"`);
        await queryRunner.query(`ALTER TABLE "cart" ADD CONSTRAINT "FK_756f53ab9466eb52a52619ee019" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
