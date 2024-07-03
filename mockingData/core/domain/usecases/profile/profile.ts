import { IProfileRepository } from "../../repositories/profile";

export class UseCaseGetProfile {
  protected _profileRepository: IProfileRepository;

  constructor(authRepository: IProfileRepository) {
    this._profileRepository = authRepository;
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
}
