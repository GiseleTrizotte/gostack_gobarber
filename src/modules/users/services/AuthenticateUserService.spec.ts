import AppError from "@shared/errors/AppError";

import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider.spec";
import FakeUsersRepository from "../repositories/fakes/fakeUsersRepository";
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
  it('shold be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    const response = await authenticateUser.execute({
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
  });

  it('shold be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: 'johnDoe@teste.com.br',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('shold not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUserRepository, fakeHashProvider);
    const createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUser.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    expect(authenticateUser.execute({
      email: 'johnDoe@teste.com.br',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);
  });
})
