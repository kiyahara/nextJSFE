import axios from "axios";

interface RegisterModel {
  name: string;
  email: string;
  password: string;
}

export async function Register(body: RegisterModel) {
  const result = await axios({
    method: "post",
    url: process.env.BASE_URL + "auth/register",
    data: body,
  });

  return result;
}
