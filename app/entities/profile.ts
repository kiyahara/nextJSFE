interface ProfileModel {
  id: number;
  email: string;
  name: string;
}
interface ResponseDataProfile {
  id: number;
  email: string;
  name: string;
}

interface ResponseProfile {
  data: ResponseDataProfile | null;
  status: number;
}
