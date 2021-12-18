import { getDate, getDaysInMonth } from "date-fns";
import { inject, injectable } from "tsyringe";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({ provider_id, month, year }: IRequest): Promise<IResponse> {

    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      }
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    // agendamento das 08 ás 17:00, 10 agendamentos
    return eachDayArray.map(day => {
      const appointmentsDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });

      return {
        day,
        available: appointmentsDay.length < 10,
      };
    });
  }
}
