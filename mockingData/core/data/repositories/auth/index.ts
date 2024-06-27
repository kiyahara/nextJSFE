import { IBaseLocalData } from "../../dataSources/local/baseLocal";
import { IAuthRepository } from "../../../../core/domain/repositories/auth";

export class AuthRepositoryImpl extends IAuthRepository {
  protected baseLocalDataImp: IBaseLocalData;

  constructor(baseLocalDataImp: IBaseLocalData) {
    super();
    this.baseLocalDataImp = baseLocalDataImp;
  }

  authSetId(key: string, id: string): void {
    this.baseLocalDataImp.setIdLocalStorage(key, id);
  }

  authSetToken(key: string, token: string): void {
    this.baseLocalDataImp.setTokenLocalStorage(key, token);
  }

  authRemoveToken(key: string): void {
    this.baseLocalDataImp.removeLocalStorage(key);
  }
}
