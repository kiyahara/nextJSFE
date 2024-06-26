import axios from "axios";

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
