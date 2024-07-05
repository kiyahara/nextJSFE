import { IInputLogin } from "../../models/auth/login";
import { Login } from "../../../../../app/api/auth";
import { ResponseBaseLogin } from "../../models/auth/response";

export interface IAuthLoginData {
  AuthLoginData(inputs: IInputLogin): Promise<ResponseBaseLogin<any>>;
}

export class AuthLoginDataImpl implements IAuthLoginData {
  async AuthLoginData(inputs: IInputLogin): Promise<ResponseBaseLogin<any>> {
    return await Login(inputs);
  }
}
