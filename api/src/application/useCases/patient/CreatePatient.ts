import DataBaseService from "@/infra/DataBaseService";
import { BussinesError } from "@/infra/helpers/Error";
import { hashPassword } from "@/infra/helpers/SecurityHelper";

export default class CreatePatientUseCase {
  constructor(readonly database: DataBaseService) {}

  async execute(name: string, phone: string, password: string) {
    //Verifica se o paciente existe com este telefone
    const patient = await this.database.getPatientByPhone(phone);

    if (patient) {
      throw new BussinesError("Patient already exists with this phone number !!");
    }

    //Gera um Hash Seguro para a senha
    const hashedPassword = hashPassword(password);

    //Adiciona um novo usuario com este telefone
    const user = await this.database.createUser(phone, hashedPassword);

    //Adiciona um paciente com o telefone, telefone e id de usuario criado
    const newPatient = await this.database.createPatient(name, phone, user.id);

    //Retorna o paciente criado
    return newPatient;
  }
}
