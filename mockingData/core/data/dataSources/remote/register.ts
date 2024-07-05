import { Register } from "../../../../../app/api/register";
import { IInputRegister } from "../../models/register/register";
import { ResponseBaseRegister } from "../../models/register/response";

export interface IAuthRegisterData {
  AuthRegisterData(inputs: IInputRegister): Promise<ResponseBaseRegister<any>>;
}

export class AuthRegisterDataImpl implements IAuthRegisterData {
  async AuthRegisterData(
    inputs: IInputRegister
  ): Promise<ResponseBaseRegister<any>> {
    return await Register(inputs);
  }
}
