// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { getProfile } from "../../app/api/profile";
import { RefreshToken } from "../../app/api/profile";
import { ProfileRepositoryImpl } from "../../mockingData/core/data/repositories/profile";
import {
  BaseLocalDataImpl,
  IBaseLocalData,
} from "../../mockingData/core/data/dataSources/local/baseLocal";

vi.mock("axios");
vi.mock("../../mockingData/core/data/dataSources/local/baseLocal", () => ({
  BaseLocalDataImpl: vi.fn().mockImplementation(() => ({
    setLocalStorage: vi.fn(),
    setTokenLocalStorage: vi.fn(),
    getLocalStorage: vi.fn(),
    removeLocalStorage: vi.fn(),
  })),
}));

describe("UseCaseProfileService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  let profileRepository: ProfileRepositoryImpl;
  let mockBaseLocalDataImp: jest.Mocked<IBaseLocalData>;

  beforeEach(() => {
    mockBaseLocalDataImp =
      new BaseLocalDataImpl() as jest.Mocked<IBaseLocalData>;
    profileRepository = new ProfileRepositoryImpl(mockBaseLocalDataImp);
  });
  describe("Success", () => {
    test("ProfileService Should Call Correct Data With the Correct Token", async () => {
      // Arrange
      const token = "FakeToken";
      const key = "IdLogin";
      const id = profileRepository.profileGetToken(key);
      const resp = {
        email: "fikri_mintardja@yahoo.com",
        id: 13,
        name: "fikri",
      };
      // Assert

      (axios as jest.MockedFunction<any>).mockResolvedValue(resp);
      const result = await getProfile(Number(id), token);
      // Act
      expect(mockBaseLocalDataImp.getLocalStorage).toHaveBeenCalledWith(key);
      expect(result).toEqual(resp);
    });
  });
  describe("Failed", () => {
    test("ProfileService Should Handle Error and Return Error Response and Run Refresh Token", async () => {
      expect.assertions(2);
      const key = "IdLogin";
      const id = profileRepository.profileGetToken(key);
      const token = "FakeToken";
      const resp_profile = {
        message: "Unauthorized",
        statusCode: "401",
      };

      // Arrange
      (axios as jest.MockedFunction<any>).mockResolvedValue(
        Promise.reject(resp_profile)
      );
      // Act
      expect(mockBaseLocalDataImp.getLocalStorage).toHaveBeenCalledWith(key);
      await expect(getProfile(Number(id), token)).rejects.toBe(resp_profile);
    });
  });
  describe("UseCaseProfileToken", () => {
    test("ProfileService Should Call setLocalStorage when RefreshToken Call", async () => {
      // Arrange
      const key = "accessToken";
      const token = "FakeToken";
      const resp_refresh = {
        data: {
          user: {
            username: "test4@mail.com",
            sub: {
              name: "test4",
            },
            iat: 1718699812,
            exp: 1718699932,
          },
          backendToken: {
            accessToken: "FakeToken",
          },
        },
      };

      // Act
      (axios as jest.MockedFunction<any>).mockResolvedValue(
        Promise.resolve(resp_refresh)
      );
      //Assert
      const result = await RefreshToken(String(token));
      expect(result).toEqual(resp_refresh);
      profileRepository.profileSetToken(
        key,
        result.data.backendToken.accessToken
      );
      expect(mockBaseLocalDataImp.setTokenLocalStorage).toHaveBeenCalledWith(
        key,
        token
      );
    });
  });
});
