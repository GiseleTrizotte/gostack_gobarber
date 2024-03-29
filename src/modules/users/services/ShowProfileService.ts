import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
	user_id: string;
}

@injectable()
export default class ShowProfileService {
	constructor(
		@inject('UsersRepository')
		private userRepository: IUsersRepository,
	) {}

	public async execute({ user_id }: IRequest): Promise<User> {
		const user = await this.userRepository.findById(user_id);

		if (!user) {
			throw new AppError('User not found');
		}

		return user;
	}
}
