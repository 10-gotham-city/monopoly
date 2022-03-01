export type TGetServiceIdResponse = {
  service_id: string;
};

export type TOauthSignInRequest = {
  code: string;
  redirect_uri: string;
};
