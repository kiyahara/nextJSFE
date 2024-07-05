interface UserData {
  email: string;
  id: number;
  name: string;
}

export interface LoginData {
  backendToken: {
    accessToken: string;
    refreshToken: string;
  };
  user: UserData;
}
