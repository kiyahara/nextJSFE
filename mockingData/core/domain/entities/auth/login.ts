interface UserData {
  email: string;
  id: number;
  name: string;
}

export interface LoginData {
  token: string;
  refresh_token: string;
  user: UserData;
}
