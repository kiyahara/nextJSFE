// import { render, fireEvent } from 'vitest';
import { afterEach } from "node:test";
import { describe, expect, test, vi } from "vitest";
import axios from "axios";
import { Login } from "../../app/api/auth";

vi.mock("axios");

describe("LoginSourceService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  describe("Success", () => {
    // Arrange
    const userData = {
      email: "fikri.mintardja@mail.com",
      password: "1234",
    };
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
      // Act
      (axios as jest.MockedFunction<any>).mockResolvedValue(expectedRespond);
      const result = await Login(userData);
      // Assert
      expect(result).toEqual(expectedRespond);
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
