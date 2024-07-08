import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import { AuthRepositoryImpl } from "../../mockingData/core/data/repositories/auth";
import {
  BaseLocalDataImpl,
  IBaseLocalData,
} from "../../mockingData/core/data/dataSources/local/baseLocal";
import { UseCaseAuthToken } from "../../mockingData/core/domain/usecases/auth/token";
import { IInputLogin } from "../../mockingData/core/data/models/auth/login";
import { IAuthRepository } from "../../mockingData/core/domain/repositories/auth";
import {
  AuthLoginDataImpl,
  IAuthLoginData,
} from "../../mockingData/core/data/dataSources/remote/auth";
import { ResponseBaseLogin } from "../../mockingData/core/data/models/auth/response";
import { UseCaseAuthLogin } from "../../mockingData/core/domain/usecases/auth/login";
import { LoginData } from "../../mockingData/core/domain/entities/auth/login";

const mockRepoAuthLogin = vi.spyOn(AuthRepositoryImpl.prototype, "authLogin");

let useCaseAuthLogin: UseCaseAuthLogin;
let mockAuthRepository: IAuthRepository;
let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;
let mockAuthLoginDataImp: jest.Mocked<IAuthLoginData>;

beforeEach(() => {
  mockBaseLocalDataImp = new BaseLocalDataImpl() as jest.Mocked<IBaseLocalData>;
  mockAuthLoginDataImp = new AuthLoginDataImpl() as jest.Mocked<IAuthLoginData>;
  mockAuthRepository = new AuthRepositoryImpl(
    mockBaseLocalDataImp,
    mockAuthLoginDataImp
  );
  useCaseAuthLogin = new UseCaseAuthLogin(mockAuthRepository);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("UseCaseAuthLogin", () => {
  test("AuthServiceLogin Should Call Correct With the Correct Inputs", async () => {
    // Arrange
    const userData: IInputLogin = {
      email: "fikri.mintardja@mail.com",
      password: "123",
    };
    const expectedRespond: ResponseBaseLogin<LoginData> = {
      data: {
        user: {
          id: 1,
          email: "fikri.mintardja@mail.com",
          name: "fenri",
        },
        backendToken: {
          accessToken: "fakeToken",
          refreshToken: "fakeToken",
        },
      },
      status: 201,
    };
    // Assert
    // const result = await useCaseAuthLogin.execute(userData);
    mockRepoAuthLogin.mockResolvedValue(expectedRespond);
    // Act
    // expect(result).toEqual(expectedRespond);
    await expect(useCaseAuthLogin.execute(userData)).resolves.toEqual(
      expectedRespond
    );
    expect(mockAuthRepository.authLogin).toHaveBeenCalledWith(userData);
  });
  test("AuthServiceLogin Should Handle Error and Return Error Response", async () => {
    // Arrange
    const userData: IInputLogin = {
      email: "fikri.mintardja@mail.com",
      password: "123",
    };
    const errorResponse: ResponseBaseLogin<LoginModel> = {
      status: 401,
      data: null,
    };
    // Assert
    // const result = await useCaseAuthLogin.execute(userData);
    mockRepoAuthLogin.mockRejectedValue(errorResponse);
    // Act
    await expect(useCaseAuthLogin.execute(userData)).rejects.toEqual(
      errorResponse
    );
    expect(mockAuthRepository.authLogin).toHaveBeenCalledWith(userData);
  });
});

describe("UseCaseAuthSetToken", () => {
  let useCaseAuthToken: UseCaseAuthToken;
  let mockAuthRepository: AuthRepositoryImpl;
  let mockAuthLoginDataImp: jest.Mocked<IAuthLoginData>;
  let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;

  beforeEach(() => {
    mockAuthRepository = new AuthRepositoryImpl(
      mockBaseLocalDataImp,
      mockAuthLoginDataImp
    );
    useCaseAuthToken = new UseCaseAuthToken(mockAuthRepository);
  });
  test("should set id using auth repository", () => {
    // Arrange
    const key = "IdLogin";
    const Id = "1";

    // Act
    useCaseAuthToken.setId(key, Id);
  });

  test("should set token using auth repository", () => {
    // Arrange
    const key = "authToken";
    const token = "fakeToken";

    // Act
    useCaseAuthToken.setToken(key, token);
  });
});
