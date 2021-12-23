import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';

import ICreateAppointmentDTO from '../../dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';
import IFindAllInMonthFromProviderDTO from '../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../dtos/IFindAllInDayFromProviderDTO';

export default class FakeAppointmentsRepository
	implements IAppointmentsRepository
{
	private appointments: Appointment[] = [];

	public async listAllAppointments(): Promise<Appointment[]> {
		return this.appointments;
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		return this.appointments.find(appointment =>
			isEqual(appointment.date, date),
		);
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		return this.appointments.filter(
			appointment =>
				appointment.provider_id === provider_id &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);
	}

	public async findAllInDayFromProvider({
		provider_id,
		day,
		month,
		year,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		return this.appointments.filter(
			appointment =>
				appointment.provider_id === provider_id &&
				getDate(appointment.date) === day &&
				getMonth(appointment.date) + 1 === month &&
				getYear(appointment.date) === year,
		);
	}

	public async create({
		provider_id,
		user_id,
		date,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = new Appointment();

		Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

		this.appointments.push(appointment);

		return appointment;
	}
}
