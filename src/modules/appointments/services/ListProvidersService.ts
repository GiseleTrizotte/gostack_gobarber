import User from '../../users/infra/typeorm/entities/User';
import IUsersRepository from '../../users/repositories/IUsersRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
	user_id: string;
}

@injectable()
export default class ListProviderService {
	constructor(
		@inject('UserRepository')
		private userRepository: IUsersRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({ user_id }: IRequest): Promise<User[]> {
		let users = await this.cacheProvider.recover<User[]>(
			`providers-list:${user_id}`,
		);

		if (!users) {
			users = await this.userRepository.findAllProviders({
				except_user_id: user_id,
			});

			await this.cacheProvider.save(`providers-list:${user_id}`, users);
		}

		return users;
	}
}
