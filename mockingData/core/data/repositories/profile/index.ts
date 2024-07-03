import { IBaseLocalData } from "../../dataSources/local/baseLocal";
import { IProfileRepository } from "../../../domain/repositories/profile";

export class ProfileRepositoryImpl extends IProfileRepository {
  protected baseLocalDataImp: IBaseLocalData;

  constructor(baseLocalDataImp: IBaseLocalData) {
    super();
    this.baseLocalDataImp = baseLocalDataImp;
  }

  profileGetId(key: string): void {
    this.baseLocalDataImp.getLocalStorage(key);
  }

  profileSetToken(key: string, token: string): void {
    this.baseLocalDataImp.setTokenLocalStorage(key, token);
  }

  profileGetToken(key: string): void {
    this.baseLocalDataImp.getLocalStorage(key);
  }

  profileRemoveToken(key: string): void {
    this.baseLocalDataImp.removeLocalStorage(key);
  }
}
