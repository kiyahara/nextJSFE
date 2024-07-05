import { type ResponseBaseProfile } from "../../../data/models/profile/response";
import { type IBodyProfile } from "../../../data/models/profile/profile";
import { IProfileRepository } from "../../repositories/profile";
import { ProfileData, TokenData } from "../../entities/profile/profile";

export class UseCaseProfileGetData {
  protected _profileRepository: IProfileRepository;

  constructor(profileRepository: IProfileRepository) {
    this._profileRepository = profileRepository;
  }

  async execute(body: IBodyProfile): Promise<ResponseBaseProfile<ProfileData>> {
    return await this._profileRepository?.ProfileGet(body);
  }
  async executeRefreshToken(
    token: string
  ): Promise<ResponseBaseProfile<TokenData>> {
    return await this._profileRepository?.RefreshToken(token);
  }
}
