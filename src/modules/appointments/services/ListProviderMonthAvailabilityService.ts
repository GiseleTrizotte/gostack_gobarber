import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
	provider_id: string;
	year: number;
	month: number;
}

type IResponse = Array<{
	day: number;
	available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
	constructor(
		@inject('AppointmentsRepository')
		private appointmentsRepositiry: IAppointmentsRepository,
	) {}

	public async execute({
		provider_id,
		year,
		month,
	}: IRequest): Promise<IResponse> {
		const appointments =
			await this.appointmentsRepositiry.findAllInMonthFromProvider({
				provider_id,
				year,
				month,
			});

		const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

		const eachDayArray = Array.from(
			{ length: numberOfDaysInMonth },
			(_, index) => index + 1,
		);

		const availability = eachDayArray.map(day => {
			const compareDate = new Date(year, month - 1, day, 23, 59, 59);

			const appointmentsInDay = appointments.filter(appointment => {
				return getDate(appointment.date) === day;
			});

			return {
				day,
				available:
					isAfter(compareDate, new Date()) && appointmentsInDay.length < 10,
			};
		});

		return availability;
	}
}

export default ListProviderMonthAvailabilityService;
