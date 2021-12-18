import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

// eslint-disable-next-line prettier/prettier
export default class addAvatarFieldToUsers1636141468275
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			'users',
			new TableColumn({
				name: 'avatar',
				type: 'varchar',
				isNullable: true,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn('users', 'avatar');
	}
}
