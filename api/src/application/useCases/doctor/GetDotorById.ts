import DataBaseService from "@/infra/DataBaseService";
import { NotFoundError } from "@/infra/helpers/Error";

export default class GetDoctorByIdUseCase {
  constructor(readonly database: DataBaseService) {}

  async execute(id: number) {
    //Lógica de Negocio
    const INCLUDE_AGENDA = true;
    const doctor = await this.database.getDoctorById(id, INCLUDE_AGENDA);

    if (!doctor) {
      throw new NotFoundError("No doctor found");
    }

    return doctor;
  }
}
