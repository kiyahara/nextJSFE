// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Login } from "../../app/api/auth";
import { TokenSet } from "../../components/token/token";

vi.mock("axios");

describe("authService", () => {
  const userData = {
    email: "fikri.mintardja@mail.com",
    password: "123",
  };
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("Success", () => {
    // Arrange
    const expectedRespond = {
      user: {
        id: 1,
        email: "fikri.mintardja@mail.com",
        name: "fenri",
      },
      backendToken: {
        accessToken: "dsadsadasd",
        refreshToken: "dsadsadasf",
      },
      status: 201,
    };
    test("AuthService Should Call Correct With the Correct Inputs", async () => {
      // Assert
      (axios as jest.MockedFunction<any>).mockResolvedValue(expectedRespond);
      const result = await Login(userData);
      // Act
      expect(result).toEqual(expectedRespond);
    });
  });
  describe("Failed", () => {
    test("AuthService Should Handle Error and Return Error Response", async () => {
      // Arrange
      expect.assertions(1);
      const resp = {
        message: "Unauthorized",
        statusCode: "401",
      };
      // Act
      (axios as jest.MockedFunction<any>).mockResolvedValue(
        Promise.reject(resp)
      );
      // Assert
      await expect(Login(userData)).rejects.toBe(resp);
    });
  });
  // describe("SetTokenData", () => {
  //   test("AuthService Should Handle Error  and Return Error Response", async () => {
  //     // Arrange
  //     const id = 1;
  //     const key = "authToken";
  //     const token = "fakeToken";

  //     // Act
  //     TokenSet(id, key, token);

  //     // Assert
  //     expect(TokenSet).toHaveBeenCalledWith(id, key, token);
  //   });
  // });
});
