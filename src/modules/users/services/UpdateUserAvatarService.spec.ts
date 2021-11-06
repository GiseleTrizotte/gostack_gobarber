import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/fakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider.spec";
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import { isExportDeclaration } from "typescript";

describe('UpdateUserAvatar', () => {
  it('shold be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      avatarFileName: 'no-existing.jpg',
      user_id: user.id
    });

    expect(user.avatar).toBe('no-existing.jpg');
  });

  it('shold not be able to update avatar from non exixting user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    expect(updateUserAvatar.execute({
      avatarFileName: 'avatar.jpg',
      user_id: 'non-existing-user'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('shold delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    await updateUserAvatar.execute({
      avatarFileName: user.id,
      user_id: 'avatar.jpg'
    });

    await updateUserAvatar.execute({
      avatarFileName: user.id,
      user_id: 'avatar.jpg2'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
})
