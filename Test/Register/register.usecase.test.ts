import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import { ResponseBaseLogin } from "../../mockingData/core/data/models/auth/response";
import { AuthRegisterRepositoryImpl } from "../../mockingData/core/data/repositories/register";
import { UseCaseAuthRegister } from "../../mockingData/core/domain/usecases/register/register";
import { IAuthRegisterRepository } from "../../mockingData/core/domain/repositories/register";
import {
  AuthRegisterDataImpl,
  IAuthRegisterData,
} from "../../mockingData/core/data/dataSources/remote/register";
import { ResponseBaseRegister } from "../../mockingData/core/data/models/register/response";
import { RegisterData } from "../../mockingData/core/domain/entities/register/register";

const mockRepoAuthRegister = vi.spyOn(
  AuthRegisterRepositoryImpl.prototype,
  "authRegister"
);

let useCaseAuthRegister: UseCaseAuthRegister;
let mockAuthRegisterRepository: IAuthRegisterRepository;
let mockAuthRegisterDataImp: jest.Mocked<IAuthRegisterData>;

beforeEach(() => {
  mockAuthRegisterDataImp =
    new AuthRegisterDataImpl() as jest.Mocked<IAuthRegisterData>;
  mockAuthRegisterRepository = new AuthRegisterRepositoryImpl(
    mockAuthRegisterDataImp
  );
  useCaseAuthRegister = new UseCaseAuthRegister(mockAuthRegisterRepository);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("UseCaseAuthRegister", () => {
  test("AuthServiceRegister Should Call Correct With the Correct Inputs", async () => {
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
    // Assert
    // const result = await useCaseAuthLogin.execute(userData);
    mockRepoAuthRegister.mockResolvedValue(expectedRespond);
    // Act
    // expect(result).toEqual(expectedRespond);
    // Act
    await expect(useCaseAuthRegister.execute(userData)).resolves.toEqual(
      expectedRespond
    );
    expect(mockAuthRegisterRepository.authRegister).toHaveBeenCalledWith(
      userData
    );
  });
  test("AuthServiceRegister Should Handle Error and Return Error Response", async () => {
    // Arrange
    const userData = {
      name: "Fikri Mintardja",
      email: "fikri.mintardja@mail.com",
      password: "U2FsdGVkX18KdbmxGA3EB7gzxijpLDsDMvwFkLzvbh8=",
    };
    const errorResponse: ResponseBaseLogin<LoginModel> = {
      status: 409,
      data: null,
    };
    // Assert
    // const result = await useCaseAuthLogin.execute(userData);
    mockRepoAuthRegister.mockRejectedValue(errorResponse);
    // Act
    await expect(useCaseAuthRegister.execute(userData)).rejects.toEqual(
      errorResponse
    );
    expect(mockAuthRegisterRepository.authRegister).toHaveBeenCalledWith(
      userData
    );
  });
});
