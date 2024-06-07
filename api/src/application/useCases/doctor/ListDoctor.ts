import DataBaseService from "@/infra/DataBaseService";
import { NotFoundError } from "@/infra/helpers/Error";

export default class ListDoctorUseCase {
  constructor(readonly database: DataBaseService) {}

  async execute() {
    //Lógica de negocio
    const doctors = await this.database.listDoctor();

    if(!doctors){
        throw new NotFoundError("Not Doctors Found");
    }

    return doctors;
  }
}
