import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import { ResponseBaseLogin } from "../../mockingData/core/data/models/auth/response";
import { AuthRegisterRepositoryImpl } from "../../mockingData/core/data/repositories/register";
import {
  AuthRegisterDataImpl,
  IAuthRegisterData,
} from "../../mockingData/core/data/dataSources/remote/register";
import { ResponseBaseRegister } from "../../mockingData/core/data/models/register/response";
import { RegisterData } from "../../mockingData/core/domain/entities/register/register";

vi.mock("../../mockingData/core/data/dataSources/remote/register", () => ({
  AuthRegisterDataImpl: vi.fn().mockImplementation(() => ({
    AuthRegisterData: vi.fn(),
  })),
}));

describe("RegisterRepositoryService", () => {
  let authRegisterRepository: AuthRegisterRepositoryImpl;
  let mockAuthRegisterDataImp: jest.Mocked<IAuthRegisterData>;

  beforeEach(() => {
    mockAuthRegisterDataImp =
      new AuthRegisterDataImpl() as jest.Mocked<IAuthRegisterData>;
    authRegisterRepository = new AuthRegisterRepositoryImpl(
      mockAuthRegisterDataImp
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("RegisterRepositorySuccess", () => {
    // Arrange
    const userData = {
      name: "Fikri Mintardja",
      email: "fikri.mintardja@mail.com",
      password: "U2FsdGVkX18KdbmxGA3EB7gzxijpLDsDMvwFkLzvbh8=",
    };
    const expectedRespond: ResponseBaseRegister<RegisterData> = {
      data: {
        id: 1,
        email: "fikri.mintardja@mail.com",
        name: "fenri",
      },
      status: 201,
    };
    test("RegisterService Should Call Correct Respond With the Correct Inputs", async () => {
      // Assert
      mockAuthRegisterDataImp.AuthRegisterData.mockResolvedValue(
        expectedRespond
      );
      const result = await authRegisterRepository.authRegister(userData);
      // Act
      expect(mockAuthRegisterDataImp.AuthRegisterData).toHaveBeenCalledWith(
        userData
      );
      expect(result).toEqual(expectedRespond);
    });
  });
  describe("RegisterRepositoryFailed", () => {
    test("RegisterService Should Handle Error and Return Error Response", async () => {
      // Arrange
      expect.assertions(2);
      const userData = {
        name: "Fikri Mintardja",
        email: "fikri.mintardja@mail.com",
        password: "U2FsdGVkX18KdbmxGA3EB7gzxijpLDsDMvwFkLzvbh8=",
      };
      const errorResponse: ResponseBaseLogin<LoginModel> = {
        status: 409,
        data: null,
      };
      // Act
      mockAuthRegisterDataImp.AuthRegisterData.mockRejectedValue(errorResponse);
      const result = await authRegisterRepository.authRegister(userData);
      // Assert
      expect(mockAuthRegisterDataImp.AuthRegisterData).toHaveBeenCalledWith(
        userData
      );
      expect(result).toEqual(errorResponse);
    });
  });
});
