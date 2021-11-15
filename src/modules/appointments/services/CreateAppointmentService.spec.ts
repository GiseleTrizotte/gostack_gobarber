import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointmentService', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		fakeNotificationsRepository = new FakeNotificationsRepository();
		createAppointmentService = new CreateAppointmentService(
			fakeAppointmentsRepository,
			fakeNotificationsRepository,
		);
	});

	it('should be able to create a new appointment', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2020, 4, 12, 12).getTime();
		});

		const appointment = await createAppointmentService.execute({
			date: new Date(2020, 4, 12, 13),
			user_id: '1234',
			provider_id: '123123',
		});

		expect(appointment).toHaveProperty('id');
		expect(appointment.provider_id).toBe('123123');
	});

	it('should not be able to create two appointments on the same time', async () => {
		const appointmentDate = new Date(2021, 12, 11, 12);

		await createAppointmentService.execute({
			date: appointmentDate,
			user_id: 'user_id',
			provider_id: 'provider_id',
		});

		await expect(
			createAppointmentService.execute({
				date: appointmentDate,
				user_id: 'user_id',
				provider_id: 'provider_id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment on a past date', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2021, 4, 12, 12).getTime();
		});

		await expect(
			createAppointmentService.execute({
				date: new Date(2021, 4, 12, 11),
				provider_id: 'provider-id',
				user_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment with same user as provider', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2021, 4, 12, 12).getTime();
		});

		await expect(
			createAppointmentService.execute({
				date: new Date(2021, 4, 12, 11),
				provider_id: 'provider-id',
				user_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});

	it('should not be able to create an appointment before am and after 5pm', async () => {
		jest.spyOn(Date, 'now').mockImplementationOnce(() => {
			return new Date(2021, 12, 12).getTime();
		});

		await expect(
			createAppointmentService.execute({
				date: new Date(2021, 12, 7),
				provider_id: 'provider-id',
				user_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);

		await expect(
			createAppointmentService.execute({
				date: new Date(2021, 12, 18),
				provider_id: 'provider-id',
				user_id: 'user-id',
			}),
		).rejects.toBeInstanceOf(AppError);
	});
});
