import { uuid } from 'uuidv4';
import UserToken from '../../infra/typeorm/entities/UserToken';
import IUserTokensRepository from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
	private userTokensArray: UserToken[] = [];

	public async generate(user_id: string): Promise<UserToken> {
		const userToken = new UserToken();

		Object.assign(userToken, {
			id: uuid,
			token: uuid,
			user_id,
			created_at: new Date(),
			updated_at: new Date(),
		});

		this.userTokensArray.push(userToken);

		return userToken;
	}

	public async findByToken(token: string): Promise<UserToken | undefined> {
		return this.userTokensArray.find(findToken => findToken.token === token);
	}
}

export default FakeUserTokensRepository;
