import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
	driver: 's3' | 'disk';
	tmpFolder: string;
	uploadsFolder: string;
	multer: {
		storage: StorageEngine;
	};
	config: {
		disk: unknown;
		aws: {
			bucket: string;
		};
	};
}

export default {
	driver: 'disk',
	tmpFolder,
	uploadsFolder: path.resolve(tmpFolder, 'uploads'),

	multer: {
		storage: multer.diskStorage({
			destination: tmpFolder,
			filename(req, file, cb) {
				const fileHash = crypto.randomBytes(10).toString('hex');
				const fileName = `${fileHash}-${file.originalname}`;

				return cb(null, fileName);
			},
		}),
	},

	config: {
		disk: {},
		aws: {
			bucket: 'app-gobarber',
		},
	},
} as IUploadConfig;
