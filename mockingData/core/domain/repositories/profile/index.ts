export abstract class IProfileRepository {
  abstract profileGetId(key: string): void;
  abstract profileGetToken(key: string): void;
  abstract profileSetToken(key: string, token: string): void;
  abstract profileRemoveToken(key: string): void;
}
