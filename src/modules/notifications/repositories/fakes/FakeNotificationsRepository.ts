import { ObjectID } from 'mongodb';
import ICreateNotifications from '../../dtos/ICreateNotifications';
import Notification from '../../infra/typeorm/schemas/Notification';
import INotificationsRepository from '../INotificationsRepository';

export default class FakeNotificationsRepository
	implements INotificationsRepository
{
	private notifications: Notification[] = [];

	public async create({
		content,
		recipient_id,
	}: ICreateNotifications): Promise<Notification> {
		const notification = new Notification();

		Object.assign(notification, { id: new ObjectID(), content, recipient_id });

		this.notifications.push(notification);

		return notification;
	}
}
