import { IBaseLocalData } from "../../dataSources/local/baseLocal";
import { IProfileRepository } from "../../../domain/repositories/profile";
import { IBodyProfile } from "../../models/profile/profile";
import { ResponseBaseProfile } from "../../models/profile/response";
import {
  ProfileData,
  TokenData,
} from "../../../../../mockingData/core/domain/entities/profile/profile";
import { IGetProfileData } from "../../dataSources/remote/profile";

export class ProfileRepositoryImpl extends IProfileRepository {
  protected baseLocalDataImp: IBaseLocalData;
  protected ProfileGetDataImp: IGetProfileData;

  constructor(
    baseLocalDataImp: IBaseLocalData,
    ProfileGetDataImp: IGetProfileData
  ) {
    super();
    this.baseLocalDataImp = baseLocalDataImp;
    this.ProfileGetDataImp = ProfileGetDataImp;
  }

  async ProfileGet(
    body: IBodyProfile
  ): Promise<ResponseBaseProfile<ProfileData>> {
    return this.ProfileGetDataImp.ProfileGetData(body)
      .then((resp: ResponseBaseProfile<ProfileData>) => {
        // console.log(resp);
        return resp;
      })
      .catch((error) => {
        // console.log(error);
        return error;
      });
  }

  async RefreshToken(token: string): Promise<ResponseBaseProfile<TokenData>> {
    return this.ProfileGetDataImp.ProfileRefreshToken(token)
      .then((resp: ResponseBaseProfile<TokenData>) => {
        // console.log(resp);
        return resp;
      })
      .catch((error) => {
        // console.log(error);
        return error;
      });
  }

  profileGetId(key: string): string | null {
    return this.baseLocalDataImp?.getLocalStorage(key);
  }

  profileSetToken(key: string, token: string): void {
    this.baseLocalDataImp?.setTokenLocalStorage(key, token);
  }

  profileGetToken(key: string): string | null {
    return this.baseLocalDataImp?.getLocalStorage(key);
  }

  profileRemoveToken(key: string): void {
    this.baseLocalDataImp?.removeLocalStorage(key);
  }
  profileRemoveId(key: string): void {
    this.baseLocalDataImp?.removeLocalStorage(key);
  }
}
