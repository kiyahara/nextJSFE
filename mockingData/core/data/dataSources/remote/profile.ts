import { ResponseBaseProfile } from "../../models/profile/response";
import { IBodyProfile } from "../../models/profile/profile";
import { RefreshToken, getProfile } from "../../../../../app/api/profile";

export interface IGetProfileData {
  ProfileGetData(body: IBodyProfile): Promise<ResponseBaseProfile<any>>;
  ProfileRefreshToken(token: string): Promise<ResponseBaseProfile<any>>;
}

export class ProfileGetDataImpl implements IGetProfileData {
  async ProfileGetData(body: IBodyProfile): Promise<ResponseBaseProfile<any>> {
    return await getProfile(body);
  }

  async ProfileRefreshToken(token: string): Promise<ResponseBaseProfile<any>> {
    return await RefreshToken(token);
  }
}
