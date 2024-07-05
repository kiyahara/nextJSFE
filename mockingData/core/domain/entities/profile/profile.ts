export interface ProfileData {
  id: number;
  email: string;
  name: string;
}

export interface TokenData {
  backendToken: {
    accessToken: string;
  };
  user: {
    exp: number;
    iat: number;
    sub: { name: string };
    username: string;
  };
}
