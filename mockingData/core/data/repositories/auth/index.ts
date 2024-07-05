import { IBaseLocalData } from "../../dataSources/local/baseLocal";
import { IAuthRepository } from "../../../../core/domain/repositories/auth";
import { IInputLogin } from "../../models/auth/login";
import { IAuthLoginData } from "../../dataSources/remote/auth";
import { ResponseBaseLogin } from "../../models/auth/response";
import { LoginData } from "../../../../core/domain/entities/auth/login";

export class AuthRepositoryImpl extends IAuthRepository {
  protected baseLocalDataImp: IBaseLocalData;
  protected authLoginDataImp: IAuthLoginData;

  constructor(
    baseLocalDataImp: IBaseLocalData,
    authLoginDataImp: IAuthLoginData
  ) {
    super();
    this.baseLocalDataImp = baseLocalDataImp;
    this.authLoginDataImp = authLoginDataImp;
  }

  async authLogin(inputs: IInputLogin): Promise<ResponseBaseLogin<LoginData>> {
    return this.authLoginDataImp
      .AuthLoginData(inputs)
      .then((resp: ResponseBaseLogin<LoginData>) => {
        console.log(resp);
        return resp;
      })
      .catch((error) => {
        // console.log(error);
        return error;
      });
  }

  authSetId(key: string, id: string): void {
    this.baseLocalDataImp?.setLocalStorage(key, id);
  }

  authSetToken(key: string, token: string): void {
    this.baseLocalDataImp?.setTokenLocalStorage(key, token);
  }
}
