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

// import { render, fireEvent } from 'vitest';
// import { afterEach } from "node:test";
// import { describe, expect, test, vi } from "vitest";
// import axios from "axios";
// import { Register } from "../../app/api/register";

// vi.mock("axios");

// describe("RegisterRepository", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//   describe("Success", () => {
//     // title
//     test("RegisterService Should Call Correct Respond When Input is Send", async () => {
//       // Arrange
//       const userData = {
//         name: "fikri",
//         email: "fikri.mintardja@mail.com",
//         password: "1234",
//       };
//       const resp = {
//         email: "fikri_mintardja@yahoo.com",
//         id: 13,
//         name: "fikri",
//       };
//       // Act
//       (axios as jest.MockedFunction<any>).mockResolvedValue(resp);
//       const result = await Register(userData);
//       // Assert
//       expect(result).toEqual(resp);
//     });
//   });
//   describe("Failed", () => {
//     test("RegisterService Should Handle Error When Input is Send", async () => {
//       expect.assertions(1);
//       const userData = {
//         name: "fikri",
//         email: "fikri.mintardja@mail.com",
//         password: "1234",
//       };
//       const resp = {
//         error: "Conflict",
//         message: "Email Duplicated",
//         statusCode: 409,
//       };
//       (axios as jest.MockedFunction<any>).mockResolvedValue(
//         Promise.reject(resp)
//       );
//       await expect(Register(userData)).rejects.toEqual(resp);
//     });
//   });
// });
