import { type IInputLogin } from "../../../data/models/auth/login";
import { type ResponseBaseLogin } from "../../../data/models/auth/response";
import { type LoginData } from "../../entities/auth/login";

export abstract class IAuthRepository {
  abstract authLogin(
    inputs: IInputLogin
  ): Promise<ResponseBaseLogin<LoginData>>;
  abstract authSetId(key: string, id: string): void;
  abstract authSetToken(key: string, token: string): void;
}
