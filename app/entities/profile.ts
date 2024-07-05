interface ProfileModel {
  id: number;
  email: string;
  name: string;
}

interface ProfileGetModel {
  id: number;
  token: string;
}

interface UserRefreshToken {
  exp: number;
  iat: number;
  sub: { name: string };
  username: string;
}

interface ResponseDataProfile {
  id: number;
  email: string;
  name: string;
}

interface ResponseDataRefresh {
  backendToken: {
    accessToken: string;
  };
  user: UserRefreshToken;
}

interface ResponseProfile {
  data: ResponseDataProfile | null;
  status: number;
}

interface ResponseRefreshToken {
  data: ResponseDataRefresh | null;
  status: number;
}
