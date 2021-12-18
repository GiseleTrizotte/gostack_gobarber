import { getMongoRepository, MongoRepository } from 'typeorm';
import ICreateNotifications from '../../../dtos/ICreateNotifications';
import INotificationsRepository from '../../../repositories/INotificationsRepository';
import Notification from '../schemas/Notification';

export default class NotificationsRepository
	implements INotificationsRepository
{
	private ormRepository: MongoRepository<Notification>;

	constructor() {
		this.ormRepository = getMongoRepository(Notification, 'mongo');
	}

	public async create({
		content,
		recipient_id,
	}: ICreateNotifications): Promise<Notification> {
		const notification = this.ormRepository.create({
			content,
			recipient_id,
		});

		await this.ormRepository.save(notification);

		return notification;
	}
}
