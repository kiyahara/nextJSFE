import { type IInputRegister } from "../../../data/models/register/register";
import { type ResponseBaseLogin } from "../../../data/models/auth/response";
import { LoginData } from "../../entities/auth/login";
import { IAuthRegisterRepository } from "../../repositories/register";
import { RegisterData } from "../../entities/register/register";

export class UseCaseAuthRegister {
  protected _authRegisterRepository: IAuthRegisterRepository;

  constructor(authRegisterRepository: IAuthRegisterRepository) {
    this._authRegisterRepository = authRegisterRepository;
  }

  async execute(
    inputs: IInputRegister
  ): Promise<ResponseBaseLogin<RegisterData>> {
    return await this._authRegisterRepository?.authRegister(inputs);
  }
}
