import { AuthRepositoryImpl } from "../repositories/auth";
import { BaseLocalDataImpl } from "../dataSources/local/baseLocal";
import { UseCaseAuthToken } from "../../domain/usecases/auth/token";

export const provideDependence = () => {
  const baseLocalDataImp = new BaseLocalDataImpl();
  const authRepositoryInstance = new AuthRepositoryImpl(baseLocalDataImp);
  const useCaseAuthToken = new UseCaseAuthToken(authRepositoryInstance);

  return { useCaseAuthToken };
};
