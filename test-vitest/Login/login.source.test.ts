// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Login } from "../../app/api/auth";
import { LoginData } from "@/app/entities/login";

vi.mock("axios");

describe("authService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("Success", () => {
    test("Login_UserAlreadyRegistered_UserCanLogin", async () => {
      const userData = {
        email: "fikri.mintardja@mail.com",
        password: "1234",
      };
      const resp = {
        data: {
          user: {
            id: "1",
            email: "fikri.mintardja@mail.com",
            name: "fenri",
          },
          backendToken: {
            accessToken: "",
            refreshToken: "",
          },
        },
        status: "201",
      };
      (axios as jest.MockedFunction<any>).mockResolvedValue(resp);
      const result: LoginData = await Login(userData);
      expect(result.backendToken).toEqual(resp.data.backendToken);
    });
  });
  describe("Failed", () => {
    test("Login_UserNotRegister_UserCannotLogin", async () => {
      expect.assertions(1);
      const userData = {
        email: "fikri.mintardja@mail.com",
        password: "123",
      };
      const resp = {
        message: "Unauthorized",
        statusCode: "401",
      };
      (axios as jest.MockedFunction<any>).mockResolvedValue(
        Promise.reject(resp)
      );
      await expect(Login(userData)).rejects.toBe(resp);
    });
  });
});

// Mocking react-cookie and next/router
// vi.mock("next-client-cookies");
// vi.mock("next/router");

// describe("HomeComponent", () => {
//   it("should call Login API and redirect to Profile page when login is successful", async () => {
//     // Mocking useRouter hook
//     const pushMock = vi.fn();
//     useRouter.mockReturnValue({
//       push: pushMock,
//     });

//     // Mocking useCookies hook
//     const setCookieMock = vi.fn();
//     useCookies.mockReturnValue([{ get: () => undefined, set: setCookieMock }]);

//     // Mocking Login function
//     const loginResponse = {
//       status: 201,
//       data: {
//         user: { id: 1 },
//         backendToken: {
//           accessToken: "access_token",
//           refreshToken: "refresh_token",
//         },
//       },
//     };
//     vi.spyOn(global, "fetch").mockImplementationOnce(() =>
//       Promise.resolve({
//         json: () => Promise.resolve(loginResponse),
//         status: loginResponse.status,
//       })
//     );

//     // Render the component
//     const { getByLabelText, getByText } = render(<HomeComponent />);

//     // Fill and submit the form
//     fireEvent.change(getByLabelText("Email"), {
//       target: { value: "test@example.com" },
//     });
//     fireEvent.change(getByLabelText("Password"), {
//       target: { value: "password" },
//     });
//     fireEvent.click(getByText("Login"));

//     // Wait for the API call to finish
//     await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

//     // Assert that the cookies are set
//     expect(setCookieMock).toHaveBeenCalledWith("idProfile", 1);
//     expect(setCookieMock).toHaveBeenCalledWith("accessToken", "access_token");
//     expect(setCookieMock).toHaveBeenCalledWith("refreshToken", "refresh_token");

//     // Assert that router.push is called with the correct path
//     expect(pushMock).toHaveBeenCalledWith("/Profile");
//   });
// });
