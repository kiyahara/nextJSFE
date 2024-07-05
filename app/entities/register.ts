interface InputRegisterModel {
  name: string;
  email: string;
  password: string;
}

interface ResponseDataRegister {
  id: number;
  email: string;
  name: string;
}

interface ResponseRegister {
  data: ResponseDataRegister | null;
  status: number;
}
