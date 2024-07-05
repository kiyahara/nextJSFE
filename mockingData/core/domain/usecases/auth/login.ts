import { type IInputLogin } from "../../../data/models/auth/login";
import { type ResponseBaseLogin } from "../../../data/models/auth/response";
import { LoginData } from "../../entities/auth/login";
import { IAuthRepository } from "../../repositories/auth";

export class UseCaseAuthLogin {
  protected _authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this._authRepository = authRepository;
  }

  async execute(inputs: IInputLogin): Promise<ResponseBaseLogin<LoginData>> {
    return await this._authRepository?.authLogin(inputs);
  }
}
