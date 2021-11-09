import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/fakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "./CreateUserService";

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('shold be able to create a new user', async () => {

    const user = await createUserService.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('shold not be able to create a new user with same email from another', async () => {

    await createUserService.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    });

    await expect(createUserService.execute({
      name: 'john Doe',
      email: 'johnDoe@teste.com.br',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
})
