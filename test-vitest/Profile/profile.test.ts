// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { getProfile } from "../../app/api/profile";
import { RefreshToken } from "../../app/api/auth";

vi.mock("axios");

class Database {
  getProduct() {
    return [
      {
        id: 1,
        name: "product",
        sub: "",
      },
    ];
  }
}

describe("profileService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("Success", () => {
    test("Profile_UserAlreadyLoginWithExpiredJWT_UserSucessfulyGetProfile", async () => {
      const id = 1;
      const resp = {
        email: "fikri_mintardja@yahoo.com",
        id: 13,
        name: "fikri",
      };
      (axios as jest.MockedFunction<any>).mockResolvedValue(resp);
      const result = await getProfile(id, "djaskdsaj");
      expect(result).toEqual(resp);
    });
  });
  describe("Failed", () => {
    test("Profile_UserAlreadyLoginWithExpiredJWT_UserSucessfulyRefreshToken", async () => {
      expect.assertions(1);
      const id = 1;
      const resp_profile = {
        message: "Unauthorized",
        statusCode: "401",
      };

      const resp_refresh = {
        user: {
          username: "test4@mail.com",
          sub: {
            name: "test4",
          },
          iat: 1718699812,
          exp: 1718699932,
        },
        backendToken: {
          accessToken: "dasjkdjaskjdsak",
        },
      };

      (axios as jest.MockedFunction<any>).mockResolvedValue(
        Promise.reject(resp_profile)
      );
      let errCatch;
      await getProfile(id, "djaskdsaj").catch(async (err) => {
        console.log(err);
        errCatch = err;
        (axios as jest.MockedFunction<any>).mockResolvedValue(
          Promise.resolve(resp_refresh)
        );
        const result = await RefreshToken("djaskdsaj");
        // const db = vi.spyOn(require("../../api/auth"), "RefreshToken");
        // db.mockImplementation(async () => resp_refresh);
        expect(result).toEqual(resp_refresh);
        // expect(db).toHaveBeenCalled();
        // const mock = vi.fn().mockImplementation(RefreshToken);
        // mock.mockResolvedValue(resp_refresh);
        // expect(mock()).toEqual(resp_refresh);
        // expect(mock).toHaveBeenCalledTimes(1);
        // mock.mockImplementationOnce(() => "access-restricted");
        // expect(mock()).toEqual("access-restricted");

        // expect(mock).toHaveBeenCalledTimes(2);

        // expect(mock()).toEqual(resp_refresh);
        // expect(mock).toHaveBeenCalledTimes(3);
        // console.log(errCatch);
      });
    });
  });

  test("spy a class", () => {
    const db = vi.spyOn(Database.prototype, "getProduct");

    db.mockReturnValue([
      {
        id: 1,
        name: "product",
        sub: "product sub",
      },
    ]);

    const dbInstance = new Database();

    const result = dbInstance.getProduct();

    expect(db).toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: 1,
        name: "product",
        sub: "product sub",
      },
    ]);
  });
});
