import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateDealerTable1606165891335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'deal',
            columns: [
                {
                    name: 'id',
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'date',
                    type: "timestamp"
                },
                {
                    name: 'cpf',
                    type: "string"
                },
                {
                    name: 'value',
                    type: "decimal"
                },
                {
                    name: 'cashback_percent',
                    type: "decimal"
                },
                {
                    name: 'cashback_value',
                    type: "decimal"
                },
                {
                    name: 'status',
                    type: "string"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("deal");
    }

}
