import startOfHour from 'date-fns/startOfHour';
import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import { format, getHours, isBefore } from 'date-fns';
import INotificationsRepository from '../../notifications/repositories/INotificationsRepository';
import ICacheProvider from '../../../shared/container/providers/CacheProvider/models/ICacheProvider';

interface RequestCreateAppointment {
	provider_id: string;
	user_id: string;
	date: Date;
}

@injectable()
class CreateAppointmentService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepository: IAppointmentsRepository,

		@inject('NotificationsRepository')
		private notificationsRepository: INotificationsRepository,

		@inject('CacheProvider')
		private cacheProvider: ICacheProvider,
	) {}

	public async execute({
		provider_id,
		user_id,
		date,
	}: RequestCreateAppointment): Promise<Appointment> {
		const appointmentDate = startOfHour(date);

		if (isBefore(appointmentDate, Date.now())) {
			throw new AppError("You can't create an appointment on a past date");
		}

		if (user_id === provider_id) {
			throw new AppError("You can't create an appointment with yourself");
		}

		if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
			throw new AppError(
				'You can only create appointments between 8am and 5pm',
			);
		}

		const findAppointmentsInSameDate =
			await this.appointmentsRepository.findByDate(appointmentDate);

		if (findAppointmentsInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = this.appointmentsRepository.create({
			provider_id,
			user_id,
			date: appointmentDate,
		});

		const dataFormated = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

		await this.notificationsRepository.create({
			recipient_id: provider_id,
			content: `Novo agendamento para dia ${dataFormated}`,
		});

		await this.cacheProvider.invalidate(
			`provider-appointments:${provider_id}:${format(
				appointmentDate,
				'yyyy-M-d',
			)}`,
		);

		return appointment;
	}
}

export default CreateAppointmentService;
