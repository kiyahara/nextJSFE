import { type IInputRegister } from "../../../data/models/register/register";
import { type ResponseBaseRegister } from "../../../data/models/register/response";
import { type RegisterData } from "../../entities/register/register";

export abstract class IAuthRegisterRepository {
  abstract authRegister(
    inputs: IInputRegister
  ): Promise<ResponseBaseRegister<RegisterData>>;
}
