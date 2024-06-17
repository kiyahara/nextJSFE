// // import { render, fireEvent } from 'vitest';
// import { afterEach } from "node:test";
// import { describe, expect, test, vi } from "vitest";
// import axios from "axios";
// import { getProfile } from "../../api/profile";
// import { RefreshToken } from "../../api/auth";

// vi.mock("axios");

// describe("profileService", () => {
//   afterEach(() => {
//     vi.clearAllMocks();
//   });
//   describe("Success", () => {
//     test("Profile_UserAlreadyLoginWithExpiredJWT_UserSucessfulyGetProfile", async () => {
//       const id = 1;
//       const resp = {
//         email: "fikri_mintardja@yahoo.com",
//         id: 13,
//         name: "fikri",
//       };
//       (axios as jest.MockedFunction<any>).mockResolvedValue(resp);
//       const result = await getProfile(id, "djaskdsaj");
//       expect(result).toEqual(resp);
//     });
//   });
//   describe("Failed", () => {
//     test("Profile_UserAlreadyLoginWithExpiredJWT_UserSucessfulyRefreshToken", async () => {
//       expect.assertions(1);
//       const id = 1;
//       const resp_profile = {
//         message: "Unauthorized",
//         statusCode: "401",
//       };

//       (axios as jest.MockedFunction<any>).mockResolvedValue(
//         Promise.reject(resp_profile)
//       );
//       let errCatch;
//       await getProfile(id, "djaskdsaj").catch((err) => {
//         console.log(err);
//         errCatch = err;
//         const spy = vi.spyOn(RefreshToken, "RefreshToken");
//       });
//     });
//   });
// });
