import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742525122608 implements MigrationInterface {
    name = 'Init1742525122608'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_20a1a22d2376b6c8e424277f0f\` ON \`article\``);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sort\` int NOT NULL DEFAULT '100', \`status\` enum ('1', '0') NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`img\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sort\` int NOT NULL DEFAULT '100', \`status\` enum ('1', '0') NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NULL, \`listImg\` varchar(255) NOT NULL, \`swiperImgs\` json NULL COMMENT '商品轮播图数组', \`detailImg\` varchar(255) NOT NULL, \`detailTable\` json NULL COMMENT '商品详情数据数组', \`sales\` int NOT NULL DEFAULT '0', \`price\` decimal(10,2) NOT NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`username\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD UNIQUE INDEX \`IDX_20a1a22d2376b6c8e424277f0f\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`firstImg\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`secondImg\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`video\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`experienceTopImg\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`policyTopImg\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`title\` varchar(255) NOT NULL COMMENT '文章标题'`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`content\` longtext NOT NULL COMMENT '富文本内容'`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`content\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`policyTopImg\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`experienceTopImg\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`video\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`secondImg\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`firstImg\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP INDEX \`IDX_20a1a22d2376b6c8e424277f0f\``);
        await queryRunner.query(`ALTER TABLE \`article\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`username\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`article\` ADD \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`product\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_20a1a22d2376b6c8e424277f0f\` ON \`article\` (\`username\`)`);
    }

}
