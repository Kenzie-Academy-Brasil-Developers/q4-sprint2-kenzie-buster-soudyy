import { MigrationInterface, QueryRunner } from "typeorm";

export class buyEntity1653693444722 implements MigrationInterface {
    name = 'buyEntity1653693444722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "buy" ("id" uuid NOT NULL, "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_634c4687b54f6a44ac0c142adf7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buy_products_dvds" ("buyId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_3af981dd7af44f2f58c78b7cb7f" PRIMARY KEY ("buyId", "dvdsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1a0287574f730a96570b10153e" ON "buy_products_dvds" ("buyId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bc91bfc38ee4d315a2e02fc2d1" ON "buy_products_dvds" ("dvdsId") `);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_73b6d9b1037a714d3314e038819" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buy_products_dvds" ADD CONSTRAINT "FK_1a0287574f730a96570b10153e4" FOREIGN KEY ("buyId") REFERENCES "buy"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buy_products_dvds" ADD CONSTRAINT "FK_bc91bfc38ee4d315a2e02fc2d11" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buy_products_dvds" DROP CONSTRAINT "FK_bc91bfc38ee4d315a2e02fc2d11"`);
        await queryRunner.query(`ALTER TABLE "buy_products_dvds" DROP CONSTRAINT "FK_1a0287574f730a96570b10153e4"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_73b6d9b1037a714d3314e038819"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc91bfc38ee4d315a2e02fc2d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1a0287574f730a96570b10153e"`);
        await queryRunner.query(`DROP TABLE "buy_products_dvds"`);
        await queryRunner.query(`DROP TABLE "buy"`);
    }

}
