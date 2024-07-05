import { AuthRepositoryImpl } from "../repositories/auth";
import { BaseLocalDataImpl } from "../dataSources/local/baseLocal";

import { UseCaseProfileGetData } from "../../domain/usecases/profile/profile";
import { ProfileRepositoryImpl } from "../repositories/profile";
import { AuthLoginDataImpl } from "../dataSources/remote/auth";
import { UseCaseAuthLogin } from "../../domain/usecases/auth/login";
import { ProfileGetDataImpl } from "../dataSources/remote/profile";
import { AuthRegisterDataImpl } from "../dataSources/remote/register";
import { AuthRegisterRepositoryImpl } from "../repositories/register";
import { UseCaseAuthRegister } from "../../domain/usecases/register/register";

export const provideDependence = () => {
  const baseLocalDataImp = new BaseLocalDataImpl();
  const authRegisterDataImp = new AuthRegisterDataImpl();
  const authLoginDataImp = new AuthLoginDataImpl();
  const profileGetDataImp = new ProfileGetDataImpl();
  const authRepositoryInstance = new AuthRepositoryImpl(
    baseLocalDataImp,
    authLoginDataImp
  );
  const profileRepositoryInstance = new ProfileRepositoryImpl(
    baseLocalDataImp,
    profileGetDataImp
  );

  const registerRepositoryInstance = new AuthRegisterRepositoryImpl(
    authRegisterDataImp
  );
  const useCaseAuthRegister = new UseCaseAuthRegister(
    registerRepositoryInstance
  );
  const useCaseAuthLogin = new UseCaseAuthLogin(authRepositoryInstance);
  const useCaseProfileGetData = new UseCaseProfileGetData(
    profileRepositoryInstance
  );

  return { useCaseAuthRegister, useCaseAuthLogin, useCaseProfileGetData };
};
