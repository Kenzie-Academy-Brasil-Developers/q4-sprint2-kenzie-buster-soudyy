import { MigrationInterface, QueryRunner } from "typeorm";

export class userData1653608037223 implements MigrationInterface {
    name = 'userData1653608037223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("id" uuid NOT NULL, "quantity" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_092bc1fc7d860426a1dec5aa8e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvds" ("id" uuid NOT NULL, "name" character varying NOT NULL, "duration" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "PK_bcd090a9e4428d665c5ace6f433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL, "paid" boolean NOT NULL DEFAULT false, "total" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dvds_stock_stock" ("dvdsId" uuid NOT NULL, "stockId" uuid NOT NULL, CONSTRAINT "PK_2867cc2bc6f2c00c9a08610bfd4" PRIMARY KEY ("dvdsId", "stockId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_762d104c8c53bf9c98de4cd3a9" ON "dvds_stock_stock" ("dvdsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_10e28b2f9833f06d00dc906a31" ON "dvds_stock_stock" ("stockId") `);
        await queryRunner.query(`CREATE TABLE "cart_dvds_dvds" ("cartId" uuid NOT NULL, "dvdsId" uuid NOT NULL, CONSTRAINT "PK_4b8ad07f60482adcf25346f5f4b" PRIMARY KEY ("cartId", "dvdsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_67f28f9f6c3ba2fd86118048fc" ON "cart_dvds_dvds" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5b5356c9db1290e341dfddfb9" ON "cart_dvds_dvds" ("dvdsId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvds" ADD CONSTRAINT "FK_64384cf44cf06d0e2edd5767859" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "dvds_stock_stock" ADD CONSTRAINT "FK_762d104c8c53bf9c98de4cd3a9e" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "dvds_stock_stock" ADD CONSTRAINT "FK_10e28b2f9833f06d00dc906a319" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" ADD CONSTRAINT "FK_67f28f9f6c3ba2fd86118048fcb" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" ADD CONSTRAINT "FK_e5b5356c9db1290e341dfddfb97" FOREIGN KEY ("dvdsId") REFERENCES "dvds"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" DROP CONSTRAINT "FK_e5b5356c9db1290e341dfddfb97"`);
        await queryRunner.query(`ALTER TABLE "cart_dvds_dvds" DROP CONSTRAINT "FK_67f28f9f6c3ba2fd86118048fcb"`);
        await queryRunner.query(`ALTER TABLE "dvds_stock_stock" DROP CONSTRAINT "FK_10e28b2f9833f06d00dc906a319"`);
        await queryRunner.query(`ALTER TABLE "dvds_stock_stock" DROP CONSTRAINT "FK_762d104c8c53bf9c98de4cd3a9e"`);
        await queryRunner.query(`ALTER TABLE "dvds" DROP CONSTRAINT "FK_64384cf44cf06d0e2edd5767859"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5b5356c9db1290e341dfddfb9"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67f28f9f6c3ba2fd86118048fc"`);
        await queryRunner.query(`DROP TABLE "cart_dvds_dvds"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_10e28b2f9833f06d00dc906a31"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_762d104c8c53bf9c98de4cd3a9"`);
        await queryRunner.query(`DROP TABLE "dvds_stock_stock"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "dvds"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
