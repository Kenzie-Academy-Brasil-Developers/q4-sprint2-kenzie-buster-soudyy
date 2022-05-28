import { MigrationInterface, QueryRunner } from "typeorm";

export class alterei1653694834492 implements MigrationInterface {
    name = 'alterei1653694834492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_64384cf44cf06d0e2edd5767859"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP CONSTRAINT "FK_73b6d9b1037a714d3314e038819"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP COLUMN "ownerId"`);
        await queryRunner.query(`ALTER TABLE "buy" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "REL_89502c44bd22c06e714c31c1e9"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cartId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "cartId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId")`);
        await queryRunner.query(`ALTER TABLE "buy" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD "ownerId" uuid`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "buy" ADD CONSTRAINT "FK_73b6d9b1037a714d3314e038819" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_64384cf44cf06d0e2edd5767859" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
