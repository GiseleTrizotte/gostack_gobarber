import { getRepository, Raw, Repository } from 'typeorm';
import IAppointmentsRepository from '../../../repositories/IAppointmentsRepository';
import Appointment from '../entities/Appointment';
import ICreateAppointmentDTO from '../../../dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../../../dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '../../../dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppointmentsRepository {
	private ormRepository: Repository<Appointment>;

	constructor() {
		this.ormRepository = getRepository(Appointment);
	}

	public async findByDate(date: Date): Promise<Appointment | undefined> {
		const findAppointments = await this.ormRepository.findOne({
			where: { date },
		});

		console.log(findAppointments);
		return findAppointments;
	}

	public async findAllInMonthFromProvider({
		provider_id,
		month,
		year,
	}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
		const parsedMonth = String(month).padStart(2, '0');

		return await this.ormRepository.find({
			where: {
				provider_id,
				date: Raw(
					dateFieldName =>
						`to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
				),
			},
		});
	}

	public async findAllInDayFromProvider({
		provider_id,
		day,
		month,
		year,
	}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
		const parsedDay = String(day).padStart(2, '0');

		const parsedMonth = String(month).padStart(2, '0');

		return await this.ormRepository.find({
			where: {
				provider_id,
				date: Raw(
					dateFieldName =>
						`to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
				),
			},
		});
	}

	public async create({
		provider_id,
		date,
		user_id,
	}: ICreateAppointmentDTO): Promise<Appointment> {
		const appointment = this.ormRepository.create({
			provider_id,
			user_id,
			date,
		});

		await this.ormRepository.save(appointment);

		return appointment;
	}
}

export default AppointmentsRepository;
