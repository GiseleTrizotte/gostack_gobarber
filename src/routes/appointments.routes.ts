import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointmentsRouter = Router();

appointmentsRouter.get("/", async (request, response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
  } catch (er: any) {
    return response.json({ erro: er.message });
  }
});

appointmentsRouter.post("/", async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err: any) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
