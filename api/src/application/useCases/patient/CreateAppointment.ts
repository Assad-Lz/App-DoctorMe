import DataBaseService from "@/infra/DataBaseService";
import { BussinesError, NotFoundError } from "@/infra/helpers/Error";

export default class CreateAppointmentUseCase {
  constructor(readonly database: DataBaseService) {}

  async execute(patientId: number, agendaId: number) {
    //Verifica se o paciente existe com o Id passado
    const patient = await this.database.getPatientById(patientId);

    if (!patient) {
      throw new NotFoundError("Patient not found");
    }

    //Verifica se a agenda existe com o Id passado e está disponivel
    const agenda = await this.database.getAgendaById(agendaId);

    if (!agenda?.available) {
      throw new BussinesError("Agenda not available for this date");
    }

    //Atualiza a agenda para não estar mais disponivel
    await this.database.updateAgenda(agenda.id, { available: false });

    //Cria um novo agendamento para o paciente com o Id passado e a agenda com o id passado
    const appointment = await this.database.createAppointment(
      patient.id,
      agenda.doctorId,
      agenda.date
    );

    //Retorna o agendamento criado
    return appointment;
  }
}
