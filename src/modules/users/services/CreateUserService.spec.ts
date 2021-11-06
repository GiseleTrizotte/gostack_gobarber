import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/fakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider.spec";
import CreateUserService from "./CreateUserService";

describe('CreateUserService', () => {
  it('shold be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const user = await createUserService.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    await createUserService.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    expect(createUserService.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
})
