interface InputLoginModel {
  email: string;
  password: string;
}

interface LoginModel {
  user: {
    id: number;
    email: string;
    name: string;
  };
  backendToken: {
    accessToken: string;
    refreshToken: string;
  };
}

interface ResponseLogin {
  data: LoginModel | null;
  status: number;
}
