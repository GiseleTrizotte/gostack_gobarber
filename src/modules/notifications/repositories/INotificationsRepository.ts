import ICreateNotifications from '../dtos/ICreateNotifications';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
	create(data: ICreateNotifications): Promise<Notification>;
}
