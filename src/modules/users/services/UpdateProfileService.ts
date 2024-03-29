import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	user_id: string;
	name: string;
	email: string;
	password?: string;
	old_password?: string;
}

@injectable()
export default class UpdateProfileService {
	constructor(
		@inject('UsersRepository')
		private userRepository: IUsersRepository,

		@inject('HashProvider')
		private hashProvider: IHashProvider,
	) {}

	public async execute({
		name,
		email,
		user_id,
		password,
		old_password,
	}: IRequest): Promise<User> {
		const user = await this.userRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

		if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
			throw new AppError('E-mail already in use');
		}

		user.name = name;
		user.email = email;

		if (password && !old_password) {
			throw new AppError('You nedd to inform the old to set a new password');
		}

		if (password && old_password) {
			const checkOldPassword = await this.hashProvider.compareHash(
				old_password,
				user.password,
			);

			if (!checkOldPassword) {
				throw new AppError('Old password does not match');
			}

			user.password = await this.hashProvider.generateHash(password);
		}

		return this.userRepository.save(user);
	}
}
