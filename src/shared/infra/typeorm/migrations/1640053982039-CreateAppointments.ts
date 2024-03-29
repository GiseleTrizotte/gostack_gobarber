import {
	MigrationInterface,
	QueryRunner,
	Table,
	TableForeignKey,
} from 'typeorm';

export default class CreateAppointments1640053982039
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp" `);
		await queryRunner.createTable(
			new Table({
				name: 'appointments',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
					{
						name: 'provider_id',
						type: 'uuid',
						isNullable: true,
					},
					{
						name: 'user_id',
						type: 'uuid',
						isNullable: true,
					},
					{
						name: 'date',
						type: 'timestamp with time zone',
					},
					{
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
				],
			}),
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentProvider',
				columnNames: ['provider_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);

		await queryRunner.createForeignKey(
			'appointments',
			new TableForeignKey({
				name: 'AppointmentUser',
				columnNames: ['user_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'users',
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('appointments', 'AppointmentUser');
		await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
		await queryRunner.dropTable('appointments');
	}
}
