import { uuid } from 'uuidv4';

import IUsersRepository from '../IUsersRepository';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';
import IFindProvidersDTO from '../../dtos/IFindProvidersDTO';

class FakeUsersRepository implements IUsersRepository {
	private users: User[] = [];

	public async findAllProviders({
		except_user_id,
	}: IFindProvidersDTO): Promise<User[]> {
		let { users } = this;

		if (except_user_id) {
			users = this.users.filter(userResult => userResult.id !== except_user_id);
		}

		return users;
	}

	public async findById(id: string): Promise<User | undefined> {
		return this.users.find(user => user.id === id);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return this.users.find(user => user.email === email);
	}

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = new User();

		Object.assign(user, { id: uuid() }, userData);

		this.users.push(user);

		return user;
	}

	public async save(user: User): Promise<User> {
		const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

		this.users[findIndex] = user;

		return user;
	}
}

export default FakeUsersRepository;
