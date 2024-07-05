// import { render, fireEvent } from 'vitest';
import {
  AuthLoginDataImpl,
  IAuthLoginData,
} from "../../mockingData/core/data/dataSources/remote/auth";
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";

// vi.mock("./../../../core/data/dataSources/remote/auth", () => ({
//   AuthLoginDataImpl: vi.fn().mockImplementation(() => ({
//     AuthPostSource: jest.fn(() =>
//       Promise.resolve({
//         status: 201,
//         data: {
//           user: {
//             id: 1,
//             email: "fikri.mintardja@mail.com",
//             name: "fenri",
//           },
//           backendToken: {
//             accessToken: "fakeToken",
//             refreshToken: "fakeToken",
//           },
//         },
//       })
//     ),
//   })),
// }));
const mockSourceAuthLogin = vi.spyOn(
  AuthLoginDataImpl.prototype,
  "AuthLoginData"
);

describe("LoginSource", () => {
  let authLoginSource: IAuthLoginData;

  beforeEach(() => {
    authLoginSource = new AuthLoginDataImpl() as jest.Mocked<IAuthLoginData>;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  test("AuthServiceLogin Should Call Correct Respond With the Correct Inputs", async () => {
    // Arrange
    const userData = {
      email: "fikri.mintardja@mail.com",
      password: "1234",
    };
    const expectedRespond = {
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
    // const result = await authLoginSource.AuthLoginData(userData);
    mockSourceAuthLogin.mockResolvedValue(expectedRespond);
    // Act
    await expect(authLoginSource.AuthLoginData(userData)).resolves.toEqual(
      expectedRespond
    );
  });
  test("AuthServiceLogin Should Handle Error and Return Error Response", async () => {
    // Arrange
    const userData = {
      email: "fikri.mintardja@mail.com",
      password: "1234",
    };
    const errorResponse = {
      status: 401,
      data: null,
    };
    // Assert
    // const result = await authLoginSource.AuthLoginData(userData);
    mockSourceAuthLogin.mockRejectedValue(errorResponse);
    // Act
    await expect(authLoginSource.AuthLoginData(userData)).rejects.toEqual(
      errorResponse
    );
  });

  // describe("Failed", () => {
  //   // Arrange
  //   const userData = {
  //     email: "fikri.mintardja@mail.com",
  //     password: "1234",
  //   };
  //   const errorResponse = {
  //     status: 401,
  //     data: null,
  //   };
  //   test("AuthService Should Handle Error and Return Error Response", async () => {
  //     // Assert
  //     const result = await authLoginSource.AuthLoginData(userData);
  //     // Act
  //     expect(result).toEqual(errorResponse);
  //   });
  // });
});
