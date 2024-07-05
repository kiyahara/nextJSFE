import { AuthRepositoryImpl } from "../repositories/auth";
import { BaseLocalDataImpl } from "../dataSources/local/baseLocal";

import { UseCaseGetProfile } from "../../domain/usecases/profile/profile";
import { ProfileRepositoryImpl } from "../repositories/profile";
import { AuthLoginDataImpl } from "../dataSources/remote/auth";
import { UseCaseAuthLogin } from "../../domain/usecases/auth/login";

export const provideDependence = () => {
  const baseLocalDataImp = new BaseLocalDataImpl();
  const authLoginDataImp = new AuthLoginDataImpl();
  const authRepositoryInstance = new AuthRepositoryImpl(
    baseLocalDataImp,
    authLoginDataImp
  );
  const profileRepositoryInstance = new ProfileRepositoryImpl(baseLocalDataImp);
  const useCaseAuthLogin = new UseCaseAuthLogin(authRepositoryInstance);
  const useCaseGetProfile = new UseCaseGetProfile(profileRepositoryInstance);

  return { useCaseAuthLogin, useCaseGetProfile };
};
