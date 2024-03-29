import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '../../../services/CreateAppointmentService';
import ListAppointmentsService from '../../../services/ListAppointmentsService';

export default class AppointmentsController {
	public async create(request: Request, response: Response): Promise<Response> {
		const user_id = request.user.id;
		const { provider_id, date } = request.body;

		const createAppointment = container.resolve(CreateAppointmentService);

		const appointment = await createAppointment.execute({
			date,
			provider_id,
			user_id,
		});

		return response.json(appointment);
	}

	public async show(request: Request, response: Response) {
		const listAppointmentsService = container.resolve(ListAppointmentsService);
		const appointments = await listAppointmentsService.execute();
		return response.json(appointments);
	}
}
