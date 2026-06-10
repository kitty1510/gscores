import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudentsTable1700000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'students',
        columns: [
          { name: 'sbd', type: 'varchar', length: '20', isPrimary: true },
          { name: 'toan', type: 'float', isNullable: true },
          { name: 'ngu_van', type: 'float', isNullable: true },
          { name: 'ngoai_ngu', type: 'float', isNullable: true },
          { name: 'vat_li', type: 'float', isNullable: true },
          { name: 'hoa_hoc', type: 'float', isNullable: true },
          { name: 'sinh_hoc', type: 'float', isNullable: true },
          { name: 'lich_su', type: 'float', isNullable: true },
          { name: 'dia_li', type: 'float', isNullable: true },
          { name: 'gdcd', type: 'float', isNullable: true },
          { name: 'ma_ngoai_ngu', type: 'varchar', length: '10', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('students');
  }
}
