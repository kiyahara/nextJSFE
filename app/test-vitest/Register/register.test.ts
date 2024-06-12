// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Register } from "../../api/register";

vi.mock("axios");

describe("registerService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("Success", () => {
    test("Register_UserNeverRegistered_UserCanRegister", async () => {
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
      axios.mockResolvedValue(resp);
      const result = await Register(userData);
      expect(result).toEqual(resp);
    });
  });
  describe("Failed", () => {
    test("Register_UserAlreadyRegister_UserCannotRegister", async () => {
      expect.assertions(1);
      const userData = {
        name: "fikri",
        email: "fikri.mintardja@mail.com",
        password: "1234",
      };
      const resp = {
        error: "Conflict",
        message: "Email Duplicated",
        statusCode: 409,
      };
      axios.mockResolvedValue(Promise.reject(resp));
      await expect(Register(userData)).rejects.toEqual(resp);
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
//         backendTokend: {
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
