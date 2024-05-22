import axios from "axios";

interface LoginModel {
  email: string;
  password: string;
}

interface RegisterModel {
  name: string;
  email: string;
  password: string;
}

export async function Login(body: LoginModel) {
  const result = await axios({
    method: "post",
    url: process.env.BASE_URL + "auth/login",
    data: body,
  });

  return result;
}

export async function Register(body: RegisterModel) {
  const result = await axios({
    method: "post",
    url: process.env.BASE_URL + "auth/register",
    data: body,
  });

  return result;
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
