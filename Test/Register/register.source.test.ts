import {
  AuthRegisterDataImpl,
  IAuthRegisterData,
} from "../../mockingData/core/data/dataSources/remote/register";
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";

const mockSourceAuthRegister = vi.spyOn(
  AuthRegisterDataImpl.prototype,
  "AuthRegisterData"
);

describe("RegisterSource", () => {
  let authRegisterSource: IAuthRegisterData;

  beforeEach(() => {
    authRegisterSource =
      new AuthRegisterDataImpl() as jest.Mocked<IAuthRegisterData>;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  test("RegisterService Should Call Correct Respond With the Correct Inputs", async () => {
    // Arrange
    const userData = {
      name: "Fikri Mintardja",
      email: "fikri.mintardja@mail.com",
      password: "U2FsdGVkX18KdbmxGA3EB7gzxijpLDsDMvwFkLzvbh8=",
    };
    const expectedRespond = {
      data: {
        id: 1,
        email: "fikri.mintardja@mail.com",
        name: "Fikri Mintardja",
      },
      status: 201,
    };
    // Assert
    // const result = await authLoginSource.AuthLoginData(userData);
    mockSourceAuthRegister.mockResolvedValue(expectedRespond);
    // Act
    await expect(
      authRegisterSource.AuthRegisterData(userData)
    ).resolves.toEqual(expectedRespond);
  });
  test("RegisterService Should Handle Error and Return Error Response", async () => {
    // Arrange
    const userData = {
      name: "Fikri Mintardja",
      email: "fikri.mintardja@mail.com",
      password: "U2FsdGVkX18KdbmxGA3EB7gzxijpLDsDMvwFkLzvbh8=",
    };
    const errorResponse = {
      status: 409,
      data: null,
    };
    // Assert
    // const result = await authLoginSource.AuthLoginData(userData);
    mockSourceAuthRegister.mockRejectedValue(errorResponse);
    // Act
    await expect(authRegisterSource.AuthRegisterData(userData)).rejects.toEqual(
      errorResponse
    );
  });
});
