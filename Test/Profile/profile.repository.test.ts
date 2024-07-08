import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import {
  BaseLocalDataImpl,
  IBaseLocalData,
} from "../../mockingData/core/data/dataSources/local/baseLocal";
import {
  IGetProfileData,
  ProfileGetDataImpl,
} from "../../mockingData/core/data/dataSources/remote/profile";
import { ProfileRepositoryImpl } from "../../mockingData/core/data/repositories/profile";
import { ResponseBaseProfile } from "../../mockingData/core/data/models/profile/response";
import {
  ProfileData,
  TokenData,
} from "../../mockingData/core/domain/entities/profile/profile";

vi.mock("../../mockingData/core/data/dataSources/remote/profile", () => ({
  ProfileGetDataImpl: vi.fn().mockImplementation(() => ({
    ProfileGetData: vi.fn(),
    ProfileRefreshToken: vi.fn(),
  })),
}));

vi.mock("../../mockingData/core/data/dataSources/local/baseLocal", () => ({
  BaseLocalDataImpl: vi.fn().mockImplementation(() => ({
    setLocalStorage: vi.fn(),
    getLocalStorage: vi.fn(),
    setTokenLocalStorage: vi.fn(),
    removeLocalStorage: vi.fn(),
  })),
}));

describe("ProfileRepositoryService", () => {
  let profileRepository: ProfileRepositoryImpl;
  let mockProfileGetDataImp: jest.Mocked<IGetProfileData>;
  let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;

  beforeEach(() => {
    mockProfileGetDataImp =
      new ProfileGetDataImpl() as jest.Mocked<IGetProfileData>;
    mockBaseLocalDataImp =
      new BaseLocalDataImpl() as jest.Mocked<IBaseLocalData>;
    profileRepository = new ProfileRepositoryImpl(
      mockBaseLocalDataImp,
      mockProfileGetDataImp
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("ProfileRepositorySuccess", () => {
    test("ProfileServiceGetData Should Call Correct Respond With the Correct Inputs", async () => {
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
      mockProfileGetDataImp.ProfileGetData.mockResolvedValue(expectedRespond);
      const result = await profileRepository.ProfileGet(body);
      // Act
      expect(mockProfileGetDataImp.ProfileGetData).toHaveBeenCalledWith(body);
      expect(result).toEqual(expectedRespond);
    });
    test("ProfileServiceRefreshToken Should Call Correct Respond With the Correct Inputs", async () => {
      // Arrange
      const token = "FakeToken";
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
      mockProfileGetDataImp.ProfileRefreshToken.mockResolvedValue(
        expectedRespond
      );
      const result = await profileRepository.RefreshToken(token);
      // Act
      expect(mockProfileGetDataImp.ProfileRefreshToken).toHaveBeenCalledWith(
        token
      );
      expect(result).toEqual(expectedRespond);
    });
  });
  describe("ProfileRepositoryFailed", () => {
    test("ProfileServiceGetData Should Handle Error and Return Error Response", async () => {
      // Arrange
      expect.assertions(2);
      const body: ProfileGetModel = {
        id: 1,
        token: "FakeToken",
      };
      const errorResponse: ResponseBaseProfile<ProfileData> = {
        status: 401,
        data: null,
      };
      // Act
      mockProfileGetDataImp.ProfileGetData.mockRejectedValue(errorResponse);
      const result = await profileRepository.ProfileGet(body);
      // Assert
      expect(mockProfileGetDataImp.ProfileGetData).toHaveBeenCalledWith(body);
      expect(result).toEqual(errorResponse);
    });
    test("ProfileServiceRefreshToken Should Handle Error and Return Error Response", async () => {
      // Arrange
      expect.assertions(2);
      const token = "FakeToken";
      const errorResponse: ResponseBaseProfile<ProfileData> = {
        status: 401,
        data: null,
      };
      // Act
      mockProfileGetDataImp.ProfileRefreshToken.mockRejectedValue(
        errorResponse
      );
      const result = await profileRepository.RefreshToken(token);
      // Assert
      expect(mockProfileGetDataImp.ProfileRefreshToken).toHaveBeenCalledWith(
        token
      );
      expect(result).toEqual(errorResponse);
    });
  });
  describe("TokenData", () => {
    test("ProfileGetId should call getLocalStorage with correct arguments", () => {
      // Arrange
      const key = "IdLogin";
      // Act
      profileRepository.profileGetId(key);

      //Assert
      expect(mockBaseLocalDataImp.getLocalStorage).toHaveBeenCalledWith(key);
    });

    test("ProfileGetId should call getLocalStorage with correct arguments", () => {
      // Arrange
      const key = "IdLogin";
      // Act
      profileRepository.profileGetId(key);

      //Assert
      expect(mockBaseLocalDataImp.getLocalStorage).toHaveBeenCalledWith(key);
    });

    test("profileGetToken should call get with correct arguments", () => {
      // Arrange
      const key = "authToken";

      // Act
      profileRepository.profileGetToken(key);

      //Assert
      expect(mockBaseLocalDataImp.getLocalStorage).toHaveBeenCalledWith(key);
    });

    test("profileSetToken should call setTokenLocalStorage with correct arguments", () => {
      // Arrange
      const key = "authToken";
      const token = "fakeToken";

      // Act
      profileRepository.profileSetToken(key, token);

      //Assert
      expect(mockBaseLocalDataImp.setTokenLocalStorage).toHaveBeenCalledWith(
        key,
        token
      );
    });

    test("profileRemoveToken should call setTokenLocalStorage with correct arguments", () => {
      // Arrange
      const key = "authToken";

      // Act
      profileRepository.profileRemoveToken(key);

      //Assert
      expect(mockBaseLocalDataImp.removeLocalStorage).toHaveBeenCalledWith(key);
    });

    test("profileRemoveId should call setTokenLocalStorage with correct arguments", () => {
      // Arrange
      const key = "IdProfile";

      // Act
      profileRepository.profileRemoveId(key);

      //Assert
      expect(mockBaseLocalDataImp.removeLocalStorage).toHaveBeenCalledWith(key);
    });
  });
});
