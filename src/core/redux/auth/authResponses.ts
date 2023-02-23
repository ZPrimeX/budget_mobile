export interface DataResponse {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  google_id: string;
  token: string;
}

export interface IUpdateProfile extends Partial<DataResponse> {}

export interface fetchResponse {
  createdAt: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}
