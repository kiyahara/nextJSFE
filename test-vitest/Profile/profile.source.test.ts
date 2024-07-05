// import { render, fireEvent } from 'vitest';

import {
  IGetProfileData,
  ProfileGetDataImpl,
} from "../../mockingData/core/data/dataSources/remote/profile";
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";

const mockSourceProfileGet = vi.spyOn(
  ProfileGetDataImpl.prototype,
  "ProfileGetData"
);

const mockSourceProfileRefreshToken = vi.spyOn(
  ProfileGetDataImpl.prototype,
  "ProfileRefreshToken"
);

describe("ProfileSource", () => {
  let ProfileGetSource: IGetProfileData;

  beforeEach(() => {
    ProfileGetSource = new ProfileGetDataImpl() as jest.Mocked<IGetProfileData>;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("ProfileServiceGetData", () => {
    test("ProfileServiceGetData Should Call Correct Respond With the Correct Payload", async () => {
      // Arrange
      const body = {
        id: 1,
        token: "FakeToken",
      };
      const expectedRespond = {
        data: {
          user: {
            id: 1,
            email: "fikri.mintardja@mail.com",
            name: "fenri",
          },
        },
        status: 200,
      };
      // Assert
      mockSourceProfileGet.mockResolvedValue(expectedRespond);
      // Act
      await expect(ProfileGetSource.ProfileGetData(body)).resolves.toEqual(
        expectedRespond
      );
    });
    test("ProfileServiceGetData Should Handle Error and Return Error Response", async () => {
      // Arrange
      const body = {
        id: 1,
        token: "FakeToken",
      };
      const errorResponse = {
        status: 401,
        data: null,
      };
      // Assert
      mockSourceProfileGet.mockRejectedValue(errorResponse);
      // Act
      await expect(ProfileGetSource.ProfileGetData(body)).rejects.toEqual(
        errorResponse
      );
    });
  });

  describe("ProfileServiceRefreshToken", () => {
    test("ProfileServiceRefreshToken Should Call Correct Respond With the Correct Payload", async () => {
      // Arrange
      const token = "FakeToken";
      const expectedRespond = {
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
        status: 201,
      };
      // Assert
      mockSourceProfileRefreshToken.mockResolvedValue(expectedRespond);
      // Act
      await expect(
        ProfileGetSource.ProfileRefreshToken(token)
      ).resolves.toEqual(expectedRespond);
    });
    test("ProfileServiceRefreshToken Should Handle Error and Return Error Response", async () => {
      // Arrange
      const token = "FakeToken";
      const errorResponse = {
        status: 401,
        data: null,
      };
      // Assert
      mockSourceProfileRefreshToken.mockRejectedValue(errorResponse);
      // Act
      await expect(ProfileGetSource.ProfileRefreshToken(token)).rejects.toEqual(
        errorResponse
      );
    });
  });
});
