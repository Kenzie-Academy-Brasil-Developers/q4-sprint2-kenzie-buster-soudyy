import { MigrationInterface, QueryRunner } from "typeorm";

export class alterei1653695659324 implements MigrationInterface {
    name = 'alterei1653695659324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" ADD "dvdId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "UQ_2ef78912e491650c3c3e0cfa7bd" UNIQUE ("dvdId")`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_2ef78912e491650c3c3e0cfa7bd" FOREIGN KEY ("dvdId") REFERENCES "dvds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_2ef78912e491650c3c3e0cfa7bd"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "UQ_2ef78912e491650c3c3e0cfa7bd"`);
        await queryRunner.query(`ALTER TABLE "stock" DROP COLUMN "dvdId"`);
    }

}
