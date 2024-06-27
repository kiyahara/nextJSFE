import { type IAuthRepository } from "../../repositories/auth";

export class UseCaseAuthToken {
  protected _authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this._authRepository = authRepository;
  }

  setId(key: string, id: string) {
    return this._authRepository?.authSetId(key, id);
  }

  setToken(key: string, token: string) {
    return this._authRepository?.authSetToken(key, token);
  }
  removeToken(key: string) {
    return this._authRepository?.authRemoveToken(key);
  }
}
