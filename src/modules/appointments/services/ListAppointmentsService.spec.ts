import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListAppointmentsService from './ListAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listAppointments: ListAppointmentsService;

describe('ListProviders', () => {
	beforeEach(() => {
		fakeAppointmentsRepository = new FakeAppointmentsRepository();
		listAppointments = new ListAppointmentsService(fakeAppointmentsRepository);
	});

	it('teste', async () => {
		const appointment1 = await fakeAppointmentsRepository.create({
			provider_id: 'user',
			user_id: '123123',
			date: new Date(2022, 4, 20, 14, 0, 0),
		});

		const appointment2 = await fakeAppointmentsRepository.create({
			provider_id: 'user',
			user_id: '123123',
			date: new Date(2022, 4, 20, 15, 0, 0),
		});

		const appointments = await listAppointments.execute();
		expect(appointments).toEqual([appointment1, appointment2]);
	});
});
