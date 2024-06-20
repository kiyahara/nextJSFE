import axios from "axios";
import { LoginData } from "../entities/login";

interface LoginModel {
  email: string;
  password: string;
}

export async function Login(body: LoginModel) {
  const result = await axios({
    method: "post",
    url: process.env.BASE_URL + "auth/login",
    data: body,
  });

  console.log(result);

  const response: LoginData = {
    user: result?.data?.user,
    backendToken: result?.data?.backendToken,
    status: result.status,
  };

  return response;
}

export async function RefreshToken(token: string) {
  const result = await axios({
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + token,
    },
    url: process.env.BASE_URL + "auth/refresh",
  });

  return result;
}
