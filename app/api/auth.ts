import axios from "axios";

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

  return result;
}
