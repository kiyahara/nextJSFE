import axios from "axios";

export async function Register(body: InputRegisterModel) {
  const result = await axios({
    method: "post",
    url: process.env.BASE_URL + "auth/register",
    data: body,
  });

  // if (result.status == 201) {
  const response: ResponseRegister = {
    data: result.data,
    status: result.status,
  };

  return response;
  // } else {
  //   const response: ResponseRegister = {
  //     data: null,
  //     status: result.status,
  //   };

  //   return response;
  // }
}
