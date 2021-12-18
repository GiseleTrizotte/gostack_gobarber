import AppError from '../../../shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
	beforeEach(() => {
		fakeUserRepository = new FakeUsersRepository();
		fakeHashProvider = new FakeHashProvider();

		authenticateUser = new AuthenticateUserService(
			fakeUserRepository,
			fakeHashProvider,
		);
	});

	it('shold be able to authenticate', async () => {
		await fakeUserRepository.create({
			name: 'john Doe',
			email: 'johnDoe@teste.com.br',
			password: '123456',
		});

		const response = await authenticateUser.execute({
			email: 'johnDoe@teste.com.br',
			password: '123456',
		});

		expect(response).toHaveProperty('token');
	});

	it('shold be able to authenticate with non existing user', async () => {
		await expect(
			authenticateUser.execute({
				email: 'johnDoe@teste.com.br',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('shold not be able to authenticate with wrong password', async () => {
		await fakeUserRepository.create({
			name: 'john Doe',
			email: 'johnDoe@teste.com.br',
			password: '123456',
		});

		await expect(
			authenticateUser.execute({
				email: 'johnDoe@teste.com.br',
				password: 'wrong-password',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
