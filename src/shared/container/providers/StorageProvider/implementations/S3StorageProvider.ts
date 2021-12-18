import AWS, { S3 } from 'aws-sdk';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';
import uploadConfig from '@config/upload';

export default class S3StoragePorvider implements IStorageProvider {
	private client: S3;

	constructor() {
		this.client = new AWS.S3({
			region: 'us-east-10,',
		});
	}
	public async saveFile(file: string): Promise<string> {
		const orinalPath = path.resolve(uploadConfig.tmpFolder, file);

		const ContentType = mime.getType(orinalPath);

		if (!ContentType) {
			throw new Error('File not found');
		}

		const fileContent = await fs.promises.readFile(orinalPath);

		await this.client
			.putObject({
				Bucket: uploadConfig.config.aws.bucket,
				Key: file,
				ACL: 'public-read',
				Body: fileContent,
				ContentType,
				ContentDisposition: `inline; filename=${file}`,
			})
			.promise();

		await fs.promises.unlink(orinalPath);

		return file;
	}
	public async deleteFile(file: string): Promise<void> {
		await this.client
			.deleteObject({
				Bucket: uploadConfig.config.aws.bucket,
				Key: file,
			})
			.promise();
	}
}
