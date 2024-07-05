import { IProfileRepository } from "../../repositories/profile";

export class UseCaseProfileToken {
  protected _profileRepository: IProfileRepository;

  constructor(profileRepository: IProfileRepository) {
    this._profileRepository = profileRepository;
  }

  getId(key: string) {
    return this._profileRepository?.profileGetId(key);
  }

  getToken(key: string) {
    return this._profileRepository?.profileGetToken(key);
  }

  setToken(key: string, token: string) {
    return this._profileRepository?.profileSetToken(key, token);
  }

  removeToken(key: string) {
    return this._profileRepository?.profileRemoveToken(key);
  }

  removeId(key: string) {
    return this._profileRepository?.profileRemoveId(key);
  }
}
