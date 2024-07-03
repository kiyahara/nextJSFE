import { AuthRepositoryImpl } from "../repositories/auth";
import { BaseLocalDataImpl } from "../dataSources/local/baseLocal";
import { UseCaseAuthLogin } from "../../domain/usecases/auth/token";
import { UseCaseGetProfile } from "../../domain/usecases/profile/profile";
import { ProfileRepositoryImpl } from "../repositories/profile";

export const provideDependence = () => {
  const baseLocalDataImp = new BaseLocalDataImpl();
  const authRepositoryInstance = new AuthRepositoryImpl(baseLocalDataImp);
  const profileRepositoryInstance = new ProfileRepositoryImpl(baseLocalDataImp);
  const useCaseAuthLogin = new UseCaseAuthLogin(authRepositoryInstance);
  const useCaseGetProfile = new UseCaseGetProfile(profileRepositoryInstance);

  return { useCaseAuthLogin, useCaseGetProfile };
};
