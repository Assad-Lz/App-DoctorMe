import DataBaseService from "@/infra/DataBaseService";
import { BussinesError, NotFoundError } from "@/infra/helpers/Error";
import { comparePassword, encodeToBase64 } from "@/infra/helpers/SecurityHelper";

export default class AuthenticatePatientUseCase {
  constructor(readonly database: DataBaseService) {}

  async execute(phone: string, password: string) {
    //Verifica se o paciente existe com o telefone passado
    const user = await this.database.getUserByPhone(phone);

    if (!user) {
      throw new NotFoundError("Patient not found");
    }

    //Verifica se a senha passada é igual a senha do paciente
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      throw new BussinesError("Phone or Password is invalid");
    }

    //Retorna o token de autenticação
    const payload = {
      user: {
        id: user.id,
        phone: user.phone,
      },
    };

    //Converte o payload para a base64
    return {
        token: encodeToBase64(JSON.stringify(payload)),
    };
  }
}
