import startOfHour from 'date-fns/startOfHour';
import { getCustomRepository } from 'typeorm';
import Appointment from '../modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestCreateAppointment {
	provider_id: string;
	date: Date;
}

class CreateAppointmentService {
	public async execute({
		date,
		provider_id,
	}: RequestCreateAppointment): Promise<Appointment> {
		const appointmentsRepository = getCustomRepository(AppointmentsRepository);
		const appointmentDate = startOfHour(date);

		const findAppointmentsInSameDate = await appointmentsRepository.findByDate(
			appointmentDate,
		);

		if (findAppointmentsInSameDate) {
			throw new AppError('This appointment is already booked');
		}

		const appointment = appointmentsRepository.create({
			provider_id,
			date: appointmentDate,
		});

		await appointmentsRepository.save(appointment);

		return appointment;
	}
}

export default CreateAppointmentService;
