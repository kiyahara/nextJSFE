// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Register } from "../../app/api/register";

vi.mock("axios");

describe("RegisterService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("Success", () => {
    // title
    test("RegisterService Should Call Correct Respond When Input is Send", async () => {
      // Arrange
      const userData = {
        name: "fikri",
        email: "fikri.mintardja@mail.com",
        password: "1234",
      };
      const resp = {
        email: "fikri_mintardja@yahoo.com",
        id: 13,
        name: "fikri",
      };
      // Act
      (axios as jest.MockedFunction<any>).mockResolvedValue(resp);
      const result = await Register(userData);
      // Assert
      expect(result).toEqual(resp);
    });
  });
});
