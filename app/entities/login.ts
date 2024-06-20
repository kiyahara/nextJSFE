interface BackendToken {
  accessToken: string;
  refreshToken: string;
}

interface User {
  email: string;
  id: number;
  name: string;
}

export interface LoginData {
  backendToken: BackendToken;
  user: User;
  status: number;
}
