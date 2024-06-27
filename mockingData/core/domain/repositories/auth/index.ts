export abstract class IAuthRepository {
  abstract authSetId(key: string, id: string): void;
  abstract authSetToken(key: string, token: string): void;
  abstract authRemoveToken(key: string): void;
}
