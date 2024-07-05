import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import {
  BaseLocalDataImpl,
  IBaseLocalData,
} from "../../mockingData/core/data/dataSources/local/baseLocal";
import { ProfileRepositoryImpl } from "../../mockingData/core/data/repositories/profile";
import { UseCaseProfileGetData } from "../../mockingData/core/domain/usecases/profile/profile";
import { IProfileRepository } from "../../mockingData/core/domain/repositories/profile";
import {
  IGetProfileData,
  ProfileGetDataImpl,
} from "../../mockingData/core/data/dataSources/remote/profile";
import { ResponseBaseProfile } from "../../mockingData/core/data/models/profile/response";
import {
  ProfileData,
  TokenData,
} from "../../mockingData/core/domain/entities/profile/profile";
import { UseCaseProfileToken } from "../../mockingData/core/domain/usecases/profile/token";

const mockRepoProfileGetData = vi.spyOn(
  ProfileRepositoryImpl.prototype,
  "ProfileGet"
);
const mockRepoProfileRefreshToken = vi.spyOn(
  ProfileRepositoryImpl.prototype,
  "RefreshToken"
);

let useCaseProfileGetData: UseCaseProfileGetData;
let mockProfileRepository: IProfileRepository;
let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;
let mockProfileGetDataImp: jest.Mocked<IGetProfileData>;

beforeEach(() => {
  mockBaseLocalDataImp = new BaseLocalDataImpl() as jest.Mocked<IBaseLocalData>;
  mockProfileGetDataImp =
    new ProfileGetDataImpl() as jest.Mocked<IGetProfileData>;
  mockProfileRepository = new ProfileRepositoryImpl(
    mockBaseLocalDataImp,
    mockProfileGetDataImp
  );
  useCaseProfileGetData = new UseCaseProfileGetData(mockProfileRepository);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("UseCaseProfileGetData", () => {
  test("ProfileServiceGetData Should Call Correct With the Correct Inputs", async () => {
    // Arrange
    const body: ProfileGetModel = {
      id: 1,
      token: "FakeToken",
    };
    const expectedRespond: ResponseBaseProfile<ProfileData> = {
      data: {
        id: 1,
        email: "fikri.mintardja@mail.com",
        name: "fenri",
      },
      status: 201,
    };
    // Assert
    mockRepoProfileGetData.mockResolvedValue(expectedRespond);
    // Act
    await expect(useCaseProfileGetData.execute(body)).resolves.toEqual(
      expectedRespond
    );
    expect(mockProfileRepository.ProfileGet).toHaveBeenCalledWith(body);
  });
  test("ProfileServiceRefreshToken Should Call Correct With the Correct Inputs", async () => {
    // Arrange
    const token = "fakeToken";
    const expectedRespond: ResponseBaseProfile<TokenData> = {
      data: {
        backendToken: {
          accessToken: "fakeToken",
        },
        user: {
          exp: 1720162627,
          iat: 1720162507,
          sub: { name: "Fenri" },
          username: "Fenri Mintardja",
        },
      },
      status: 200,
    };
    // Assert
    mockRepoProfileRefreshToken.mockResolvedValue(expectedRespond);
    // Act
    await expect(
      useCaseProfileGetData.executeRefreshToken(token)
    ).resolves.toEqual(expectedRespond);
    expect(mockProfileRepository.RefreshToken).toHaveBeenCalledWith(token);
  });
  test("ProfileServiceGetData Should Handle Error and Return Error Response", async () => {
    // Arrange
    const token = "fakeToken";
    const errorResponse: ResponseBaseProfile<ProfileData> = {
      status: 401,
      data: null,
    };
    // Assert
    mockRepoProfileRefreshToken.mockRejectedValue(errorResponse);
    // Act
    await expect(
      useCaseProfileGetData.executeRefreshToken(token)
    ).rejects.toEqual(errorResponse);
    expect(mockProfileRepository.RefreshToken).toHaveBeenCalledWith(token);
  });
  test("ProfileServiceGetData Should Handle Error and Return Error Response", async () => {
    // Arrange
    const body: ProfileGetModel = {
      id: 1,
      token: "FakeToken",
    };
    const errorResponse: ResponseBaseProfile<ProfileData> = {
      status: 401,
      data: null,
    };
    // Assert
    mockRepoProfileGetData.mockRejectedValue(errorResponse);
    // Act
    await expect(useCaseProfileGetData.execute(body)).rejects.toEqual(
      errorResponse
    );
    expect(mockProfileRepository.ProfileGet).toHaveBeenCalledWith(body);
  });
});

describe("UseCaseAuthSetToken", () => {
  let useCaseProfileToken: UseCaseProfileToken;
  let mockProfileRepository: ProfileRepositoryImpl;
  let mockProfileGetDataImp: jest.Mocked<IGetProfileData>;
  let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;

  beforeEach(() => {
    mockProfileRepository = new ProfileRepositoryImpl(
      mockBaseLocalDataImp,
      mockProfileGetDataImp
    );
    useCaseProfileToken = new UseCaseProfileToken(mockProfileRepository);
  });
  test("should set token using profile repository", () => {
    // Arrange
    const key = "accessToken";
    const token = "fakeToken";

    // Act
    useCaseProfileToken.setToken(key, token);
  });

  test("should get token using profile repository", () => {
    // Arrange
    const key = "accessToken";

    // Act
    useCaseProfileToken.getToken(key);
  });

  test("should remove token using profile repository", () => {
    // Arrange
    const key = "accessToken";

    // Act
    useCaseProfileToken.removeToken(key);
  });

  test("should remove id using profile repository", () => {
    // Arrange
    const key = "idProfile";

    // Act
    useCaseProfileToken.removeId(key);
  });
});
