import axios from "axios";

export async function getProfile(id: number, token: string) {
  const result = await axios({
    method: "get",
    url: process.env.BASE_URL + `users/${id}`,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      Authorization: "Bearer " + token,
    },
  });

  if (result.status == 200) {
    const response: ResponseProfile = {
      data: result.data,
      status: result.status,
    };

    return response;
  } else {
    const response: ResponseProfile = {
      data: null,
      status: result.status,
    };

    return response;
  }
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
