import { ResponseBaseLogin } from "@/mockingData/core/data/models/auth/response";
import axios from "axios";

export async function Login(
  body: InputLoginModel
): Promise<ResponseBaseLogin<any>> {
  const result = await axios({
    method: "post",
    url: process.env.BASE_URL + "auth/login",
    data: body,
  });

  if (result.status == 201) {
    const response: ResponseLogin = {
      data: result.data,
      status: result.status,
    };

    return response;
  } else {
    const response: ResponseLogin = {
      data: null,
      status: result.status,
    };

    return response;
  }
}
