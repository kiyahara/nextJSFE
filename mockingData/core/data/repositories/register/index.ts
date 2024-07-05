import { ResponseBaseLogin } from "../../models/auth/response";
import { LoginData } from "../../../../core/domain/entities/auth/login";
import { IAuthRegisterRepository } from "../../../../core/domain/repositories/register";
import { IAuthRegisterData } from "../../dataSources/remote/register";
import { IInputRegister } from "../../models/register/register";
import { ResponseBaseRegister } from "../../models/register/response";
import { RegisterData } from "../../../../../mockingData/core/domain/entities/register/register";

export class AuthRegisterRepositoryImpl extends IAuthRegisterRepository {
  protected authRegisterDataImp: IAuthRegisterData;

  constructor(authRegisterDataImp: IAuthRegisterData) {
    super();
    this.authRegisterDataImp = authRegisterDataImp;
  }

  async authRegister(
    inputs: IInputRegister
  ): Promise<ResponseBaseRegister<RegisterData>> {
    return this.authRegisterDataImp
      .AuthRegisterData(inputs)
      .then((resp: ResponseBaseLogin<RegisterData>) => {
        // console.log(resp);
        return resp;
      })
      .catch((error) => {
        // console.log(error);
        return error;
      });
  }
}
