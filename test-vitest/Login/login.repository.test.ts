import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Login } from "../../app/api/auth";
import { AuthRepositoryImpl } from "../../mockingData/core/data/repositories/auth";
import {
  BaseLocalDataImpl,
  IBaseLocalData,
} from "../../mockingData/core/data/dataSources/local/baseLocal";

vi.mock("axios");

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
  let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;

  beforeEach(() => {
    mockBaseLocalDataImp =
      new BaseLocalDataImpl() as jest.Mocked<IBaseLocalData>;
    authRepository = new AuthRepositoryImpl(mockBaseLocalDataImp);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("SourceData", () => {
    // Arrange
    const expectedRespond = {
      user: {
        id: 1,
        email: "fikri.mintardja@mail.com",
        name: "fenri",
      },
      backendToken: {
        accessToken: "dsadsadasd",
        refreshToken: "dsadsadasf",
      },
      status: 201,
    };
    test("AuthService Should Call Correct Respond With the Correct Inputs", async () => {
      // Assert
      (axios as jest.MockedFunction<any>).mockResolvedValue(expectedRespond);
      const result = await Login(userData);
      // Act
      expect(result).toEqual(expectedRespond);
    });
  });
  describe("Failed", () => {
    test("AuthService Should Handle Error and Return Error Response", async () => {
      // Arrange
      expect.assertions(1);
      const resp = {
        message: "Unauthorized",
        statusCode: "401",
      };
      // Act
      (axios as jest.MockedFunction<any>).mockResolvedValue(
        Promise.reject(resp)
      );
      // Assert
      await expect(Login(userData)).rejects.toBe(resp);
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

    test("authRemoveToken should call removeLocalStorage with correct arguments", () => {
      // Arrange
      const key = "authToken";

      // Act
      authRepository.authRemoveToken(key);

      // Assert
      expect(mockBaseLocalDataImp.removeLocalStorage).toHaveBeenCalledWith(key);
    });
  });
});
