export function TokenSet(
  id: number,
  accessToken: string,
  refreshToken: string
) {
  localStorage.setItem("idProfile", String(id));
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
}

export function TokenRemove() {
  localStorage.removeItem("idProfile");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function RenewTokenSet(accessToken: string) {
  localStorage.setItem("accessToken", accessToken);
}
