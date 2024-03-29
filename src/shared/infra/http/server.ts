import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '../../../config/upload';
import AppError from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '../typeorm';
import '../../container';

const app = express();

app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use(errors());

// Tratativa de erros depois das rotas
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
	if (err instanceof AppError) {
		return response.status(err.statusCode).json({
			status: 'error',
			message: err.message,
		});
	}

	return response.status(500).json({
		status: 'error',
		message: `Internal server error ${err.message}`,
	});
});

app.listen(3333, () => {
	console.log('Back-end started!');
});
