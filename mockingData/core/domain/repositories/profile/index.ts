import { type ResponseBaseProfile } from "../../../data/models/profile/response";
import { type IBodyProfile } from "../../../data/models/profile/profile";
import {
  type ProfileData,
  type TokenData,
} from "../../entities/profile/profile";

export abstract class IProfileRepository {
  abstract ProfileGet(
    body: IBodyProfile
  ): Promise<ResponseBaseProfile<ProfileData>>;
  abstract RefreshToken(token: string): Promise<ResponseBaseProfile<TokenData>>;
  abstract profileGetId(key: string): string | null;
  abstract profileGetToken(key: string): string | null;
  abstract profileSetToken(key: string, token: string): void;
  abstract profileRemoveToken(key: string): void;
  abstract profileRemoveId(key: string): void;
}
