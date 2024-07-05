import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import { AuthRepositoryImpl } from "../../mockingData/core/data/repositories/auth";
import {
  BaseLocalDataImpl,
  IBaseLocalData,
} from "../../mockingData/core/data/dataSources/local/baseLocal";
import {
  AuthLoginDataImpl,
  IAuthLoginData,
} from "../../mockingData/core/data/dataSources/remote/auth";
import { ResponseBaseLogin } from "../../mockingData/core/data/models/auth/response";
import { LoginData } from "../../mockingData/core/domain/entities/auth/login";

vi.mock("../../mockingData/core/data/dataSources/remote/auth", () => ({
  AuthLoginDataImpl: vi.fn().mockImplementation(() => ({
    AuthLoginData: vi.fn(),
  })),
}));

vi.mock("../../mockingData/core/data/dataSources/local/baseLocal", () => ({
  BaseLocalDataImpl: vi.fn().mockImplementation(() => ({
    setLocalStorage: vi.fn(),
    setTokenLocalStorage: vi.fn(),
    removeLocalStorage: vi.fn(),
  })),
}));

describe("LoginRepositoryService", () => {
  const userData = {
    email: "fikri.mintardja@mail.com",
    password: "123",
  };

  let authRepository: AuthRepositoryImpl;
  let mockAuthLoginDataImp: jest.Mocked<IAuthLoginData>;
  let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;

  beforeEach(() => {
    mockAuthLoginDataImp =
      new AuthLoginDataImpl() as jest.Mocked<IAuthLoginData>;
    mockBaseLocalDataImp =
      new BaseLocalDataImpl() as jest.Mocked<IBaseLocalData>;
    authRepository = new AuthRepositoryImpl(
      mockBaseLocalDataImp,
      mockAuthLoginDataImp
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("LoginRepositorySuccess", () => {
    // Arrange
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
    test("AuthService Should Call Correct Respond With the Correct Inputs", async () => {
      // Assert
      mockAuthLoginDataImp.AuthLoginData.mockResolvedValue(expectedRespond);
      const result = await authRepository.authLogin(userData);
      // Act
      expect(mockAuthLoginDataImp.AuthLoginData).toHaveBeenCalledWith(userData);
      expect(result).toEqual(expectedRespond);
    });
  });
  describe("LoginRepositoryFailed", () => {
    test("AuthService Should Handle Error and Return Error Response", async () => {
      // Arrange
      expect.assertions(2);
      const errorResponse: ResponseBaseLogin<LoginModel> = {
        status: 401,
        data: null,
      };
      // Act
      mockAuthLoginDataImp.AuthLoginData.mockRejectedValue(errorResponse);
      const result = await authRepository.authLogin(userData);
      // Assert
      expect(mockAuthLoginDataImp.AuthLoginData).toHaveBeenCalledWith(userData);
      expect(result).toEqual(errorResponse);
    });
  });
  describe("TokenData", () => {
    test("authSetId should call setIdLocalStorage with correct arguments", () => {
      // Arrange
      const key = "IdLogin";
      const Id = "1";

      // Act
      authRepository.authSetId(key, Id);

      //Assert
      expect(mockBaseLocalDataImp.setLocalStorage).toHaveBeenCalledWith(
        key,
        Id
      );
    });

    test("authSetToken should call setTokenLocalStorage with correct arguments", () => {
      // Arrange
      const key = "authToken";
      const token = "fakeToken";

      // Act
      authRepository.authSetToken(key, token);

      //Assert
      expect(mockBaseLocalDataImp.setTokenLocalStorage).toHaveBeenCalledWith(
        key,
        token
      );
    });
  });
});
