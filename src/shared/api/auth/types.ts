type TSignInRequest = {
  login: string;
  password: string;
};

type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type TSignUpResponse = {
  id: number;
};
