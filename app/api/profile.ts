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

  return result;
}
