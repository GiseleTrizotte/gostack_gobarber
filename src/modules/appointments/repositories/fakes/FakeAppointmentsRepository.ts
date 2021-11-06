import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from '../IAppointmentsRepository';

import Appointment from '../../infra/typeorm/entities/Appointment';

// import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
// import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';


export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date)
    );

  }

  // public async findAllInMonthFromProvider({
  //   provider_id,
  //   month,
  //   year,
  // }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
  //   const appointments = this.appointments.filter(
  //     appointment =>
  //       appointment.provider_id === provider_id &&
  //       getMonth(appointment.date) + 1 === month &&
  //       getYear(appointment.date) === year,
  //   );

  //   return appointments;
  // }

  // public async findAllInDayFromProvider({
  //   provider_id,
  //   day,
  //   month,
  //   year,
  // }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
  //   const appointments = this.appointments.filter(
  //     appointment =>
  //       appointment.provider_id === provider_id &&
  //       getDate(appointment.date) === day &&
  //       getMonth(appointment.date) + 1 === month &&
  //       getYear(appointment.date) === year,
  //   );

  //   return appointments;
  // }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}
